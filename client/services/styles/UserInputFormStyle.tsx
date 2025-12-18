import { Dimensions, StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing, typography } from "./theme";

const { height, width } = Dimensions.get("screen");
const inputWidth = Math.min(width - 32, 400);

const UserFormStyles = StyleSheet.create({
	container: {
		marginTop: 90,
		marginLeft: spacing.md,
		marginRight: spacing.md,
		paddingBottom: spacing.xxl,
	},
	scrollContainer: {
		flexGrow: 1,
	},
	title: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		marginBottom: spacing.lg,
		textAlign: "center",
		color: colors.textPrimary,
	},
	sectionTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.primary,
		marginTop: spacing.lg,
		marginBottom: spacing.md,
	},
	input: {
		marginBottom: spacing.md,
		backgroundColor: colors.surface,
	},
	inputOutline: {
		borderColor: colors.border,
		borderRadius: borderRadius.md,
	},
	inputOutlineFocused: {
		borderColor: colors.primary,
	},
	modeInput: {
		marginBottom: spacing.xl,
	},
	checkbox: {
		marginBottom: spacing.md,
	},
	commuteContainer: {
		marginTop: spacing.md,
		padding: spacing.md,
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		...shadows.sm,
	},
	subtitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		marginBottom: spacing.sm,
		textAlign: "center",
		color: colors.textPrimary,
	},
	smallTitle: {
		fontSize: typography.fontSizes.sm,
		fontWeight: typography.fontWeights.medium,
		marginBottom: spacing.xs,
		textAlign: "center",
		color: colors.textSecondary,
	},
	milesContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.md,
		gap: spacing.sm,
	},
	unitInput: {
		flex: 1,
	},
	button: {
		marginTop: spacing.lg,
		backgroundColor: colors.primaryLight,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		...shadows.sm,
	},
	buttonDisabled: {
		backgroundColor: colors.textMuted,
	},
	buttonText: {
		color: colors.textOnPrimary,
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		textAlign: "center",
	},
	secondaryButton: {
		marginTop: spacing.md,
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		borderWidth: 2,
		borderColor: colors.primaryLight,
	},
	secondaryButtonText: {
		color: colors.primaryLight,
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		textAlign: "center",
	},
	error: {
		color: colors.error,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
		marginTop: spacing.sm,
		marginBottom: spacing.xs,
		textAlign: "center",
	},
	radioButtonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: borderRadius.md,
		marginBottom: spacing.lg,
		overflow: "hidden",
		backgroundColor: colors.surface,
	},
	radioButton: {
		flex: 1,
		paddingVertical: spacing.sm,
		alignItems: "center",
		borderRightWidth: 1,
		borderRightColor: colors.border,
	},
	radioButtonLast: {
		borderRightWidth: 0,
	},
	radioButtonSelected: {
		backgroundColor: colors.primary,
	},
	radioButtonText: {
		color: colors.textPrimary,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
	},
	radioButtonTextSelected: {
		color: colors.textOnPrimary,
	},
	pickerContainer: {
		marginBottom: spacing.lg,
	},
	pickerLabel: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
		color: colors.textSecondary,
		marginBottom: spacing.sm,
	},
	card: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		marginBottom: spacing.md,
		...shadows.sm,
	},
	cardTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.bold,
		color: colors.textPrimary,
		marginBottom: spacing.sm,
	},
	helpText: {
		fontSize: typography.fontSizes.sm,
		color: colors.textMuted,
		marginTop: spacing.xs,
		fontStyle: "italic",
	},
	divider: {
		height: 1,
		backgroundColor: colors.divider,
		marginVertical: spacing.lg,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	flex1: {
		flex: 1,
	},
});

export default UserFormStyles;
