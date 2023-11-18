const { User, UserCars, UserInformation } = require("../models");

class UserInfo {
	static async addUserInfoToDB({
		userId,
		zipcode,
		homeOwnership,
		milesDriven,
		milesDrivenUnit,
		commute,
		transportation,
		daysCommute,
		hasCar,
	}) {
		try {
			const newUserInfo = await UserInformation.create({
				userId: userId,
				zipcode: zipcode,
				homeOwnership: homeOwnership,
				milesDriven: milesDriven,
				commute: commute,
				transportation: transportation,
				daysCommute: daysCommute,
				hasCar: hasCar,
				milesDrivenUnit: milesDrivenUnit,
			});

			return newUserInfo;
		} catch (error) {
			console.error("Error adding user info: ", error);
			throw error;
		}
	}

	static async addCarToDB({
		userId,
		make,
		model,
		year,
		fuelType,
		carBatterySize,
	}) {
		if (fuelType !== "electricity") {
			carBatterySize = null;
		}

		await UserCars.create({
			userId: userId,
			make: make,
			model: model,
			year: year,
			fuelType: fuelType,
			carBatterySize: carBatterySize,
		});
	}

	static async updateUserInfo(id, data) {
		try {
			const updatedUserInfo = await UserInformation.update(data, {
				where: { id: id },
			});
			return updatedUserInfo;
		} catch (error) {
			console.error("Error updating user info: ", error);
			throw error;
		}
	}

	static async deleteUserInfo(id) {
		try {
			const deletedUserInfo = await UserInformation.destroy({
				where: { id: id },
			});
			return deletedUserInfo;
		} catch (error) {
			console.error("Error deleting user info: ", error);
			throw error;
		}
	}
}

module.exports = UserInfo;
