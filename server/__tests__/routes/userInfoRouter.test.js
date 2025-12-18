const express = require("express");
const request = require("supertest");

// Mock dependencies
jest.mock("../../models", () => ({
	User: {
		findOne: jest.fn(),
	},
	UserInformation: {
		findOne: jest.fn(),
		update: jest.fn(),
		sum: jest.fn(),
		count: jest.fn(),
	},
	UserCars: {},
	UserHomes: {},
	UserAchievements: {
		findOne: jest.fn(),
		create: jest.fn(),
		findAll: jest.fn(),
	},
}));

jest.mock("jsonwebtoken", () => ({
	verify: jest.fn().mockReturnValue({ userId: 1 }),
}));

jest.mock("../../services/UserInfoClass", () => ({
	addUserInfoToDB: jest.fn(),
	addCarToDB: jest.fn(),
	addTreeToDb: jest.fn(),
	addStarsToDb: jest.fn(),
	addHomeToDB: jest.fn(),
	deleteCarInfo: jest.fn(),
	deleteHomeInfo: jest.fn(),
	updateUserInfo: jest.fn(),
}));

jest.mock("../../services/CarClass", () => ({
	checkCarExists: jest.fn(),
	takeInCars: jest.fn(),
}));

jest.mock("../../services/HomeClass", () => ({
	takeInHomes: jest.fn(),
}));

jest.mock("../../services/getLocationCarbonIntensity", () => ({
	checkZipcodeExists: jest.fn(),
}));

jest.mock("../../serializers/userSerializer", () => ({
	serializeOne: jest.fn().mockReturnValue({
		id: 1,
		username: "testuser",
		cars: [],
		homes: [],
	}),
}));

const { User, UserInformation, UserAchievements } = require("../../models");
const UserInfo = require("../../services/UserInfoClass");
const CarCalculation = require("../../services/CarClass");
const getCarbonIntensity = require("../../services/getLocationCarbonIntensity");
const userInfoRouter = require("../../routes/api/v1/userInfoRouter");

// Create test app
const app = express();
app.use(express.json());
app.use("/user-info", userInfoRouter);

