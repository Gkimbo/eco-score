import React from "react";
import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "react-router-native";
import DeleteData from "../../services/DeleteData";
import CarTile from "./tiles/CarTile";
import { colors, spacing, typography, borderRadius, shadows } from "../../services/styles/theme";

export interface IAppProps {
	state: any;
	dispatch: any;
	isDrawerOpen: boolean;
}

const CarList: React.FunctionComponent<IAppProps> = ({
	state,
	dispatch,
	isDrawerOpen,
}) => {
	const insets = useSafeAreaInsets();
	const navigate = useNavigate();

	const handleAddCar = () => {
		navigate("/car-form");
	};

	const onDeleteCar = async (id: number) => {
		try {
			const deleteCar = await DeleteData.deleteCar(id);
			if (deleteCar) {
				dispatch({ type: "DELETE_CAR", payload: id });
			}
		} catch (error) {
			console.error("Error deleting car:", error);
		}
	};

	return (
		<ScrollView
			style={[styles.container, isDrawerOpen && styles.blurred]}
			contentContainerStyle={[
				styles.contentContainer,
				{ paddingTop: insets.top + 80, paddingBottom: insets.bottom + 100 },
			]}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerIcon}>🚗</Text>
				<Text style={styles.title}>Your Vehicles</Text>
				<Text style={styles.subtitle}>
					{state.cars.length === 0
						? "No vehicles added yet"
						: `${state.cars.length} vehicle${state.cars.length > 1 ? "s" : ""} tracked`}
				</Text>
			</View>

			{/* Car Tiles */}
			{state.cars.length > 0 ? (
				<>
					<CarTile
						state={state}
						onDeleteCar={onDeleteCar}
						isBlurred={isDrawerOpen}
					/>
					{/* Add Another Vehicle Button */}
					<Pressable
						style={({ pressed }) => [
							styles.addAnotherButton,
							pressed && styles.addAnotherButtonPressed,
						]}
						onPress={handleAddCar}
					>
						<Text style={styles.addAnotherIcon}>+</Text>
						<Text style={styles.addAnotherText}>Add Another Vehicle</Text>
					</Pressable>
				</>
			) : (
				<Pressable style={styles.emptyState} onPress={handleAddCar}>
					<Text style={styles.emptyIcon}>🚙</Text>
					<Text style={styles.emptyTitle}>No Vehicles Yet</Text>
					<Text style={styles.emptyText}>
						You haven't added any vehicles yet
					</Text>
					<View style={styles.addButton}>
						<Text style={styles.addButtonText}>Tap here to add a vehicle</Text>
					</View>
				</Pressable>
			)}

			{/* Info Card */}
			<View style={styles.infoCard}>
				<View style={styles.infoHeader}>
					<Text style={styles.infoIcon}>💡</Text>
					<Text style={styles.infoTitle}>Did You Know?</Text>
				</View>
				<Text style={styles.infoText}>
					The average CO2 to manufacture a car is approximately{" "}
					<Text style={styles.infoHighlight}>8.26 tons</Text>, not including
					high voltage batteries for EVs/hybrids.
				</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	blurred: {
		opacity: 0.3,
	},
	contentContainer: {
		paddingHorizontal: spacing.md,
	},
	header: {
		alignItems: "center",
		marginBottom: spacing.lg,
	},
	headerIcon: {
		fontSize: 48,
		marginBottom: spacing.sm,
	},
	title: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
		marginBottom: spacing.xs,
	},
	subtitle: {
		fontSize: typography.fontSizes.lg,
		color: colors.textSecondary,
	},
	emptyState: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.xl,
		alignItems: "center",
		...shadows.sm,
	},
	emptyIcon: {
		fontSize: 64,
		marginBottom: spacing.md,
	},
	emptyTitle: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
		marginBottom: spacing.sm,
	},
	emptyText: {
		fontSize: typography.fontSizes.md,
		color: colors.textSecondary,
		textAlign: "center",
		marginBottom: spacing.lg,
	},
	addButton: {
		backgroundColor: colors.primary,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.xl,
		borderRadius: borderRadius.full,
	},
	addButtonText: {
		color: colors.textOnPrimary,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.semibold,
	},
	infoCard: {
		backgroundColor: colors.primarySoft + "20",
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginTop: spacing.lg,
		borderLeftWidth: 4,
		borderLeftColor: colors.primary,
	},
	infoHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.sm,
	},
	infoIcon: {
		fontSize: 20,
		marginRight: spacing.sm,
	},
	infoTitle: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.primaryDark,
	},
	infoText: {
		fontSize: typography.fontSizes.md,
		color: colors.textSecondary,
		lineHeight: 22,
	},
	infoHighlight: {
		fontWeight: typography.fontWeights.bold,
		color: colors.primary,
	},
	addAnotherButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.primary,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		marginTop: spacing.lg,
		...shadows.sm,
	},
	addAnotherButtonPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	addAnotherIcon: {
		fontSize: 24,
		color: colors.textOnPrimary,
		fontWeight: typography.fontWeights.bold,
		marginRight: spacing.sm,
	},
	addAnotherText: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textOnPrimary,
	},
});

export default CarList;
