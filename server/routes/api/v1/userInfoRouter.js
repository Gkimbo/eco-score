const express = require("express");
const jwt = require("jsonwebtoken");
const UserSerializer = require("../../../serializers/userSerializer");
const UserInfo = require("../../../services/UserInfoClass");
const {
	User,
	UserInformation,
	UserCars,
	UserHomes,
} = require("../../../models");
const CarCalculation = require("../../../services/CarClass");
const getCarbonIntensity = require("../../../services/getLocationCarbonIntensity");
const HomeClass = require("../../../services/HomeClass");

const userInfoRouter = express.Router();
const secretKey = process.env.SESSION_SECRET;

userInfoRouter.get("/", async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
			include: [
				{ model: UserCars, as: "userCars" },
				{ model: UserInformation, as: "userInformation" },
				{ model: UserHomes, as: "userHomes" },
			],
		});
		let serializedUser = UserSerializer.serializeOne(user.dataValues);
		if (serializedUser.cars.length !== 0) {
			await CarCalculation.takeInCars(serializedUser);
		}
		if (serializedUser.homes.length !== 0) {
			await HomeClass.takeInHomes(serializedUser);
		}
		return res.status(200).json({ user: serializedUser });
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

userInfoRouter.post("/basic", async (req, res) => {
	const { token } = req.body.user;
	const {
		homeOwnership,
		milesDriven,
		milesDrivenUnit,
		commute,
		transportation,
		daysCommute,
		hasCar,
	} = req.body;

	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
		});

		const userInfo = await UserInfo.addUserInfoToDB({
			userId,
			homeOwnership,
			milesDriven,
			milesDrivenUnit,
			commute,
			transportation,
			daysCommute,
			hasCar,
		});
		return res.status(201).json({ user });
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

userInfoRouter.post("/car", async (req, res) => {
	const { token } = req.body.user;
	let {
		model,
		make,
		year,
		fuelType,
		carBatterySize,
		zipCode,
		tank,
		mileage,
		mileageUnit,
	} = req.body.car;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
		});
		const validate = await CarCalculation.checkCarExists(model, fuelType, year);

		if (validate.length === 0) {
			return res.status(400).json("No car found");
		} else {
			if (validate[0].fuel_type === "electricity") {
				const checkZipcode = await getCarbonIntensity.checkZipcodeExists(
					zipCode
				);
				if (checkZipcode) {
					const userInfo = await UserInfo.addCarToDB({
						userId,
						model,
						make,
						year,
						fuelType,
						carBatterySize,
						zipCode,
						tank,
						mileage,
						mileageUnit,
					});
					return res.status(201).json({ user });
				} else if (
					validate[0].fuel_type === "electricity" &&
					zipCode === "off grid"
				) {
					const userInfo = await UserInfo.addCarToDB({
						userId,
						model,
						make,
						year,
						fuelType,
						carBatterySize,
						zipCode,
						tank,
						mileage,
						mileageUnit,
					});
					return res.status(201).json({ user });
				} else {
					return res.status(400).json("Cannot find zipcode");
				}
			} else {
				const userInfo = await UserInfo.addCarToDB({
					userId,
					model,
					make,
					year,
					fuelType,
					carBatterySize,
					zipCode,
					tank,
					mileage,
					mileageUnit,
				});
				return res.status(201).json({ user });
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

userInfoRouter.post("/tree", async (req, res) => {
	const { token } = req.body.user;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
		});
		if (user) {
			const addTree = await UserInfo.addTreeToDb({
				userId,
			});
			if (addTree === `User with ID ${userId} not found`) {
				return res.status(401).json({ message: addTree });
			}
		}
		return res.status(201).json("Tree has been planted");
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

userInfoRouter.post("/stars", async (req, res) => {
	const { token } = req.body.user;
	const rewards = req.body.rewards;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
		});
		if (user) {
			const addStars = await UserInfo.addStarsToDb({
				userId,
				rewards,
			});
			if (addStars === `User with ID ${userId} not found`) {
				return res.status(401).json({ message: addStars });
			}
		}
		return res.status(201).json("Reward has been added to DB");
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

userInfoRouter.delete("/car", async (req, res) => {
	const id = req.body.id;
	try {
		const deleteCar = await UserInfo.deleteCarInfo(id);
		return res.status(201).json({ message: "car deleted" });
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

userInfoRouter.post("/home", async (req, res) => {
	const { token } = req.body.user;
	const {
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
	} = req.body.home;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
		});
		const checkZipcode = await getCarbonIntensity.checkZipcodeExists(zipcode);
		if (!checkZipcode) {
			return res.status(400).json("Cannot find zipcode");
		}
		const userInfo = await UserInfo.addHomeToDB({
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

		return res.status(201).json({ user });
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

userInfoRouter.delete("/home", async (req, res) => {
	const id = req.body.id;
	try {
		const deleteHome = await UserInfo.deleteHomeInfo(id);
		return res.status(201).json({ message: "home deleted" });
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

userInfoRouter.patch("/basic", async (req, res) => {
	const { token } = req.body.data.user;
	const {
		zipcode,
		homeOwnership,
		milesDriven,
		milesDrivenUnit,
		commute,
		transportation,
		daysCommute,
		hasCar,
	} = req.body.data;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
		});
		if (user) {
			await UserInfo.updateUserInfo({
				userId,
				zipcode,
				homeOwnership,
				milesDriven,
				milesDrivenUnit,
				commute,
				transportation,
				daysCommute,
				hasCar,
			});
		}
		return res.status(201).json("User Information has been deleted!");
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

module.exports = userInfoRouter;
