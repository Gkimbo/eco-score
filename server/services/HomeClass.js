const axios = require("axios");
const cheerio = require("cheerio");
const getCarbonIntensity = require("./getLocationCarbonIntensity");
const getPhotos = require("./getPhotos");

const carApiKey = process.env.API_NINJA_API_KEY;

class HomeClass {
	static powerOnGrid(locationCarbonIntensity, electricityUsage) {
		const electricityNum = parseInt(electricityUsage);
		const gramsToPoundsConversionFactor = 1 / 453.592;
		const carbonIntensityPounds =
			locationCarbonIntensity.carbonIntensity * gramsToPoundsConversionFactor;
		const co2PerYear = carbonIntensityPounds * electricityNum;
		return co2PerYear;
	}

	static evProductionOfBatteryBank(batteryBankSize) {
		const battery = batteryBankSize;
		const batteryNum = parseInt(battery);
		return 184 * batteryNum;
	}

	static takeInHomes(homes) {
		console.log(homes);
	}
}

module.exports = HomeClass;
