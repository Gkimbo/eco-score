const express = require("express");
const User = require("../../../models/models/User");
const jwt = require("jsonwebtoken");
const UserSerializer = require("../../../serializers/userSerializer");
const getCarbonIntensity = require("../../../services/getLocationCarbonIntensity");
const CarCalculation = require("../../../services/CarClass");
const UserInformation = require("../../../models/models/UserInformation");

const userInfoRouter = express.Router();
const secretKey = process.env.SESSION_SECRET;

userInfoRouter.post("/", async (req, res) => {
	const { token } = req.body.user;
	const {
		location,
		homeOwnership,
		milesDriven,
		milesDrivenUnit,
		commute,
		transportation,
		daysCommute,
		hasCar,
		fuelType,
		carBatterySize,
	} = req.body;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({ where: { id: userId } });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		const serializedUser = UserSerializer.serializeOne(user);

		// Add user's information to the UserInformation table
		await UserInformation.create({
			userId: userId,
			location: location,
			homeOwnership: homeOwnership,
			milesDriven: milesDriven,
			commute: commute,
			transportation: transportation,
			daysCommute: daysCommute,
			hasCar: hasCar,
		});

		return res.status(200).json(serializedUser);
	} catch (error) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

module.exports = userInfoRouter;
