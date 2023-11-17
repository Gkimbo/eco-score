const axios = require("axios");
const cheerio = require("cheerio");

const carApiKey = process.env.API_NINJA_API_KEY;

class CarCalculation {
	static async getCarInformation(model, fuelType, year) {
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
		return co2PerMile * rangeMiles;
	}

	static co2PerGallonDiesel(mpg, tankSize) {
		const co2PerMile = 22.44 / mpg;
		const rangeMiles = mpg * tankSize;
		return co2PerMile * rangeMiles;
	}

	static evChargedOnGrid(locationCarbonIntensity, batterySize) {
		const gramsToPoundsConversionFactor = 1 / 453.592;
		const carbonIntensityPounds =
			locationCarbonIntensity * gramsToPoundsConversionFactor;
		const co2PerCharge = carbonIntensityPounds * batterySize;

		return co2PerCharge;
	}
}

module.exports = CarCalculation;
