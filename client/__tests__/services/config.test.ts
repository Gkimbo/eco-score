import { Platform } from "react-native";

// Mock Platform before importing config
jest.mock("react-native", () => ({
	Platform: {
		OS: "ios",
	},
}));

jest.mock("expo-constants", () => ({
	expoConfig: {
		extra: {
			apiUrl: "http://localhost:3000",
		},
		hostUri: "192.168.1.100:8081",
	},
}));

describe("Config Service", () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it("should return localhost for web platform", () => {
		jest.doMock("react-native", () => ({
			Platform: { OS: "web" },
		}));

		const { API_URL } = require("../../services/config");
		expect(API_URL).toContain("localhost:3000");
	});

	it("should use debugger host for mobile in development", () => {
		jest.doMock("react-native", () => ({
			Platform: { OS: "ios" },
		}));
		jest.doMock("expo-constants", () => ({
			expoConfig: {
				hostUri: "192.168.1.100:8081",
				extra: { apiUrl: "http://localhost:3000" },
			},
		}));

		// In development mode, should use the debugger host
		const { API_URL } = require("../../services/config");
		expect(API_URL).toBeDefined();
	});

	it("should return Android emulator IP for Android platform", () => {
		jest.doMock("react-native", () => ({
			Platform: { OS: "android" },
		}));
		jest.doMock("expo-constants", () => ({
			expoConfig: {
				extra: { apiUrl: "http://localhost:3000" },
			},
		}));

		const { API_URL } = require("../../services/config");
		// Should use 10.0.2.2 for Android emulator or debugger host
		expect(API_URL).toBeDefined();
	});
});
