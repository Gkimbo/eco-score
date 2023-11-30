const axios = require("axios");
const cheerio = require("cheerio");
const getCarbonIntensity = require("./getLocationCarbonIntensity");

class HomeClass {
	static powerOnGrid(locationCarbonIntensity, electricityUsage) {
		const electricityNum = parseInt(electricityUsage);
		const gramsToPoundsConversionFactor = 1 / 453.592;
		const carbonIntensityPounds =
			locationCarbonIntensity.carbonIntensity * gramsToPoundsConversionFactor;
		const co2PerYear = carbonIntensityPounds * electricityNum;
		return co2PerYear;
	}

	static co2FromNaturalGas(annualNaturalGasUsage) {
		const gasInTherms = Number(annualNaturalGasUsage);
		return gasInTherms * 11.7;
	}

	static co2FromHeatingOil(annualOilUsage, unit) {
		if (unit === "gallons") {
			let gasInGallons = Number(annualOilUsage);
			return gasInGallons * 22.61;
		} else {
			let gasInLiters = Number(annualOilUsage);
			return gasInLiters * 5.98;
		}
	}

	static evProductionOfBatteryBank(batteryBankSize) {
		const battery = batteryBankSize;
		const batteryNum = parseInt(battery);
		return 184 * batteryNum;
	}

	static async takeInHomes(user) {
		const homes = await Promise.all(
			user.homes.map(async (home) => {
				let totalCarbon = 0;
				if (home.electricitySource === "grid") {
					let electricityUsage;
					if (home.electricityUnit === "yearly") {
						electricityUsage = Number(home.electricityUsage);
					} else {
						electricityUsage = Number(home.electricityUsage) * 12;
					}
					const latlng = await getCarbonIntensity.getLatLong(home.zipcode);
					// const carbonIntensity = await getCarbonIntensity.fetchCarbonIntensity(
					// 	latlng
					// );
					const carbonIntensity = { carbonIntensity: 367 }; //temporary average in US
					let carbonForAnnualPower = this.powerOnGrid(
						carbonIntensity,
						electricityUsage
					);
					totalCarbon += carbonForAnnualPower;
					let roundedNum = carbonForAnnualPower.toFixed(2);
					home.carbonForAnnualPower = roundedNum;
				}
				if (home.gas === "yes") {
					let gasUsage;
					if (home.gasUnit === "yearly") {
						gasUsage = Number(home.gasUsage);
					} else {
						gasUsage = Number(home.gasUsage) * 12;
					}
					const carbonFromGas = this.co2FromNaturalGas(gasUsage);
					totalCarbon += carbonFromGas;
					const roundedNum = carbonFromGas.toFixed(2);
					home.carbonFromAnnualGas = roundedNum;
				} else {
					home.carbonFromAnnualGas = null;
				}

				if (home.oil === "yes") {
					let oilUsage;
					if (home.oilUnit === "yearly") {
						oilUsage = Number(home.oilUsage);
					} else {
						oilUsage = Number(home.oilUsage) * 12;
					}
					const carbonFromOil = this.co2FromHeatingOil(
						oilUsage,
						home.oilVolume
					);
					totalCarbon += carbonFromOil;
					const roundedNum = carbonFromOil.toFixed(2);
					home.carbonFromAnnualOil = roundedNum;
				} else {
					home.carbonFromAnnualOil = null;
				}
				home.totalCarbon = totalCarbon.toFixed(2);
				return home;
			})
		);
		user.homes = homes;
		return user;
	}
}

module.exports = HomeClass;
