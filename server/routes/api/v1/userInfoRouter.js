const express = require("express");
const jwt = require("jsonwebtoken");
const UserSerializer = require("../../../serializers/userSerializer");
const getCarbonIntensity = require("../../../services/getLocationCarbonIntensity");
const CarCalculation = require("../../../services/CarClass");
const UserInfo = require("../../../services/UserInfoClass");
const { User, UserInformation, UserCars } = require("../../../models");

const userInfoRouter = express.Router();
const secretKey = process.env.SESSION_SECRET;

userInfoRouter.post("/", async (req, res) => {
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
	const { model, make, year, fuelType, carBatterySize } = req.body.car;

	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
		});

		if (!user) {
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
		} else {
			return res
				.status(208)
				.json({ message: "user information already exists" });
		}
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

module.exports = userInfoRouter;
