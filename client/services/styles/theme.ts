// Eco Score Modern Green Theme
// A modern, eco-friendly color palette for carbon footprint tracking

export const colors = {
	// Primary Green Palette
	primary: "#2E7D32", // Deep forest green - main brand color
	primaryLight: "#4CAF50", // Material green - buttons, accents
	primaryDark: "#1B5E20", // Very dark green - headers, emphasis
	primarySoft: "#81C784", // Soft green - secondary elements

	// Background Colors
	background: "#F1F8E9", // Light mint - main app background
	backgroundDark: "#DCEDC8", // Slightly darker mint
	surface: "#FFFFFF", // White - cards, modals
	surfaceElevated: "#FAFAFA", // Slightly off-white

	// Accent Colors
	accent: "#00897B", // Teal - secondary actions
	accentLight: "#4DB6AC", // Light teal
	highlight: "#FFB74D", // Warm amber - rewards, highlights
	highlightDark: "#FF9800", // Orange - important actions

	// Text Colors
	textPrimary: "#1A1A1A", // Near black - main text
	textSecondary: "#5D5D5D", // Dark gray - secondary text
	textMuted: "#9E9E9E", // Light gray - hints, placeholders
	textOnPrimary: "#FFFFFF", // White text on green backgrounds
	textOnDark: "#FFFFFF", // White text on dark backgrounds (high contrast)

	// Semantic Colors
	success: "#43A047", // Green - positive indicators
	warning: "#FFA726", // Orange - warnings
	error: "#E53935", // Red - errors
	info: "#29B6F6", // Blue - information

	// Carbon Score Colors (for the progress indicator)
	carbonExcellent: "#2E7D32", // Dark green - excellent score
	carbonGood: "#66BB6A", // Medium green - good score
	carbonModerate: "#FFA726", // Orange - moderate score
	carbonPoor: "#EF5350", // Red - poor score

	// Border & Divider
	border: "#C8E6C9", // Light green border
	borderDark: "#A5D6A7", // Slightly darker border
	divider: "#E0E0E0", // Gray divider

	// Gradients (as array for LinearGradient)
	gradientPrimary: ["#2E7D32", "#4CAF50"],
	gradientDark: ["#1B5E20", "#2E7D32"],
	gradientLight: ["#81C784", "#A5D6A7"],
	gradientAccent: ["#00897B", "#4DB6AC"],
};

export const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,
};

export const borderRadius = {
	sm: 4,
	md: 8,
	lg: 16,
	xl: 24,
	full: 9999,
};

export const typography = {
	fontSizes: {
		xs: 10,
		sm: 12,
		md: 14,
		lg: 16,
		xl: 18,
		xxl: 24,
		xxxl: 32,
		hero: 48,
	},
	fontWeights: {
		regular: "400" as const,
		medium: "500" as const,
		semibold: "600" as const,
		bold: "700" as const,
	},
};

export const shadows = {
	sm: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	md: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 4,
	},
	lg: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 8,
	},
};

export default {
	colors,
	spacing,
	borderRadius,
	typography,
	shadows,
};
