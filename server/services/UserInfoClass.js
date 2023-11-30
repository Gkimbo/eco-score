const { User, UserCars, UserInformation, UserHomes } = require("../models");

class UserInfo {
	static async addUserInfoToDB({
		userId,
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
				homeOwnership: homeOwnership,
				milesDriven: milesDriven,
				milesDrivenUnit: milesDrivenUnit,
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
		zipCode,
		tank,
	}) {
		if (fuelType !== "electricity" && fuelType !== "hybrid") {
			carBatterySize = null;
		}
		if (!zipCode) {
			zipCode = "Gas and Diesel cars don't need to charge";
		}

		await UserCars.create({
			userId: userId,
			make: make,
			model: model,
			year: year,
			fuelType: fuelType,
			carBatterySize: carBatterySize,
			zipcode: zipCode,
			tank: tank,
		});
	}

	static async addHomeToDB({
		userId,
		zipcode,
		yearBuilt,
		squareFeet,
		electricitySource,
		electricityUsage,
		gasUsage,
		oilUsage,
		gasUnit,
		oilUnit,
		oilVolume,
		recycling,
		compost,
		electricityUnit,
		gas,
		oil,
	}) {
		await UserHomes.create({
			userId,
			zipcode,
			yearBuilt,
			squareFeet,
			electricitySource,
			electricityUsage,
			gasUsage,
			oilUsage,
			gasUnit,
			oilUnit,
			oilVolume,
			recycling,
			compost,
			electricityUnit,
			gas,
			oil,
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

	static async deleteCarInfo(id) {
		try {
			const deletedCarInfo = await UserCars.destroy({
				where: { id: id },
			});
			return deletedCarInfo;
		} catch (error) {
			console.error("Error deleting car info: ", error);
			throw error;
		}
	}
}

module.exports = UserInfo;
