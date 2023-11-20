const UserInfoSerializer = require("./userInfoSerializer");
const CarSerializer = require("./carsSerializer");

class UserSerializer {
	static serializeOne(user) {
		const allowedAttributes = ["id", "email", "username"];
		const serializedUser = {};
		let information;
		let cars = [];

		for (const attribute of allowedAttributes) {
			serializedUser[attribute] = user[attribute];
		}
		if (user.userInformation[0].dataValues) {
			information = UserInfoSerializer.serializeArray(
				user.userInformation[0].dataValues
			);
			serializedUser.info = information;
		}

		if (user.UserCars) {
			cars = CarSerializer.serializeArray(user.UserCars);
			serializedUser.cars = cars;
		}

		return serializedUser;
	}
}

module.exports = UserSerializer;
