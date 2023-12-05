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
		mileage,
		mileageUnit,
	}) {
		if (fuelType !== "electricity" && fuelType !== "hybrid") {
			carBatterySize = null;
		}
		if (!zipCode) {
			zipCode = "Gas and Diesel cars don't need to charge";
		}

		await UserCars.create({
			userId,
			make,
			model,
			year,
			fuelType,
			carBatterySize,
			zipcode: zipCode,
			tank,
			mileage,
			mileageUnit,
		});
	}

	static async addTreeToDb({ userId }) {
		try {
			const userInfo = await UserInformation.findOne({
				where: { userId },
			});
			if (userInfo) {
				const updatedTreesPlanted = userInfo.treesPlanted + 1;
				await UserInformation.update(
					{
						treesPlanted: updatedTreesPlanted,
					},
					{
						where: { userId },
					}
				);

				await this.removeStarsFromDb({ userId });
				console.log(
					`Tree added for user ${userId}. Total trees planted: ${updatedTreesPlanted}`
				);
			} else {
				return `User with ID ${userId} not found`;
			}
		} catch (error) {
			console.error("Error adding tree to the database:", error);
		}
	}

	static async addStarsToDb({ userId, rewards }) {
		try {
			const userInfo = await UserInformation.findOne({
				where: { userId },
			});
			if (userInfo) {
				const updatedStars = userInfo.rewards + rewards;
				await UserInformation.update(
					{
						rewards: updatedStars,
					},
					{
						where: { userId },
					}
				);
				console.log(
					`Stars added for user ${userId}. Total Stars: ${updatedStars}`
				);
			} else {
				return `User with ID ${userId} not found`;
			}
		} catch (error) {
			console.error("Error adding tree to the database:", error);
		}
	}

	static async removeStarsFromDb({ userId }) {
		try {
			const userInfo = await UserInformation.findOne({
				where: { userId },
			});
			if (userInfo) {
				const updatedStars = userInfo.rewards;
				await UserInformation.update(
					{
						rewards: userInfo.rewards - 1000,
					},
					{
						where: { userId },
					}
				);
				console.log(
					`Stars removed for user ${userId}. Total Stars: ${updatedStars}`
				);
			} else {
				return `User with ID ${userId} not found`;
			}
		} catch (error) {
			console.error("Error adding tree to the database:", error);
		}
	}

	// static async removeCustomStars(userId, rewards) {
	// 	try {
	// 		const userInfo = await UserInformation.findOne({
	// 			where: { userId },
	// 		});
	// 		if (userInfo) {
	// 			const updatedStars = userInfo.rewards;
	// 			await UserInformation.update(
	// 				{
	// 					rewards: userInfo.rewards - rewards,
	// 				},
	// 				{
	// 					where: { userId },
	// 				}
	// 			);
	// 			console.log(
	// 				`Stars removed for user ${userId}. Total Stars: ${updatedStars}`
	// 			);
	// 		} else {
	// 			return `User with ID ${userId} not found`;
	// 		}
	// 	} catch (error) {
	// 		console.error("Error adding tree to the database:", error);
	// 	}
	// }

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
		batteryBankSize,
		batteryBackup,
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
			batteryBankSize,
			batteryBackup,
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

	static async deleteCarInfo(id, userId) {
		try {
			// const getCar = await UserCars.findOne({ where: { id: id } });
			// if (getCar.dataValues.fuelType === "electricity") {
			// 	await this.removeCustomStars(userId, 100);
			// }
			const deletedCarInfo = await UserCars.destroy({
				where: { id: id },
			});
			return deletedCarInfo;
		} catch (error) {
			console.error("Error deleting car info: ", error);
			throw error;
		}
	}

	static async deleteHomeInfo(id) {
		try {
			const deletedHomeInfo = await UserHomes.destroy({
				where: { id: id },
			});
			return deletedHomeInfo;
		} catch (error) {
			console.error("Error deleting car info: ", error);
			throw error;
		}
	}
}

module.exports = UserInfo;
