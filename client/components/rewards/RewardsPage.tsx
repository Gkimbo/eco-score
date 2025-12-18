import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FetchData from "../../services/fetchData";
import AddBasicsButton from "../navBar/AddBasicInfoButton";
import { colors, spacing, borderRadius, typography, shadows } from "../../services/styles/theme";

interface RewardsScreenProps {
	setIsDrawerOpen: any;
	isDrawerOpen: boolean;
	state: any;
	dispatch: any;
}

const RewardsPage: React.FC<RewardsScreenProps> = ({
	setIsDrawerOpen,
	isDrawerOpen,
	state,
	dispatch,
}) => {
	const insets = useSafeAreaInsets();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleWatchAd = () => {
		setIsLoading(true);
		FetchData.addReward({
			user: state.currentUser,
			rewards: 10,
		}).then((response) => {
			dispatch({ type: "ADD_STARS", payload: 10 });
			setError(null);
			setIsLoading(false);
		});
	};

	const handleDonateStars = () => {
		if (state.rewards >= 1000) {
			setIsLoading(true);
			FetchData.addTrees({
				user: state.currentUser,
			}).then((response) => {
				if (response.message) {
					setError("Please update your basic user info before getting rewards or donating");
				} else {
					setError(null);
					dispatch({ type: "DEDUCT_STARS", payload: 1000 });
					dispatch({ type: "PLANT_TREES", payload: 1 });
				}
				setIsLoading(false);
			});
		} else {
			setError("You need 1000 stars to plant a tree!");
		}
	};

	const progressToTree = Math.min((state.rewards / 1000) * 100, 100);
	const starsNeeded = Math.max(1000 - state.rewards, 0);

	if (!state.userInformation) {
		return (
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			>
				<View style={styles.noInfoContainer}>
					<Text style={styles.noInfoIcon}>🌟</Text>
					<Text style={styles.noInfoTitle}>Rewards & Trees</Text>
					<Text style={styles.noInfoSubtitle}>
						Please fill out your basic information to earn rewards and plant trees
					</Text>
					<View style={{ marginTop: spacing.lg, width: "100%" }}>
						<AddBasicsButton setIsDrawerOpen={setIsDrawerOpen} />
					</View>
				</View>
			</ScrollView>
		);
	}

	return (
		<ScrollView
			style={[styles.scrollView, isDrawerOpen && styles.blurred]}
			contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Rewards</Text>
				<Text style={styles.headerSubtitle}>Earn stars, plant trees, save the planet</Text>
			</View>

			{/* Stars Card */}
			<View style={styles.starsCard}>
				<View style={styles.starsHeader}>
					<Text style={styles.starIcon}>⭐</Text>
					<Text style={styles.starsLabel}>Your Stars</Text>
				</View>
				<Text style={styles.starsCount}>{state.rewards}</Text>

				{/* Progress to next tree */}
				<View style={styles.progressSection}>
					<View style={styles.progressHeader}>
						<Text style={styles.progressLabel}>Progress to next tree</Text>
						<Text style={styles.progressValue}>{state.rewards}/1000</Text>
					</View>
					<View style={styles.progressBar}>
						<View style={[styles.progressFill, { width: `${progressToTree}%` }]} />
					</View>
					{starsNeeded > 0 && (
						<Text style={styles.progressHint}>{starsNeeded} more stars needed</Text>
					)}
				</View>
			</View>

			{/* Actions Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>🎯</Text>
					<Text style={styles.cardTitle}>Earn Stars</Text>
				</View>

				<Pressable
					onPress={handleWatchAd}
					style={({ pressed }) => [
						styles.actionButton,
						styles.watchAdButton,
						pressed && styles.buttonPressed,
					]}
					disabled={isLoading}
				>
					<Text style={styles.actionIcon}>📺</Text>
					<View style={styles.actionContent}>
						<Text style={styles.actionTitle}>Watch an Ad</Text>
						<Text style={styles.actionSubtitle}>Earn 10 stars</Text>
					</View>
					<Text style={styles.actionReward}>+10 ⭐</Text>
				</Pressable>

				<View style={styles.divider} />

				<Text style={styles.earnTip}>
					💡 Tip: Add an electric vehicle to earn 100 bonus stars!
				</Text>
			</View>

			{/* Plant Trees Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>🌳</Text>
					<Text style={styles.cardTitle}>Plant Trees</Text>
				</View>

				<View style={styles.treesPlantedSection}>
					<View style={styles.treesCount}>
						<Text style={styles.treesNumber}>{state.treesPlanted}</Text>
						<Text style={styles.treesLabel}>Trees Planted</Text>
					</View>
					<View style={styles.treesImpact}>
						<Text style={styles.impactNumber}>{state.treesPlanted * 48}</Text>
						<Text style={styles.impactLabel}>lbs CO₂/year absorbed</Text>
					</View>
				</View>

				<Pressable
					onPress={handleDonateStars}
					style={({ pressed }) => [
						styles.actionButton,
						styles.plantTreeButton,
						state.rewards < 1000 && styles.buttonDisabled,
						pressed && state.rewards >= 1000 && styles.buttonPressed,
					]}
					disabled={isLoading || state.rewards < 1000}
				>
					<Text style={styles.actionIcon}>🌱</Text>
					<View style={styles.actionContent}>
						<Text style={[styles.actionTitle, styles.plantTreeText]}>Plant a Tree</Text>
						<Text style={[styles.actionSubtitle, styles.plantTreeSubtext]}>
							{state.rewards >= 1000 ? "Ready to plant!" : `Need ${starsNeeded} more stars`}
						</Text>
					</View>
					<Text style={[styles.actionReward, styles.plantTreeCost]}>1000 ⭐</Text>
				</Pressable>

				{error && (
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{error}</Text>
					</View>
				)}
			</View>

			{/* Info Card */}
			<View style={styles.infoCard}>
				<Text style={styles.infoIcon}>🌍</Text>
				<Text style={styles.infoTitle}>Did you know?</Text>
				<Text style={styles.infoText}>
					On average, a mature tree absorbs about{" "}
					<Text style={styles.infoHighlight}>48 pounds</Text> of CO₂ per year.
					That's equivalent to driving about 50 miles in a typical car!
				</Text>
			</View>

			<View style={{ height: insets.bottom + 80 }} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: colors.background,
	},
	blurred: {
		opacity: 0.3,
	},
	container: {
		paddingHorizontal: spacing.md,
		paddingBottom: spacing.xl,
	},
	header: {
		marginBottom: spacing.lg,
		alignItems: "center",
	},
	headerTitle: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
		marginBottom: spacing.xs,
	},
	headerSubtitle: {
		fontSize: typography.fontSizes.lg,
		color: colors.textSecondary,
	},
	starsCard: {
		backgroundColor: colors.primary,
		borderRadius: borderRadius.xl,
		padding: spacing.xl,
		marginBottom: spacing.md,
		alignItems: "center",
		...shadows.lg,
	},
	starsHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.sm,
	},
	starIcon: {
		fontSize: 24,
		marginRight: spacing.sm,
	},
	starsLabel: {
		fontSize: typography.fontSizes.lg,
		color: colors.textOnPrimary,
		fontWeight: typography.fontWeights.medium,
	},
	starsCount: {
		fontSize: 64,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
		marginBottom: spacing.md,
	},
	progressSection: {
		width: "100%",
	},
	progressHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: spacing.xs,
	},
	progressLabel: {
		fontSize: typography.fontSizes.sm,
		color: colors.textOnDark,
	},
	progressValue: {
		fontSize: typography.fontSizes.sm,
		color: colors.textOnPrimary,
		fontWeight: typography.fontWeights.semibold,
	},
	progressBar: {
		height: 8,
		backgroundColor: "rgba(255,255,255,0.3)",
		borderRadius: borderRadius.full,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		backgroundColor: colors.highlight,
		borderRadius: borderRadius.full,
	},
	progressHint: {
		fontSize: typography.fontSizes.xs,
		color: colors.textOnDark,
		marginTop: spacing.xs,
		textAlign: "center",
	},
	card: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginBottom: spacing.md,
		...shadows.sm,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.md,
	},
	cardIcon: {
		fontSize: 24,
		marginRight: spacing.sm,
	},
	cardTitle: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: spacing.md,
		borderRadius: borderRadius.lg,
		marginBottom: spacing.sm,
	},
	watchAdButton: {
		backgroundColor: colors.primarySoft + "30",
		borderWidth: 2,
		borderColor: colors.primary,
	},
	plantTreeButton: {
		backgroundColor: colors.primaryDark,
	},
	buttonPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	buttonDisabled: {
		opacity: 0.5,
	},
	actionIcon: {
		fontSize: 28,
		marginRight: spacing.md,
	},
	actionContent: {
		flex: 1,
	},
	actionTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.primaryDark,
	},
	actionSubtitle: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
	},
	actionReward: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.bold,
		color: colors.primary,
	},
	plantTreeText: {
		color: colors.textOnPrimary,
	},
	plantTreeSubtext: {
		color: colors.textOnDark,
	},
	plantTreeCost: {
		color: colors.textOnPrimary,
	},
	divider: {
		height: 1,
		backgroundColor: colors.divider,
		marginVertical: spacing.md,
	},
	earnTip: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
		textAlign: "center",
		fontStyle: "italic",
	},
	treesPlantedSection: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: spacing.lg,
		paddingVertical: spacing.md,
		backgroundColor: colors.backgroundDark,
		borderRadius: borderRadius.md,
	},
	treesCount: {
		alignItems: "center",
	},
	treesNumber: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
	},
	treesLabel: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
	},
	treesImpact: {
		alignItems: "center",
	},
	impactNumber: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.carbonExcellent,
	},
	impactLabel: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
	},
	errorContainer: {
		backgroundColor: colors.error + "15",
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginTop: spacing.sm,
		borderLeftWidth: 4,
		borderLeftColor: colors.error,
	},
	errorText: {
		color: colors.error,
		fontSize: typography.fontSizes.sm,
		fontWeight: typography.fontWeights.medium,
	},
	infoCard: {
		backgroundColor: colors.primarySoft + "20",
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		alignItems: "center",
		marginBottom: spacing.md,
	},
	infoIcon: {
		fontSize: 40,
		marginBottom: spacing.sm,
	},
	infoTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.primaryDark,
		marginBottom: spacing.sm,
	},
	infoText: {
		fontSize: typography.fontSizes.md,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 22,
	},
	infoHighlight: {
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
	},
	noInfoContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: spacing.xl,
		paddingTop: spacing.xxl,
	},
	noInfoIcon: {
		fontSize: 64,
		marginBottom: spacing.lg,
	},
	noInfoTitle: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textPrimary,
		textAlign: "center",
		marginBottom: spacing.sm,
	},
	noInfoSubtitle: {
		fontSize: typography.fontSizes.lg,
		color: colors.textSecondary,
		textAlign: "center",
	},
});

export default RewardsPage;
