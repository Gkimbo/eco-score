class UserInfoSerializer {
	static serializeArray(info) {
		const allowedAttributes = [
			"zipcode",
			"homeOwnership",
			"milesDriven",
			"milesDrivenUnit",
			"commute",
			"transportation",
			"daysCommute",
			"hasCar",
		];
		const serializedUser = {};

		for (const attribute of allowedAttributes) {
			serializedUser[attribute] = info[attribute];
		}

		return serializedUser;
	}
}

module.exports = UserInfoSerializer;
