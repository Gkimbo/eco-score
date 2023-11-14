const axios = require("axios");

const googleApiKey = process.env.GOOGLE_MAPS;
const elecApiKey = process.env.ELEC_MAPS;

class getCarbonIntensity {
	static async getLatLong(zipCode) {
		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${googleApiKey}`
			);
			const { results } = response.data;
			if (results.length > 0) {
				const { lat, lng } = results[0].geometry.location;
				return { latitude: lat, longitude: lng };
			} else {
				throw new Error("No results found for the given zip code");
			}
		} catch (error) {
			console.error("Error getting latitude and longitude:", error);
			throw error;
		}
	}

	static async fetchCarbonIntensity(location) {
		const latitude = location.latitude;
		const longitude = location.longitude;
		try {
			const response = await axios.get(
				`https://api-access.electricitymaps.com/free-tier/carbon-intensity/latest?lat=${latitude}&lon=${longitude}`,
				{
					headers: {
						"auth-token": elecApiKey,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching carbon intensity:", error);
			throw error;
		}
	}
}

module.exports = getCarbonIntensity;
