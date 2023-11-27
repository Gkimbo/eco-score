const axios = require("axios");
const cheerio = require("cheerio");
const getCarbonIntensity = require("./getLocationCarbonIntensity");

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
		// const rangeMiles = mpg * tankSize;
		return co2PerMile;
	}

	static co2PerGallonDiesel(mpg, tankSize) {
		const co2PerMile = 22.44 / mpg;
		// const rangeMiles = mpg * tankSize;
		return co2PerMile;
	}

	static evChargedOnGrid(locationCarbonIntensity, batterySize) {
		const battery = batterySize.replaceAll(/ kWh/g, "");
		const batteryNum = parseInt(battery);
		const gramsToPoundsConversionFactor = 1 / 453.592;
		const carbonIntensityPounds =
			locationCarbonIntensity.carbonIntensity * gramsToPoundsConversionFactor;
		const co2PerCharge = carbonIntensityPounds * batteryNum;
		return co2PerCharge;
	}

	static async takeInCars(user) {
		const zipCode = user.homes[0].zipcode;
		const latlng = await getCarbonIntensity.getLatLong(zipCode);
		const carbonIntensity = await getCarbonIntensity.fetchCarbonIntensity(
			latlng
		);
		const cars = await Promise.all(
			user.cars.map(async (car) => {
				const eachCar = await this.getUserCars(
					car.model,
					car.fuelType,
					car.year
				);
				let selectedCar = eachCar[0];
				if (selectedCar.fuel_type === "electricity") {
					let carbonPerCharge = this.evChargedOnGrid(
						carbonIntensity,
						car.carBatterySize
					);
					let roundedNum = carbonPerCharge.toFixed(2);
					car.carbonPerCharge = roundedNum;
				} else if (selectedCar.fuel_type === "gas") {
					const averageMpg =
						(selectedCar.city_mpg + selectedCar.highway_mpg) / 2;
					let carbonPerGal = this.co2PerGallonGas(averageMpg);
					let roundedNum = carbonPerGal.toFixed(2);
					car.carbonPerMile = roundedNum;
				} else {
					const averageMpg =
						(selectedCar.city_mpg + selectedCar.highway_mpg) / 2;
					let carbonPerGal = this.co2PerGallonDiesel(averageMpg);
					let roundedNum = carbonPerGal.toFixed(2);
					car.carbonPerMile = roundedNum;
				}
				return car;
			})
		);
		user.cars = cars;
		return user;
	}

	static async checkCarExists(model, fuelType, year) {
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
