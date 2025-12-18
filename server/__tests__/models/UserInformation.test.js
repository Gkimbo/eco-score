const { Sequelize, DataTypes } = require("sequelize");

// Create in-memory database for testing
const sequelize = new Sequelize("sqlite::memory:", { logging: false });

// Import the model factory
const UserInformationFactory = require("../../models/UserInformation");

describe("UserInformation Model", () => {
	let UserInformation;

	beforeAll(async () => {
		// Initialize the model
		UserInformation = UserInformationFactory(sequelize, DataTypes);
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	beforeEach(async () => {
		await UserInformation.destroy({ where: {} });
	});

	describe("Model Definition", () => {
		it("should have correct attributes", () => {
			const attributes = UserInformation.rawAttributes;
			expect(attributes).toHaveProperty("id");
			expect(attributes).toHaveProperty("userId");
			expect(attributes).toHaveProperty("homeOwnership");
			expect(attributes).toHaveProperty("milesDriven");
			expect(attributes).toHaveProperty("commute");
			expect(attributes).toHaveProperty("transportation");
			expect(attributes).toHaveProperty("daysCommute");
			expect(attributes).toHaveProperty("hasCar");
			expect(attributes).toHaveProperty("treesPlanted");
			expect(attributes).toHaveProperty("rewards");
		});

		it("should require userId", () => {
			expect(UserInformation.rawAttributes.userId.allowNull).toBe(false);
		});

		it("should require homeOwnership", () => {
			expect(UserInformation.rawAttributes.homeOwnership.allowNull).toBe(false);
		});

		it("should require hasCar", () => {
			expect(UserInformation.rawAttributes.hasCar.allowNull).toBe(false);
		});

		it("should have integer type for treesPlanted", () => {
			expect(UserInformation.rawAttributes.treesPlanted.type.key).toBe(
				"INTEGER"
			);
		});

		it("should have integer type for rewards", () => {
			expect(UserInformation.rawAttributes.rewards.type.key).toBe("INTEGER");
		});

		it("should have auto-incrementing id as primary key", () => {
			expect(UserInformation.rawAttributes.id.primaryKey).toBe(true);
			expect(UserInformation.rawAttributes.id.autoIncrement).toBe(true);
		});

		it("should have timestamps", () => {
			expect(UserInformation.rawAttributes).toHaveProperty("createdAt");
			expect(UserInformation.rawAttributes).toHaveProperty("updatedAt");
		});
	});

	describe("CRUD Operations", () => {
		it("should create user information entry", async () => {
			const info = await UserInformation.create({
				userId: 1,
				homeOwnership: "own",
				milesDriven: "10000",
				commute: "car",
				transportation: "personal",
				daysCommute: "5",
				hasCar: "true",
				treesPlanted: 0,
				rewards: 0,
			});

			expect(info.id).toBeDefined();
			expect(info.homeOwnership).toBe("own");
			expect(info.milesDriven).toBe("10000");
		});

		it("should find user information by userId", async () => {
			await UserInformation.create({
				userId: 5,
				homeOwnership: "rent",
				hasCar: "false",
			});

			const found = await UserInformation.findOne({ where: { userId: 5 } });
			expect(found).not.toBeNull();
			expect(found.homeOwnership).toBe("rent");
		});

		it("should update user information", async () => {
			const info = await UserInformation.create({
				userId: 1,
				homeOwnership: "rent",
				milesDriven: "5000",
				hasCar: "true",
			});

			await info.update({ homeOwnership: "own", milesDriven: "8000" });
			expect(info.homeOwnership).toBe("own");
			expect(info.milesDriven).toBe("8000");
		});

		it("should delete user information", async () => {
			const info = await UserInformation.create({
				userId: 1,
				homeOwnership: "own",
				hasCar: "false",
			});

			const infoId = info.id;
			await info.destroy();
			const found = await UserInformation.findByPk(infoId);
			expect(found).toBeNull();
		});
	});

	describe("Trees and Rewards", () => {
		it("should track trees planted", async () => {
			const info = await UserInformation.create({
				userId: 1,
				homeOwnership: "own",
				hasCar: "true",
				treesPlanted: 5,
				rewards: 0,
			});

			expect(info.treesPlanted).toBe(5);

			await info.update({ treesPlanted: 6 });
			expect(info.treesPlanted).toBe(6);
		});

		it("should track rewards/stars", async () => {
			const info = await UserInformation.create({
				userId: 1,
				homeOwnership: "own",
				hasCar: "true",
				treesPlanted: 0,
				rewards: 100,
			});

			expect(info.rewards).toBe(100);

			await info.update({ rewards: 150 });
			expect(info.rewards).toBe(150);
		});

		it("should allow deducting rewards", async () => {
			const info = await UserInformation.create({
				userId: 1,
				homeOwnership: "own",
				hasCar: "true",
				rewards: 1500,
			});

			await info.update({ rewards: info.rewards - 1000 });
			expect(info.rewards).toBe(500);
		});
	});

	describe("Commute Information", () => {
		it("should store commute details", async () => {
			const info = await UserInformation.create({
				userId: 1,
				homeOwnership: "own",
				hasCar: "true",
				commute: "15",
				daysCommute: "5",
				transportation: "car",
			});

			expect(info.commute).toBe("15");
			expect(info.daysCommute).toBe("5");
			expect(info.transportation).toBe("car");
		});

		it("should allow null commute for remote workers", async () => {
			const info = await UserInformation.create({
				userId: 1,
				homeOwnership: "own",
				hasCar: "false",
				commute: null,
				daysCommute: "0",
				transportation: null,
			});

			expect(info.commute).toBeNull();
			expect(info.transportation).toBeNull();
		});
	});

	describe("Associations", () => {
		it("should have associate function", () => {
			expect(typeof UserInformation.associate).toBe("function");
		});
	});
});
