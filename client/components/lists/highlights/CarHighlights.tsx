import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Car } from "../../../services/types/carAndHomeType";
import { colors, spacing, typography, borderRadius } from "../../../services/styles/theme";

export interface IAppProps {
	car: Car;
	isBlurred: boolean;
}

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

const CarHighlights: React.FunctionComponent<IAppProps> = ({
	car,
	isBlurred,
}) => {
	// Calculate total CO2 after 100k miles
	const calculateTotal = () => {
		const manufacturingCO2 = 8.263; // tons
		const batteryTons = car.carbonToMakeBattery
			? Number(car.carbonToMakeBattery) / 2000
			: 0;
		const drivingTons = car.carbonPerMile
			? (Number(car.carbonPerMile) * 100000) / 2000
			: 0;

		if (car.fuelType === "electricity" && car.zipCode === "off grid") {
			return (batteryTons + manufacturingCO2).toFixed(1);
		}
		return (drivingTons + batteryTons + manufacturingCO2).toFixed(1);
	};

	return (
		<View style={[styles.container, isBlurred && styles.blurred]}>
			<View style={styles.leftSection}>
				<Text style={styles.fuelIcon}>{getFuelIcon(car.fuelType)}</Text>
				<View style={styles.carDetails}>
					<Text style={styles.carName} numberOfLines={1}>
						{car.make} {car.model}
					</Text>
					<Text style={styles.carYear}>{car.year}</Text>
				</View>
			</View>
			<View style={styles.rightSection}>
				<Text style={styles.co2Value}>{calculateTotal()}</Text>
				<Text style={styles.co2Label}>tons/100k mi</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: colors.backgroundDark,
		borderRadius: borderRadius.md,
		padding: spacing.sm,
		marginTop: spacing.xs,
	},
	blurred: {
		opacity: 0.5,
	},
	leftSection: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	fuelIcon: {
		fontSize: 20,
		marginRight: spacing.sm,
	},
	carDetails: {
		flex: 1,
	},
	carName: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
		color: colors.textPrimary,
	},
	carYear: {
		fontSize: typography.fontSizes.xs,
		color: colors.textSecondary,
	},
	rightSection: {
		alignItems: "flex-end",
	},
	co2Value: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
	},
	co2Label: {
		fontSize: typography.fontSizes.xs,
		color: colors.textMuted,
	},
});

export default CarHighlights;
