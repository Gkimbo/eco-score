import {
	achievements,
	dailyRewards,
	watchAdReward,
	getAchievementById,
	getAchievementsByCategory,
	getEngagementAchievements,
	getEcoAchievements,
	getTotalPossibleStars,
	Achievement,
} from "../../../services/data/challenges";

describe("Challenges Data", () => {
	describe("achievements array", () => {
		it("should have achievements defined", () => {
			expect(achievements).toBeDefined();
			expect(Array.isArray(achievements)).toBe(true);
			expect(achievements.length).toBeGreaterThan(0);
		});

		it("each achievement should have required properties", () => {
			achievements.forEach((achievement) => {
				expect(achievement).toHaveProperty("id");
				expect(achievement).toHaveProperty("name");
				expect(achievement).toHaveProperty("description");
				expect(achievement).toHaveProperty("icon");
				expect(achievement).toHaveProperty("stars");
				expect(achievement).toHaveProperty("type");
				expect(achievement).toHaveProperty("category");
			});
		});

		it("each achievement id should be unique", () => {
			const ids = achievements.map((a) => a.id);
			const uniqueIds = new Set(ids);
			expect(uniqueIds.size).toBe(ids.length);
		});

		it("each achievement should have valid type", () => {
			const validTypes = ["one_time", "repeatable", "milestone"];
			achievements.forEach((achievement) => {
				expect(validTypes).toContain(achievement.type);
			});
		});

		it("each achievement should have valid category", () => {
			const validCategories = ["engagement", "eco", "social"];
			achievements.forEach((achievement) => {
				expect(validCategories).toContain(achievement.category);
			});
		});

		it("each achievement should have positive star value", () => {
			achievements.forEach((achievement) => {
				expect(achievement.stars).toBeGreaterThan(0);
			});
		});

		it("milestone achievements with conditions should have valid condition structure", () => {
			const milestonesWithConditions = achievements.filter(
				(a) => a.type === "milestone" && a.condition
			);
			expect(milestonesWithConditions.length).toBeGreaterThan(0);
			milestonesWithConditions.forEach((achievement) => {
				expect(achievement.condition).toHaveProperty("field");
				expect(achievement.condition).toHaveProperty("operator");
				expect(achievement.condition).toHaveProperty("value");
			});
		});
	});

	describe("specific achievements", () => {
		it("should have first_login achievement", () => {
			const firstLogin = achievements.find((a) => a.id === "first_login");
			expect(firstLogin).toBeDefined();
			expect(firstLogin?.name).toBe("Welcome!");
			expect(firstLogin?.stars).toBe(10);
			expect(firstLogin?.type).toBe("one_time");
			expect(firstLogin?.category).toBe("engagement");
		});

		it("should have complete_profile achievement with 100 stars", () => {
			const completeProfile = achievements.find((a) => a.id === "complete_profile");
			expect(completeProfile).toBeDefined();
			expect(completeProfile?.stars).toBe(100);
		});

		it("should have electric_vehicle achievement with condition", () => {
			const electricVehicle = achievements.find((a) => a.id === "electric_vehicle");
			expect(electricVehicle).toBeDefined();
			expect(electricVehicle?.stars).toBe(100);
			expect(electricVehicle?.condition?.field).toBe("car.fuelType");
			expect(electricVehicle?.condition?.value).toBe("electricity");
		});

		it("should have tree planting milestones", () => {
			const treeMilestones = achievements.filter((a) => a.id.startsWith("tree_"));
			expect(treeMilestones.length).toBeGreaterThanOrEqual(4);

			const tree1 = achievements.find((a) => a.id === "tree_1");
			expect(tree1?.condition?.field).toBe("treesPlanted");
			expect(tree1?.condition?.value).toBe(1);
		});

		it("should have streak achievements at 7, 30, and 100 days", () => {
			const streak7 = achievements.find((a) => a.id === "streak_7");
			const streak30 = achievements.find((a) => a.id === "streak_30");
			const streak100 = achievements.find((a) => a.id === "streak_100");

			expect(streak7).toBeDefined();
			expect(streak7?.condition?.value).toBe(7);
			expect(streak30?.condition?.value).toBe(30);
			expect(streak100?.condition?.value).toBe(100);
		});
	});

	describe("dailyRewards", () => {
		it("should have base stars defined", () => {
			expect(dailyRewards.baseStars).toBeDefined();
			expect(dailyRewards.baseStars).toBe(5);
		});

		it("should have streak bonuses array", () => {
			expect(dailyRewards.streakBonuses).toBeDefined();
			expect(Array.isArray(dailyRewards.streakBonuses)).toBe(true);
			expect(dailyRewards.streakBonuses.length).toBeGreaterThan(0);
		});

		it("streak bonuses should be in ascending order by days", () => {
			const days = dailyRewards.streakBonuses.map((b) => b.days);
			for (let i = 1; i < days.length; i++) {
				expect(days[i]).toBeGreaterThan(days[i - 1]);
			}
		});

		it("streak bonuses should have required properties", () => {
			dailyRewards.streakBonuses.forEach((bonus) => {
				expect(bonus).toHaveProperty("days");
				expect(bonus).toHaveProperty("bonus");
				expect(bonus).toHaveProperty("name");
				expect(bonus.days).toBeGreaterThan(0);
				expect(bonus.bonus).toBeGreaterThan(0);
			});
		});

		it("should have 7-day and 30-day bonuses", () => {
			const week = dailyRewards.streakBonuses.find((b) => b.days === 7);
			const month = dailyRewards.streakBonuses.find((b) => b.days === 30);

			expect(week).toBeDefined();
			expect(week?.bonus).toBe(50);
			expect(month).toBeDefined();
			expect(month?.bonus).toBe(200);
		});
	});

	describe("watchAdReward", () => {
		it("should have stars defined", () => {
			expect(watchAdReward.stars).toBeDefined();
			expect(watchAdReward.stars).toBe(10);
		});

		it("should have cooldown minutes", () => {
			expect(watchAdReward.cooldownMinutes).toBeDefined();
			expect(watchAdReward.cooldownMinutes).toBe(5);
		});

		it("should have daily limit", () => {
			expect(watchAdReward.dailyLimit).toBeDefined();
			expect(watchAdReward.dailyLimit).toBe(10);
		});
	});

	describe("getAchievementById", () => {
		it("should return achievement when found", () => {
			const result = getAchievementById("first_login");
			expect(result).toBeDefined();
			expect(result?.id).toBe("first_login");
		});

		it("should return undefined when not found", () => {
			const result = getAchievementById("non_existent");
			expect(result).toBeUndefined();
		});
	});

	describe("getAchievementsByCategory", () => {
		it("should return only engagement achievements", () => {
			const results = getAchievementsByCategory("engagement");
			expect(results.length).toBeGreaterThan(0);
			results.forEach((a) => {
				expect(a.category).toBe("engagement");
			});
		});

		it("should return only eco achievements", () => {
			const results = getAchievementsByCategory("eco");
			expect(results.length).toBeGreaterThan(0);
			results.forEach((a) => {
				expect(a.category).toBe("eco");
			});
		});

		it("should return empty array for social category if none exist", () => {
			const results = getAchievementsByCategory("social");
			expect(Array.isArray(results)).toBe(true);
		});
	});

	describe("getEngagementAchievements", () => {
		it("should return engagement achievements", () => {
			const results = getEngagementAchievements();
			expect(results.length).toBeGreaterThan(0);
			results.forEach((a) => {
				expect(a.category).toBe("engagement");
			});
		});
	});

	describe("getEcoAchievements", () => {
		it("should return eco achievements", () => {
			const results = getEcoAchievements();
			expect(results.length).toBeGreaterThan(0);
			results.forEach((a) => {
				expect(a.category).toBe("eco");
			});
		});

		it("should include vehicle achievements", () => {
			const results = getEcoAchievements();
			const vehicleAchievements = results.filter(
				(a) => a.id === "electric_vehicle" || a.id === "hybrid_vehicle"
			);
			expect(vehicleAchievements.length).toBe(2);
		});
	});

	describe("getTotalPossibleStars", () => {
		it("should return total of all achievement stars", () => {
			const total = getTotalPossibleStars();
			const manualTotal = achievements.reduce((sum, a) => sum + a.stars, 0);
			expect(total).toBe(manualTotal);
		});

		it("should return a positive number", () => {
			const total = getTotalPossibleStars();
			expect(total).toBeGreaterThan(0);
		});
	});
});
