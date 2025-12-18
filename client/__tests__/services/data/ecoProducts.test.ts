import {
	ecoProductsData,
	getTotalProducts,
	ProductCategory,
	EcoProduct,
} from "../../../services/data/ecoProducts";

describe("Eco Products Data", () => {
	describe("ecoProductsData array", () => {
		it("should have product categories defined", () => {
			expect(ecoProductsData).toBeDefined();
			expect(Array.isArray(ecoProductsData)).toBe(true);
			expect(ecoProductsData.length).toBeGreaterThan(0);
		});

		it("each category should have required properties", () => {
			ecoProductsData.forEach((category) => {
				expect(category).toHaveProperty("id");
				expect(category).toHaveProperty("name");
				expect(category).toHaveProperty("icon");
				expect(category).toHaveProperty("color");
				expect(category).toHaveProperty("products");
				expect(Array.isArray(category.products)).toBe(true);
			});
		});

		it("each category id should be unique", () => {
			const ids = ecoProductsData.map((c) => c.id);
			const uniqueIds = new Set(ids);
			expect(uniqueIds.size).toBe(ids.length);
		});

		it("each category should have at least one product", () => {
			ecoProductsData.forEach((category) => {
				expect(category.products.length).toBeGreaterThan(0);
			});
		});

		it("colors should be valid hex colors", () => {
			const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
			ecoProductsData.forEach((category) => {
				expect(category.color).toMatch(hexColorRegex);
			});
		});
	});

	describe("products within categories", () => {
		it("each product should have required properties", () => {
			ecoProductsData.forEach((category) => {
				category.products.forEach((product) => {
					expect(product).toHaveProperty("id");
					expect(product).toHaveProperty("name");
					expect(product).toHaveProperty("description");
					expect(product).toHaveProperty("icon");
					expect(product).toHaveProperty("url");
					expect(product).toHaveProperty("priceRange");
					expect(product).toHaveProperty("co2Impact");
				});
			});
		});

		it("all product ids should be unique across all categories", () => {
			const allProductIds: string[] = [];
			ecoProductsData.forEach((category) => {
				category.products.forEach((product) => {
					allProductIds.push(product.id);
				});
			});
			const uniqueIds = new Set(allProductIds);
			expect(uniqueIds.size).toBe(allProductIds.length);
		});

		it("each product should have a valid URL", () => {
			const urlRegex = /^https?:\/\/.+/;
			ecoProductsData.forEach((category) => {
				category.products.forEach((product) => {
					expect(product.url).toMatch(urlRegex);
				});
			});
		});

		it("each product should have a non-empty name", () => {
			ecoProductsData.forEach((category) => {
				category.products.forEach((product) => {
					expect(product.name.length).toBeGreaterThan(0);
				});
			});
		});

		it("each product should have a meaningful description", () => {
			ecoProductsData.forEach((category) => {
				category.products.forEach((product) => {
					expect(product.description.length).toBeGreaterThan(10);
				});
			});
		});

		it("each product should have a price range", () => {
			ecoProductsData.forEach((category) => {
				category.products.forEach((product) => {
					expect(product.priceRange.length).toBeGreaterThan(0);
					expect(product.priceRange).toMatch(/\$/);
				});
			});
		});

		it("each product should have CO2 impact info", () => {
			ecoProductsData.forEach((category) => {
				category.products.forEach((product) => {
					expect(product.co2Impact.length).toBeGreaterThan(0);
				});
			});
		});
	});

	describe("specific categories", () => {
		it("should have electric_vehicles category", () => {
			const evCategory = ecoProductsData.find((c) => c.id === "electric_vehicles");
			expect(evCategory).toBeDefined();
			expect(evCategory?.name).toBe("Electric Vehicles");
			expect(evCategory?.icon).toBe("🚗");
		});

		it("should have solar_energy category", () => {
			const solarCategory = ecoProductsData.find((c) => c.id === "solar_energy");
			expect(solarCategory).toBeDefined();
			expect(solarCategory?.name).toBe("Solar & Energy");
			expect(solarCategory?.icon).toBe("☀️");
		});

		it("should have home_garden category", () => {
			const homeCategory = ecoProductsData.find((c) => c.id === "home_garden");
			expect(homeCategory).toBeDefined();
			expect(homeCategory?.name).toBe("Home & Garden");
			expect(homeCategory?.icon).toBe("🏡");
		});

		it("should have transportation_alt category", () => {
			const transCategory = ecoProductsData.find((c) => c.id === "transportation_alt");
			expect(transCategory).toBeDefined();
			expect(transCategory?.name).toBe("Alternative Transport");
			expect(transCategory?.icon).toBe("🚲");
		});

		it("should have everyday_items category", () => {
			const everydayCategory = ecoProductsData.find((c) => c.id === "everyday_items");
			expect(everydayCategory).toBeDefined();
			expect(everydayCategory?.name).toBe("Everyday Items");
			expect(everydayCategory?.icon).toBe("🌿");
		});
	});

	describe("specific products", () => {
		it("should have Tesla Model 3 in electric vehicles", () => {
			const evCategory = ecoProductsData.find((c) => c.id === "electric_vehicles");
			const tesla = evCategory?.products.find((p) =>
				p.name.toLowerCase().includes("tesla")
			);
			expect(tesla).toBeDefined();
			expect(tesla?.url).toContain("tesla.com");
		});

		it("should have multiple EV options", () => {
			const evCategory = ecoProductsData.find((c) => c.id === "electric_vehicles");
			expect(evCategory?.products.length).toBeGreaterThanOrEqual(3);
		});

		it("should have smart thermostat products", () => {
			const solarCategory = ecoProductsData.find((c) => c.id === "solar_energy");
			const thermostats = solarCategory?.products.filter(
				(p) =>
					p.name.toLowerCase().includes("thermostat") ||
					p.name.toLowerCase().includes("nest") ||
					p.name.toLowerCase().includes("ecobee")
			);
			expect(thermostats?.length).toBeGreaterThan(0);
		});

		it("should have composting bin in home_garden", () => {
			const homeCategory = ecoProductsData.find((c) => c.id === "home_garden");
			const compost = homeCategory?.products.find((p) =>
				p.name.toLowerCase().includes("compost")
			);
			expect(compost).toBeDefined();
		});

		it("should have e-bikes in transportation_alt", () => {
			const transCategory = ecoProductsData.find((c) => c.id === "transportation_alt");
			const ebikes = transCategory?.products.filter(
				(p) =>
					p.name.toLowerCase().includes("bike") ||
					p.name.toLowerCase().includes("ebike")
			);
			expect(ebikes?.length).toBeGreaterThan(0);
		});

		it("should have reusable products in everyday_items", () => {
			const everydayCategory = ecoProductsData.find((c) => c.id === "everyday_items");
			const reusable = everydayCategory?.products.filter(
				(p) =>
					p.name.toLowerCase().includes("reusable") ||
					p.description.toLowerCase().includes("reusable")
			);
			expect(reusable?.length).toBeGreaterThan(0);
		});
	});

	describe("getTotalProducts", () => {
		it("should return total number of products", () => {
			const total = getTotalProducts();
			const manualCount = ecoProductsData.reduce(
				(sum, category) => sum + category.products.length,
				0
			);
			expect(total).toBe(manualCount);
		});

		it("should return a positive number", () => {
			const total = getTotalProducts();
			expect(total).toBeGreaterThan(0);
		});

		it("should have at least 20 products total", () => {
			const total = getTotalProducts();
			expect(total).toBeGreaterThanOrEqual(20);
		});
	});

	describe("URL validation", () => {
		it("all URLs should use HTTPS", () => {
			ecoProductsData.forEach((category) => {
				category.products.forEach((product) => {
					expect(product.url.startsWith("https://")).toBe(true);
				});
			});
		});

		it("no URLs should be empty", () => {
			ecoProductsData.forEach((category) => {
				category.products.forEach((product) => {
					expect(product.url.length).toBeGreaterThan(10);
				});
			});
		});
	});
});
