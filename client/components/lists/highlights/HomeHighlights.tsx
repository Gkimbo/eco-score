import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Home } from "../../../services/types/carAndHomeType";
import { colors, spacing, typography, borderRadius } from "../../../services/styles/theme";

export interface IAppProps {
	home: Home;
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
			return "🏠";
	}
};

const HomeHighlights: React.FunctionComponent<IAppProps> = ({
	home,
	isBlurred,
}) => {
	const totalTons = home.totalAnnualCarbon
		? (Number(home.totalAnnualCarbon) / 2000).toFixed(1)
		: "0.0";

	return (
		<View style={[styles.container, isBlurred && styles.blurred]}>
			<View style={styles.leftSection}>
				<Text style={styles.homeIcon}>
					{getEnergySourceIcon(home.electricitySource)}
				</Text>
				<View style={styles.homeDetails}>
					<Text style={styles.zipcode} numberOfLines={1}>
						{home.zipcode}
					</Text>
					<Text style={styles.yearBuilt}>Built {home.yearBuilt}</Text>
				</View>
			</View>
			<View style={styles.rightSection}>
				<Text style={styles.co2Value}>{totalTons}</Text>
				<Text style={styles.co2Label}>tons/year</Text>
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
	homeIcon: {
		fontSize: 20,
		marginRight: spacing.sm,
	},
	homeDetails: {
		flex: 1,
	},
	zipcode: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
		color: colors.textPrimary,
	},
	yearBuilt: {
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

export default HomeHighlights;
