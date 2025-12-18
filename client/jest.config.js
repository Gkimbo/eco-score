module.exports = {
	preset: "jest-expo",
	setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect", "<rootDir>/jest.setup.js"],
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|lucide-react-native|react-router-native|react-router)",
	],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
	},
	testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
	collectCoverageFrom: [
		"components/**/*.{ts,tsx}",
		"services/**/*.{ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
	],
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statements: 50,
		},
	},
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