describe("User Info Router", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("GET /user-info", () => {
		it("should return user info with valid token", async () => {
			const mockUser = {
				dataValues: {
					id: 1,
					username: "testuser",
					userCars: [],
					userInformation: [],
					userHomes: [],
				},
			};
			User.findOne.mockResolvedValue(mockUser);

			const response = await request(app)
				.get("/user-info")
				.set("Authorization", "Bearer valid-token");

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("user");
		});

		it("should return 401 for invalid token", async () => {
			const jwt = require("jsonwebtoken");
			jwt.verify.mockImplementationOnce(() => {
				throw new Error("Invalid token");
			});

			const response = await request(app)
				.get("/user-info")
				.set("Authorization", "Bearer invalid-token");

			expect(response.status).toBe(401);
		});
	});

	describe("POST /user-info/basic", () => {
		it("should add basic user info", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserInfo.addUserInfoToDB.mockResolvedValue({ id: 1 });

			const response = await request(app)
				.post("/user-info/basic")
				.send({
					user: { token: "valid-token" },
					homeOwnership: "own",
					milesDriven: 10000,
					milesDrivenUnit: "miles",
					commute: "car",
					transportation: "personal",
					daysCommute: 5,
					hasCar: true,
				});

			expect(response.status).toBe(201);
			expect(UserInfo.addUserInfoToDB).toHaveBeenCalled();
		});

		it("should return 401 for invalid token", async () => {
			const jwt = require("jsonwebtoken");
			jwt.verify.mockImplementationOnce(() => {
				throw new Error("Invalid token");
			});

			const response = await request(app)
				.post("/user-info/basic")
				.send({
					user: { token: "invalid-token" },
					homeOwnership: "own",
				});

			expect(response.status).toBe(401);
		});
	});

	describe("POST /user-info/car", () => {
		it("should add car info for valid gas car", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			CarCalculation.checkCarExists.mockResolvedValue([
				{ fuel_type: "gas" },
			]);
			UserInfo.addCarToDB.mockResolvedValue({ id: 1 });

			const response = await request(app)
				.post("/user-info/car")
				.send({
					user: { token: "valid-token" },
					car: {
						make: "Toyota",
						model: "Camry",
						year: 2020,
						fuelType: "gas",
						tank: 15,
						mileage: 30000,
						mileageUnit: "miles",
					},
				});

			expect(response.status).toBe(201);
			expect(UserInfo.addCarToDB).toHaveBeenCalled();
		});

		it("should add electric car with valid zipcode", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			CarCalculation.checkCarExists.mockResolvedValue([
				{ fuel_type: "electricity" },
			]);
			getCarbonIntensity.checkZipcodeExists.mockResolvedValue(true);
			UserInfo.addCarToDB.mockResolvedValue({ id: 1 });

			const response = await request(app)
				.post("/user-info/car")
				.send({
					user: { token: "valid-token" },
					car: {
						make: "Tesla",
						model: "Model 3",
						year: 2022,
						fuelType: "electricity",
						carBatterySize: 75,
						zipCode: "10001",
						mileage: 20000,
						mileageUnit: "miles",
					},
				});

			expect(response.status).toBe(201);
		});

		it("should return 400 if car not found", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			CarCalculation.checkCarExists.mockResolvedValue([]);

			const response = await request(app)
				.post("/user-info/car")
				.send({
					user: { token: "valid-token" },
					car: {
						make: "Unknown",
						model: "Car",
						year: 2020,
						fuelType: "gas",
					},
				});

			expect(response.status).toBe(400);
			expect(response.body).toBe("No car found");
		});

		it("should return 400 for electric car with invalid zipcode", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			CarCalculation.checkCarExists.mockResolvedValue([
				{ fuel_type: "electricity" },
			]);
			getCarbonIntensity.checkZipcodeExists.mockResolvedValue(false);

			const response = await request(app)
				.post("/user-info/car")
				.send({
					user: { token: "valid-token" },
					car: {
						make: "Tesla",
						model: "Model 3",
						year: 2022,
						fuelType: "electricity",
						carBatterySize: 75,
						zipCode: "00000",
						mileage: 20000,
						mileageUnit: "miles",
					},
				});

			expect(response.status).toBe(400);
			expect(response.body).toBe("Cannot find zipcode");
		});
	});

	describe("POST /user-info/tree", () => {
		it("should add tree for valid user", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserInfo.addTreeToDb.mockResolvedValue(undefined);

			const response = await request(app)
				.post("/user-info/tree")
				.send({
					user: { token: "valid-token" },
				});

			expect(response.status).toBe(201);
			expect(response.body).toBe("Tree has been planted");
		});
	});

	describe("POST /user-info/stars", () => {
		it("should add stars for valid user", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserInfo.addStarsToDb.mockResolvedValue(undefined);

			const response = await request(app)
				.post("/user-info/stars")
				.send({
					user: { token: "valid-token" },
					rewards: 100,
				});

			expect(response.status).toBe(201);
			expect(response.body).toBe("Reward has been added to DB");
		});
	});

	describe("DELETE /user-info/car", () => {
		it("should delete car", async () => {
			UserInfo.deleteCarInfo.mockResolvedValue(1);

			const response = await request(app)
				.delete("/user-info/car")
				.send({ id: 1 });

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("message", "car deleted");
		});
	});

	describe("POST /user-info/home", () => {
		it("should add home with valid zipcode", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			getCarbonIntensity.checkZipcodeExists.mockResolvedValue(true);
			UserInfo.addHomeToDB.mockResolvedValue({ id: 1 });

			const response = await request(app)
				.post("/user-info/home")
				.send({
					user: { token: "valid-token" },
					home: {
						zipcode: "10001",
						yearBuilt: 2000,
						squareFeet: 1500,
						electricitySource: "grid",
						electricityUsage: 1000,
						gasUsage: 50,
						gas: true,
						oil: false,
					},
				});

			expect(response.status).toBe(201);
		});

		it("should return 400 for invalid zipcode", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			getCarbonIntensity.checkZipcodeExists.mockResolvedValue(false);

			const response = await request(app)
				.post("/user-info/home")
				.send({
					user: { token: "valid-token" },
					home: {
						zipcode: "00000",
						yearBuilt: 2000,
						squareFeet: 1500,
					},
				});

			expect(response.status).toBe(400);
			expect(response.body).toBe("Cannot find zipcode");
		});
	});

	describe("DELETE /user-info/home", () => {
		it("should delete home", async () => {
			UserInfo.deleteHomeInfo.mockResolvedValue(1);

			const response = await request(app)
				.delete("/user-info/home")
				.send({ id: 1 });

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("message", "home deleted");
		});
	});

	describe("PATCH /user-info/basic", () => {
		it("should update user info", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserInfo.updateUserInfo.mockResolvedValue([1]);

			const response = await request(app)
				.patch("/user-info/basic")
				.send({
					data: {
						user: { token: "valid-token" },
						homeOwnership: "rent",
						milesDriven: 15000,
					},
				});

			expect(response.status).toBe(201);
			expect(UserInfo.updateUserInfo).toHaveBeenCalled();
		});
	});

	// ============ REWARDS SYSTEM TESTS ============

	describe("POST /user-info/checkin", () => {
		it("should process first daily check-in", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserInformation.findOne.mockResolvedValue({
				id: 1,
				userId: 1,
				lastCheckIn: null,
				checkInStreak: 0,
				rewards: 100,
			});
			UserInformation.update.mockResolvedValue([1]);
			UserInfo.addStarsToDb.mockResolvedValue();

			const response = await request(app)
				.post("/user-info/checkin")
				.send({
					user: { token: "valid-token" },
				});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("streak", 1);
			expect(response.body).toHaveProperty("baseStars", 5);
			expect(response.body).toHaveProperty("starsEarned");
		});

		it("should continue streak for consecutive days", async () => {
			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);

			User.findOne.mockResolvedValue({ id: 1 });
			UserInformation.findOne.mockResolvedValue({
				id: 1,
				userId: 1,
				lastCheckIn: yesterday.toISOString(),
				checkInStreak: 5,
				rewards: 100,
			});
			UserInformation.update.mockResolvedValue([1]);
			UserInfo.addStarsToDb.mockResolvedValue();

			const response = await request(app)
				.post("/user-info/checkin")
				.send({
					user: { token: "valid-token" },
				});

			expect(response.status).toBe(201);
			expect(response.body.streak).toBe(6);
		});

		it("should reset streak if more than 1 day passed", async () => {
			const twoDaysAgo = new Date();
			twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

			User.findOne.mockResolvedValue({ id: 1 });
			UserInformation.findOne.mockResolvedValue({
				id: 1,
				userId: 1,
				lastCheckIn: twoDaysAgo.toISOString(),
				checkInStreak: 10,
				rewards: 100,
			});
			UserInformation.update.mockResolvedValue([1]);
			UserInfo.addStarsToDb.mockResolvedValue();

			const response = await request(app)
				.post("/user-info/checkin")
				.send({
					user: { token: "valid-token" },
				});

			expect(response.status).toBe(201);
			expect(response.body.streak).toBe(1);
		});

		it("should return error if already checked in today", async () => {
			const today = new Date();

			User.findOne.mockResolvedValue({ id: 1 });
			UserInformation.findOne.mockResolvedValue({
				id: 1,
				userId: 1,
				lastCheckIn: today.toISOString(),
				checkInStreak: 5,
				rewards: 100,
			});

			const response = await request(app)
				.post("/user-info/checkin")
				.send({
					user: { token: "valid-token" },
				});

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error", "Already checked in today");
		});

		it("should award bonus stars at 7-day streak", async () => {
			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);

			User.findOne.mockResolvedValue({ id: 1 });
			UserInformation.findOne.mockResolvedValue({
				id: 1,
				userId: 1,
				lastCheckIn: yesterday.toISOString(),
				checkInStreak: 6,
				rewards: 100,
			});
			UserInformation.update.mockResolvedValue([1]);
			UserInfo.addStarsToDb.mockResolvedValue();

			const response = await request(app)
				.post("/user-info/checkin")
				.send({
					user: { token: "valid-token" },
				});

			expect(response.status).toBe(201);
			expect(response.body.streak).toBe(7);
			expect(response.body.bonusStars).toBe(50);
		});
	});

	describe("GET /user-info/achievements", () => {
		it("should return user achievements", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserAchievements.findAll.mockResolvedValue([
				{
					dataValues: {
						achievementId: "first_login",
						completedAt: "2024-01-01",
					},
				},
				{
					dataValues: {
						achievementId: "complete_profile",
						completedAt: "2024-01-02",
					},
				},
			]);

			const response = await request(app)
				.get("/user-info/achievements")
				.set("Authorization", "Bearer valid-token");

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("achievements");
			expect(response.body.achievements).toHaveLength(2);
		});

		it("should return empty array if no achievements", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserAchievements.findAll.mockResolvedValue([]);

			const response = await request(app)
				.get("/user-info/achievements")
				.set("Authorization", "Bearer valid-token");

			expect(response.status).toBe(200);
			expect(response.body.achievements).toHaveLength(0);
		});
	});

	describe("POST /user-info/achievement", () => {
		it("should claim achievement and award stars", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserAchievements.findOne.mockResolvedValue(null);
			UserAchievements.create.mockResolvedValue({ id: 1 });
			UserInfo.addStarsToDb.mockResolvedValue();

			const response = await request(app)
				.post("/user-info/achievement")
				.send({
					user: { token: "valid-token" },
					achievementId: "first_login",
					stars: 10,
				});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("message", "Achievement claimed");
			expect(response.body).toHaveProperty("achievementId", "first_login");
			expect(response.body).toHaveProperty("starsEarned", 10);
		});

		it("should prevent double claiming achievement", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserAchievements.findOne.mockResolvedValue({
				id: 1,
				achievementId: "first_login",
			});

			const response = await request(app)
				.post("/user-info/achievement")
				.send({
					user: { token: "valid-token" },
					achievementId: "first_login",
					stars: 10,
				});

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error", "Achievement already claimed");
		});
	});

	describe("POST /user-info/tip-read", () => {
		it("should mark tip as read and award stars", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserInformation.findOne.mockResolvedValue({
				id: 1,
				userId: 1,
				tipsRead: "[]",
				rewards: 100,
			});
			UserInformation.update.mockResolvedValue([1]);
			UserInfo.addStarsToDb.mockResolvedValue();

			const response = await request(app)
				.post("/user-info/tip-read")
				.send({
					user: { token: "valid-token" },
					tipId: "transport_1",
					stars: 2,
				});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("message", "Tip marked as read");
			expect(response.body).toHaveProperty("tipId", "transport_1");
			expect(response.body).toHaveProperty("starsEarned", 2);
		});

		it("should prevent double rewarding for same tip", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserInformation.findOne.mockResolvedValue({
				id: 1,
				userId: 1,
				tipsRead: '["transport_1"]',
				rewards: 100,
			});

			const response = await request(app)
				.post("/user-info/tip-read")
				.send({
					user: { token: "valid-token" },
					tipId: "transport_1",
					stars: 2,
				});

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error", "Tip already read");
		});

		it("should add to existing tipsRead array", async () => {
			User.findOne.mockResolvedValue({ id: 1 });
			UserInformation.findOne.mockResolvedValue({
				id: 1,
				userId: 1,
				tipsRead: '["transport_1"]',
				rewards: 100,
			});
			UserInformation.update.mockResolvedValue([1]);
			UserInfo.addStarsToDb.mockResolvedValue();

			const response = await request(app)
				.post("/user-info/tip-read")
				.send({
					user: { token: "valid-token" },
					tipId: "transport_2",
					stars: 2,
				});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("totalTipsRead", 2);
		});
	});

	describe("GET /user-info/community-stats", () => {
		it("should return community stats with total trees planted", async () => {
			UserInformation.sum.mockResolvedValue(1234);
			UserInformation.count.mockResolvedValue(56);

			const response = await request(app).get("/user-info/community-stats");

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("totalTreesPlanted", 1234);
			expect(response.body).toHaveProperty("usersContributing", 56);
			expect(response.body).toHaveProperty("co2Offset", 1234 * 48);
		});

		it("should return 0 when no trees planted", async () => {
			UserInformation.sum.mockResolvedValue(null);
			UserInformation.count.mockResolvedValue(0);

			const response = await request(app).get("/user-info/community-stats");

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("totalTreesPlanted", 0);
			expect(response.body).toHaveProperty("usersContributing", 0);
			expect(response.body).toHaveProperty("co2Offset", 0);
		});

		it("should calculate CO2 offset correctly (48 lbs per tree)", async () => {
			UserInformation.sum.mockResolvedValue(100);
			UserInformation.count.mockResolvedValue(10);

			const response = await request(app).get("/user-info/community-stats");

			expect(response.status).toBe(200);
			expect(response.body.co2Offset).toBe(4800); // 100 * 48
		});

		it("should handle database errors gracefully", async () => {
			UserInformation.sum.mockRejectedValue(new Error("Database error"));

			const response = await request(app).get("/user-info/community-stats");

			expect(response.status).toBe(500);
			expect(response.body).toHaveProperty("error", "Failed to get community stats");
		});
	});
});
