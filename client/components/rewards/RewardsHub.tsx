import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "react-router-native";
import FetchData from "../../services/fetchData";
import AddBasicsButton from "../navBar/AddBasicInfoButton";
import { colors, spacing, borderRadius, typography, shadows } from "../../services/styles/theme";

interface RewardsHubProps {
	setIsDrawerOpen: any;
	isDrawerOpen: boolean;
	state: any;
	dispatch: any;
}

interface CommunityStats {
	totalTreesPlanted: number;
	usersContributing: number;
	co2Offset: number;
}

const RewardsHub: React.FC<RewardsHubProps> = ({
	setIsDrawerOpen,
	isDrawerOpen,
	state,
	dispatch,
}) => {
	const insets = useSafeAreaInsets();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [checkInMessage, setCheckInMessage] = useState<string | null>(null);
	const [communityStats, setCommunityStats] = useState<CommunityStats>({
		totalTreesPlanted: 0,
		usersContributing: 0,
		co2Offset: 0,
	});

	useEffect(() => {
		loadCommunityStats();
	}, []);

	const loadCommunityStats = async () => {
		const stats = await FetchData.getCommunityStats();
		setCommunityStats(stats);
	};

	const handleDailyCheckIn = async () => {
		setIsLoading(true);
		const response = await FetchData.dailyCheckIn(state.currentUser.token);
		if (response.error) {
			if (response.error === "Already checked in today") {
				setCheckInMessage(`You've already checked in today! Streak: ${response.streak} days`);
			} else {
				setError(response.error);
			}
		} else {
			dispatch({ type: "ADD_STARS", payload: response.starsEarned });
			dispatch({
				type: "UPDATE_STREAK",
				payload: { streak: response.streak, lastCheckIn: new Date().toISOString() },
			});
			if (response.bonusStars > 0) {
				setCheckInMessage(`Check-in successful! +${response.baseStars} stars + ${response.bonusStars} streak bonus!`);
			} else {
				setCheckInMessage(`Check-in successful! +${response.starsEarned} stars. Streak: ${response.streak} days`);
			}
		}
		setIsLoading(false);
		setTimeout(() => setCheckInMessage(null), 4000);
	};

	const handleDonateStars = () => {
		if (state.rewards >= 1000) {
			setIsLoading(true);
			FetchData.addTrees({
				user: state.currentUser,
			}).then((response) => {
				if (response.message) {
					setError("Please update your basic user info before donating");
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
					<Text style={styles.noInfoTitle}>Rewards Hub</Text>
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
				<Text style={styles.headerTitle}>Rewards Hub</Text>
				<Text style={styles.headerSubtitle}>Earn, learn, and make an impact</Text>
			</View>

			{/* Stars Card */}
			<View style={styles.starsCard}>
				<View style={styles.starsHeader}>
					<Text style={styles.starIcon}>⭐</Text>
					<Text style={styles.starsLabel}>Your Stars</Text>
				</View>
				<Text style={styles.starsCount}>{state.rewards}</Text>

				{/* Streak Display */}
				{state.checkInStreak > 0 && (
					<View style={styles.streakBadge}>
						<Text style={styles.streakText}>🔥 {state.checkInStreak} day streak</Text>
					</View>
				)}

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

			{/* Check-in Message */}
			{checkInMessage && (
				<View style={styles.successMessage}>
					<Text style={styles.successText}>{checkInMessage}</Text>
				</View>
			)}

			{/* Daily Check-in Button */}
			<Pressable
				onPress={handleDailyCheckIn}
				style={({ pressed }) => [
					styles.checkInButton,
					pressed && styles.buttonPressed,
				]}
				disabled={isLoading}
			>
				<Text style={styles.checkInIcon}>📅</Text>
				<View style={styles.checkInContent}>
					<Text style={styles.checkInTitle}>Daily Check-in</Text>
					<Text style={styles.checkInSubtitle}>Earn 5 stars + streak bonuses</Text>
				</View>
				<Text style={styles.checkInReward}>+5 ⭐</Text>
			</Pressable>

			{/* Navigation Cards */}
			<Text style={styles.sectionTitle}>Explore</Text>
			<View style={styles.navGrid}>
				<Pressable
					style={({ pressed }) => [styles.navCard, pressed && styles.navCardPressed]}
					onPress={() => navigate("/rewards/earn")}
				>
					<Text style={styles.navIcon}>🎯</Text>
					<Text style={styles.navTitle}>Earn Stars</Text>
					<Text style={styles.navSubtitle}>Achievements & rewards</Text>
				</Pressable>

				<Pressable
					style={({ pressed }) => [styles.navCard, pressed && styles.navCardPressed]}
					onPress={() => navigate("/rewards/learn")}
				>
					<Text style={styles.navIcon}>📚</Text>
					<Text style={styles.navTitle}>Learn</Text>
					<Text style={styles.navSubtitle}>Eco tips & education</Text>
				</Pressable>

				<Pressable
					style={({ pressed }) => [styles.navCard, pressed && styles.navCardPressed]}
					onPress={() => navigate("/rewards/shop")}
				>
					<Text style={styles.navIcon}>🛒</Text>
					<Text style={styles.navTitle}>Shop</Text>
					<Text style={styles.navSubtitle}>Eco-friendly products</Text>
				</Pressable>

				<Pressable
					style={({ pressed }) => [
						styles.navCard,
						styles.treeCard,
						pressed && styles.navCardPressed,
					]}
					onPress={handleDonateStars}
					disabled={isLoading || state.rewards < 1000}
				>
					<Text style={styles.navIcon}>🌳</Text>
					<Text style={[styles.navTitle, styles.treeCardText]}>Plant Tree</Text>
					<Text style={[styles.navSubtitle, styles.treeCardSubtext]}>
						{state.rewards >= 1000 ? "Ready!" : `${starsNeeded} more`}
					</Text>
				</Pressable>
			</View>

			{/* Trees Planted Section */}
			<View style={styles.treesCard}>
				<View style={styles.treesHeader}>
					<Text style={styles.treesIcon}>🌲</Text>
					<Text style={styles.treesTitle}>Your Impact</Text>
				</View>
				<View style={styles.treesStats}>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>{state.treesPlanted}</Text>
						<Text style={styles.statLabel}>Trees Planted</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>{state.treesPlanted * 48}</Text>
						<Text style={styles.statLabel}>lbs CO2/year</Text>
					</View>
				</View>
			</View>

			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}

			{/* Community Impact Section */}
			<View style={styles.communityCard}>
				<View style={styles.communityHeader}>
					<Text style={styles.communityIcon}>🌍</Text>
					<Text style={styles.communityTitle}>Community Impact</Text>
				</View>
				<Text style={styles.communitySubtitle}>Together we're making a difference</Text>
				<View style={styles.communityStats}>
					<View style={styles.communityStatItem}>
						<Text style={styles.communityStatNumber}>{communityStats.totalTreesPlanted}</Text>
						<Text style={styles.communityStatLabel}>Trees Planted</Text>
					</View>
					<View style={styles.communityStatDivider} />
					<View style={styles.communityStatItem}>
						<Text style={styles.communityStatNumber}>{communityStats.usersContributing}</Text>
						<Text style={styles.communityStatLabel}>Contributors</Text>
					</View>
					<View style={styles.communityStatDivider} />
					<View style={styles.communityStatItem}>
						<Text style={styles.communityStatNumber}>{communityStats.co2Offset.toLocaleString()}</Text>
						<Text style={styles.communityStatLabel}>lbs CO2/year</Text>
					</View>
				</View>
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
		fontSize: 56,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
		marginBottom: spacing.sm,
	},
	streakBadge: {
		backgroundColor: "rgba(255,255,255,0.2)",
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: borderRadius.full,
		marginBottom: spacing.md,
	},
	streakText: {
		color: colors.textOnPrimary,
		fontWeight: typography.fontWeights.semibold,
		fontSize: typography.fontSizes.md,
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
	checkInButton: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		marginBottom: spacing.lg,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 2,
		borderColor: colors.highlight,
		...shadows.sm,
	},
	buttonPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	checkInIcon: {
		fontSize: 32,
		marginRight: spacing.md,
	},
	checkInContent: {
		flex: 1,
	},
	checkInTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
	checkInSubtitle: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
	},
	checkInReward: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.bold,
		color: colors.highlight,
	},
	sectionTitle: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
		marginBottom: spacing.md,
	},
	navGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: spacing.lg,
	},
	navCard: {
		width: "48%",
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginBottom: spacing.md,
		alignItems: "center",
		...shadows.sm,
	},
	navCardPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	treeCard: {
		backgroundColor: colors.primaryDark,
	},
	navIcon: {
		fontSize: 36,
		marginBottom: spacing.sm,
	},
	navTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
		marginBottom: spacing.xs,
	},
	navSubtitle: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
		textAlign: "center",
	},
	treeCardText: {
		color: colors.textOnPrimary,
	},
	treeCardSubtext: {
		color: colors.textOnDark,
	},
	treesCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginBottom: spacing.md,
		...shadows.sm,
	},
	treesHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.md,
	},
	treesIcon: {
		fontSize: 24,
		marginRight: spacing.sm,
	},
	treesTitle: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
	treesStats: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: colors.backgroundDark,
		borderRadius: borderRadius.md,
		padding: spacing.md,
	},
	statItem: {
		alignItems: "center",
		flex: 1,
	},
	statNumber: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
	},
	statLabel: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
	},
	statDivider: {
		width: 1,
		backgroundColor: colors.divider,
		marginHorizontal: spacing.md,
	},
	errorContainer: {
		backgroundColor: colors.error + "15",
		borderRadius: borderRadius.md,
		padding: spacing.md,
		borderLeftWidth: 4,
		borderLeftColor: colors.error,
	},
	errorText: {
		color: colors.error,
		fontSize: typography.fontSizes.sm,
		fontWeight: typography.fontWeights.medium,
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
	communityCard: {
		backgroundColor: colors.primaryDark,
		borderRadius: borderRadius.xl,
		padding: spacing.lg,
		marginTop: spacing.md,
		...shadows.lg,
	},
	communityHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.xs,
	},
	communityIcon: {
		fontSize: 24,
		marginRight: spacing.sm,
	},
	communityTitle: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
	},
	communitySubtitle: {
		fontSize: typography.fontSizes.sm,
		color: colors.textOnDark,
		marginBottom: spacing.md,
	},
	communityStats: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "rgba(255,255,255,0.1)",
		borderRadius: borderRadius.md,
		padding: spacing.md,
	},
	communityStatItem: {
		alignItems: "center",
		flex: 1,
	},
	communityStatNumber: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.highlight,
	},
	communityStatLabel: {
		fontSize: typography.fontSizes.xs,
		color: colors.textOnDark,
		textAlign: "center",
	},
	communityStatDivider: {
		width: 1,
		backgroundColor: "rgba(255,255,255,0.2)",
		marginHorizontal: spacing.sm,
	},
});

export default RewardsHub;
