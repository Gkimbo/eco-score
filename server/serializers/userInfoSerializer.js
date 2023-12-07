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

		if (!serializedUser.treesPlanted) {
			serializedUser.treesPlanted = 0;
		}
		if (!serializedUser.rewards) {
			serializedUser.rewards = 0;
		}
		return serializedUser;
	}
}

module.exports = UserInfoSerializer;
