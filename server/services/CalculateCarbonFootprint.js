const calculateCarbonFootprint = (carboFromCar, carbonFromHome) => {
	// Add the carbon emissions from car and home
	const totalCarbonFootprint = carboFromCar + carbonFromHome;

	// Return the total carbon footprint
	return totalCarbonFootprint;
};

module.exports = calculateCarbonFootprint;
