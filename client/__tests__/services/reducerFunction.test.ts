import reducer from "../../services/reducerFunction";

describe("Reducer Function", () => {
	const initialState = {
		currentUser: { token: null },
		cars: [],
		userInformation: null,
		homes: [],
		rewards: 0,
		treesPlanted: 0,
		classes: ["class1", "class2"],
		error: null,
	};

	describe("CURRENT_USER action", () => {
		it("should set current user token", () => {
			const action = { type: "CURRENT_USER", payload: "test-token" };
			const result = reducer(initialState, action);
			expect(result.currentUser.token).toBe("test-token");
		});

		it("should clear current user token when null", () => {
			const stateWithToken = { ...initialState, currentUser: { token: "existing-token" } };
			const action = { type: "CURRENT_USER", payload: null };
			const result = reducer(stateWithToken, action);
			expect(result.currentUser.token).toBeNull();
		});
	});

	describe("USER_CAR action", () => {
		it("should set user cars", () => {
			const cars = [{ id: 1, model: "Tesla" }, { id: 2, model: "Toyota" }];
			const action = { type: "USER_CAR", payload: cars };
			const result = reducer(initialState, action);
			expect(result.cars).toEqual(cars);
			expect(result.cars).toHaveLength(2);
		});
	});

	describe("USER_HOME action", () => {
		it("should set user homes", () => {
			const homes = [{ id: 1, type: "apartment" }];
			const action = { type: "USER_HOME", payload: homes };
			const result = reducer(initialState, action);
			expect(result.homes).toEqual(homes);
		});
	});

	describe("USER_INFO action", () => {
		it("should set user information", () => {
			const info = { name: "John", email: "john@test.com" };
			const action = { type: "USER_INFO", payload: info };
			const result = reducer(initialState, action);
			expect(result.userInformation).toEqual(info);
		});
	});

	describe("DELETE_CAR action", () => {
		it("should remove car by id", () => {
			const stateWithCars = {
				...initialState,
				cars: [{ id: 1, model: "Tesla" }, { id: 2, model: "Toyota" }],
			};
			const action = { type: "DELETE_CAR", payload: 1 };
			const result = reducer(stateWithCars, action);
			expect(result.cars).toHaveLength(1);
			expect(result.cars[0].id).toBe(2);
		});
	});

	describe("DELETE_HOME action", () => {
		it("should remove home by id", () => {
			const stateWithHomes = {
				...initialState,
				homes: [{ id: 1, type: "house" }, { id: 2, type: "apartment" }],
			};
			const action = { type: "DELETE_HOME", payload: 1 };
			const result = reducer(stateWithHomes, action);
			expect(result.homes).toHaveLength(1);
			expect(result.homes[0].id).toBe(2);
		});
	});

	describe("Rewards actions", () => {
		it("should add stars with ADD_STARS", () => {
			const stateWithRewards = { ...initialState, rewards: 10 };
			const action = { type: "ADD_STARS", payload: 5 };
			const result = reducer(stateWithRewards, action);
			expect(result.rewards).toBe(15);
		});

		it("should deduct stars with DEDUCT_STARS", () => {
			const stateWithRewards = { ...initialState, rewards: 10 };
			const action = { type: "DEDUCT_STARS", payload: 3 };
			const result = reducer(stateWithRewards, action);
			expect(result.rewards).toBe(7);
		});

		it("should set rewards directly with STARS_HOME", () => {
			const action = { type: "STARS_HOME", payload: 100 };
			const result = reducer(initialState, action);
			expect(result.rewards).toBe(100);
		});
	});

	describe("Tree actions", () => {
		it("should add trees with PLANT_TREES", () => {
			const stateWithTrees = { ...initialState, treesPlanted: 5 };
			const action = { type: "PLANT_TREES", payload: 2 };
			const result = reducer(stateWithTrees, action);
			expect(result.treesPlanted).toBe(7);
		});

		it("should set trees directly with PLANT_TREES_HOME", () => {
			const action = { type: "PLANT_TREES_HOME", payload: 10 };
			const result = reducer(initialState, action);
			expect(result.treesPlanted).toBe(10);
		});
	});

	describe("Achievement actions", () => {
		const stateWithAchievements = {
			...initialState,
			achievements: [{ id: "first_login", completedAt: "2024-01-01" }],
		};

		it("should set achievements with SET_ACHIEVEMENTS", () => {
			const achievements = [
				{ id: "first_login", completedAt: "2024-01-01" },
				{ id: "complete_profile", completedAt: "2024-01-02" },
			];
			const action = { type: "SET_ACHIEVEMENTS", payload: achievements };
			const result = reducer({ ...initialState, achievements: [] }, action);
			expect(result.achievements).toEqual(achievements);
			expect(result.achievements).toHaveLength(2);
		});

		it("should add achievement with ADD_ACHIEVEMENT", () => {
			const newAchievement = { id: "complete_profile", completedAt: "2024-01-02" };
			const action = { type: "ADD_ACHIEVEMENT", payload: newAchievement };
			const result = reducer(stateWithAchievements, action);
			expect(result.achievements).toHaveLength(2);
			expect(result.achievements).toContainEqual(newAchievement);
		});

		it("should preserve existing achievements when adding new one", () => {
			const newAchievement = { id: "first_car", completedAt: "2024-01-03" };
			const action = { type: "ADD_ACHIEVEMENT", payload: newAchievement };
			const result = reducer(stateWithAchievements, action);
			expect(result.achievements).toContainEqual({ id: "first_login", completedAt: "2024-01-01" });
		});
	});

	describe("Streak actions", () => {
		it("should update streak with UPDATE_STREAK", () => {
			const action = {
				type: "UPDATE_STREAK",
				payload: { streak: 7, lastCheckIn: "2024-01-15" },
			};
			const result = reducer(initialState, action);
			expect(result.checkInStreak).toBe(7);
			expect(result.lastCheckIn).toBe("2024-01-15");
		});

		it("should update streak to 0 when broken", () => {
			const stateWithStreak = { ...initialState, checkInStreak: 5, lastCheckIn: "2024-01-10" };
			const action = {
				type: "UPDATE_STREAK",
				payload: { streak: 1, lastCheckIn: "2024-01-15" },
			};
			const result = reducer(stateWithStreak, action);
			expect(result.checkInStreak).toBe(1);
		});
	});

	describe("Tips read actions", () => {
		it("should update tips read with UPDATE_TIPS_READ", () => {
			const tipsRead = ["transport_1", "home_1", "recycle_1"];
			const action = { type: "UPDATE_TIPS_READ", payload: tipsRead };
			const result = reducer(initialState, action);
			expect(result.tipsRead).toEqual(tipsRead);
			expect(result.tipsRead).toHaveLength(3);
		});

		it("should replace existing tips read array", () => {
			const stateWithTips = { ...initialState, tipsRead: ["transport_1"] };
			const newTipsRead = ["transport_1", "transport_2", "home_1"];
			const action = { type: "UPDATE_TIPS_READ", payload: newTipsRead };
			const result = reducer(stateWithTips, action);
			expect(result.tipsRead).toEqual(newTipsRead);
		});
	});

	describe("UPDATE_HOME action", () => {
		it("should update home by id", () => {
			const stateWithHomes = {
				...initialState,
				homes: [
					{ id: 1, zipcode: "12345", recycling: "no" },
					{ id: 2, zipcode: "67890", recycling: "yes" },
				],
			};
			const action = {
				type: "UPDATE_HOME",
				payload: { id: 1, zipcode: "12345", recycling: "yes" },
			};
			const result = reducer(stateWithHomes, action);
			expect(result.homes[0].recycling).toBe("yes");
			expect(result.homes[1].recycling).toBe("yes");
		});

		it("should not modify other homes", () => {
			const stateWithHomes = {
				...initialState,
				homes: [
					{ id: 1, zipcode: "12345" },
					{ id: 2, zipcode: "67890" },
				],
			};
			const action = {
				type: "UPDATE_HOME",
				payload: { id: 1, zipcode: "11111" },
			};
			const result = reducer(stateWithHomes, action);
			expect(result.homes[1].zipcode).toBe("67890");
		});
	});

	describe("ERROR action", () => {
		it("should set error", () => {
			const action = { type: "ERROR", payload: "Something went wrong" };
			const result = reducer(initialState, action);
			expect(result.error).toBe("Something went wrong");
		});
	});

	describe("REMOVE_CLASS action", () => {
		it("should remove class from array", () => {
			const action = { type: "REMOVE_CLASS", payload: "class1" };
			const result = reducer(initialState, action);
			expect(result.classes).not.toContain("class1");
			expect(result.classes).toContain("class2");
		});
	});

	describe("Unknown action", () => {
		it("should throw error for unknown action", () => {
			const action = { type: "UNKNOWN_ACTION", payload: null };
			expect(() => reducer(initialState, action)).toThrow();
		});
	});
});
