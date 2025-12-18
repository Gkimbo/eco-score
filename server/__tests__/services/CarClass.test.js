// Mock cheerio before requiring CarClass
jest.mock("cheerio", () => ({
	load: jest.fn().mockReturnValue(() => ({
		text: jest.fn().mockReturnValue(""),
	})),
}));

// Mock axios
jest.mock("axios", () => ({
	get: jest.fn(),
}));

// Mock getLocationCarbonIntensity
jest.mock("../../services/getLocationCarbonIntensity", () => ({
	getLatLong: jest.fn().mockResolvedValue({ lat: 40.7128, lng: -74.006 }),
	fetchCarbonIntensity: jest.fn().mockResolvedValue({ carbonIntensity: 367 }),
}));

// Mock getPhotos
jest.mock("../../services/getPhotos", () => jest.fn().mockResolvedValue("https://example.com/photo.jpg"));

const CarCalculation = require("../../services/CarClass");

describe("CarCalculation Service", () => {
	describe("co2PerGallonGas", () => {
		it("should calculate CO2 emissions for gas cars correctly", () => {
			// 19.6 lbs CO2 per gallon of gas
			// For a car with 30 MPG and 15 gallon tank:
			// Range = 30 * 15 = 450 miles
			// CO2 per mile = 19.6 / 30 = 0.653 lbs/mile
			// CO2 per tank = 450 * 0.653 = 294 lbs
			const result = CarCalculation.co2PerGallonGas(30, 15);
			expect(result).toBeCloseTo(294, 0);
		});

		it("should handle different MPG values", () => {
			// Higher MPG = less CO2 per mile
			const efficientCar = CarCalculation.co2PerGallonGas(50, 10);
			const inefficientCar = CarCalculation.co2PerGallonGas(20, 10);
			expect(efficientCar).toBeLessThan(inefficientCar);
		});

		it("should scale linearly with tank size", () => {
			const smallTank = CarCalculation.co2PerGallonGas(30, 10);
			const largeTank = CarCalculation.co2PerGallonGas(30, 20);
			expect(largeTank).toBeCloseTo(smallTank * 2, 0);
		});
	});

	describe("co2PerGallonDiesel", () => {
		it("should calculate CO2 emissions for diesel cars correctly", () => {
			// 22.44 lbs CO2 per gallon of diesel
			// For a car with 40 MPG and 15 gallon tank:
			// Range = 40 * 15 = 600 miles
			// CO2 per mile = 22.44 / 40 = 0.561 lbs/mile
			// CO2 per tank = 600 * 0.561 = 336.6 lbs
			const result = CarCalculation.co2PerGallonDiesel(40, 15);
			expect(result).toBeCloseTo(336.6, 0);
		});

		it("should produce more CO2 per gallon than gas", () => {
			// Diesel emits more CO2 per gallon but is more efficient
			// Same MPG comparison shows diesel emits more
			const gasResult = CarCalculation.co2PerGallonGas(30, 15);
			const dieselResult = CarCalculation.co2PerGallonDiesel(30, 15);
			expect(dieselResult).toBeGreaterThan(gasResult);
		});
	});

	describe("evChargedOnGrid", () => {
		it("should calculate CO2 for EV charging on grid", () => {
			// Carbon intensity of 367 grams/kWh (US average)
			// 50 kWh battery
			// 367 g/kWh * 50 kWh = 18,350 grams = 40.45 lbs
			const carbonIntensity = { carbonIntensity: 367 };
			const result = CarCalculation.evChargedOnGrid(carbonIntensity, 50);
			expect(result).toBeCloseTo(40.45, 1);
		});

		it("should scale with battery size", () => {
			const carbonIntensity = { carbonIntensity: 367 };
			const smallBattery = CarCalculation.evChargedOnGrid(carbonIntensity, 40);
			const largeBattery = CarCalculation.evChargedOnGrid(carbonIntensity, 80);
			expect(largeBattery).toBeCloseTo(smallBattery * 2, 1);
		});

		it("should scale with carbon intensity", () => {
			const lowCarbon = { carbonIntensity: 100 };
			const highCarbon = { carbonIntensity: 400 };
			const lowResult = CarCalculation.evChargedOnGrid(lowCarbon, 50);
			const highResult = CarCalculation.evChargedOnGrid(highCarbon, 50);
			expect(highResult).toBeCloseTo(lowResult * 4, 1);
		});
	});

	describe("evProductionOfBattery", () => {
		it("should calculate battery production CO2 correctly", () => {
			// 184 lbs CO2 per kWh of battery
			// 50 kWh battery = 9200 lbs CO2
			const result = CarCalculation.evProductionOfBattery(50);
			expect(result).toBe(9200);
		});

		it("should scale linearly with battery size", () => {
			const small = CarCalculation.evProductionOfBattery(30);
			const large = CarCalculation.evProductionOfBattery(60);
			expect(large).toBe(small * 2);
		});

		it("should handle string input", () => {
			// The function uses parseInt, so strings should work
			const result = CarCalculation.evProductionOfBattery("75");
			expect(result).toBe(13800);
		});
	});

	describe("Emission Factor Constants", () => {
		it("should use correct gas emission factor (19.6 lbs/gallon)", () => {
			// Test that gas calculation uses 19.6 lbs CO2 per gallon
			const mpg = 1; // Use 1 MPG for easy calculation
			const tank = 1; // 1 gallon tank
			const result = CarCalculation.co2PerGallonGas(mpg, tank);
			// CO2 per mile = 19.6 / 1 = 19.6
			// Range = 1 * 1 = 1 mile
			// Total = 1 * 19.6 = 19.6
			expect(result).toBe(19.6);
		});

		it("should use correct diesel emission factor (22.44 lbs/gallon)", () => {
			const mpg = 1;
			const tank = 1;
			const result = CarCalculation.co2PerGallonDiesel(mpg, tank);
			expect(result).toBe(22.44);
		});

		it("should use correct battery production factor (184 lbs/kWh)", () => {
			const result = CarCalculation.evProductionOfBattery(1);
			expect(result).toBe(184);
		});
	});
});
