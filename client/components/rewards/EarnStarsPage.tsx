import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "react-router-native";
import FetchData from "../../services/fetchData";
import { achievements, Achievement, dailyRewards } from "../../services/data/challenges";
import { colors, spacing, borderRadius, typography, shadows } from "../../services/styles/theme";

interface EarnStarsPageProps {
	setIsDrawerOpen: any;
	isDrawerOpen: boolean;
	state: any;
	dispatch: any;
}

const EarnStarsPage: React.FC<EarnStarsPageProps> = ({
	setIsDrawerOpen,
	isDrawerOpen,
	state,
	dispatch,
}) => {
	const insets = useSafeAreaInsets();
	const navigate = useNavigate();
	const [claimedAchievements, setClaimedAchievements] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		loadAchievements();
	}, []);

	const loadAchievements = async () => {
		const response = await FetchData.getAchievements(state.currentUser.token);
		if (response.achievements) {
			setClaimedAchievements(response.achievements.map((a: any) => a.achievementId));
		}
	};

	const checkAchievementEligibility = (achievement: Achievement): boolean => {
		if (!achievement.condition) {
			// One-time achievements that depend on user actions
			if (achievement.id === "first_login") return true;
			if (achievement.id === "complete_profile") return !!state.userInformation;
			if (achievement.id === "first_car") return state.cars && state.cars.length > 0;
			if (achievement.id === "first_home") return state.homes && state.homes.length > 0;
			return false;
		}

		const { field, operator, value } = achievement.condition;

		// Get the value to check
		let fieldValue: any;
		if (field.startsWith("car.")) {
			const carField = field.split(".")[1];
			fieldValue = state.cars?.some((car: any) => car[carField] === value);
			if (operator === "equals") return fieldValue;
		} else if (field.startsWith("home.")) {
			const homeField = field.split(".")[1];
			fieldValue = state.homes?.some((home: any) => home[homeField] === value);
			if (operator === "equals") return fieldValue;
		} else if (field === "treesPlanted") {
			fieldValue = state.treesPlanted || 0;
		} else if (field === "checkInStreak") {
			fieldValue = state.checkInStreak || 0;
		} else {
			return false;
		}

		switch (operator) {
			case "gte":
				return fieldValue >= value;
			case "lte":
				return fieldValue <= value;
			case "equals":
				return fieldValue === value;
			default:
				return false;
		}
	};

	const handleClaimAchievement = async (achievement: Achievement) => {
		if (claimedAchievements.includes(achievement.id)) return;
		if (!checkAchievementEligibility(achievement)) return;

		setIsLoading(true);
		const response = await FetchData.claimAchievement(
			state.currentUser.token,
			achievement.id,
			achievement.stars
		);

		if (!response.error) {
			setClaimedAchievements([...claimedAchievements, achievement.id]);
			dispatch({ type: "ADD_STARS", payload: achievement.stars });
			setMessage(`Claimed "${achievement.name}" +${achievement.stars} stars!`);
			setTimeout(() => setMessage(null), 3000);
		}
		setIsLoading(false);
	};

	const handleWatchAd = () => {
		setIsLoading(true);
		FetchData.addReward({
			user: state.currentUser,
			rewards: 10,
		}).then((response) => {
			dispatch({ type: "ADD_STARS", payload: 10 });
			setMessage("Earned 10 stars from ad!");
			setTimeout(() => setMessage(null), 3000);
			setIsLoading(false);
		});
	};

	// Safety check for achievements
	if (!achievements || !Array.isArray(achievements)) {
		return (
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			>
				<View style={styles.header}>
					<Pressable onPress={() => navigate("/rewards")} style={styles.backButton}>
						<Text style={styles.backText}>← Back</Text>
					</Pressable>
					<Text style={styles.headerTitle}>Earn Stars</Text>
					<Text style={styles.headerSubtitle}>Loading achievements...</Text>
				</View>
			</ScrollView>
		);
	}

	const engagementAchievements = achievements.filter((a) => a.category === "engagement");
	const ecoAchievements = achievements.filter((a) => a.category === "eco");

	const renderAchievement = (achievement: Achievement) => {
		const isClaimed = claimedAchievements.includes(achievement.id);
		const isEligible = checkAchievementEligibility(achievement);

		return (
			<Pressable
				key={achievement.id}
				style={({ pressed }) => [
					styles.achievementCard,
					isClaimed && styles.achievementClaimed,
					pressed && !isClaimed && isEligible && styles.cardPressed,
				]}
				onPress={() => handleClaimAchievement(achievement)}
				disabled={isClaimed || !isEligible || isLoading}
			>
				<Text style={styles.achievementIcon}>{achievement.icon}</Text>
				<View style={styles.achievementContent}>
					<Text style={[styles.achievementName, isClaimed && styles.claimedText]}>
						{achievement.name}
					</Text>
					<Text style={[styles.achievementDesc, isClaimed && styles.claimedText]}>
						{achievement.description}
					</Text>
				</View>
				<View style={styles.achievementReward}>
					{isClaimed ? (
						<Text style={styles.claimedBadge}>Claimed</Text>
					) : isEligible ? (
						<Text style={styles.claimButton}>+{achievement.stars} ⭐</Text>
					) : (
						<Text style={styles.lockedText}>Locked</Text>
					)}
				</View>
			</Pressable>
		);
	};

	return (
		<ScrollView
			style={[styles.scrollView, isDrawerOpen && styles.blurred]}
			contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
			<View style={styles.header}>
				<Pressable onPress={() => navigate("/rewards")} style={styles.backButton}>
					<Text style={styles.backText}>← Back</Text>
				</Pressable>
				<Text style={styles.headerTitle}>Earn Stars</Text>
				<Text style={styles.headerSubtitle}>Complete achievements to earn rewards</Text>
			</View>

			{/* Current Stars */}
			<View style={styles.starsDisplay}>
				<Text style={styles.starsCount}>{state.rewards} ⭐</Text>
			</View>

			{message && (
				<View style={styles.successMessage}>
					<Text style={styles.successText}>{message}</Text>
				</View>
			)}

			{/* Watch Ad Section */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Quick Earn</Text>
				<Pressable
					onPress={handleWatchAd}
					style={({ pressed }) => [
						styles.watchAdButton,
						pressed && styles.cardPressed,
					]}
					disabled={isLoading}
				>
					<Text style={styles.watchAdIcon}>📺</Text>
					<View style={styles.watchAdContent}>
						<Text style={styles.watchAdTitle}>Watch an Ad</Text>
						<Text style={styles.watchAdSubtitle}>Support the app & earn stars</Text>
					</View>
					<Text style={styles.watchAdReward}>+10 ⭐</Text>
				</Pressable>
			</View>

			{/* Streak Bonuses */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Streak Bonuses</Text>
				<View style={styles.streakList}>
					{dailyRewards.streakBonuses.map((bonus, index) => (
						<View
							key={bonus.days}
							style={[
								styles.streakItem,
								state.checkInStreak >= bonus.days && styles.streakAchieved,
							]}
						>
							<Text style={styles.streakDays}>{bonus.days} days</Text>
							<Text style={styles.streakBonus}>+{bonus.bonus} ⭐</Text>
						</View>
					))}
				</View>
				<Text style={styles.streakHint}>
					Current streak: {state.checkInStreak || 0} days
				</Text>
			</View>

			{/* Engagement Achievements */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Engagement</Text>
				{engagementAchievements.map(renderAchievement)}
			</View>

			{/* Eco Achievements */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Eco Achievements</Text>
				{ecoAchievements.map(renderAchievement)}
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
	},
	backButton: {
		marginBottom: spacing.sm,
	},
	backText: {
		fontSize: typography.fontSizes.lg,
		color: colors.primary,
		fontWeight: typography.fontWeights.medium,
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
	starsDisplay: {
		backgroundColor: colors.primary,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		alignItems: "center",
		marginBottom: spacing.lg,
		...shadows.md,
	},
	starsCount: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
	},
	successMessage: {
		backgroundColor: colors.success + "20",
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginBottom: spacing.md,
		borderLeftWidth: 4,
		borderLeftColor: colors.success,
	},
	successText: {
		color: colors.success,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
	},
	section: {
		marginBottom: spacing.xl,
	},
	sectionTitle: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
		marginBottom: spacing.md,
	},
	watchAdButton: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 2,
		borderColor: colors.highlight,
		...shadows.sm,
	},
	cardPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	watchAdIcon: {
		fontSize: 32,
		marginRight: spacing.md,
	},
	watchAdContent: {
		flex: 1,
	},
	watchAdTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
	watchAdSubtitle: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
	},
	watchAdReward: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.bold,
		color: colors.highlight,
	},
	streakList: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	streakItem: {
		width: "48%",
		backgroundColor: colors.surface,
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginBottom: spacing.sm,
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.border,
	},
	streakAchieved: {
		backgroundColor: colors.success + "20",
		borderColor: colors.success,
	},
	streakDays: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
	streakBonus: {
		fontSize: typography.fontSizes.sm,
		color: colors.highlight,
		fontWeight: typography.fontWeights.bold,
	},
	streakHint: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
		textAlign: "center",
		marginTop: spacing.sm,
	},
	achievementCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.sm,
		...shadows.sm,
	},
	achievementClaimed: {
		backgroundColor: colors.backgroundDark,
		opacity: 0.7,
	},
	achievementIcon: {
		fontSize: 32,
		marginRight: spacing.md,
	},
	achievementContent: {
		flex: 1,
	},
	achievementName: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
	achievementDesc: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
	},
	achievementReward: {
		alignItems: "flex-end",
	},
	claimButton: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.bold,
		color: colors.primary,
		backgroundColor: colors.primarySoft + "30",
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: borderRadius.md,
	},
	claimedBadge: {
		fontSize: typography.fontSizes.sm,
		color: colors.success,
		fontWeight: typography.fontWeights.medium,
	},
	lockedText: {
		fontSize: typography.fontSizes.sm,
		color: colors.textMuted,
	},
	claimedText: {
		color: colors.textMuted,
	},
});

export default EarnStarsPage;
