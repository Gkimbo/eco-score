const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Create in-memory database for testing
const sequelize = new Sequelize("sqlite::memory:", { logging: false });

// Import the model factory
const UserFactory = require("../../models/User");

describe("User Model", () => {
	let User;

	beforeAll(async () => {
		// Initialize the model
		User = UserFactory(sequelize, DataTypes);
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	beforeEach(async () => {
		await User.destroy({ where: {} });
	});

	describe("Model Definition", () => {
		it("should have correct attributes", () => {
			const attributes = User.rawAttributes;
			expect(attributes).toHaveProperty("username");
			expect(attributes).toHaveProperty("password");
			expect(attributes).toHaveProperty("email");
		});

		it("should require username", () => {
			expect(User.rawAttributes.username.allowNull).toBe(false);
		});

		it("should require password", () => {
			expect(User.rawAttributes.password.allowNull).toBe(false);
		});

		it("should require email", () => {
			expect(User.rawAttributes.email.allowNull).toBe(false);
		});

		it("should have unique username", () => {
			expect(User.rawAttributes.username.unique).toBe(true);
		});
	});

	describe("Password Hashing", () => {
		it("should hash password before creating user", async () => {
			const user = await User.create({
				username: "testuser",
				password: "plainpassword",
				email: "test@example.com",
			});

			expect(user.password).not.toBe("plainpassword");
			const isMatch = await bcrypt.compare("plainpassword", user.password);
			expect(isMatch).toBe(true);
		});

		it("should store different hash for same password", async () => {
			const user1 = await User.create({
				username: "user1",
				password: "samepassword",
				email: "user1@example.com",
			});

			const user2 = await User.create({
				username: "user2",
				password: "samepassword",
				email: "user2@example.com",
			});

			expect(user1.password).not.toBe(user2.password);
		});
	});

	describe("validPassword method", () => {
		it("should return true for correct password", async () => {
			const user = await User.create({
				username: "testuser",
				password: "correctpassword",
				email: "test@example.com",
			});

			const isValid = await user.validPassword("correctpassword");
			expect(isValid).toBe(true);
		});

		it("should return false for incorrect password", async () => {
			const user = await User.create({
				username: "testuser",
				password: "correctpassword",
				email: "test@example.com",
			});

			const isValid = await user.validPassword("wrongpassword");
			expect(isValid).toBe(false);
		});
	});

	describe("CRUD Operations", () => {
		it("should create a user", async () => {
			const user = await User.create({
				username: "newuser",
				password: "password123",
				email: "new@example.com",
			});

			expect(user.id).toBeDefined();
			expect(user.username).toBe("newuser");
			expect(user.email).toBe("new@example.com");
		});

		it("should find a user by username", async () => {
			await User.create({
				username: "findme",
				password: "password123",
				email: "find@example.com",
			});

			const found = await User.findOne({ where: { username: "findme" } });
			expect(found).not.toBeNull();
			expect(found.username).toBe("findme");
		});

		it("should update a user", async () => {
			const user = await User.create({
				username: "updateme",
				password: "password123",
				email: "update@example.com",
			});

			await user.update({ email: "newemail@example.com" });
			expect(user.email).toBe("newemail@example.com");
		});

		it("should delete a user", async () => {
			const user = await User.create({
				username: "deleteme",
				password: "password123",
				email: "delete@example.com",
			});

			await user.destroy();
			const found = await User.findOne({ where: { username: "deleteme" } });
			expect(found).toBeNull();
		});
	});

	describe("Associations", () => {
		it("should have associate function", () => {
			expect(typeof User.associate).toBe("function");
		});
	});
});
