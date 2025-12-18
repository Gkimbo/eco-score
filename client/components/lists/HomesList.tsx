import React from "react";
import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "react-router-native";
import DeleteData from "../../services/DeleteData";
import HomeTile from "./tiles/HomeTile";
import { Home } from "../../services/types/carAndHomeType";
import { colors, spacing, typography, borderRadius, shadows } from "../../services/styles/theme";

export interface IAppProps {
	state: any;
	dispatch: any;
	isDrawerOpen: boolean;
}

const HomeList: React.FunctionComponent<IAppProps> = ({
	state,
	dispatch,
	isDrawerOpen,
}) => {
	const insets = useSafeAreaInsets();
	const navigate = useNavigate();

	const handleAddHome = () => {
		navigate("/home-form");
	};

	const onEditHome = (home: Home) => {
		navigate("/home-form", { state: { editingHome: home } });
	};

	const onDeleteHome = async (id: number) => {
		try {
			const deleteHome = await DeleteData.deleteHome(id);
			if (deleteHome) {
				dispatch({ type: "DELETE_HOME", payload: id });
			}
		} catch (error) {
			console.error("Error deleting home:", error);
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
				<Text style={styles.headerIcon}>🏠</Text>
				<Text style={styles.title}>Your Homes</Text>
				<Text style={styles.subtitle}>
					{state.homes.length === 0
						? "No homes added yet"
						: `${state.homes.length} home${state.homes.length > 1 ? "s" : ""} tracked`}
				</Text>
			</View>

			{/* Home Tiles */}
			{state.homes.length > 0 ? (
				<>
					<HomeTile
						state={state}
						onDeleteHome={onDeleteHome}
						onEditHome={onEditHome}
						isBlurred={isDrawerOpen}
					/>
					{/* Add Another Home Button */}
					<Pressable
						style={({ pressed }) => [
							styles.addAnotherButton,
							pressed && styles.addAnotherButtonPressed,
						]}
						onPress={handleAddHome}
					>
						<Text style={styles.addAnotherIcon}>+</Text>
						<Text style={styles.addAnotherText}>Add Another Home</Text>
					</Pressable>
				</>
			) : (
				<Pressable style={styles.emptyState} onPress={handleAddHome}>
					<Text style={styles.emptyIcon}>🏡</Text>
					<Text style={styles.emptyTitle}>No Homes Yet</Text>
					<Text style={styles.emptyText}>
						You haven't added any homes yet
					</Text>
					<View style={styles.addButton}>
						<Text style={styles.addButtonText}>Tap here to add a home</Text>
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
					The average U.S. household produces about{" "}
					<Text style={styles.infoHighlight}>7.5 tons</Text> of CO2 per year
					from electricity alone. Solar panels can reduce this by up to 80%.
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

export default HomeList;
