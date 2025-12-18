// Mock axios
jest.mock("axios", () => ({
	get: jest.fn(),
}));

const axios = require("axios");
const getCarbonIntensity = require("../../services/getLocationCarbonIntensity");

describe("getLocationCarbonIntensity Service", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("checkZipcodeExists", () => {
		it("should return true for valid zipcode", async () => {
			axios.get.mockResolvedValueOnce({
				data: {
					results: [
						{
							geometry: {
								location: { lat: 40.7128, lng: -74.006 },
							},
						},
					],
				},
			});

			const result = await getCarbonIntensity.checkZipcodeExists("10001");
			expect(result).toBe(true);
		});

		it("should return false for invalid zipcode", async () => {
			axios.get.mockResolvedValueOnce({
				data: {
					results: [],
				},
			});

			const result = await getCarbonIntensity.checkZipcodeExists("00000");
			expect(result).toBe(false);
		});

		it("should throw error on API failure", async () => {
			axios.get.mockRejectedValueOnce(new Error("API Error"));

			await expect(
				getCarbonIntensity.checkZipcodeExists("10001")
			).rejects.toThrow("API Error");
		});
	});

	describe("getLatLong", () => {
		it("should return latitude and longitude for valid zipcode", async () => {
			axios.get.mockResolvedValueOnce({
				data: {
					results: [
						{
							geometry: {
								location: { lat: 40.7128, lng: -74.006 },
							},
						},
					],
				},
			});

			const result = await getCarbonIntensity.getLatLong("10001");
			expect(result).toEqual({ latitude: 40.7128, longitude: -74.006 });
		});

		it("should throw error for invalid zipcode with no results", async () => {
			axios.get.mockResolvedValueOnce({
				data: {
					results: [],
				},
			});

			await expect(getCarbonIntensity.getLatLong("00000")).rejects.toThrow(
				"No results found for the given zip code"
			);
		});

		it("should throw error on API failure", async () => {
			axios.get.mockRejectedValueOnce(new Error("Network Error"));

			await expect(getCarbonIntensity.getLatLong("10001")).rejects.toThrow(
				"Network Error"
			);
		});
	});

	describe("fetchCarbonIntensity", () => {
		it("should return carbon intensity data for valid location", async () => {
			const mockCarbonData = {
				carbonIntensity: 367,
				datetime: "2024-01-01T00:00:00Z",
				updatedAt: "2024-01-01T00:00:00Z",
			};

			axios.get.mockResolvedValueOnce({
				data: mockCarbonData,
			});

			const location = { latitude: 40.7128, longitude: -74.006 };
			const result = await getCarbonIntensity.fetchCarbonIntensity(location);
			expect(result).toEqual(mockCarbonData);
		});

		it("should call API with correct URL and headers", async () => {
			const mockCarbonData = { carbonIntensity: 367 };
			axios.get.mockResolvedValueOnce({ data: mockCarbonData });

			const location = { latitude: 40.7128, longitude: -74.006 };
			await getCarbonIntensity.fetchCarbonIntensity(location);

			expect(axios.get).toHaveBeenCalled();
			const callArgs = axios.get.mock.calls[0];
			expect(callArgs[0]).toContain("electricitymaps.com");
			expect(callArgs[1]).toHaveProperty("headers");
			expect(callArgs[1].headers).toHaveProperty("auth-token");
		});

		it("should include latitude and longitude in API URL", async () => {
			axios.get.mockResolvedValueOnce({ data: { carbonIntensity: 367 } });

			const location = { latitude: 40.7128, longitude: -74.006 };
			await getCarbonIntensity.fetchCarbonIntensity(location);

			expect(axios.get).toHaveBeenCalled();
			const callArgs = axios.get.mock.calls[0];
			expect(callArgs[0]).toContain("lat=40.7128");
			expect(callArgs[0]).toContain("lon=-74.006");
		});
	});
});
