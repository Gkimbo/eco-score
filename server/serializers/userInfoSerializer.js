class UserInfoSerializer {
	static serializeArray(info) {
		const allowedAttributes = [
			"homeOwnership",
			"milesDriven",
			"milesDrivenUnit",
			"commute",
			"transportation",
			"daysCommute",
			"hasCar",
			"treesPlanted",
			"rewards",
		];
		const serializedUser = {};

		for (const attribute of allowedAttributes) {
			serializedUser[attribute] = info[attribute];
		}

		return serializedUser;
	}
}

module.exports = UserInfoSerializer;
