const axios = require("axios");
const cheerio = require("cheerio");
const getCarbonIntensity = require("./getLocationCarbonIntensity");
const getPhotos = require("./getPhotos");

const carApiKey = process.env.API_NINJA_API_KEY;

class CarCalculation {
	static async getUserCars(model, fuelType, year) {
		try {
			const response = await axios.get(
				`https://api.api-ninjas.com/v1/cars?limit=50&model=${model}&fuel_type=${fuelType}&year=${year}`,
				{
					headers: {
						"X-Api-Key": carApiKey,
					},
					contentType: "application/json",
				}
			);
			return response.data;
		} catch (error) {
			return error;
		}
	}

	static co2PerGallonGas(mpg, tankSize) {
		const co2PerMile = 19.6 / mpg;
		const rangeMiles = mpg * tankSize;
		return rangeMiles * co2PerMile;
	}

	static co2PerGallonDiesel(mpg, tankSize) {
		const co2PerMile = 22.44 / mpg;
		const rangeMiles = mpg * tankSize;
		return rangeMiles * co2PerMile;
	}

	static evChargedOnGrid(locationCarbonIntensity, batterySize) {
		const battery = batterySize;
		const batteryNum = parseInt(battery);
		const gramsToPoundsConversionFactor = 1 / 453.592;
		const carbonIntensityPounds =
			locationCarbonIntensity.carbonIntensity * gramsToPoundsConversionFactor;
		const co2PerCharge = carbonIntensityPounds * batteryNum;
		return co2PerCharge;
	}

	static evProductionOfBattery(batterySize) {
		const battery = batterySize;
		const batteryNum = parseInt(battery);
		return 184 * batteryNum;
	}

	static async takeInCars(user) {
		const cars = await Promise.all(
			user.cars.map(async (car) => {
				let eachCar;
				let annualCarbonFromDriving;
				if (car.fuelType === "hybrid") {
					eachCar = await this.getUserCars(car.model, "gas", car.year);
				} else {
					eachCar = await this.getUserCars(car.model, car.fuelType, car.year);
				}

				// Handle case where car isn't found in API (common for newer EVs)
				let selectedCar = eachCar && eachCar.length > 0 ? eachCar[0] : null;
				const fuelType = selectedCar ? selectedCar.fuel_type : car.fuelType;

				// Default MPGe for EVs not in database (100 MPGe is typical average)
				const DEFAULT_EV_MPGE = 100;

				if (fuelType === "electricity") {
					const zipCode = car.zipcode;
					if (zipCode === "off grid" || !zipCode) {
						car.carbonPerCharge = 0;
						car.carbonPerMile = 0;
						annualCarbonFromDriving = 0;
					} else {
						// Use default US carbon intensity (367 g/kWh average)
						// Zipcode lookup is optional - if it fails, we still calculate
						const carbonIntensity = { carbonIntensity: 367 };
						let carbonPerCharge = this.evChargedOnGrid(
							carbonIntensity,
							car.carBatterySize
						);
						let roundedNum = carbonPerCharge.toFixed(2);
						// Use API MPGe if available, otherwise use default
						const averageMpg = selectedCar
							? (selectedCar.city_mpg + selectedCar.highway_mpg) / 2
							: DEFAULT_EV_MPGE;
						const co2PerMile = carbonPerCharge / averageMpg;
						if (car.mileageUnit === "daily") {
							const yearly = Number(car.mileage) * 365;
							annualCarbonFromDriving = yearly * co2PerMile;
						} else if (car.mileageUnit === "monthly") {
							const yearly = Number(car.mileage) * 12;
							annualCarbonFromDriving = yearly * co2PerMile;
						} else {
							annualCarbonFromDriving = Number(car.mileage) * co2PerMile;
						}
						car.carbonPerMile = (carbonPerCharge / averageMpg).toFixed(2);
						car.carbonPerCharge = roundedNum;
					}
					const batteryProduction = this.evProductionOfBattery(
						car.carBatterySize
					).toFixed(2);
					car.carbonToMakeBattery = batteryProduction;
				} else if (
					fuelType === "gas" ||
					fuelType === "hybrid"
				) {
					if (car.fuelType === "hybrid") {
						const batteryProduction = this.evProductionOfBattery(
							car.carBatterySize
						).toFixed(2);
						car.carbonToMakeBattery = batteryProduction;
					}
					// Use API MPG if available, otherwise use default (25 MPG average for gas)
					const DEFAULT_GAS_MPG = 25;
					const averageMpg = selectedCar
						? (selectedCar.city_mpg + selectedCar.highway_mpg) / 2
						: DEFAULT_GAS_MPG;
					const tankSize = car.tank;
					let carbonPerGal = this.co2PerGallonGas(averageMpg, tankSize);
					let roundedNum = carbonPerGal.toFixed(2);
					// Gas emits 19.6 lbs CO2 per gallon
					const co2PerMile = 19.6 / averageMpg;
					if (car.mileageUnit === "daily") {
						const yearly = Number(car.mileage) * 365;
						annualCarbonFromDriving = yearly * co2PerMile;
					} else if (car.mileageUnit === "monthly") {
						const yearly = Number(car.mileage) * 12;
						annualCarbonFromDriving = yearly * co2PerMile;
					} else {
						annualCarbonFromDriving = Number(car.mileage) * co2PerMile;
					}
					car.carbonPerMile = co2PerMile.toFixed(2);
					car.carbonPerTank = roundedNum;
				} else {
					// Diesel - use API MPG if available, otherwise use default (28 MPG average for diesel)
					const DEFAULT_DIESEL_MPG = 28;
					const averageMpg = selectedCar
						? (selectedCar.city_mpg + selectedCar.highway_mpg) / 2
						: DEFAULT_DIESEL_MPG;
					const tankSize = car.tank;
					let carbonPerGal = this.co2PerGallonDiesel(averageMpg, tankSize);
					let roundedNum = carbonPerGal.toFixed(2);
					const co2PerMile = 22.44 / averageMpg;
					if (car.mileageUnit === "daily") {
						const yearly = Number(car.mileage) * 365;
						annualCarbonFromDriving = yearly * co2PerMile;
					} else if (car.mileageUnit === "monthly") {
						const yearly = Number(car.mileage) * 12;
						annualCarbonFromDriving = yearly * co2PerMile;
					} else {
						annualCarbonFromDriving = Number(car.mileage) * co2PerMile;
					}
					car.carbonPerMile = co2PerMile.toFixed(2);
					car.carbonPerTank = roundedNum;
				}
				car.annualCarbonFromDriving = annualCarbonFromDriving;
				// const photo = await getPhotos(car.model, car.year);
				// console.log(photo);
				return car;
			})
		);
		user.cars = cars;
		return user;
	}

	static async checkCarExists(model, fuelType, year) {
		if (fuelType === "hybrid") {
			fuelType = "gas";
		}
		try {
			const response = await axios.get(
				`https://api.api-ninjas.com/v1/cars?limit=50&model=${model}&fuel_type=${fuelType}&year=${year}`,
				{
					headers: {
						"X-Api-Key": carApiKey,
					},
					contentType: "application/json",
				}
			);
			return response.data;
		} catch (error) {
			return error;
		}
	}
}

module.exports = CarCalculation;
