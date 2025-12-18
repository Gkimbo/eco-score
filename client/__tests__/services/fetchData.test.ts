import FetchData from "../../services/fetchData";

// Mock the config
jest.mock("../../services/config", () => ({
	API_URL: "http://localhost:3000",
}));

// Mock global fetch
global.fetch = jest.fn();

describe("FetchData", () => {
	const mockToken = "test-token-123";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("dailyCheckIn", () => {
		it("should call the checkin endpoint with correct data", async () => {
			const mockResponse = {
				message: "Check-in successful",
				starsEarned: 5,
				streak: 3,
				baseStars: 5,
				bonusStars: 0,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.dailyCheckIn(mockToken);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/v1/user-info/checkin",
				{
					method: "POST",
					body: JSON.stringify({ user: { token: mockToken } }),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			expect(result).toEqual(mockResponse);
		});

		it("should return response data even when not ok", async () => {
			const mockResponse = {
				error: "Already checked in today",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				json: async () => mockResponse,
			});

			const result = await FetchData.dailyCheckIn(mockToken);

			expect(result).toEqual(mockResponse);
		});

		it("should return error object on fetch failure", async () => {
			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error("Network error")
			);

			const result = await FetchData.dailyCheckIn(mockToken);

			expect(result).toEqual({ error: "Failed to check in" });
		});

		it("should handle streak bonus response", async () => {
			const mockResponse = {
				message: "Check-in successful",
				starsEarned: 55,
				streak: 7,
				baseStars: 5,
				bonusStars: 50,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.dailyCheckIn(mockToken);

			expect(result.starsEarned).toBe(55);
			expect(result.bonusStars).toBe(50);
			expect(result.streak).toBe(7);
		});
	});

	describe("getAchievements", () => {
		it("should call achievements endpoint with auth header", async () => {
			const mockResponse = {
				achievements: [
					{ id: "first_login", completedAt: "2024-01-01" },
					{ id: "profile_complete", completedAt: "2024-01-02" },
				],
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.getAchievements(mockToken);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/v1/user-info/achievements",
				{
					headers: {
						Authorization: `Bearer ${mockToken}`,
					},
				}
			);
			expect(result).toEqual(mockResponse);
		});

		it("should return empty achievements array on error", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			const result = await FetchData.getAchievements(mockToken);

			expect(result).toEqual({ achievements: [] });
		});

		it("should return empty achievements array on fetch failure", async () => {
			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error("Network error")
			);

			const result = await FetchData.getAchievements(mockToken);

			expect(result).toEqual({ achievements: [] });
		});
	});

	describe("claimAchievement", () => {
		it("should call achievement endpoint with correct data", async () => {
			const achievementId = "first_login";
			const stars = 10;
			const mockResponse = {
				message: "Achievement claimed",
				achievementId,
				starsEarned: stars,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.claimAchievement(
				mockToken,
				achievementId,
				stars
			);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/v1/user-info/achievement",
				{
					method: "POST",
					body: JSON.stringify({
						user: { token: mockToken },
						achievementId,
						stars,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			expect(result).toEqual(mockResponse);
		});

		it("should handle already claimed achievement", async () => {
			const mockResponse = {
				error: "Achievement already claimed",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				json: async () => mockResponse,
			});

			const result = await FetchData.claimAchievement(
				mockToken,
				"first_login",
				10
			);

			expect(result).toEqual(mockResponse);
		});

		it("should return error on fetch failure", async () => {
			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error("Network error")
			);

			const result = await FetchData.claimAchievement(
				mockToken,
				"first_login",
				10
			);

			expect(result).toEqual({ error: "Failed to claim achievement" });
		});

		it("should send correct stars value for different achievements", async () => {
			const testCases = [
				{ id: "first_login", stars: 10 },
				{ id: "profile_complete", stars: 100 },
				{ id: "electric_vehicle", stars: 100 },
				{ id: "tree_5", stars: 100 },
			];

			for (const testCase of testCases) {
				(global.fetch as jest.Mock).mockResolvedValueOnce({
					ok: true,
					json: async () => ({
						message: "Achievement claimed",
						achievementId: testCase.id,
						starsEarned: testCase.stars,
					}),
				});

				await FetchData.claimAchievement(mockToken, testCase.id, testCase.stars);

				expect(global.fetch).toHaveBeenLastCalledWith(
					expect.any(String),
					expect.objectContaining({
						body: expect.stringContaining(`"stars":${testCase.stars}`),
					})
				);
			}
		});
	});

	describe("markTipRead", () => {
		it("should call tip-read endpoint with correct data", async () => {
			const tipId = "transport_1";
			const stars = 2;
			const mockResponse = {
				message: "Tip marked as read",
				tipId,
				starsEarned: stars,
				tipsRead: [tipId],
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.markTipRead(mockToken, tipId, stars);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/v1/user-info/tip-read",
				{
					method: "POST",
					body: JSON.stringify({
						user: { token: mockToken },
						tipId,
						stars,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			expect(result).toEqual(mockResponse);
		});

		it("should handle already read tip", async () => {
			const mockResponse = {
				error: "Tip already read",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				json: async () => mockResponse,
			});

			const result = await FetchData.markTipRead(mockToken, "transport_1", 2);

			expect(result).toEqual(mockResponse);
		});

		it("should return error on fetch failure", async () => {
			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error("Network error")
			);

			const result = await FetchData.markTipRead(mockToken, "transport_1", 2);

			expect(result).toEqual({ error: "Failed to mark tip as read" });
		});

		it("should return updated tipsRead array", async () => {
			const mockResponse = {
				message: "Tip marked as read",
				tipId: "transport_2",
				starsEarned: 2,
				tipsRead: ["transport_1", "transport_2"],
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.markTipRead(mockToken, "transport_2", 2);

			expect(result.tipsRead).toContain("transport_1");
			expect(result.tipsRead).toContain("transport_2");
		});
	});

	describe("addReward", () => {
		it("should call stars endpoint with correct data", async () => {
			const starsData = {
				user: { token: mockToken },
				rewards: 10,
			};
			const mockResponse = {
				message: "Stars added",
				rewards: 510,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.addReward(starsData);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/v1/user-info/stars",
				{
					method: "post",
					body: JSON.stringify(starsData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			expect(result).toEqual(mockResponse);
		});

		it("should handle unauthorized response", async () => {
			const starsData = {
				user: { token: "invalid-token" },
				rewards: 10,
			};
			const mockResponse = {
				error: "Unauthorized",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 401,
				json: async () => mockResponse,
			});

			const result = await FetchData.addReward(starsData);

			expect(result).toEqual(mockResponse);
		});

		it("should throw error on other non-ok responses", async () => {
			const starsData = {
				user: { token: mockToken },
				rewards: 10,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 500,
				statusText: "Internal Server Error",
			});

			const result = await FetchData.addReward(starsData);

			expect(result).toBeInstanceOf(Error);
		});

		it("should return error on fetch failure", async () => {
			const starsData = {
				user: { token: mockToken },
				rewards: 10,
			};

			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error("Network error")
			);

			const result = await FetchData.addReward(starsData);

			expect(result).toBeInstanceOf(Error);
		});
	});

	describe("addTrees", () => {
		it("should call tree endpoint with correct data", async () => {
			const treeData = {
				user: { token: mockToken },
			};
			const mockResponse = {
				message: "Tree planted",
				treesPlanted: 4,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.addTrees(treeData);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/v1/user-info/tree",
				{
					method: "post",
					body: JSON.stringify(treeData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			expect(result).toEqual(mockResponse);
		});

		it("should handle unauthorized response", async () => {
			const treeData = {
				user: { token: "invalid-token" },
			};
			const mockResponse = {
				error: "Unauthorized",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 401,
				json: async () => mockResponse,
			});

			const result = await FetchData.addTrees(treeData);

			expect(result).toEqual(mockResponse);
		});

		it("should handle insufficient stars response", async () => {
			const treeData = {
				user: { token: mockToken },
			};
			const mockResponse = {
				error: "Insufficient stars",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 401,
				json: async () => mockResponse,
			});

			const result = await FetchData.addTrees(treeData);

			expect(result).toEqual(mockResponse);
		});

		it("should throw error on other non-ok responses", async () => {
			const treeData = {
				user: { token: mockToken },
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 500,
				statusText: "Internal Server Error",
			});

			const result = await FetchData.addTrees(treeData);

			expect(result).toBeInstanceOf(Error);
		});
	});

	describe("login", () => {
		it("should call login endpoint with correct data", async () => {
			const loginData = {
				userName: "testuser",
				password: "password123",
			};
			const mockResponse = {
				token: "jwt-token",
				user: { id: 1, username: "testuser" },
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.login(loginData);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/v1/user-sessions/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: loginData.userName,
						password: loginData.password,
					}),
				}
			);
			expect(result).toEqual(mockResponse);
		});

		it("should return error for invalid password (401)", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 401,
			});

			const result = await FetchData.login({
				userName: "testuser",
				password: "wrongpassword",
			});

			expect(result).toEqual({ error: "Invalid password" });
		});

		it("should return error for user not found (404)", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 404,
			});

			const result = await FetchData.login({
				userName: "nonexistent",
				password: "password",
			});

			expect(result).toEqual({ error: "User not found. Please sign up." });
		});

		it("should return generic error for other failures", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 500,
			});

			const result = await FetchData.login({
				userName: "testuser",
				password: "password",
			});

			expect(result).toEqual({ error: "Login failed. Please try again." });
		});

		it("should return connection error on fetch failure", async () => {
			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error("Network error")
			);

			const result = await FetchData.login({
				userName: "testuser",
				password: "password",
			});

			expect(result).toEqual({
				error: "Connection error. Is the server running?",
			});
		});
	});

	describe("makeNewUser", () => {
		it("should call users endpoint with correct data", async () => {
			const userData = {
				userName: "newuser",
				password: "password123",
				email: "newuser@example.com",
			};
			const mockResponse = {
				token: "jwt-token",
				user: { id: 1, username: "newuser" },
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.makeNewUser(userData);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/v1/users",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: userData.userName,
						password: userData.password,
						email: userData.email,
					}),
				}
			);
			expect(result).toEqual(mockResponse);
		});

		it("should return error for duplicate email (409)", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 409,
			});

			const result = await FetchData.makeNewUser({
				userName: "newuser",
				password: "password123",
				email: "existing@example.com",
			});

			expect(result).toEqual({ error: "An account already has this email" });
		});

		it("should return error for duplicate username (410)", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 410,
			});

			const result = await FetchData.makeNewUser({
				userName: "existinguser",
				password: "password123",
				email: "new@example.com",
			});

			expect(result).toEqual({ error: "Username already exists" });
		});

		it("should return generic error for other failures", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 500,
			});

			const result = await FetchData.makeNewUser({
				userName: "newuser",
				password: "password123",
				email: "new@example.com",
			});

			expect(result).toEqual({
				error: "Failed to create account. Please try again.",
			});
		});

		it("should return connection error on fetch failure", async () => {
			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error("Network error")
			);

			const result = await FetchData.makeNewUser({
				userName: "newuser",
				password: "password123",
				email: "new@example.com",
			});

			expect(result).toEqual({
				error: "Connection error. Is the server running?",
			});
		});
	});

	describe("get", () => {
		it("should call endpoint with auth header", async () => {
			const mockResponse = { data: "test" };

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await FetchData.get("/api/v1/test", mockToken);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/v1/test",
				{
					headers: {
						Authorization: `Bearer ${mockToken}`,
					},
				}
			);
			expect(result).toEqual(mockResponse);
		});

		it("should return error on non-ok response", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			const result = await FetchData.get("/api/v1/test", mockToken);

			expect(result).toBeInstanceOf(Error);
		});
	});
});
