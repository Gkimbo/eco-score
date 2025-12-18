import { Dimensions, StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing, typography } from "./theme";

const { height, width } = Dimensions.get("screen");
const heightLogo = height * 0.25;
const widthScreen = Math.min(width * 0.9, 400);

const LandingPageStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
	},
	header: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: spacing.xl,
	},
	footer: {
		flex: 1,
		backgroundColor: colors.surface,
		borderTopLeftRadius: borderRadius.xl,
		borderTopRightRadius: borderRadius.xl,
		paddingVertical: spacing.xl,
		paddingHorizontal: spacing.lg,
		width: widthScreen,
		...shadows.lg,
	},
	logo: {
		width: heightLogo,
		height: heightLogo,
		borderRadius: heightLogo / 2,
		marginTop: spacing.lg,
		marginBottom: spacing.lg,
		marginLeft: "auto",
		marginRight: "auto",
		borderWidth: 4,
		borderColor: colors.textOnDark,
	},
	logoReg: {
		width: heightLogo * 0.35,
		height: heightLogo * 0.35,
		borderRadius: borderRadius.lg,
		marginTop: spacing.lg,
		marginBottom: spacing.lg,
		marginLeft: "auto",
		marginRight: "auto",
	},
	appName: {
		color: colors.textOnPrimary,
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		textAlign: "center",
		textShadowColor: "rgba(0,0,0,0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
	tagline: {
		color: colors.textOnDark,
		fontSize: typography.fontSizes.lg,
		textAlign: "center",
		marginTop: spacing.sm,
	},
	title: {
		color: colors.primaryDark,
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		marginBottom: spacing.sm,
		alignSelf: "center",
	},
	text: {
		color: colors.textSecondary,
		marginTop: spacing.sm,
		alignSelf: "center",
		fontSize: typography.fontSizes.md,
	},
	button: {
		alignItems: "flex-end",
		marginTop: spacing.lg,
	},
	paragraph: {
		marginTop: spacing.xl,
		marginBottom: spacing.xl,
		textAlign: "center",
		color: colors.textSecondary,
		alignSelf: "center",
		fontSize: typography.fontSizes.md,
		lineHeight: 22,
		paddingHorizontal: spacing.md,
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.md,
	},
	signIn: {
		width: 150,
		height: 48,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: borderRadius.full,
		flexDirection: "row",
		backgroundColor: colors.primaryLight,
		...shadows.sm,
	},
	signUp: {
		width: 150,
		height: 48,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: borderRadius.full,
		flexDirection: "row",
		backgroundColor: colors.surface,
		borderWidth: 2,
		borderColor: colors.primaryLight,
	},
	textSign: {
		color: colors.textOnPrimary,
		fontWeight: typography.fontWeights.bold,
		fontSize: typography.fontSizes.lg,
	},
	textSignOutline: {
		color: colors.primaryLight,
		fontWeight: typography.fontWeights.bold,
		fontSize: typography.fontSizes.lg,
	},
	featureContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: spacing.lg,
		marginBottom: spacing.md,
	},
	featureItem: {
		alignItems: "center",
		flex: 1,
	},
	featureIcon: {
		width: 48,
		height: 48,
		borderRadius: borderRadius.full,
		backgroundColor: colors.background,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: spacing.sm,
	},
	featureText: {
		fontSize: typography.fontSizes.xs,
		color: colors.textSecondary,
		textAlign: "center",
	},
});

export default LandingPageStyles;
