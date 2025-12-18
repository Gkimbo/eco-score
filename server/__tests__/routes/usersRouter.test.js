const express = require("express");
const request = require("supertest");

// Mock dependencies before requiring the router
jest.mock("../../models", () => ({
	User: {
		findOne: jest.fn(),
		create: jest.fn(),
	},
}));

jest.mock("jsonwebtoken", () => ({
	sign: jest.fn().mockReturnValue("mock-token"),
}));

const { User } = require("../../models");
const usersRouter = require("../../routes/api/v1/usersRouter");

// Create test app
const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("Users Router", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("POST /users", () => {
		it("should create a new user successfully", async () => {
			const mockUser = {
				id: 1,
				username: "testuser",
				email: "test@example.com",
				dataValues: {
					id: 1,
					username: "testuser",
					email: "test@example.com",
				},
			};

			User.findOne.mockResolvedValue(null);
			User.create.mockResolvedValue(mockUser);

			const response = await request(app).post("/users").send({
				username: "testuser",
				password: "password123",
				email: "test@example.com",
			});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("user");
			expect(response.body).toHaveProperty("token");
		});

		it("should return 409 if email already exists", async () => {
			User.findOne.mockResolvedValueOnce({ email: "test@example.com" });

			const response = await request(app).post("/users").send({
				username: "testuser",
				password: "password123",
				email: "test@example.com",
			});

			expect(response.status).toBe(409);
			expect(response.body).toBe("User already exists");
		});

		it("should return 410 if username already exists", async () => {
			User.findOne.mockResolvedValueOnce(null); // No email match
			User.findOne.mockResolvedValueOnce({ username: "testuser" }); // Username match

			const response = await request(app).post("/users").send({
				username: "testuser",
				password: "password123",
				email: "new@example.com",
			});

			expect(response.status).toBe(410);
			expect(response.body).toBe("Username already exists");
		});

		it("should return 500 on database error", async () => {
			User.findOne.mockRejectedValue(new Error("Database error"));

			const response = await request(app).post("/users").send({
				username: "testuser",
				password: "password123",
				email: "test@example.com",
			});

			expect(response.status).toBe(500);
			expect(response.body).toHaveProperty("error", "Failed to create user");
		});
	});
});
