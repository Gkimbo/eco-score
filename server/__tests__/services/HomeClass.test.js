// Mock cheerio before requiring HomeClass
jest.mock("cheerio", () => ({
	load: jest.fn().mockReturnValue(() => ({
		text: jest.fn().mockReturnValue(""),
	})),
}));

// Mock getLocationCarbonIntensity
jest.mock("../../services/getLocationCarbonIntensity", () => ({
	getLatLong: jest.fn().mockResolvedValue({ lat: 40.7128, lng: -74.006 }),
	fetchCarbonIntensity: jest.fn().mockResolvedValue({ carbonIntensity: 367 }),
}));

const HomeClass = require("../../services/HomeClass");

describe("HomeClass Service", () => {
	describe("powerOnGrid", () => {
		it("should calculate annual CO2 from electricity usage correctly", () => {
			// Carbon intensity of 367 grams/kWh (US average)
			// 12000 kWh per year
			// 367 g/kWh * 12000 kWh = 4,404,000 grams
			// Convert to pounds: 4,404,000 / 453.592 ≈ 9709 lbs
			const carbonIntensity = { carbonIntensity: 367 };
			const result = HomeClass.powerOnGrid(carbonIntensity, 12000);
			expect(result).toBeCloseTo(9709, 0);
		});

		it("should scale linearly with electricity usage", () => {
			const carbonIntensity = { carbonIntensity: 367 };
			const lowUsage = HomeClass.powerOnGrid(carbonIntensity, 6000);
			const highUsage = HomeClass.powerOnGrid(carbonIntensity, 12000);
			expect(highUsage).toBeCloseTo(lowUsage * 2, 0);
		});

		it("should scale with carbon intensity", () => {
			const lowCarbon = { carbonIntensity: 100 };
			const highCarbon = { carbonIntensity: 400 };
			const electricity = 10000;
			const lowResult = HomeClass.powerOnGrid(lowCarbon, electricity);
			const highResult = HomeClass.powerOnGrid(highCarbon, electricity);
			expect(highResult).toBeCloseTo(lowResult * 4, 0);
		});
	});

	describe("co2FromNaturalGas", () => {
		it("should calculate CO2 from natural gas correctly", () => {
			// 11.7 lbs CO2 per therm
			// 100 therms per year = 1170 lbs CO2
			const result = HomeClass.co2FromNaturalGas(100);
			expect(result).toBe(1170);
		});

		it("should handle string input", () => {
			const result = HomeClass.co2FromNaturalGas("50");
			expect(result).toBe(585);
		});

		it("should use correct emission factor (11.7 lbs/therm)", () => {
			const result = HomeClass.co2FromNaturalGas(1);
			expect(result).toBe(11.7);
		});

		it("should scale linearly with usage", () => {
			const small = HomeClass.co2FromNaturalGas(50);
			const large = HomeClass.co2FromNaturalGas(100);
			expect(large).toBe(small * 2);
		});
	});

	describe("co2FromHeatingOil", () => {
		it("should calculate CO2 from heating oil in gallons correctly", () => {
			// 22.61 lbs CO2 per gallon
			// 500 gallons = 11,305 lbs CO2
			const result = HomeClass.co2FromHeatingOil(500, "gallons");
			expect(result).toBeCloseTo(11305, 0);
		});

		it("should calculate CO2 from heating oil in liters correctly", () => {
			// 5.98 lbs CO2 per liter
			// 1000 liters = 5980 lbs CO2
			const result = HomeClass.co2FromHeatingOil(1000, "liters");
			expect(result).toBeCloseTo(5980, 0);
		});

		it("should use correct gallon emission factor (22.61 lbs/gallon)", () => {
			const result = HomeClass.co2FromHeatingOil(1, "gallons");
			expect(result).toBe(22.61);
		});

		it("should use correct liter emission factor (5.98 lbs/liter)", () => {
			const result = HomeClass.co2FromHeatingOil(1, "liters");
			expect(result).toBe(5.98);
		});

		it("should produce approximately 3.78x more CO2 for gallons vs liters", () => {
			// 1 gallon = 3.78541 liters
			// So gallon should be about 3.78x more CO2 than liter
			const gallonResult = HomeClass.co2FromHeatingOil(1, "gallons");
			const literResult = HomeClass.co2FromHeatingOil(1, "liters");
			const ratio = gallonResult / literResult;
			expect(ratio).toBeCloseTo(3.78, 1);
		});
	});

	describe("productionOfBatteryBank", () => {
		it("should calculate battery bank production CO2 correctly", () => {
			// 184 lbs CO2 per kWh
			// 10 kWh battery bank = 1840 lbs CO2
			const result = HomeClass.productionOfBatteryBank(10);
			expect(result).toBe(1840);
		});

		it("should handle string input", () => {
			const result = HomeClass.productionOfBatteryBank("20");
			expect(result).toBe(3680);
		});

		it("should use correct production factor (184 lbs/kWh)", () => {
			const result = HomeClass.productionOfBatteryBank(1);
			expect(result).toBe(184);
		});

		it("should scale linearly with battery size", () => {
			const small = HomeClass.productionOfBatteryBank(5);
			const large = HomeClass.productionOfBatteryBank(15);
			expect(large).toBe(small * 3);
		});
	});

	describe("Emission Factor Constants Verification", () => {
		it("should match documented natural gas factor", () => {
			// From assumptions.txt: 11.7 lbs CO2/therm
			const result = HomeClass.co2FromNaturalGas(1);
			expect(result).toBe(11.7);
		});

		it("should match documented fuel oil gallon factor", () => {
			// From assumptions.txt: 22.61 lbs CO2/gallon fuel oil
			const result = HomeClass.co2FromHeatingOil(1, "gallons");
			expect(result).toBe(22.61);
		});

		it("should match documented fuel oil liter factor", () => {
			// From assumptions.txt: 5.98 lbs CO2/liter
			const result = HomeClass.co2FromHeatingOil(1, "liters");
			expect(result).toBe(5.98);
		});

		it("should match documented battery production factor", () => {
			// From assumptions.txt: 184 lbs CO2/kWh
			const result = HomeClass.productionOfBatteryBank(1);
			expect(result).toBe(184);
		});
	});

	describe("Real-world Scenarios", () => {
		it("should calculate typical US household electricity emissions", () => {
			// Average US household uses 943 kWh/month = 11,316 kWh/year
			// At average carbon intensity of 367 g/kWh
			const carbonIntensity = { carbonIntensity: 367 };
			const result = HomeClass.powerOnGrid(carbonIntensity, 11316);
			// Should be around 9150 lbs CO2
			expect(result).toBeCloseTo(9153, -1);
		});

		it("should calculate typical natural gas heating emissions", () => {
			// Average US home uses about 550 therms/year for heating
			const result = HomeClass.co2FromNaturalGas(550);
			// Should be about 6435 lbs CO2
			expect(result).toBeCloseTo(6435, 0);
		});

		it("should calculate typical fuel oil heating emissions", () => {
			// Average US home using fuel oil uses about 552 gallons/year
			const result = HomeClass.co2FromHeatingOil(552, "gallons");
			// Should be about 12,481 lbs CO2
			expect(result).toBeCloseTo(12481, 0);
		});
	});
});
