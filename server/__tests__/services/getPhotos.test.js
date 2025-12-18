const getPhotos = require("../../services/getPhotos");

// Mock axios
jest.mock("axios", () => ({
	get: jest.fn(),
}));

const axios = require("axios");

describe("getPhotos Service", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getPhotos", () => {
		it("should return photo URL for valid car and year", async () => {
			const mockPhotoUrl = "https://images.unsplash.com/photo-123456";
			axios.get.mockResolvedValueOnce({
				data: {
					results: [
						{
							urls: {
								regular: mockPhotoUrl,
							},
						},
					],
				},
			});

			const result = await getPhotos("Tesla Model 3", 2023);
			expect(result).toBe(mockPhotoUrl);
		});

		it("should construct correct API URL with car and year", async () => {
			axios.get.mockResolvedValueOnce({
				data: {
					results: [{ urls: { regular: "https://example.com/photo.jpg" } }],
				},
			});

			await getPhotos("Ford Mustang", 2022);

			expect(axios.get).toHaveBeenCalledWith(
				expect.stringContaining("Ford Mustang")
			);
			expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("2022"));
		});

		it("should return error object on API failure", async () => {
			axios.get.mockRejectedValueOnce(new Error("API Error"));

			const result = await getPhotos("Unknown Car", 2023);
			expect(result).toEqual({ error: "API Error" });
		});

		it("should handle empty results array", async () => {
			axios.get.mockResolvedValueOnce({
				data: {
					results: [],
				},
			});

			const result = await getPhotos("Nonexistent Car", 2023);
			expect(result).toEqual({ error: expect.any(String) });
		});

		it("should call Unsplash API", async () => {
			axios.get.mockResolvedValueOnce({
				data: {
					results: [{ urls: { regular: "https://example.com/photo.jpg" } }],
				},
			});

			await getPhotos("Honda Civic", 2021);

			expect(axios.get).toHaveBeenCalledWith(
				expect.stringContaining("api.unsplash.com")
			);
		});
	});
});
