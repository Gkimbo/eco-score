class HomeSerializer {
	static serializeArray(homeArray) {
		const allowedAttributes = [
			"id",
			"zipcode",
			"yearBuilt",
			"squareFeet",
			"electricitySource",
			"electricityUsage",
			"gasUsage",
			"oilUsage",
			"gasUnit",
			"oilUnit",
			"oilVolume",
			"recycling",
			"compost",
			"electricityUnit",
			"gas",
			"oil",
			"batteryBankSize",
			"batteryBackup",
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
