const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const photoApiAccessKey = process.env.UNSPLASH_PHOTO_ACCESS_KEY;

const getPhotos = async (car, year) => {
	const baseUrl = "https://api.unsplash.com/search/";
	try {
		const url = `${baseUrl}photos/?client_id=${photoApiAccessKey}&query=${car} ${year}&count=1&order_by=relevant&orientation=landscape`;

		const apiResponse = await axios.get(url);
		const parsedData = apiResponse.data;
		const urlNeeded = parsedData.results[0].urls.regular;
		return urlNeeded;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = getPhotos;
