import { useContext } from "react";
import type React from "react";
import { Image, Text, Pressable, View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigate } from "react-router-native";
import LandingPageStyles from "../services/styles/LandingPageStyle";
import { AuthContext } from "../services/AuthContext";
import { colors, borderRadius, shadows, spacing, typography } from "../services/styles/theme";

const logoImage = require("../assets/landing-photo.png");

export interface IAppProps {
	state: any;
	dispatch: any;
}

const LandingPage: React.FunctionComponent<IAppProps> = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const handleSignIn = () => {
		navigate("/sign-in");
	};

	const handleSignUp = () => {
		navigate("/sign-up");
	};

	return (
		<View style={styles.container}>
			{/* Header Section */}
			<View style={styles.header}>
				<Image source={logoImage} style={styles.logo} />
				<Text style={styles.appName}>Eco Score</Text>
				<Text style={styles.tagline}>Track Your Carbon Footprint</Text>
			</View>

			{/* Footer Card */}
			<Animatable.View style={styles.footer} animation="fadeInUpBig">
				<Text style={styles.title}>What's Your Score?</Text>

				<Text style={styles.paragraph}>
					Welcome to Eco Score! The first step towards a greener, more
					sustainable future. Let's track, reduce, and revolutionize our
					world together!
				</Text>

				{/* Feature Icons */}
				<View style={styles.featureContainer}>
					<View style={styles.featureItem}>
						<View style={styles.featureIcon}>
							<Text style={styles.featureEmoji}>🚗</Text>
						</View>
						<Text style={styles.featureText}>Track Cars</Text>
					</View>
					<View style={styles.featureItem}>
						<View style={styles.featureIcon}>
							<Text style={styles.featureEmoji}>🏠</Text>
						</View>
						<Text style={styles.featureText}>Track Homes</Text>
					</View>
					<View style={styles.featureItem}>
						<View style={styles.featureIcon}>
							<Text style={styles.featureEmoji}>🌳</Text>
						</View>
						<Text style={styles.featureText}>Plant Trees</Text>
					</View>
				</View>

				{/* Buttons */}
				<View style={styles.buttonContainer}>
					<Pressable onPress={handleSignIn} style={styles.signInButton}>
						<Text style={styles.signInText}>Sign In</Text>
						<Icon name="arrow-right" size={16} color={colors.textOnPrimary} />
					</Pressable>

					<Pressable onPress={handleSignUp} style={styles.signUpButton}>
						<Text style={styles.signUpText}>Sign Up</Text>
					</Pressable>
				</View>
			</Animatable.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	header: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: spacing.xxl,
	},
	logo: {
		width: 150,
		height: 150,
		borderRadius: 75,
		borderWidth: 4,
		borderColor: colors.textOnDark,
		marginBottom: spacing.md,
	},
	appName: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
		textShadowColor: "rgba(0,0,0,0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
	tagline: {
		fontSize: typography.fontSizes.lg,
		color: colors.textOnDark,
		marginTop: spacing.xs,
	},
	footer: {
		backgroundColor: colors.surface,
		borderTopLeftRadius: borderRadius.xl,
		borderTopRightRadius: borderRadius.xl,
		paddingVertical: spacing.xl,
		paddingHorizontal: spacing.lg,
		...shadows.lg,
	},
	title: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
		textAlign: "center",
		marginBottom: spacing.sm,
	},
	paragraph: {
		fontSize: typography.fontSizes.md,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 22,
		marginBottom: spacing.lg,
	},
	featureContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: spacing.xl,
	},
	featureItem: {
		alignItems: "center",
	},
	featureIcon: {
		width: 56,
		height: 56,
		borderRadius: borderRadius.full,
		backgroundColor: colors.background,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: spacing.sm,
		...shadows.sm,
	},
	featureEmoji: {
		fontSize: 24,
	},
	featureText: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
		fontWeight: typography.fontWeights.medium,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: spacing.md,
	},
	signInButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.primaryLight,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.xl,
		borderRadius: borderRadius.full,
		gap: spacing.sm,
		...shadows.sm,
	},
	signInText: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
	},
	signUpButton: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.surface,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.xl,
		borderRadius: borderRadius.full,
		borderWidth: 2,
		borderColor: colors.primaryLight,
	},
	signUpText: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryLight,
	},
});

export default LandingPage;
