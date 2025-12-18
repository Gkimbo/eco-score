import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, typography } from "./theme";

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginBottom: spacing.md,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: borderRadius.md,
		color: colors.textPrimary,
		backgroundColor: colors.surface,
		fontSize: typography.fontSizes.lg,
	},
	inputAndroid: {
		marginBottom: spacing.md,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: borderRadius.md,
		color: colors.textPrimary,
		backgroundColor: colors.surface,
		fontSize: typography.fontSizes.lg,
	},
	inputWeb: {
		marginBottom: spacing.md,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: borderRadius.md,
		color: colors.textPrimary,
		backgroundColor: colors.surface,
		fontSize: typography.fontSizes.lg,
	},
	placeholder: {
		color: colors.textMuted,
	},
	iconContainer: {
		top: spacing.md,
		right: spacing.md,
	},
	viewContainer: {
		marginBottom: spacing.md,
	},
	headlessAndroidContainer: {
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: borderRadius.md,
		backgroundColor: colors.surface,
	},
});

export default pickerSelectStyles;
