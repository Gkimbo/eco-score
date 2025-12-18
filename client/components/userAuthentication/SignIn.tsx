import React from "react";
import {
	Image,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	Pressable,
	View,
	StyleSheet,
	Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigate } from "react-router-native";

import SignInForm from "./forms/SignInForm";
import { colors, borderRadius, shadows, spacing, typography } from "../../services/styles/theme";

const logoImage = require("../../assets/landing-photo.png");

export interface IAppProps {
	state: any;
	dispatch: any;
}

const SignIn: React.FunctionComponent<IAppProps> = ({ state, dispatch }) => {
	const navigate = useNavigate();

	const handlePress = () => {
		navigate("/sign-up");
	};

	const handleBack = () => {
		navigate("/");
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				{/* Header with Logo */}
				<View style={styles.header}>
					<Image source={logoImage} style={styles.logo} />
					<Text style={styles.appName}>Eco Score</Text>
				</View>

				{/* Form Card */}
				<Animatable.View style={styles.formCard} animation="fadeInUp" duration={600}>
					<Text style={styles.title}>Welcome Back!</Text>
					<Text style={styles.subtitle}>Sign in to continue</Text>

					<SignInForm state={state} dispatch={dispatch} />

					<View style={styles.divider}>
						<View style={styles.dividerLine} />
						<Text style={styles.dividerText}>or</Text>
						<View style={styles.dividerLine} />
					</View>

					<Text style={styles.switchText}>Don't have an account?</Text>
					<Pressable onPress={handlePress} style={styles.switchButton}>
						<Text style={styles.switchButtonText}>Sign Up</Text>
						<Icon name="arrow-right" size={14} color={colors.primary} />
					</Pressable>
				</Animatable.View>

				{/* Back Button */}
				<Pressable onPress={handleBack} style={styles.backButton}>
					<Icon name="arrow-left" size={14} color={colors.textOnPrimary} />
					<Text style={styles.backButtonText}>Back to Home</Text>
				</Pressable>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.xl,
		paddingBottom: spacing.xxl,
	},
	header: {
		alignItems: "center",
		marginBottom: spacing.lg,
	},
	logo: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 3,
		borderColor: colors.textOnDark,
		marginBottom: spacing.sm,
	},
	appName: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
	},
	formCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.xl,
		padding: spacing.lg,
		...shadows.lg,
	},
	title: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
		textAlign: "center",
		marginBottom: spacing.xs,
	},
	subtitle: {
		fontSize: typography.fontSizes.md,
		color: colors.textSecondary,
		textAlign: "center",
		marginBottom: spacing.lg,
	},
	divider: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: spacing.lg,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: colors.divider,
	},
	dividerText: {
		marginHorizontal: spacing.md,
		color: colors.textMuted,
		fontSize: typography.fontSizes.sm,
	},
	switchText: {
		textAlign: "center",
		color: colors.textSecondary,
		fontSize: typography.fontSizes.md,
		marginBottom: spacing.sm,
	},
	switchButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.sm,
		paddingVertical: spacing.sm,
	},
	switchButtonText: {
		color: colors.primary,
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.sm,
		marginTop: spacing.lg,
		paddingVertical: spacing.sm,
	},
	backButtonText: {
		color: colors.textOnPrimary,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
	},
});

export default SignIn;
