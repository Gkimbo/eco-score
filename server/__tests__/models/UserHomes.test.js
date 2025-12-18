const { Sequelize, DataTypes } = require("sequelize");

// Create in-memory database for testing
const sequelize = new Sequelize("sqlite::memory:", { logging: false });

// Import the model factory
const UserHomesFactory = require("../../models/UserHomes");

describe("UserHomes Model", () => {
	let UserHomes;

	beforeAll(async () => {
		// Initialize the model
		UserHomes = UserHomesFactory(sequelize, DataTypes);
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	beforeEach(async () => {
		await UserHomes.destroy({ where: {} });
	});

	describe("Model Definition", () => {
		it("should have correct attributes", () => {
			const attributes = UserHomes.rawAttributes;
			expect(attributes).toHaveProperty("id");
			expect(attributes).toHaveProperty("userId");
			expect(attributes).toHaveProperty("zipcode");
			expect(attributes).toHaveProperty("squareFeet");
			expect(attributes).toHaveProperty("electricitySource");
			expect(attributes).toHaveProperty("electricityUsage");
			expect(attributes).toHaveProperty("electricityUnit");
			expect(attributes).toHaveProperty("recycling");
			expect(attributes).toHaveProperty("compost");
			expect(attributes).toHaveProperty("yearBuilt");
			expect(attributes).toHaveProperty("gasUnit");
			expect(attributes).toHaveProperty("gasUsage");
			expect(attributes).toHaveProperty("oilUsage");
			expect(attributes).toHaveProperty("oilUnit");
			expect(attributes).toHaveProperty("oilVolume");
			expect(attributes).toHaveProperty("oil");
			expect(attributes).toHaveProperty("gas");
			expect(attributes).toHaveProperty("batteryBackup");
			expect(attributes).toHaveProperty("batteryBankSize");
		});

		it("should require userId", () => {
			expect(UserHomes.rawAttributes.userId.allowNull).toBe(false);
		});

		it("should require recycling", () => {
			expect(UserHomes.rawAttributes.recycling.allowNull).toBe(false);
		});

		it("should require compost", () => {
			expect(UserHomes.rawAttributes.compost.allowNull).toBe(false);
		});

		it("should have auto-incrementing id as primary key", () => {
			expect(UserHomes.rawAttributes.id.primaryKey).toBe(true);
			expect(UserHomes.rawAttributes.id.autoIncrement).toBe(true);
		});

		it("should have timestamps", () => {
			expect(UserHomes.rawAttributes).toHaveProperty("createdAt");
			expect(UserHomes.rawAttributes).toHaveProperty("updatedAt");
		});
	});

	describe("CRUD Operations", () => {
		it("should create a home entry", async () => {
			const home = await UserHomes.create({
				userId: 1,
				zipcode: "10001",
				squareFeet: "1500",
				electricitySource: "grid",
				electricityUsage: "1000",
				electricityUnit: "kwh",
				recycling: "true",
				compost: "false",
				yearBuilt: "2000",
				gas: "true",
				gasUsage: "50",
				gasUnit: "therms",
				oil: "false",
			});

			expect(home.id).toBeDefined();
			expect(home.zipcode).toBe("10001");
			expect(home.squareFeet).toBe("1500");
			expect(home.electricitySource).toBe("grid");
		});

		it("should create a home with solar panels", async () => {
			const home = await UserHomes.create({
				userId: 1,
				zipcode: "90210",
				squareFeet: "2000",
				electricitySource: "solar",
				electricityUsage: "0",
				recycling: "true",
				compost: "true",
				batteryBackup: "true",
				batteryBankSize: "20",
			});

			expect(home.electricitySource).toBe("solar");
			expect(home.batteryBackup).toBe("true");
			expect(home.batteryBankSize).toBe("20");
		});

		it("should find home by userId", async () => {
			await UserHomes.create({
				userId: 5,
				zipcode: "12345",
				recycling: "true",
				compost: "false",
			});

			const found = await UserHomes.findOne({ where: { userId: 5 } });
			expect(found).not.toBeNull();
			expect(found.zipcode).toBe("12345");
		});

		it("should update home info", async () => {
			const home = await UserHomes.create({
				userId: 1,
				zipcode: "10001",
				electricityUsage: "1000",
				recycling: "false",
				compost: "false",
			});

			await home.update({ recycling: "true", electricityUsage: "800" });
			expect(home.recycling).toBe("true");
			expect(home.electricityUsage).toBe("800");
		});

		it("should delete home entry", async () => {
			const home = await UserHomes.create({
				userId: 1,
				zipcode: "99999",
				recycling: "true",
				compost: "true",
			});

			const homeId = home.id;
			await home.destroy();
			const found = await UserHomes.findByPk(homeId);
			expect(found).toBeNull();
		});
	});

	describe("Multiple Homes per User", () => {
		it("should allow multiple homes for same userId", async () => {
			await UserHomes.create({
				userId: 1,
				zipcode: "10001",
				recycling: "true",
				compost: "false",
			});

			await UserHomes.create({
				userId: 1,
				zipcode: "90210",
				recycling: "true",
				compost: "true",
			});

			const homes = await UserHomes.findAll({ where: { userId: 1 } });
			expect(homes.length).toBe(2);
		});
	});

	describe("Associations", () => {
		it("should have associate function", () => {
			expect(typeof UserHomes.associate).toBe("function");
		});
	});
});
