const calculateCarbonFootprint = require("../../services/CalculateCarbonFootprint");

describe("CalculateCarbonFootprint Service", () => {
	describe("calculateCarbonFootprint", () => {
		it("should add car and home carbon emissions together", () => {
			const carEmissions = 5000;
			const homeEmissions = 8000;
			const result = calculateCarbonFootprint(carEmissions, homeEmissions);
			expect(result).toBe(13000);
		});

		it("should handle zero car emissions", () => {
			const result = calculateCarbonFootprint(0, 5000);
			expect(result).toBe(5000);
		});

		it("should handle zero home emissions", () => {
			const result = calculateCarbonFootprint(3000, 0);
			expect(result).toBe(3000);
		});

		it("should handle both zero emissions", () => {
			const result = calculateCarbonFootprint(0, 0);
			expect(result).toBe(0);
		});

		it("should handle decimal values", () => {
			const result = calculateCarbonFootprint(1234.56, 7890.12);
			expect(result).toBeCloseTo(9124.68, 2);
		});

		it("should handle large values", () => {
			const result = calculateCarbonFootprint(50000, 75000);
			expect(result).toBe(125000);
		});
	});

	describe("Real-world scenarios", () => {
		it("should calculate typical US household footprint", () => {
			// Average US car: ~4.6 metric tons CO2 = ~10,141 lbs
			// Average US home: ~7.5 metric tons CO2 = ~16,535 lbs
			const carEmissions = 10141;
			const homeEmissions = 16535;
			const result = calculateCarbonFootprint(carEmissions, homeEmissions);
			expect(result).toBe(26676);
		});

		it("should calculate low-emission household footprint", () => {
			// EV charged on solar: minimal emissions
			// Efficient home with solar: minimal emissions
			const carEmissions = 500;
			const homeEmissions = 1000;
			const result = calculateCarbonFootprint(carEmissions, homeEmissions);
			expect(result).toBe(1500);
		});
	});
});
