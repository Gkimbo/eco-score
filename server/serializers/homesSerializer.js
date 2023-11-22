class HomeSerializer {
	static serializeArray(homeArray) {
		const allowedAttributes = [
			"zipcode",
			"yearBuilt",
			"heatSource",
			"airConditioning",
			"airConditioningSource",
			"squareFeet",
			"electricitySource",
			"electricityUsage",
			"recycling",
			"compost",
			"ovenType",
		];
		const serializedHome = homeArray.map((home) => {
			const newHome = {};
			for (const attribute of allowedAttributes) {
				newHome[attribute] = home.dataValues[attribute];
			}
			return newHome;
		});
		return serializedHome;
	}
}

module.exports = HomeSerializer;
