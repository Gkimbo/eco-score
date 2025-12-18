const express = require("express");
const jwt = require("jsonwebtoken");
const UserSerializer = require("../../../serializers/userSerializer");
const UserInfo = require("../../../services/UserInfoClass");
const {
	User,
	UserInformation,
	UserCars,
	UserHomes,
	UserAchievements,
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

userInfoRouter.post("/collect-rewards", async (req, res) => {
	const { token } = req.body;
	const rewards = 100;
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
			} else {
				await user.update({ lastLogin: new Date() });
			}
		}
		return res.status(201).json("Reward has been added to DB");
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

		// Check if validate is an array with results
		const carFound = validate && Array.isArray(validate) && validate.length > 0;
		const carFromApi = carFound ? validate[0] : null;

		// For electric vehicles, allow adding even if not in API (many EVs aren't in the database)
		if (!carFound && fuelType !== "electricity") {
			return res.status(400).json({ error: "No car found in database. Please check make, model, and year." });
		}

		// Determine fuel type - use submitted fuelType if car not in API
		const actualFuelType = carFromApi ? carFromApi.fuel_type : fuelType;

		// For EVs, just do basic zipcode format check (5 digits or "off grid")
		// We use a default US carbon intensity anyway
		if (actualFuelType === "electricity" || fuelType === "electricity") {
			const validZipcode = !zipCode || zipCode === "off grid" || /^\d{5}$/.test(zipCode);
			if (!validZipcode) {
				return res.status(400).json({ error: "Please enter a valid 5-digit zipcode" });
			}
		}

		const newCar = await UserInfo.addCarToDB({
			userId,
			model,
			make,
			year,
			fuelType,
			carBatterySize,
			zipCode: zipCode || "off grid",
			tank,
			mileage,
			mileageUnit,
		});
		return res.status(201).json({ user, car: newCar });
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
		propane,
		propaneUsage,
		wood,
		woodUsage,
		woodType,
		electricHeat,
	} = req.body.home;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({
			where: { id: userId },
		});

		// Skip zipcode validation - we use a default US carbon intensity anyway
		// Just do basic format check (5 digits)
		if (!zipcode || !/^\d{5}$/.test(zipcode)) {
			return res.status(400).json("Please enter a valid 5-digit zipcode");
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
			propane,
			propaneUsage,
			wood,
			woodUsage,
			woodType,
			electricHeat,
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

userInfoRouter.patch("/home", async (req, res) => {
	const { token } = req.body.user;
	const { id } = req.body;
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
		propane,
		propaneUsage,
		wood,
		woodUsage,
		woodType,
		electricHeat,
	} = req.body.home;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;

		// Basic zipcode format check
		if (!zipcode || !/^\d{5}$/.test(zipcode)) {
			return res.status(400).json({ error: "Please enter a valid 5-digit zipcode" });
		}

		await UserInfo.updateHomeInfo(id, {
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
			propane,
			propaneUsage,
			wood,
			woodUsage,
			woodType,
			electricHeat,
		});

		return res.status(200).json({ message: "Home updated successfully" });
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

// Daily check-in endpoint
userInfoRouter.post("/checkin", async (req, res) => {
	const { token } = req.body.user;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;

		const userInfo = await UserInformation.findOne({
			where: { userId },
		});

		if (!userInfo) {
			return res.status(404).json({ error: "User information not found" });
		}

		const now = new Date();
		const lastCheckIn = userInfo.lastCheckIn ? new Date(userInfo.lastCheckIn) : null;

		// Check if already checked in today
		if (lastCheckIn) {
			const lastCheckInDate = lastCheckIn.toDateString();
			const todayDate = now.toDateString();
			if (lastCheckInDate === todayDate) {
				return res.status(400).json({ error: "Already checked in today", streak: userInfo.checkInStreak });
			}
		}

		// Calculate streak
		let newStreak = 1;
		if (lastCheckIn) {
			const yesterday = new Date(now);
			yesterday.setDate(yesterday.getDate() - 1);
			const yesterdayDate = yesterday.toDateString();
			const lastCheckInDate = lastCheckIn.toDateString();

			if (lastCheckInDate === yesterdayDate) {
				// Consecutive day - increment streak
				newStreak = (userInfo.checkInStreak || 0) + 1;
			}
			// Otherwise streak resets to 1
		}

		// Calculate bonus stars for streaks
		let bonusStars = 0;
		const streakMilestones = [7, 14, 30, 60, 100];
		const streakBonuses = [50, 100, 200, 400, 1000];

		for (let i = 0; i < streakMilestones.length; i++) {
			if (newStreak === streakMilestones[i]) {
				bonusStars = streakBonuses[i];
				break;
			}
		}

		// Base check-in reward
		const baseStars = 5;
		const totalStars = baseStars + bonusStars;

		// Update user info
		await UserInformation.update(
			{
				lastCheckIn: now,
				checkInStreak: newStreak,
				rewards: (userInfo.rewards || 0) + totalStars,
			},
			{ where: { userId } }
		);

		return res.status(201).json({
			message: "Check-in successful",
			streak: newStreak,
			starsEarned: totalStars,
			baseStars,
			bonusStars,
			newTotal: (userInfo.rewards || 0) + totalStars,
		});
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

// Get user achievements
userInfoRouter.get("/achievements", async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;

		const achievements = await UserAchievements.findAll({
			where: { userId },
		});

		return res.status(200).json({
			achievements: achievements.map((a) => ({
				achievementId: a.achievementId,
				completedAt: a.completedAt,
			})),
		});
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

// Claim achievement
userInfoRouter.post("/achievement", async (req, res) => {
	const { token } = req.body.user;
	const { achievementId, stars } = req.body;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;

		// Check if achievement already claimed
		const existing = await UserAchievements.findOne({
			where: { userId, achievementId },
		});

		if (existing) {
			return res.status(400).json({ error: "Achievement already claimed" });
		}

		// Create achievement record
		await UserAchievements.create({
			userId,
			achievementId,
			completedAt: new Date(),
		});

		// Add stars to user
		const userInfo = await UserInformation.findOne({
			where: { userId },
		});

		if (userInfo) {
			await UserInformation.update(
				{ rewards: (userInfo.rewards || 0) + stars },
				{ where: { userId } }
			);
		}

		return res.status(201).json({
			message: "Achievement claimed",
			achievementId,
			starsEarned: stars,
		});
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

// Mark tip as read
userInfoRouter.post("/tip-read", async (req, res) => {
	const { token } = req.body.user;
	const { tipId, stars } = req.body;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;

		const userInfo = await UserInformation.findOne({
			where: { userId },
		});

		if (!userInfo) {
			return res.status(404).json({ error: "User information not found" });
		}

		// Parse existing tips read
		let tipsRead = [];
		try {
			tipsRead = JSON.parse(userInfo.tipsRead || "[]");
		} catch (e) {
			tipsRead = [];
		}

		// Check if already read
		if (tipsRead.includes(tipId)) {
			return res.status(400).json({ error: "Tip already read" });
		}

		// Add tip to list and award stars
		tipsRead.push(tipId);
		await UserInformation.update(
			{
				tipsRead: JSON.stringify(tipsRead),
				rewards: (userInfo.rewards || 0) + stars,
			},
			{ where: { userId } }
		);

		return res.status(201).json({
			message: "Tip marked as read",
			tipId,
			starsEarned: stars,
			totalTipsRead: tipsRead.length,
		});
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

// Get community stats (total trees planted by all users)
userInfoRouter.get("/community-stats", async (req, res) => {
	try {
		const result = await UserInformation.sum("treesPlanted");
		const totalTrees = result || 0;

		// Also get count of users who have planted trees
		const usersWithTrees = await UserInformation.count({
			where: {
				treesPlanted: {
					[require("sequelize").Op.gt]: 0,
				},
			},
		});

		return res.status(200).json({
			totalTreesPlanted: totalTrees,
			usersContributing: usersWithTrees,
			co2Offset: totalTrees * 48, // lbs CO2 per tree per year
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Failed to get community stats" });
	}
});

module.exports = userInfoRouter;
