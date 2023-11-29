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
		const serializedUser = UserSerializer.serializeOne(user.dataValues);
		if (serializedUser.cars.length === 0) {
			return res.status(200).json({ user: serializedUser });
		} else {
			const userWithCarCarbon = await CarCalculation.takeInCars(serializedUser);
			return res.status(200).json({ user: userWithCarCarbon });
		}
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
	let { model, make, year, fuelType, carBatterySize, zipCode, tank } =
		req.body.car;
	if (fuelType === "hybrid") {
		fuelType = "gas";
	}
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
				});
				return res.status(201).json({ user });
			}
		}
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
		heatSource,
		airConditioning,
		airConditioningSource,
		squareFeet,
		electricitySource,
		electricityUsage,
		recycling,
		compost,
		ovenType,
		electricityUnit,
	} = req.body.home;

	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
		});

		const userInfo = await UserInfo.addHomeToDB({
			userId,
			zipcode,
			yearBuilt,
			heatSource,
			airConditioning,
			airConditioningSource,
			squareFeet,
			electricitySource,
			electricityUsage,
			recycling,
			compost,
			ovenType,
			electricityUnit,
		});

		return res.status(201).json({ user });
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

module.exports = userInfoRouter;
