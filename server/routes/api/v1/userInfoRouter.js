const express = require("express");
const jwt = require("jsonwebtoken");
const UserSerializer = require("../../../serializers/userSerializer");
const getCarbonIntensity = require("../../../services/getLocationCarbonIntensity");
const CarCalculation = require("../../../services/CarClass");
const UserInfo = require("../../../services/UserInfoClass");
const { User, UserInformation, UserCars } = require("../../../models");

const userInfoRouter = express.Router();
const secretKey = process.env.SESSION_SECRET;

userInfoRouter.get("/", async (req, res) => {
	const token = req.headers.authorization;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
			include: [
				{ model: UserCars, as: "UserCars" },
				{ model: UserInformation, as: "userInformation" },
			],
		});
		const serializedUser = UserSerializer.serializeOne(user.dataValues);
		return res.status(200).json({ user: serializedUser });
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

userInfoRouter.post("/basic", async (req, res) => {
	const { token } = req.body.user;
	const {
		zipcode,
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
			zipcode,
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
	const { model, make, year, fuelType, carBatterySize } = req.body.car;

	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
		});

		const userInfo = await UserInfo.addCarToDB({
			userId,
			model,
			make,
			year,
			fuelType,
			carBatterySize,
		});

		return res.status(201).json({ user });
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

module.exports = userInfoRouter;
