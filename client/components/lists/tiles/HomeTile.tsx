import React, { useState } from "react";
import {
	Text,
	View,
	Pressable,
	StyleSheet,
} from "react-native";
import { Home } from "../../../services/types/carAndHomeType";
import { colors, spacing, typography, borderRadius, shadows } from "../../../services/styles/theme";

export interface IAppProps {
	state: any;
	onDeleteHome: (homeId: number) => void;
	onEditHome: (home: Home) => void;
	isBlurred: boolean;
}

const getEnergySourceIcon = (source: string) => {
	switch (source?.toLowerCase()) {
		case "solar":
			return "☀️";
		case "wind":
			return "💨";
		case "hydro":
			return "💧";
		case "nuclear":
			return "⚛️";
		default:
			return "🔌";
	}
};

const getEnergySourceLabel = (source: string) => {
	switch (source?.toLowerCase()) {
		case "solar":
			return "Solar";
		case "wind":
			return "Wind";
		case "hydro":
			return "Hydro";
		case "nuclear":
			return "Nuclear";
		case "grid":
			return "Grid Power";
		default:
			return "Grid Power";
	}
};

const HomeTile: React.FunctionComponent<IAppProps> = ({
	state,
	onDeleteHome,
	onEditHome,
	isBlurred,
}) => {
	const homes = state.homes;
	const [deleteConfirmation, setDeleteConfirmation] = useState<Record<number, boolean>>({});

	const handleDeletePress = (homeId: number) => {
		if (deleteConfirmation[homeId]) {
			onDeleteHome(homeId);
			setDeleteConfirmation((prev) => ({ ...prev, [homeId]: false }));
		} else {
			setDeleteConfirmation((prev) => ({ ...prev, [homeId]: true }));
		}
	};

	const handleCancelDelete = (homeId: number) => {
		setDeleteConfirmation((prev) => ({ ...prev, [homeId]: false }));
	};

	return (
		<View style={styles.container}>
			{homes.map((home: Home) => {
				const totalTons = home.totalAnnualCarbon
					? (Number(home.totalAnnualCarbon) / 2000).toFixed(2)
					: "0.00";
				const electricityTons = home.carbonForAnnualPower
					? (Number(home.carbonForAnnualPower) / 2000).toFixed(2)
					: "0.00";
				const gasTons = home.carbonFromAnnualGas
					? (Number(home.carbonFromAnnualGas) / 2000).toFixed(2)
					: null;
				const oilTons = home.carbonFromAnnualOil
					? (Number(home.carbonFromAnnualOil) / 2000).toFixed(2)
					: null;
				const propaneTons = home.carbonFromAnnualPropane
					? (Number(home.carbonFromAnnualPropane) / 2000).toFixed(2)
					: null;
				const woodTons = home.carbonFromAnnualWood
					? (Number(home.carbonFromAnnualWood) / 2000).toFixed(2)
					: null;
				const batteryTons = home.carbonFromBatteryBank
					? (Number(home.carbonFromBatteryBank) / 2000).toFixed(2)
					: null;

				return (
					<View key={home.id} style={styles.card}>
						{/* Header */}
						<View style={styles.cardHeader}>
							<View style={styles.homeInfo}>
								<Text style={styles.homeIcon}>🏠</Text>
								<View>
									<Text style={styles.zipcode}>{home.zipcode}</Text>
									<Text style={styles.yearBuilt}>Built {home.yearBuilt}</Text>
								</View>
							</View>
							<View style={styles.sourceBadge}>
								<Text style={styles.sourceBadgeIcon}>
									{getEnergySourceIcon(home.electricitySource)}
								</Text>
								<Text style={styles.sourceBadgeText}>
									{getEnergySourceLabel(home.electricitySource)}
								</Text>
							</View>
						</View>

						{/* Square Footage */}
						{home.squareFeet && (
							<View style={styles.sqftBadge}>
								<Text style={styles.sqftIcon}>📐</Text>
								<Text style={styles.sqftText}>{home.squareFeet} sq ft</Text>
							</View>
						)}

						{/* Stats Grid */}
						<View style={styles.statsGrid}>
							{/* Electricity */}
							<View style={styles.statCard}>
								<Text style={styles.statLabel}>Electricity</Text>
								<Text style={styles.statValue}>{electricityTons}</Text>
								<Text style={styles.statUnit}>tons CO2/year</Text>
							</View>

							{/* Gas (if applicable) */}
							{home.gas === "yes" && gasTons && (
								<View style={styles.statCard}>
									<Text style={styles.statLabel}>Natural Gas</Text>
									<Text style={styles.statValue}>{gasTons}</Text>
									<Text style={styles.statUnit}>tons CO2/year</Text>
								</View>
							)}

							{/* Oil (if applicable) */}
							{home.oil === "yes" && oilTons && (
								<View style={styles.statCard}>
									<Text style={styles.statLabel}>Heating Oil</Text>
									<Text style={styles.statValue}>{oilTons}</Text>
									<Text style={styles.statUnit}>tons CO2/year</Text>
								</View>
							)}

							{/* Propane (if applicable) */}
							{home.propane === "yes" && propaneTons && (
								<View style={styles.statCard}>
									<Text style={styles.statLabel}>Propane</Text>
									<Text style={styles.statValue}>{propaneTons}</Text>
									<Text style={styles.statUnit}>tons CO2/year</Text>
								</View>
							)}

							{/* Wood (if applicable) */}
							{home.wood === "yes" && woodTons && (
								<View style={styles.statCard}>
									<Text style={styles.statLabel}>
										{home.woodType === "pellets" ? "Wood Pellets" : "Firewood"}
									</Text>
									<Text style={styles.statValue}>{woodTons}</Text>
									<Text style={styles.statUnit}>tons CO2/year</Text>
								</View>
							)}

							{/* Recycling Status */}
							<View style={styles.statCard}>
								<Text style={styles.statLabel}>Recycling</Text>
								<Text style={[styles.statValue, styles.statusEmoji]}>
									{home.recycling === "yes" ? "♻️" : "❌"}
								</Text>
								<Text style={styles.statUnit}>
									{home.recycling === "yes" ? "Active" : "Not Active"}
								</Text>
							</View>

							{/* Composting Status */}
							<View style={styles.statCard}>
								<Text style={styles.statLabel}>Composting</Text>
								<Text style={[styles.statValue, styles.statusEmoji]}>
									{home.compost === "yes" ? "🌱" : "❌"}
								</Text>
								<Text style={styles.statUnit}>
									{home.compost === "yes" ? "Active" : "Not Active"}
								</Text>
							</View>
						</View>

						{/* Battery Backup Info */}
						{home.batteryBackup === "yes" && batteryTons && (
							<View style={styles.batteryInfo}>
								<Text style={styles.batteryIcon}>🔋</Text>
								<View style={styles.batteryTextContainer}>
									<Text style={styles.batteryLabel}>Battery Bank Manufacturing</Text>
									<Text style={styles.batteryValue}>{batteryTons} tons CO2</Text>
								</View>
							</View>
						)}

						{/* Solar Badge */}
						{home.electricitySource === "solar" && (
							<View style={styles.solarBadge}>
								<Text style={styles.solarIcon}>☀️</Text>
								<Text style={styles.solarText}>
									Powered by solar - reduced grid emissions
								</Text>
							</View>
						)}

						{/* Total Section */}
						<View style={styles.totalSection}>
							<Text style={styles.totalLabel}>Total Annual CO2 Emissions</Text>
							<Text style={styles.totalValue}>
								{totalTons} <Text style={styles.totalUnit}>tons</Text>
							</Text>
							<Text style={styles.totalNote}>
								From all household energy sources
							</Text>
						</View>

						{/* Action Buttons */}
						<View style={styles.actionSection}>
							{deleteConfirmation[home.id] ? (
								<View style={styles.confirmContainer}>
									<Text style={styles.confirmWarning}>
										Are you sure you want to remove this home?
									</Text>
									<Text style={styles.confirmSubtext}>
										This action cannot be undone.
									</Text>
									<View style={styles.confirmButtons}>
										<Pressable
											style={styles.confirmDeleteBtn}
											onPress={() => handleDeletePress(home.id)}
										>
											<Text style={styles.confirmDeleteText}>Yes, Remove</Text>
										</Pressable>
										<Pressable
											style={styles.cancelBtn}
											onPress={() => handleCancelDelete(home.id)}
										>
											<Text style={styles.cancelText}>Cancel</Text>
										</Pressable>
									</View>
								</View>
							) : (
								<View style={styles.actionButtons}>
									<Pressable
										style={styles.editBtn}
										onPress={() => onEditHome(home)}
									>
										<Text style={styles.editBtnText}>Edit Home</Text>
									</Pressable>
									<Pressable
										style={styles.deleteBtn}
										onPress={() => handleDeletePress(home.id)}
									>
										<Text style={styles.deleteBtnText}>Remove</Text>
									</Pressable>
								</View>
							)}
						</View>
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: spacing.md,
	},
	card: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		...shadows.md,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: spacing.md,
	},
	homeInfo: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	homeIcon: {
		fontSize: 36,
		marginRight: spacing.md,
	},
	zipcode: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textPrimary,
	},
	yearBuilt: {
		fontSize: typography.fontSizes.md,
		color: colors.textSecondary,
	},
	sourceBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.primarySoft + "30",
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: borderRadius.full,
	},
	sourceBadgeIcon: {
		fontSize: 14,
		marginRight: spacing.xs,
	},
	sourceBadgeText: {
		fontSize: typography.fontSizes.sm,
		fontWeight: typography.fontWeights.medium,
		color: colors.primary,
	},
	sqftBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.backgroundDark,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		borderRadius: borderRadius.md,
		marginBottom: spacing.md,
		alignSelf: "flex-start",
	},
	sqftIcon: {
		fontSize: 16,
		marginRight: spacing.sm,
	},
	sqftText: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
		color: colors.textPrimary,
	},
	statsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing.sm,
		marginBottom: spacing.md,
	},
	statCard: {
		flex: 1,
		minWidth: "45%",
		backgroundColor: colors.backgroundDark,
		borderRadius: borderRadius.md,
		padding: spacing.md,
		alignItems: "center",
	},
	statLabel: {
		fontSize: typography.fontSizes.xs,
		color: colors.textMuted,
		marginBottom: spacing.xs,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	statValue: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
	},
	statusEmoji: {
		fontSize: 28,
	},
	statUnit: {
		fontSize: typography.fontSizes.xs,
		color: colors.textSecondary,
	},
	batteryInfo: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.primarySoft + "15",
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginBottom: spacing.md,
	},
	batteryIcon: {
		fontSize: 24,
		marginRight: spacing.md,
	},
	batteryTextContainer: {
		flex: 1,
	},
	batteryLabel: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
	},
	batteryValue: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.primaryDark,
	},
	solarBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.carbonExcellent + "20",
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginBottom: spacing.md,
	},
	solarIcon: {
		fontSize: 20,
		marginRight: spacing.sm,
	},
	solarText: {
		fontSize: typography.fontSizes.sm,
		color: colors.carbonExcellent,
		fontWeight: typography.fontWeights.medium,
	},
	totalSection: {
		backgroundColor: colors.primaryDark,
		borderRadius: borderRadius.md,
		padding: spacing.lg,
		alignItems: "center",
		marginBottom: spacing.md,
	},
	totalLabel: {
		fontSize: typography.fontSizes.sm,
		color: colors.textOnDark,
		marginBottom: spacing.xs,
	},
	totalValue: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textOnPrimary,
	},
	totalUnit: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.regular,
	},
	totalNote: {
		fontSize: typography.fontSizes.xs,
		color: colors.textOnDark,
		marginTop: spacing.xs,
		opacity: 0.8,
	},
	actionSection: {
		alignItems: "center",
	},
	actionButtons: {
		flexDirection: "row",
		gap: spacing.md,
	},
	editBtn: {
		backgroundColor: colors.primary,
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.lg,
		borderRadius: borderRadius.md,
	},
	editBtnText: {
		color: colors.textOnPrimary,
		fontWeight: typography.fontWeights.semibold,
		fontSize: typography.fontSizes.md,
	},
	deleteBtn: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.lg,
	},
	deleteBtnText: {
		fontSize: typography.fontSizes.sm,
		color: colors.error,
		fontWeight: typography.fontWeights.medium,
	},
	confirmContainer: {
		backgroundColor: colors.error + "10",
		borderRadius: borderRadius.md,
		padding: spacing.md,
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.error + "30",
	},
	confirmWarning: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.semibold,
		color: colors.error,
		textAlign: "center",
		marginBottom: spacing.xs,
	},
	confirmSubtext: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
		textAlign: "center",
		marginBottom: spacing.md,
	},
	confirmButtons: {
		flexDirection: "row",
		gap: spacing.md,
	},
	confirmDeleteBtn: {
		backgroundColor: colors.error,
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.lg,
		borderRadius: borderRadius.md,
	},
	confirmDeleteText: {
		color: colors.textOnPrimary,
		fontWeight: typography.fontWeights.semibold,
		fontSize: typography.fontSizes.md,
	},
	cancelBtn: {
		backgroundColor: colors.backgroundDark,
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.lg,
		borderRadius: borderRadius.md,
	},
	cancelText: {
		color: colors.textSecondary,
		fontWeight: typography.fontWeights.medium,
		fontSize: typography.fontSizes.md,
	},
});

export default HomeTile;
