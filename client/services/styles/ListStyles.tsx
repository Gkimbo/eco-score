import { Dimensions, StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing, typography } from "./theme";

const { height, width } = Dimensions.get("screen");

const ListStyles = StyleSheet.create({
	container: {
		marginTop: 80,
		flex: 1,
		backgroundColor: colors.background,
	},
	scrollContainer: {
		paddingHorizontal: spacing.md,
		paddingBottom: spacing.xxl,
	},
	headerContainer: {
		paddingVertical: spacing.lg,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: spacing.md,
		marginTop: spacing.sm,
		gap: spacing.md,
	},
	addButton: {
		backgroundColor: colors.primaryLight,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
		borderRadius: borderRadius.full,
		flexDirection: "row",
		alignItems: "center",
		...shadows.sm,
	},
	buttonText: {
		alignSelf: "center",
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textOnPrimary,
	},
	buttonIcon: {
		marginRight: spacing.sm,
	},
	infoContainer: {
		borderRadius: borderRadius.lg,
		backgroundColor: colors.surface,
		marginVertical: spacing.sm,
		padding: spacing.md,
		...shadows.md,
		borderLeftWidth: 4,
		borderLeftColor: colors.primary,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: spacing.sm,
	},
	cardTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.bold,
		color: colors.textPrimary,
	},
	cardSubtitle: {
		fontSize: typography.fontSizes.md,
		color: colors.textSecondary,
	},
	cardDetail: {
		fontSize: typography.fontSizes.sm,
		color: colors.textMuted,
		marginTop: spacing.xs,
	},
	cardValue: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primary,
	},
	cardUnit: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
	},
	deleteButton: {
		padding: spacing.sm,
		backgroundColor: colors.error,
		borderRadius: borderRadius.md,
	},
	editButton: {
		padding: spacing.sm,
		backgroundColor: colors.accent,
		borderRadius: borderRadius.md,
		marginRight: spacing.sm,
	},
	title: {
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textPrimary,
	},
	emptyContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: spacing.xxl,
	},
	emptyText: {
		fontSize: typography.fontSizes.lg,
		color: colors.textMuted,
		textAlign: "center",
		marginTop: spacing.md,
	},
	emptyIcon: {
		opacity: 0.5,
	},
	summaryContainer: {
		backgroundColor: colors.primaryDark,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginHorizontal: spacing.md,
		marginBottom: spacing.lg,
		...shadows.md,
	},
	summaryTitle: {
		fontSize: typography.fontSizes.md,
		color: colors.textOnDark,
		marginBottom: spacing.sm,
	},
	summaryValue: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
	},
	summaryUnit: {
		fontSize: typography.fontSizes.md,
		color: colors.textOnDark,
	},
	highlightCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		marginBottom: spacing.md,
		...shadows.sm,
	},
	highlightRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: spacing.xs,
	},
	highlightLabel: {
		fontSize: typography.fontSizes.md,
		color: colors.textSecondary,
	},
	highlightValue: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
});

export default ListStyles;
