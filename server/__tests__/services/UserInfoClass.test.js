const UserInfo = require("../../services/UserInfoClass");

// Mock the models
jest.mock("../../models", () => ({
	User: {
		findOne: jest.fn(),
	},
	UserCars: {
		create: jest.fn(),
		destroy: jest.fn(),
	},
	UserInformation: {
		create: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		destroy: jest.fn(),
	},
	UserHomes: {
		create: jest.fn(),
		destroy: jest.fn(),
	},
}));

const { UserCars, UserInformation, UserHomes } = require("../../models");

describe("UserInfoClass Service", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("addUserInfoToDB", () => {
		it("should create user info with correct data", async () => {
			const mockUserInfo = {
				id: 1,
				userId: 1,
				homeOwnership: "own",
				milesDriven: 10000,
			};
			UserInformation.create.mockResolvedValueOnce(mockUserInfo);

			const result = await UserInfo.addUserInfoToDB({
				userId: 1,
				homeOwnership: "own",
				milesDriven: 10000,
				milesDrivenUnit: "miles",
				commute: "car",
				transportation: "personal",
				daysCommute: 5,
				hasCar: true,
			});

			expect(UserInformation.create).toHaveBeenCalledWith(
				expect.objectContaining({
					userId: 1,
					homeOwnership: "own",
					milesDriven: 10000,
				})
			);
			expect(result).toEqual(mockUserInfo);
		});

		it("should throw error on database failure", async () => {
			UserInformation.create.mockRejectedValueOnce(new Error("DB Error"));

			await expect(
				UserInfo.addUserInfoToDB({
					userId: 1,
					homeOwnership: "rent",
				})
			).rejects.toThrow("DB Error");
		});
	});

	describe("addCarToDB", () => {
		it("should create car with correct data for gas car", async () => {
			UserCars.create.mockResolvedValueOnce({ id: 1 });

			await UserInfo.addCarToDB({
				userId: 1,
				make: "Toyota",
				model: "Camry",
				year: 2020,
				fuelType: "gas",
				carBatterySize: null,
				zipCode: "10001",
				tank: 15,
				mileage: 30000,
				mileageUnit: "miles",
			});

			expect(UserCars.create).toHaveBeenCalledWith(
				expect.objectContaining({
					userId: 1,
					make: "Toyota",
					model: "Camry",
					fuelType: "gas",
				})
			);
		});

		it("should set carBatterySize to null for non-electric cars", async () => {
			UserCars.create.mockResolvedValueOnce({ id: 1 });

			await UserInfo.addCarToDB({
				userId: 1,
				make: "Ford",
				model: "F150",
				year: 2021,
				fuelType: "gas",
				carBatterySize: 50,
				zipCode: "10001",
				tank: 26,
				mileage: 15000,
				mileageUnit: "miles",
			});

			expect(UserCars.create).toHaveBeenCalledWith(
				expect.objectContaining({
					carBatterySize: null,
				})
			);
		});

		it("should keep carBatterySize for electric cars", async () => {
			UserCars.create.mockResolvedValueOnce({ id: 1 });

			await UserInfo.addCarToDB({
				userId: 1,
				make: "Tesla",
				model: "Model 3",
				year: 2022,
				fuelType: "electricity",
				carBatterySize: 75,
				zipCode: "10001",
				tank: null,
				mileage: 20000,
				mileageUnit: "miles",
			});

			expect(UserCars.create).toHaveBeenCalledWith(
				expect.objectContaining({
					carBatterySize: 75,
					fuelType: "electricity",
				})
			);
		});

		it("should set default zipcode message for gas/diesel cars without zipcode", async () => {
			UserCars.create.mockResolvedValueOnce({ id: 1 });

			await UserInfo.addCarToDB({
				userId: 1,
				make: "Honda",
				model: "Civic",
				year: 2021,
				fuelType: "gas",
				carBatterySize: null,
				zipCode: null,
				tank: 12,
				mileage: 25000,
				mileageUnit: "miles",
			});

			expect(UserCars.create).toHaveBeenCalledWith(
				expect.objectContaining({
					zipcode: "Gas and Diesel cars don't need to charge",
				})
			);
		});
	});

	describe("addTreeToDb", () => {
		it("should increment trees planted for existing user", async () => {
			UserInformation.findOne.mockResolvedValueOnce({
				treesPlanted: 5,
				rewards: 1500,
			});
			UserInformation.update.mockResolvedValueOnce([1]);

			await UserInfo.addTreeToDb({ userId: 1 });

			expect(UserInformation.update).toHaveBeenCalledWith(
				{ treesPlanted: 6 },
				{ where: { userId: 1 } }
			);
		});

		it("should return message if user not found", async () => {
			UserInformation.findOne.mockResolvedValueOnce(null);

			const result = await UserInfo.addTreeToDb({ userId: 999 });
			expect(result).toBe("User with ID 999 not found");
		});
	});

	describe("addStarsToDb", () => {
		it("should add rewards to existing user", async () => {
			UserInformation.findOne.mockResolvedValueOnce({
				rewards: 100,
			});
			UserInformation.update.mockResolvedValueOnce([1]);

			await UserInfo.addStarsToDb({ userId: 1, rewards: 50 });

			expect(UserInformation.update).toHaveBeenCalledWith(
				{ rewards: 150 },
				{ where: { userId: 1 } }
			);
		});

		it("should return message if user not found", async () => {
			UserInformation.findOne.mockResolvedValueOnce(null);

			const result = await UserInfo.addStarsToDb({ userId: 999, rewards: 50 });
			expect(result).toBe("User with ID 999 not found");
		});
	});

	describe("removeStarsFromDb", () => {
		it("should deduct 1000 stars from user", async () => {
			UserInformation.findOne.mockResolvedValueOnce({
				rewards: 1500,
			});
			UserInformation.update.mockResolvedValueOnce([1]);

			await UserInfo.removeStarsFromDb({ userId: 1 });

			expect(UserInformation.update).toHaveBeenCalledWith(
				{ rewards: 500 },
				{ where: { userId: 1 } }
			);
		});

		it("should return message if user not found", async () => {
			UserInformation.findOne.mockResolvedValueOnce(null);

			const result = await UserInfo.removeStarsFromDb({ userId: 999 });
			expect(result).toBe("User with ID 999 not found");
		});
	});

	describe("addHomeToDB", () => {
		it("should create home with correct data", async () => {
			UserHomes.create.mockResolvedValueOnce({ id: 1 });

			await UserInfo.addHomeToDB({
				userId: 1,
				zipcode: "10001",
				yearBuilt: 2000,
				squareFeet: 1500,
				electricitySource: "grid",
				electricityUsage: 1000,
				gasUsage: 50,
				oilUsage: 0,
				gasUnit: "therms",
				oilUnit: "gallons",
				oilVolume: 0,
				recycling: true,
				compost: false,
				electricityUnit: "kwh",
				gas: true,
				oil: false,
				batteryBankSize: 0,
				batteryBackup: false,
			});

			expect(UserHomes.create).toHaveBeenCalledWith(
				expect.objectContaining({
					userId: 1,
					zipcode: "10001",
					squareFeet: 1500,
				})
			);
		});
	});

	describe("updateUserInfo", () => {
		it("should update user info for existing user", async () => {
			UserInformation.findOne.mockResolvedValueOnce({
				dataValues: { id: 5 },
			});
			UserInformation.update.mockResolvedValueOnce([1]);

			const result = await UserInfo.updateUserInfo({
				userId: 1,
				homeOwnership: "rent",
				milesDriven: 15000,
			});

			expect(UserInformation.update).toHaveBeenCalledWith(
				expect.objectContaining({
					userId: 1,
					homeOwnership: "rent",
				}),
				{ where: { id: 5 } }
			);
		});

		it("should throw error on database failure", async () => {
			UserInformation.findOne.mockRejectedValueOnce(new Error("DB Error"));

			await expect(
				UserInfo.updateUserInfo({ userId: 1 })
			).rejects.toThrow("DB Error");
		});
	});

	describe("deleteUserInfo", () => {
		it("should delete user info", async () => {
			UserInformation.destroy.mockResolvedValueOnce(1);

			const result = await UserInfo.deleteUserInfo(1);

			expect(UserInformation.destroy).toHaveBeenCalledWith({
				where: { userId: 1 },
			});
			expect(result).toBe(1);
		});

		it("should throw error on database failure", async () => {
			UserInformation.destroy.mockRejectedValueOnce(new Error("DB Error"));

			await expect(UserInfo.deleteUserInfo(1)).rejects.toThrow("DB Error");
		});
	});

	describe("deleteCarInfo", () => {
		it("should delete car info by id", async () => {
			UserCars.destroy.mockResolvedValueOnce(1);

			const result = await UserInfo.deleteCarInfo(5, 1);

			expect(UserCars.destroy).toHaveBeenCalledWith({
				where: { id: 5 },
			});
			expect(result).toBe(1);
		});

		it("should throw error on database failure", async () => {
			UserCars.destroy.mockRejectedValueOnce(new Error("DB Error"));

			await expect(UserInfo.deleteCarInfo(5, 1)).rejects.toThrow("DB Error");
		});
	});

	describe("deleteHomeInfo", () => {
		it("should delete home info by id", async () => {
			UserHomes.destroy.mockResolvedValueOnce(1);

			const result = await UserInfo.deleteHomeInfo(3);

			expect(UserHomes.destroy).toHaveBeenCalledWith({
				where: { id: 3 },
			});
			expect(result).toBe(1);
		});

		it("should throw error on database failure", async () => {
			UserHomes.destroy.mockRejectedValueOnce(new Error("DB Error"));

			await expect(UserInfo.deleteHomeInfo(3)).rejects.toThrow("DB Error");
		});
	});
});
