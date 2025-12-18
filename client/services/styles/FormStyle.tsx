import { Dimensions, StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing, typography } from "./theme";

const { width } = Dimensions.get("screen");
const formWidth = Math.min(width * 0.85, 320);

const formStyles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	header: {
		fontWeight: typography.fontWeights.bold,
		fontSize: typography.fontSizes.xl,
		color: colors.textPrimary,
		marginBottom: spacing.md,
		textAlign: "center",
	},
	button: {
		marginTop: spacing.lg,
		backgroundColor: colors.primaryLight,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		width: formWidth,
		alignItems: "center",
		justifyContent: "center",
		...shadows.sm,
	},
	buttonPressed: {
		backgroundColor: colors.primary,
	},
	buttonText: {
		color: colors.textOnPrimary,
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		textAlign: "center",
	},
	text: {
		textAlign: "center",
		color: colors.textPrimary,
	},
	input: {
		height: 48,
		width: formWidth,
		borderColor: colors.border,
		borderWidth: 1,
		borderRadius: borderRadius.md,
		marginBottom: spacing.md,
		paddingHorizontal: spacing.md,
		fontSize: typography.fontSizes.md,
		backgroundColor: colors.surface,
		color: colors.textPrimary,
	},
	inputFocused: {
		borderColor: colors.primary,
		borderWidth: 2,
	},
	label: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
		color: colors.textSecondary,
		marginBottom: spacing.xs,
	},
	errorContainer: {
		backgroundColor: "#FFEBEE",
		padding: spacing.sm,
		marginBottom: spacing.md,
		borderRadius: borderRadius.sm,
		borderLeftWidth: 4,
		borderLeftColor: colors.error,
		width: formWidth,
	},
	errorText: {
		color: colors.error,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
	},
	successContainer: {
		backgroundColor: "#E8F5E9",
		padding: spacing.sm,
		marginBottom: spacing.md,
		borderRadius: borderRadius.sm,
		borderLeftWidth: 4,
		borderLeftColor: colors.success,
	},
	successText: {
		color: colors.success,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
	},
	linkText: {
		color: colors.primary,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
		textDecorationLine: "underline",
	},
});

export default formStyles;
