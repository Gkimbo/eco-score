import { Dimensions, StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing, typography } from "./theme";

const { width, height } = Dimensions.get("window");

const homePageStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 100,
		paddingHorizontal: spacing.md,
	},
	leftContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginRight: spacing.lg,
	},
	rightContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: spacing.lg,
	},
	leftAndCenterContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	centerAndRightContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	iconWithNumber: {
		alignItems: "center",
		marginBottom: spacing.sm,
		borderRadius: borderRadius.lg,
		backgroundColor: colors.primary,
		width: 70,
		padding: spacing.sm,
		...shadows.sm,
	},
	iconText: {
		color: colors.textOnPrimary,
		fontSize: typography.fontSizes.sm,
		fontWeight: typography.fontWeights.bold,
		marginTop: spacing.xs,
	},
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		marginBottom: spacing.lg,
		color: colors.textPrimary,
	},
	subheader: {
		fontSize: typography.fontSizes.lg,
		color: colors.textSecondary,
		marginBottom: spacing.md,
	},
	circleContainer: {
		width: 220,
		height: 220,
		borderRadius: 110,
		backgroundColor: colors.backgroundDark,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
		...shadows.lg,
		borderWidth: 4,
		borderColor: colors.border,
	},
	circle: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		borderRadius: 110,
	},
	circleExcellent: {
		backgroundColor: colors.carbonExcellent,
	},
	circleGood: {
		backgroundColor: colors.carbonGood,
	},
	circleModerate: {
		backgroundColor: colors.carbonModerate,
	},
	circlePoor: {
		backgroundColor: colors.carbonPoor,
	},
	carbonText: {
		fontSize: typography.fontSizes.hero,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
		textShadowColor: "rgba(0,0,0,0.3)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	carbonLabel: {
		fontSize: typography.fontSizes.sm,
		color: colors.textOnPrimary,
		marginTop: spacing.xs,
	},
	buttonText: {
		color: colors.textOnPrimary,
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		textAlign: "center",
	},
	topBarContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: spacing.xl,
		paddingHorizontal: spacing.md,
	},
	statCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		alignItems: "center",
		minWidth: 100,
		...shadows.sm,
	},
	statValue: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primary,
	},
	statLabel: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
		marginTop: spacing.xs,
	},
	logoutButton: {
		backgroundColor: colors.error,
		padding: spacing.sm,
		borderRadius: borderRadius.md,
	},
	logoutButtonText: {
		color: colors.textOnPrimary,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
	},
});

export default homePageStyles;
