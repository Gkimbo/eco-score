const { Sequelize, DataTypes } = require("sequelize");

// Create in-memory database for testing
const sequelize = new Sequelize("sqlite::memory:", { logging: false });

// Import the model factory
const UserCarsFactory = require("../../models/UserCars");

describe("UserCars Model", () => {
	let UserCars;

	beforeAll(async () => {
		// Initialize the model
		UserCars = UserCarsFactory(sequelize, DataTypes);
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	beforeEach(async () => {
		await UserCars.destroy({ where: {} });
	});

	describe("Model Definition", () => {
		it("should have correct attributes", () => {
			const attributes = UserCars.rawAttributes;
			expect(attributes).toHaveProperty("id");
			expect(attributes).toHaveProperty("userId");
			expect(attributes).toHaveProperty("make");
			expect(attributes).toHaveProperty("model");
			expect(attributes).toHaveProperty("year");
			expect(attributes).toHaveProperty("tank");
			expect(attributes).toHaveProperty("fuelType");
			expect(attributes).toHaveProperty("carBatterySize");
			expect(attributes).toHaveProperty("zipcode");
			expect(attributes).toHaveProperty("mileageUnit");
			expect(attributes).toHaveProperty("mileage");
		});

		it("should require userId", () => {
			expect(UserCars.rawAttributes.userId.allowNull).toBe(false);
		});

		it("should have auto-incrementing id as primary key", () => {
			expect(UserCars.rawAttributes.id.primaryKey).toBe(true);
			expect(UserCars.rawAttributes.id.autoIncrement).toBe(true);
		});

		it("should have timestamps", () => {
			expect(UserCars.rawAttributes).toHaveProperty("createdAt");
			expect(UserCars.rawAttributes).toHaveProperty("updatedAt");
		});
	});

	describe("CRUD Operations", () => {
		it("should create a car entry", async () => {
			const car = await UserCars.create({
				userId: 1,
				make: "Toyota",
				model: "Camry",
				year: "2020",
				tank: "15",
				fuelType: "gas",
				mileage: "30000",
				mileageUnit: "miles",
			});

			expect(car.id).toBeDefined();
			expect(car.make).toBe("Toyota");
			expect(car.model).toBe("Camry");
			expect(car.fuelType).toBe("gas");
		});

		it("should create an electric car entry", async () => {
			const car = await UserCars.create({
				userId: 1,
				make: "Tesla",
				model: "Model 3",
				year: "2022",
				fuelType: "electricity",
				carBatterySize: "75",
				zipcode: "10001",
				mileage: "20000",
				mileageUnit: "miles",
			});

			expect(car.fuelType).toBe("electricity");
			expect(car.carBatterySize).toBe("75");
		});

		it("should find car by userId", async () => {
			await UserCars.create({
				userId: 5,
				make: "Honda",
				model: "Civic",
				year: "2021",
				fuelType: "gas",
			});

			const found = await UserCars.findOne({ where: { userId: 5 } });
			expect(found).not.toBeNull();
			expect(found.make).toBe("Honda");
		});

		it("should update car info", async () => {
			const car = await UserCars.create({
				userId: 1,
				make: "Ford",
				model: "Mustang",
				year: "2019",
				mileage: "10000",
			});

			await car.update({ mileage: "15000" });
			expect(car.mileage).toBe("15000");
		});

		it("should delete car entry", async () => {
			const car = await UserCars.create({
				userId: 1,
				make: "Chevrolet",
				model: "Volt",
				year: "2018",
			});

			const carId = car.id;
			await car.destroy();
			const found = await UserCars.findByPk(carId);
			expect(found).toBeNull();
		});
	});

	describe("Multiple Cars per User", () => {
		it("should allow multiple cars for same userId", async () => {
			await UserCars.create({
				userId: 1,
				make: "Toyota",
				model: "Camry",
				year: "2020",
			});

			await UserCars.create({
				userId: 1,
				make: "Honda",
				model: "Accord",
				year: "2019",
			});

			const cars = await UserCars.findAll({ where: { userId: 1 } });
			expect(cars.length).toBe(2);
		});
	});

	describe("Associations", () => {
		it("should have associate function", () => {
			expect(typeof UserCars.associate).toBe("function");
		});
	});
});
