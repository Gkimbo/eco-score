const express = require("express");
const request = require("supertest");

// Mock dependencies
jest.mock("../../models", () => ({
	User: {
		findOne: jest.fn(),
	},
}));

jest.mock("jsonwebtoken", () => ({
	sign: jest.fn().mockReturnValue("mock-token"),
	verify: jest.fn().mockReturnValue({ userId: 1 }),
}));

jest.mock("bcrypt", () => ({
	compare: jest.fn(),
}));

jest.mock("passport", () => ({
	authenticate: jest.fn((strategy, options) => (req, res, next) => {
		req.user = { id: 1 };
		next();
	}),
}));

jest.mock("../../middleware/authenticatedToken", () => (req, res, next) => {
	req.userId = 1;
	next();
});

const { User } = require("../../models");
const bcrypt = require("bcrypt");
const sessionRouter = require("../../routes/api/v1/userSessionsRouter");

// Create test app with session mock
const app = express();
app.use(express.json());
app.use((req, res, next) => {
	req.login = jest.fn((user, callback) => {
		if (typeof callback === "function") {
			callback(null);
		}
	});
	req.session = { destroy: jest.fn() };
	next();
});
app.use("/sessions", sessionRouter);

describe("User Sessions Router", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("POST /sessions", () => {
		it("should authenticate user with passport", async () => {
			const mockUser = {
				id: 1,
				username: "testuser",
				email: "test@example.com",
			};
			User.findOne.mockResolvedValue(mockUser);

			const response = await request(app).post("/sessions").send({
				username: "testuser",
				password: "password123",
			});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("id", 1);
		});

		it("should return 500 on database error", async () => {
			User.findOne.mockRejectedValue(new Error("Database error"));

			const response = await request(app).post("/sessions").send({
				username: "testuser",
				password: "password123",
			});

			expect(response.status).toBe(500);
		});
	});

	describe("POST /sessions/login", () => {
		it("should login user with correct credentials", async () => {
			const mockUser = {
				id: 1,
				username: "testuser",
				email: "test@example.com",
				password: "hashedPassword",
			};
			User.findOne.mockResolvedValue(mockUser);
			bcrypt.compare.mockResolvedValue(true);

			const response = await request(app).post("/sessions/login").send({
				username: "testuser",
				password: "password123",
			});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("user");
			expect(response.body).toHaveProperty("token");
		});

		it("should return 401 for invalid password", async () => {
			const mockUser = {
				id: 1,
				username: "testuser",
				password: "hashedPassword",
			};
			User.findOne.mockResolvedValue(mockUser);
			bcrypt.compare.mockResolvedValue(false);

			const response = await request(app).post("/sessions/login").send({
				username: "testuser",
				password: "wrongpassword",
			});

			expect(response.status).toBe(401);
			expect(response.body).toBe("Invalid password");
		});

		it("should return 404 for non-existent username", async () => {
			User.findOne.mockResolvedValue(null);

			const response = await request(app).post("/sessions/login").send({
				username: "nonexistent",
				password: "password123",
			});

			expect(response.status).toBe(404);
			expect(response.body).toBe("No Username");
		});
	});

	describe("GET /sessions/current", () => {
		it("should return current user info", async () => {
			const mockUser = {
				id: 1,
				username: "testuser",
				email: "test@example.com",
			};
			User.findOne.mockResolvedValue(mockUser);

			const response = await request(app)
				.get("/sessions/current")
				.set("Authorization", "Bearer mock-token");

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("user");
			expect(response.body).toHaveProperty("token");
		});

		it("should return 500 on error", async () => {
			User.findOne.mockRejectedValue(new Error("Database error"));

			const response = await request(app)
				.get("/sessions/current")
				.set("Authorization", "Bearer mock-token");

			expect(response.status).toBe(500);
		});
	});

	describe("POST /sessions/logout", () => {
		it("should logout successfully", async () => {
			const response = await request(app).post("/sessions/logout");

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("message", "Logout successful");
		});
	});
});
