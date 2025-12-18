import React, { useState } from "react";
import {
	Text,
	View,
	Pressable,
	StyleSheet,
} from "react-native";
import { colors, spacing, typography, borderRadius, shadows } from "../../../services/styles/theme";

export interface IAppProps {
	state: any;
	onDeleteCar: (carId: number) => void;
	isBlurred: boolean;
}

export type Car = {
	id: number;
	make: string;
	model: string;
	year: string;
	tank: string;
	fuelType: "gas" | "diesel" | "hybrid" | "electricity";
	carBatterySize: string;
	zipcode: string;
	carbonPerTank: string;
	carbonPerCharge: string;
	carbonToMakeBattery: string;
	carbonPerMile: string;
	annualCarbonFromDriving: number;
};

const getFuelIcon = (fuelType: string) => {
	switch (fuelType) {
		case "electricity":
			return "⚡";
		case "hybrid":
			return "🔋";
		case "diesel":
			return "🛢️";
		default:
			return "⛽";
	}
};

const getFuelLabel = (fuelType: string) => {
	switch (fuelType) {
		case "electricity":
			return "Electric";
		case "hybrid":
			return "Hybrid";
		case "diesel":
			return "Diesel";
		default:
			return "Gasoline";
	}
};

const CarTile: React.FunctionComponent<IAppProps> = ({
	state,
	onDeleteCar,
	isBlurred,
}) => {
	const cars = state.cars;
	const [deleteConfirmation, setDeleteConfirmation] = useState<Record<number, boolean>>({});

	const handleDeletePress = (carId: number) => {
		if (deleteConfirmation[carId]) {
			onDeleteCar(carId);
			setDeleteConfirmation((prev) => ({ ...prev, [carId]: false }));
		} else {
			setDeleteConfirmation((prev) => ({ ...prev, [carId]: true }));
		}
	};

	const handleCancelDelete = (carId: number) => {
		setDeleteConfirmation((prev) => ({ ...prev, [carId]: false }));
	};

	return (
		<View style={styles.container}>
			{cars.map((car: Car) => {
				const annualTons = car.annualCarbonFromDriving
					? (car.annualCarbonFromDriving / 2000).toFixed(2)
					: "0.00";
				const per100kMiles = car.carbonPerMile
					? ((Number(car.carbonPerMile) * 100000) / 2000).toFixed(2)
					: "0.00";
				const batteryTons = car.carbonToMakeBattery
					? (Number(car.carbonToMakeBattery) / 2000).toFixed(2)
					: null;

				return (
					<View key={car.id} style={styles.card}>
						{/* Header */}
						<View style={styles.cardHeader}>
							<View style={styles.carInfo}>
								<Text style={styles.fuelIcon}>{getFuelIcon(car.fuelType)}</Text>
								<View>
									<Text style={styles.carName}>
										{car.year} {car.make}
									</Text>
									<Text style={styles.carModel}>{car.model}</Text>
								</View>
							</View>
							<View style={styles.fuelBadge}>
								<Text style={styles.fuelBadgeText}>{getFuelLabel(car.fuelType)}</Text>
							</View>
						</View>

						{/* Stats Grid */}
						<View style={styles.statsGrid}>
							{/* Annual Emissions */}
							<View style={styles.statCard}>
								<Text style={styles.statLabel}>Annual Emissions</Text>
								<Text style={styles.statValue}>{annualTons}</Text>
								<Text style={styles.statUnit}>tons CO₂/year</Text>
							</View>

							{/* Per Mile */}
							<View style={styles.statCard}>
								<Text style={styles.statLabel}>Per Mile</Text>
								<Text style={styles.statValue}>{car.carbonPerMile || "0"}</Text>
								<Text style={styles.statUnit}>lbs CO₂</Text>
							</View>

							{/* Per Tank/Charge */}
							<View style={styles.statCard}>
								<Text style={styles.statLabel}>
									{car.fuelType === "electricity" ? "Per Charge" : "Per Tank"}
								</Text>
								<Text style={styles.statValue}>
									{car.fuelType === "electricity"
										? car.carbonPerCharge || "0"
										: car.carbonPerTank || "0"}
								</Text>
								<Text style={styles.statUnit}>lbs CO₂</Text>
							</View>

							{/* 100k Miles */}
							<View style={styles.statCard}>
								<Text style={styles.statLabel}>100K Miles</Text>
								<Text style={styles.statValue}>{per100kMiles}</Text>
								<Text style={styles.statUnit}>tons CO₂</Text>
							</View>
						</View>

						{/* Battery Info for EV/Hybrid */}
						{(car.fuelType === "electricity" || car.fuelType === "hybrid") && batteryTons && (
							<View style={styles.batteryInfo}>
								<Text style={styles.batteryIcon}>🔋</Text>
								<View style={styles.batteryTextContainer}>
									<Text style={styles.batteryLabel}>Battery Manufacturing</Text>
									<Text style={styles.batteryValue}>{batteryTons} tons CO₂</Text>
								</View>
							</View>
						)}

						{/* Off Grid Badge */}
						{car.zipcode === "off grid" && (
							<View style={styles.offGridBadge}>
								<Text style={styles.offGridIcon}>🌱</Text>
								<Text style={styles.offGridText}>Charged off-grid (zero charging emissions)</Text>
							</View>
						)}

						{/* Lifetime Total */}
						<View style={styles.totalSection}>
							<Text style={styles.totalLabel}>Total CO₂ after 100,000 miles</Text>
							<Text style={styles.totalValue}>
								{(
									Number(per100kMiles) +
									(batteryTons ? Number(batteryTons) : 0) +
									8.263
								).toFixed(2)}{" "}
								<Text style={styles.totalUnit}>tons</Text>
							</Text>
							<Text style={styles.totalNote}>Includes 8.26 tons for vehicle manufacturing</Text>
						</View>

						{/* Delete Button */}
						<View style={styles.deleteSection}>
							{deleteConfirmation[car.id] ? (
								<View style={styles.confirmContainer}>
									<Text style={styles.confirmWarning}>
										Are you sure you want to remove this vehicle?
									</Text>
									<Text style={styles.confirmSubtext}>
										This action cannot be undone.
									</Text>
									<View style={styles.confirmButtons}>
										<Pressable
											style={styles.confirmDeleteBtn}
											onPress={() => handleDeletePress(car.id)}
										>
											<Text style={styles.confirmDeleteText}>Yes, Remove</Text>
										</Pressable>
										<Pressable
											style={styles.cancelBtn}
											onPress={() => handleCancelDelete(car.id)}
										>
											<Text style={styles.cancelText}>Cancel</Text>
										</Pressable>
									</View>
								</View>
							) : (
								<Pressable
									style={styles.deleteBtn}
									onPress={() => handleDeletePress(car.id)}
								>
									<Text style={styles.deleteBtnText}>Remove Vehicle</Text>
								</Pressable>
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
		marginBottom: spacing.lg,
	},
	carInfo: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	fuelIcon: {
		fontSize: 36,
		marginRight: spacing.md,
	},
	carName: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textPrimary,
	},
	carModel: {
		fontSize: typography.fontSizes.lg,
		color: colors.textSecondary,
	},
	fuelBadge: {
		backgroundColor: colors.primarySoft + "30",
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: borderRadius.full,
	},
	fuelBadgeText: {
		fontSize: typography.fontSizes.sm,
		fontWeight: typography.fontWeights.medium,
		color: colors.primary,
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
	offGridBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.carbonExcellent + "20",
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginBottom: spacing.md,
	},
	offGridIcon: {
		fontSize: 20,
		marginRight: spacing.sm,
	},
	offGridText: {
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
	deleteSection: {
		alignItems: "center",
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

export default CarTile;
