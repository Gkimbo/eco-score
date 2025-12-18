import {
	ecoTipsData,
	getTotalTips,
	getTotalStarsAvailable,
	TipCategory,
	EcoTip,
} from "../../../services/data/ecoTips";

describe("Eco Tips Data", () => {
	describe("ecoTipsData array", () => {
		it("should have tip categories defined", () => {
			expect(ecoTipsData).toBeDefined();
			expect(Array.isArray(ecoTipsData)).toBe(true);
			expect(ecoTipsData.length).toBeGreaterThan(0);
		});

		it("each category should have required properties", () => {
			ecoTipsData.forEach((category) => {
				expect(category).toHaveProperty("id");
				expect(category).toHaveProperty("name");
				expect(category).toHaveProperty("icon");
				expect(category).toHaveProperty("color");
				expect(category).toHaveProperty("tips");
				expect(Array.isArray(category.tips)).toBe(true);
			});
		});

		it("each category id should be unique", () => {
			const ids = ecoTipsData.map((c) => c.id);
			const uniqueIds = new Set(ids);
			expect(uniqueIds.size).toBe(ids.length);
		});

		it("each category should have at least one tip", () => {
			ecoTipsData.forEach((category) => {
				expect(category.tips.length).toBeGreaterThan(0);
			});
		});

		it("colors should be valid hex colors", () => {
			const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
			ecoTipsData.forEach((category) => {
				expect(category.color).toMatch(hexColorRegex);
			});
		});
	});

	describe("tips within categories", () => {
		it("each tip should have required properties", () => {
			ecoTipsData.forEach((category) => {
				category.tips.forEach((tip) => {
					expect(tip).toHaveProperty("id");
					expect(tip).toHaveProperty("title");
					expect(tip).toHaveProperty("description");
					expect(tip).toHaveProperty("impact");
					expect(tip).toHaveProperty("stars");
				});
			});
		});

		it("all tip ids should be unique across all categories", () => {
			const allTipIds: string[] = [];
			ecoTipsData.forEach((category) => {
				category.tips.forEach((tip) => {
					allTipIds.push(tip.id);
				});
			});
			const uniqueIds = new Set(allTipIds);
			expect(uniqueIds.size).toBe(allTipIds.length);
		});

		it("each tip should have valid impact level", () => {
			const validImpacts = ["high", "medium", "low"];
			ecoTipsData.forEach((category) => {
				category.tips.forEach((tip) => {
					expect(validImpacts).toContain(tip.impact);
				});
			});
		});

		it("each tip should have positive star value", () => {
			ecoTipsData.forEach((category) => {
				category.tips.forEach((tip) => {
					expect(tip.stars).toBeGreaterThan(0);
				});
			});
		});

		it("all tips should award 2 stars", () => {
			ecoTipsData.forEach((category) => {
				category.tips.forEach((tip) => {
					expect(tip.stars).toBe(2);
				});
			});
		});

		it("each tip should have a non-empty title", () => {
			ecoTipsData.forEach((category) => {
				category.tips.forEach((tip) => {
					expect(tip.title.length).toBeGreaterThan(0);
				});
			});
		});

		it("each tip should have a meaningful description", () => {
			ecoTipsData.forEach((category) => {
				category.tips.forEach((tip) => {
					expect(tip.description.length).toBeGreaterThan(20);
				});
			});
		});
	});

	describe("specific categories", () => {
		it("should have transportation category", () => {
			const transportation = ecoTipsData.find((c) => c.id === "transportation");
			expect(transportation).toBeDefined();
			expect(transportation?.name).toBe("Transportation");
			expect(transportation?.icon).toBe("🚗");
		});

		it("should have home_energy category", () => {
			const homeEnergy = ecoTipsData.find((c) => c.id === "home_energy");
			expect(homeEnergy).toBeDefined();
			expect(homeEnergy?.name).toBe("Home Energy");
			expect(homeEnergy?.icon).toBe("🏠");
		});

		it("should have reduce_recycle category", () => {
			const reduceRecycle = ecoTipsData.find((c) => c.id === "reduce_recycle");
			expect(reduceRecycle).toBeDefined();
			expect(reduceRecycle?.name).toBe("Reduce & Recycle");
			expect(reduceRecycle?.icon).toBe("♻️");
		});

		it("should have diet_lifestyle category", () => {
			const dietLifestyle = ecoTipsData.find((c) => c.id === "diet_lifestyle");
			expect(dietLifestyle).toBeDefined();
			expect(dietLifestyle?.name).toBe("Diet & Lifestyle");
			expect(dietLifestyle?.icon).toBe("🥗");
		});
	});

	describe("specific tips", () => {
		it("should have high-impact transportation tips", () => {
			const transportation = ecoTipsData.find((c) => c.id === "transportation");
			const highImpactTips = transportation?.tips.filter((t) => t.impact === "high");
			expect(highImpactTips?.length).toBeGreaterThan(0);
		});

		it("should include EV tip in transportation", () => {
			const transportation = ecoTipsData.find((c) => c.id === "transportation");
			const evTip = transportation?.tips.find((t) =>
				t.title.toLowerCase().includes("electric")
			);
			expect(evTip).toBeDefined();
			expect(evTip?.impact).toBe("high");
		});

		it("should include solar panel tip in home energy", () => {
			const homeEnergy = ecoTipsData.find((c) => c.id === "home_energy");
			const solarTip = homeEnergy?.tips.find((t) =>
				t.title.toLowerCase().includes("solar")
			);
			expect(solarTip).toBeDefined();
			expect(solarTip?.impact).toBe("high");
		});

		it("should include composting tip in reduce_recycle", () => {
			const reduceRecycle = ecoTipsData.find((c) => c.id === "reduce_recycle");
			const compostTip = reduceRecycle?.tips.find((t) =>
				t.title.toLowerCase().includes("compost")
			);
			expect(compostTip).toBeDefined();
		});
	});

	describe("getTotalTips", () => {
		it("should return total number of tips", () => {
			const total = getTotalTips();
			const manualCount = ecoTipsData.reduce(
				(sum, category) => sum + category.tips.length,
				0
			);
			expect(total).toBe(manualCount);
		});

		it("should return a positive number", () => {
			const total = getTotalTips();
			expect(total).toBeGreaterThan(0);
		});

		it("should have at least 20 tips total", () => {
			const total = getTotalTips();
			expect(total).toBeGreaterThanOrEqual(20);
		});
	});

	describe("getTotalStarsAvailable", () => {
		it("should return total stars from all tips", () => {
			const total = getTotalStarsAvailable();
			const manualTotal = ecoTipsData.reduce(
				(sum, category) =>
					sum + category.tips.reduce((tipSum, tip) => tipSum + tip.stars, 0),
				0
			);
			expect(total).toBe(manualTotal);
		});

		it("should equal 2 * total tips (since each tip gives 2 stars)", () => {
			const totalStars = getTotalStarsAvailable();
			const totalTips = getTotalTips();
			expect(totalStars).toBe(totalTips * 2);
		});

		it("should return a positive number", () => {
			const total = getTotalStarsAvailable();
			expect(total).toBeGreaterThan(0);
		});
	});

	describe("impact distribution", () => {
		it("should have a mix of impact levels", () => {
			const allTips: EcoTip[] = [];
			ecoTipsData.forEach((category) => {
				allTips.push(...category.tips);
			});

			const highImpact = allTips.filter((t) => t.impact === "high");
			const mediumImpact = allTips.filter((t) => t.impact === "medium");
			const lowImpact = allTips.filter((t) => t.impact === "low");

			expect(highImpact.length).toBeGreaterThan(0);
			expect(mediumImpact.length).toBeGreaterThan(0);
			expect(lowImpact.length).toBeGreaterThan(0);
		});
	});
});
