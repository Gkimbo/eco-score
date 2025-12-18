const UserInfoSerializer = require("./userInfoSerializer");
const CarSerializer = require("./carsSerializer");
const HomeSerializer = require("./homesSerializer");

class UserSerializer {
	static serializeOne(user) {
		const allowedAttributes = ["id", "email", "username", "lastLogin"];
		const serializedUser = {};
		let information;
		let cars = [];
		let homes = [];

		for (const attribute of allowedAttributes) {
			serializedUser[attribute] = user[attribute];
		}
		if (user.userInformation[0]) {
			information = UserInfoSerializer.serializeArray(
				user.userInformation[0].dataValues
			);
			serializedUser.info = information;
		}

		if (user.userCars) {
			cars = CarSerializer.serializeArray(user.userCars);
			serializedUser.cars = cars;
		}

		if (user.userHomes) {
			homes = HomeSerializer.serializeArray(user.userHomes);
			serializedUser.homes = homes;
		}

		return serializedUser;
	}

	static login(user) {
		const allowedAttributes = ["id", "email", "username"];
		const serializedUser = {};

		for (const attribute of allowedAttributes) {
			serializedUser[attribute] = user[attribute];
		}

		return serializedUser;
	}
}

module.exports = UserSerializer;
