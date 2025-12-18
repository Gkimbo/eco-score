// Jest setup file for React Native testing

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
	require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mock react-native-vector-icons
jest.mock("react-native-vector-icons/FontAwesome", () => "Icon");
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

// Mock lucide-react-native
jest.mock("lucide-react-native", () => ({
	Star: "Star",
	Home: "Home",
	Car: "Car",
	User: "User",
	ChevronRight: "ChevronRight",
}));

// Mock react-native-animatable
jest.mock("react-native-animatable", () => {
	const { View } = require("react-native");
	return {
		View: View,
		createAnimatableComponent: (Component) => Component,
	};
});

// Mock react-router-native
jest.mock("react-router-native", () => ({
	...jest.requireActual("react-router-native"),
	useNavigate: () => jest.fn(),
	useLocation: () => ({ pathname: "/" }),
	NativeRouter: ({ children }) => children,
}));

// Mock react-native-paper
jest.mock("react-native-paper", () => {
	const { View, Text } = require("react-native");
	return {
		PaperProvider: ({ children }) => children,
		Portal: ({ children }) => children,
		Modal: ({ children, visible }) => (visible ? children : null),
		Drawer: { Item: View },
		TextInput: View,
		Button: View,
		Card: View,
		Title: Text,
		Paragraph: Text,
	};
});

// Mock expo-constants
jest.mock("expo-constants", () => ({
	expoConfig: {
		extra: {
			apiUrl: "http://localhost:3000",
		},
		hostUri: "localhost:8081",
	},
}));

// Silence console warnings during tests
const originalWarn = console.warn;
console.warn = (...args) => {
	if (
		typeof args[0] === "string" &&
		(args[0].includes("Animated") ||
			args[0].includes("componentWillReceiveProps") ||
			args[0].includes("componentWillMount"))
	) {
		return;
	}
	originalWarn.apply(console, args);
};

// Global fetch mock
global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({}),
	})
);
