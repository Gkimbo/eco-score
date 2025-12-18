import { Platform } from "react-native";
import Constants from "expo-constants";

// Get the API URL based on the platform and environment
const getApiUrl = (): string => {
	// Check if we have a configured API URL in app.json extra
	const configuredUrl = Constants.expoConfig?.extra?.apiUrl;

	// In production, use the configured URL
	if (!__DEV__ && configuredUrl && !configuredUrl.includes("localhost")) {
		return configuredUrl;
	}

	// In development, handle different platforms
	if (Platform.OS === "web") {
		// Web can use localhost
		return "http://localhost:3000";
	}

	// For iOS and Android in development
	// Try multiple sources for the development machine's IP
	let debuggerHost: string | undefined;

	// Try expoConfig.hostUri first (works in Expo Go)
	if (Constants.expoConfig?.hostUri) {
		debuggerHost = Constants.expoConfig.hostUri.split(":")[0];
	}

	// Fallback to expoGoConfig for Expo Go
	if (!debuggerHost && (Constants as any).expoGoConfig?.debuggerHost) {
		debuggerHost = (Constants as any).expoGoConfig.debuggerHost.split(":")[0];
	}

	// Use manifest for older Expo versions
	if (!debuggerHost && (Constants as any).manifest?.debuggerHost) {
		debuggerHost = (Constants as any).manifest.debuggerHost.split(":")[0];
	}

	if (debuggerHost && debuggerHost !== "localhost") {
		return `http://${debuggerHost}:3000`;
	}

	// For iOS simulator, localhost works
	if (Platform.OS === "ios") {
		return "http://localhost:3000";
	}

	// For Android emulator, use special IP that routes to host machine
	if (Platform.OS === "android") {
		return "http://10.0.2.2:3000";
	}

	// Ultimate fallback
	return "http://localhost:3000";
};

export const API_URL = getApiUrl();

export default {
	API_URL,
};
