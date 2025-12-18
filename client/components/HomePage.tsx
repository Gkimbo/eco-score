import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import homePageStyles from "../services/styles/HomePageStyle";
import FetchData from "../services/fetchData";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ListStyles from "../services/styles/ListStyles";
import { Car, Home } from "../services/types/carAndHomeType";
import CarHighlights from "./lists/highlights/CarHighlights";
import HomeHighlights from "./lists/highlights/HomeHighlights";
import Rewards from "./rewards/RewardsDisplay";
import { colors, borderRadius, shadows, spacing, typography } from "../services/styles/theme";

export interface IAppProps {
	state: any;
	dispatch: any;
	isDrawerOpen: boolean;
	lastLoginTimestamp: string;
	setLastLoginTimestamp: any;
	rewardsWindow: boolean;
	setRewardsWindow: any;
}

const HomePage: React.FunctionComponent<IAppProps> = ({
	state,
	dispatch,
	isDrawerOpen,
	lastLoginTimestamp,
	setLastLoginTimestamp,
	rewardsWindow,
	setRewardsWindow,
}) => {
	const [carCarbon, setCarCarbon] = useState<number>(0);
	const [homeCarbon, setHomeCarbon] = useState<number>(0);
	const [treeCarbon, setTreeCarbon] = useState<number>(0);
	const [isBlurred, setIsBlurred] = useState<boolean>(false);

	const navigate = useNavigate();

	let totalCarbon = carCarbon + homeCarbon - treeCarbon;

	// Determine score level for styling
	const getScoreLevel = (score: number) => {
		if (score <= 10) return "excellent";
		if (score <= 20) return "good";
		if (score <= 30) return "moderate";
		return "poor";
	};

	const scoreLevel = getScoreLevel(totalCarbon);

	const handleCarsPress = () => {
		navigate("/cars");
	};

	const handleHomesPress = () => {
		navigate("/homes");
	};

	const handleRewardsPress = () => {
		navigate("/rewards");
	};

	const handleTreePress = () => {
		navigate("/rewards");
	};

	const cars = state.cars.map((car: Car) => {
		return <CarHighlights key={car.id} car={car} isBlurred={isBlurred} />;
	});

	const homes = state.homes.map((home: Home) => {
		return <HomeHighlights key={home.id} home={home} isBlurred={isBlurred} />;
	});

	const handleRewards = () => {
		setRewardsWindow(false);
	};

	useEffect(() => {
		const totalCarbon = state.cars.reduce((total: any, car: any) => {
			if (car.annualCarbonFromDriving) {
				return total + car.annualCarbonFromDriving;
			} else {
				return total + 0;
			}
		}, 0);
		const tonsOfCarCarbon = totalCarbon / 2000;
		let roundedCarNumber: number = Number(tonsOfCarCarbon.toFixed(2));
		setCarCarbon(roundedCarNumber);

		const totalHomeCarbon = state.homes.reduce((total: number, home: any) => {
			return (
				total +
				parseInt(home.totalAnnualCarbon) +
				parseInt(home.totalStaticCarbon)
			);
		}, 0);

		const savedCarbonByTrees = (state.treesPlanted * 48) / 2000;
		setTreeCarbon(savedCarbonByTrees);

		const homeCarbonInTons = totalHomeCarbon / 2000;
		let roundedHomeNumber: number = Number(homeCarbonInTons.toFixed(2));
		setHomeCarbon(roundedHomeNumber);
	}, [state.cars, state.homes, state.treesPlanted]);

	useEffect(() => {
		if (state.currentUser.token) {
			FetchData.get("/api/v1/user-info", state.currentUser.token).then(
				(response) => {
					dispatch({ type: "USER_CAR", payload: response.user.cars });
					dispatch({
						type: "USER_INFO",
						payload: response.user.info,
					});
					dispatch({
						type: "USER_HOME",
						payload: response.user.homes,
					});
					dispatch({
						type: "PLANT_TREES_HOME",
						payload: response.user.info.treesPlanted,
					});
					dispatch({
						type: "STARS_HOME",
						payload: response.user.info.rewards,
					});
					// Load new reward fields
					dispatch({
						type: "UPDATE_STREAK",
						payload: {
							streak: response.user.info.checkInStreak || 0,
							lastCheckIn: response.user.info.lastCheckIn,
						},
					});
					dispatch({
						type: "UPDATE_TIPS_READ",
						payload: response.user.info.tipsRead || "[]",
					});
				}
			);
		}
	}, []);

	useEffect(() => {
		setIsBlurred(isDrawerOpen);
	}, [isDrawerOpen]);

	const getCircleColor = () => {
		switch (scoreLevel) {
			case "excellent":
				return colors.carbonExcellent;
			case "good":
				return colors.carbonGood;
			case "moderate":
				return colors.carbonModerate;
			case "poor":
				return colors.carbonPoor;
			default:
				return colors.carbonModerate;
		}
	};

	return (
		<ScrollView style={[isBlurred && styles.blurredContainer]}>
			<View style={styles.mainContainer}>
				{/* Score Section */}
				<View style={styles.scoreSection}>
					<Text style={styles.welcomeText}>Your Carbon Score</Text>

					<View style={styles.scoreContainer}>
						{/* Left Stats */}
						<View style={styles.sideStats}>
							<Pressable onPress={handleCarsPress} style={styles.statButton}>
								<View style={styles.statIcon}>
									<Text style={styles.emojiText}>🚗</Text>
								</View>
								<Text style={styles.statValue}>{carCarbon || 0}</Text>
								<Text style={styles.statLabel}>Cars</Text>
							</Pressable>

							<Pressable onPress={handleHomesPress} style={styles.statButton}>
								<View style={styles.statIcon}>
									<Text style={styles.emojiText}>🏠</Text>
								</View>
								<Text style={styles.statValue}>{homeCarbon || 0}</Text>
								<Text style={styles.statLabel}>Homes</Text>
							</Pressable>
						</View>

						{/* Center Score Circle */}
						<View style={styles.circleWrapper}>
							<View style={styles.circleContainer}>
								<View
									style={[
										styles.circleFill,
										{
											height: `${Math.min(Math.max(totalCarbon, 0) * 2.5, 100)}%`,
											backgroundColor: getCircleColor(),
										},
									]}
								/>
								<View style={styles.circleContent}>
									<Text style={styles.produceLabel}>
										{treeCarbon > 0 ? "Net Carbon" : "You Produce"}
									</Text>
									<Text style={styles.carbonValue}>
										{totalCarbon.toFixed(2)}
									</Text>
									<Text style={styles.carbonUnit}>tons CO₂/year</Text>
								</View>
							</View>
						</View>

						{/* Right Stats */}
						<View style={styles.sideStats}>
							<Pressable onPress={handleRewardsPress} style={styles.statButton}>
								<View style={styles.statIcon}>
									<Rewards userRewards={state.rewards} />
								</View>
								<Text style={styles.statValue}>{state.rewards || 0}</Text>
								<Text style={styles.statLabel}>Stars</Text>
							</Pressable>

							<Pressable onPress={handleTreePress} style={[styles.statButton, state.treesPlanted > 0 && styles.offsetButton]}>
								<View style={styles.statIcon}>
									<Text style={styles.emojiText}>🌳</Text>
								</View>
								<Text style={[styles.statValue, state.treesPlanted > 0 && styles.offsetValue]}>
									{state.treesPlanted > 0
										? `-${((state.treesPlanted * 48) / 2000).toFixed(3)}`
										: "0"}
								</Text>
								<Text style={styles.statLabel}>tons offset</Text>
							</Pressable>
						</View>
					</View>
				</View>

				{/* Summary Cards */}
				<View style={styles.summarySection}>
					{state.cars.length > 0 && (
						<Pressable onPress={handleCarsPress} style={styles.summaryCard}>
							<View style={styles.cardHeader}>
								<Text style={styles.cardTitle}>
									{state.cars.length === 1 ? "Your Car" : "Your Cars"}
								</Text>
								<Icon name="chevron-right" size={16} color={colors.primary} />
							</View>
							{cars}
						</Pressable>
					)}

					{state.homes.length > 0 && (
						<Pressable onPress={handleHomesPress} style={styles.summaryCard}>
							<View style={styles.cardHeader}>
								<Text style={styles.cardTitle}>
									{state.homes.length === 1 ? "Your Home" : "Your Homes"}
								</Text>
								<Icon name="chevron-right" size={16} color={colors.primary} />
							</View>
							{homes}
						</Pressable>
					)}

					<Pressable onPress={handleTreePress} style={styles.treeCard}>
						<View style={styles.cardHeader}>
							<Text style={styles.treeCardTitle}>
								{state.treesPlanted >= 1 ? "Trees Planted" : "Plant Trees!"}
							</Text>
							<Icon name="chevron-right" size={16} color={colors.textOnPrimary} />
						</View>
						<View style={styles.treeContent}>
							<Text style={styles.treeCount}>{state.treesPlanted}</Text>
							<Text style={styles.treeLabel}>Trees Planted</Text>
							<Text style={styles.treeAbsorb}>
								Absorbing{" "}
								<Text style={styles.treeHighlight}>
									{state.treesPlanted * 48 < 2000
										? state.treesPlanted * 48
										: ((state.treesPlanted * 48) / 2000).toFixed(1)}
								</Text>{" "}
								{state.treesPlanted * 48 < 2000 ? "lbs" : "tons"} CO₂/year
							</Text>
						</View>
					</Pressable>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	blurredContainer: {
		opacity: 0.3,
	},
	mainContainer: {
		flex: 1,
		paddingTop: 90,
		paddingBottom: spacing.xxl,
	},
	scoreSection: {
		alignItems: "center",
		paddingHorizontal: spacing.md,
	},
	welcomeText: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textPrimary,
		marginBottom: spacing.lg,
	},
	scoreContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	sideStats: {
		alignItems: "center",
		gap: spacing.sm,
	},
	statButton: {
		alignItems: "center",
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.sm,
		width: 72,
		height: 90,
		justifyContent: "center",
		...shadows.sm,
	},
	statIcon: {
		width: 32,
		height: 32,
		borderRadius: borderRadius.full,
		backgroundColor: colors.background,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: spacing.xs,
	},
	emojiText: {
		fontSize: 16,
	},
	statValue: {
		fontSize: typography.fontSizes.sm,
		fontWeight: typography.fontWeights.bold,
		color: colors.primary,
		textAlign: "center",
	},
	statLabel: {
		fontSize: 9,
		color: colors.textSecondary,
		textAlign: "center",
	},
	offsetButton: {
		borderWidth: 2,
		borderColor: colors.success,
		backgroundColor: colors.success + "10",
	},
	offsetValue: {
		color: colors.success,
		fontSize: typography.fontSizes.xs,
	},
	circleWrapper: {
		marginHorizontal: spacing.sm,
	},
	circleContainer: {
		width: 160,
		height: 160,
		borderRadius: 80,
		backgroundColor: colors.backgroundDark,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
		...shadows.lg,
		borderWidth: 4,
		borderColor: colors.border,
	},
	circleFill: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		borderRadius: 80,
	},
	circleContent: {
		alignItems: "center",
		zIndex: 1,
	},
	produceLabel: {
		fontSize: typography.fontSizes.xs,
		color: colors.textOnPrimary,
		textShadowColor: "rgba(0,0,0,0.5)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	carbonValue: {
		fontSize: 32,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
		textShadowColor: "rgba(0,0,0,0.5)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	carbonUnit: {
		fontSize: 10,
		color: colors.textOnPrimary,
		textShadowColor: "rgba(0,0,0,0.5)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	summarySection: {
		paddingHorizontal: spacing.md,
		marginTop: spacing.xl,
		gap: spacing.md,
	},
	summaryCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		...shadows.sm,
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
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
	treeCardTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textOnPrimary,
	},
	treeCard: {
		backgroundColor: colors.primaryDark,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		...shadows.md,
	},
	treeContent: {
		alignItems: "center",
		paddingVertical: spacing.sm,
	},
	treeCount: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
	},
	treeLabel: {
		fontSize: typography.fontSizes.md,
		color: colors.textOnDark,
		marginBottom: spacing.sm,
	},
	treeAbsorb: {
		fontSize: typography.fontSizes.sm,
		color: colors.textOnDark,
	},
	treeHighlight: {
		fontWeight: typography.fontWeights.bold,
		color: colors.highlight,
	},
});

export default HomePage;
