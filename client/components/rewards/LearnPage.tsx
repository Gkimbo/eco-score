import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "react-router-native";
import FetchData from "../../services/fetchData";
import { ecoTipsData as tipCategories, TipCategory, EcoTip } from "../../services/data/ecoTips";
import { colors, spacing, borderRadius, typography, shadows } from "../../services/styles/theme";

interface LearnPageProps {
	setIsDrawerOpen: any;
	isDrawerOpen: boolean;
	state: any;
	dispatch: any;
}

const LearnPage: React.FC<LearnPageProps> = ({
	setIsDrawerOpen,
	isDrawerOpen,
	state,
	dispatch,
}) => {
	const insets = useSafeAreaInsets();
	const navigate = useNavigate();
	const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
	const [tipsRead, setTipsRead] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		// Parse tips read from state
		try {
			const parsed = JSON.parse(state.tipsRead || "[]");
			setTipsRead(Array.isArray(parsed) ? parsed : []);
		} catch {
			setTipsRead([]);
		}
	}, [state.tipsRead]);

	const handleReadTip = async (tip: EcoTip) => {
		if (tipsRead.includes(tip.id)) return;

		setIsLoading(true);
		const response = await FetchData.markTipRead(
			state.currentUser.token,
			tip.id,
			tip.stars
		);

		if (!response.error) {
			setTipsRead([...tipsRead, tip.id]);
			dispatch({ type: "ADD_STARS", payload: tip.stars });
			dispatch({ type: "UPDATE_TIPS_READ", payload: JSON.stringify([...tipsRead, tip.id]) });
			setMessage(`Read "${tip.title}" +${tip.stars} stars!`);
			setTimeout(() => setMessage(null), 3000);
		}
		setIsLoading(false);
	};

	const getTotalTips = () => {
		if (!tipCategories || !Array.isArray(tipCategories)) return 0;
		return tipCategories.reduce((acc, cat) => acc + (cat.tips?.length || 0), 0);
	};

	const getCategoryProgress = (category: TipCategory) => {
		if (!category || !category.tips) return { read: 0, total: 0 };
		const readCount = category.tips.filter((tip) => tipsRead.includes(tip.id)).length;
		return { read: readCount, total: category.tips.length };
	};

	// Safety check for tipCategories
	if (!tipCategories || !Array.isArray(tipCategories)) {
		return (
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			>
				<View style={styles.header}>
					<Pressable onPress={() => navigate("/rewards")} style={styles.backButton}>
						<Text style={styles.backText}>← Back</Text>
					</Pressable>
					<Text style={styles.headerTitle}>Learn</Text>
					<Text style={styles.headerSubtitle}>Loading tips...</Text>
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
				<Pressable onPress={() => navigate("/rewards")} style={styles.backButton}>
					<Text style={styles.backText}>← Back</Text>
				</Pressable>
				<Text style={styles.headerTitle}>Learn</Text>
				<Text style={styles.headerSubtitle}>Tips to reduce your carbon footprint</Text>
			</View>

			{/* Progress Card */}
			<View style={styles.progressCard}>
				<View style={styles.progressHeader}>
					<Text style={styles.progressIcon}>📚</Text>
					<View style={styles.progressContent}>
						<Text style={styles.progressTitle}>Reading Progress</Text>
						<Text style={styles.progressSubtitle}>
							{tipsRead.length} of {getTotalTips()} tips read
						</Text>
					</View>
					<Text style={styles.progressStars}>
						+{tipsRead.length * 2} ⭐
					</Text>
				</View>
				<View style={styles.progressBar}>
					<View
						style={[
							styles.progressFill,
							{ width: `${(tipsRead.length / getTotalTips()) * 100}%` },
						]}
					/>
				</View>
			</View>

			{message && (
				<View style={styles.successMessage}>
					<Text style={styles.successText}>{message}</Text>
				</View>
			)}

			{/* Categories */}
			{tipCategories.map((category) => {
				const progress = getCategoryProgress(category);
				const isExpanded = expandedCategory === category.id;

				return (
					<View key={category.id} style={styles.categoryContainer}>
						<Pressable
							style={({ pressed }) => [
								styles.categoryHeader,
								pressed && styles.cardPressed,
							]}
							onPress={() =>
								setExpandedCategory(isExpanded ? null : category.id)
							}
						>
							<Text style={styles.categoryIcon}>{category.icon}</Text>
							<View style={styles.categoryContent}>
								<Text style={styles.categoryName}>{category.name}</Text>
								<Text style={styles.categoryProgress}>
									{progress.read}/{progress.total} read
								</Text>
							</View>
							<Text style={styles.expandIcon}>{isExpanded ? "▲" : "▼"}</Text>
						</Pressable>

						{isExpanded && (
							<View style={styles.tipsList}>
								{category.tips.map((tip) => {
									const isRead = tipsRead.includes(tip.id);
									return (
										<Pressable
											key={tip.id}
											style={({ pressed }) => [
												styles.tipCard,
												isRead && styles.tipRead,
												pressed && !isRead && styles.cardPressed,
											]}
											onPress={() => handleReadTip(tip)}
											disabled={isRead || isLoading}
										>
											<View style={styles.tipContent}>
												<Text
													style={[
														styles.tipTitle,
														isRead && styles.tipReadText,
													]}
												>
													{tip.title}
												</Text>
												<Text
													style={[
														styles.tipDescription,
														isRead && styles.tipReadText,
													]}
												>
													{tip.description}
												</Text>
												{tip.impact && (
													<View style={styles.impactBadge}>
														<Text style={styles.impactText}>
															{tip.impact}
														</Text>
													</View>
												)}
											</View>
											<View style={styles.tipReward}>
												{isRead ? (
													<Text style={styles.readBadge}>Read</Text>
												) : (
													<Text style={styles.earnStars}>
														+{tip.stars} ⭐
													</Text>
												)}
											</View>
										</Pressable>
									);
								})}
							</View>
						)}
					</View>
				);
			})}

			{/* Info Card */}
			<View style={styles.infoCard}>
				<Text style={styles.infoIcon}>💡</Text>
				<Text style={styles.infoTitle}>Did you know?</Text>
				<Text style={styles.infoText}>
					Small changes in daily habits can add up to significant carbon reductions.
					Reading all tips earns you{" "}
					<Text style={styles.infoHighlight}>{getTotalTips() * 2} stars</Text>!
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
	progressCard: {
		backgroundColor: colors.primary,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginBottom: spacing.lg,
		...shadows.md,
	},
	progressHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.md,
	},
	progressIcon: {
		fontSize: 32,
		marginRight: spacing.md,
	},
	progressContent: {
		flex: 1,
	},
	progressTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textOnPrimary,
	},
	progressSubtitle: {
		fontSize: typography.fontSizes.sm,
		color: colors.textOnDark,
	},
	progressStars: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.bold,
		color: colors.highlight,
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
	categoryContainer: {
		marginBottom: spacing.md,
	},
	categoryHeader: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		flexDirection: "row",
		alignItems: "center",
		...shadows.sm,
	},
	cardPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	categoryIcon: {
		fontSize: 32,
		marginRight: spacing.md,
	},
	categoryContent: {
		flex: 1,
	},
	categoryName: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
	categoryProgress: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
	},
	expandIcon: {
		fontSize: typography.fontSizes.lg,
		color: colors.textMuted,
	},
	tipsList: {
		marginTop: spacing.sm,
		paddingLeft: spacing.md,
	},
	tipCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginBottom: spacing.sm,
		flexDirection: "row",
		borderLeftWidth: 4,
		borderLeftColor: colors.primary,
		...shadows.sm,
	},
	tipRead: {
		backgroundColor: colors.backgroundDark,
		borderLeftColor: colors.success,
		opacity: 0.8,
	},
	tipContent: {
		flex: 1,
	},
	tipTitle: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
		marginBottom: spacing.xs,
	},
	tipDescription: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
		lineHeight: 20,
	},
	tipReadText: {
		color: colors.textMuted,
	},
	impactBadge: {
		backgroundColor: colors.primarySoft + "30",
		paddingHorizontal: spacing.sm,
		paddingVertical: spacing.xs,
		borderRadius: borderRadius.sm,
		marginTop: spacing.sm,
		alignSelf: "flex-start",
	},
	impactText: {
		fontSize: typography.fontSizes.xs,
		color: colors.primaryDark,
		fontWeight: typography.fontWeights.medium,
	},
	tipReward: {
		justifyContent: "center",
		alignItems: "flex-end",
		marginLeft: spacing.sm,
	},
	earnStars: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.bold,
		color: colors.highlight,
	},
	readBadge: {
		fontSize: typography.fontSizes.sm,
		color: colors.success,
		fontWeight: typography.fontWeights.medium,
	},
	infoCard: {
		backgroundColor: colors.primarySoft + "20",
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		alignItems: "center",
		marginTop: spacing.lg,
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
});

export default LearnPage;
