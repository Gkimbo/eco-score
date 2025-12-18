import React from "react";
import { Modal, Portal } from "react-native-paper";
import { useNavigate } from "react-router-native";
import SignOutButton from "./SignoutButton";
import HomeButton from "./HomeButton";
import { Pressable, View, StyleSheet, Text } from "react-native";
import AddHomeButton from "./AddHomeButton";
import AddBasicsButton from "./AddBasicInfoButton";
import EditCarButton from "./AddCarButton";
import RewardsButton from "./RewardsButton";
import { colors, borderRadius, shadows, spacing, typography } from "../../services/styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface IAppProps {
	dispatch: any;
	isDrawerOpen: boolean;
	setIsDrawerOpen: any;
}

const TopBar: React.FunctionComponent<IAppProps> = ({
	dispatch,
	isDrawerOpen,
	setIsDrawerOpen,
}) => {
	const navigate = useNavigate();
	const insets = useSafeAreaInsets();
	const hideModal = () => setIsDrawerOpen(false);

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<>
			<View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
				<HomeButton />
				<SignOutButton dispatch={dispatch} />
			</View>

			<Portal>
				{/* Floating Action Button - rendered via Portal to escape container */}
				<Pressable
					onPress={toggleDrawer}
					style={[styles.fab, { bottom: insets.bottom + 100 }]}
				>
					<View style={styles.fabIconContainer}>
						<View style={styles.fabLine} />
						<View style={styles.fabLine} />
						<View style={styles.fabLine} />
					</View>
				</Pressable>

				<Modal
					visible={isDrawerOpen}
					onDismiss={hideModal}
					contentContainerStyle={[styles.modalContent, { paddingBottom: insets.bottom + spacing.lg }]}
				>
					<View style={styles.modalHandle} />
					<View style={styles.modalHeader}>
						<Text style={styles.modalTitle}>Add Information</Text>
						<Pressable onPress={hideModal} style={styles.closeButton}>
							<Text style={styles.closeButtonText}>×</Text>
						</Pressable>
					</View>
					<View style={styles.modalButtons}>
						<AddBasicsButton setIsDrawerOpen={setIsDrawerOpen} />
						<AddHomeButton setIsDrawerOpen={setIsDrawerOpen} />
						<EditCarButton setIsDrawerOpen={setIsDrawerOpen} />
					</View>
					<View style={styles.divider} />
					<RewardsButton setIsDrawerOpen={setIsDrawerOpen} />
				</Modal>
			</Portal>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		backgroundColor: colors.primaryDark,
		...shadows.md,
	},
	fab: {
		position: "absolute",
		right: spacing.lg,
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
		...shadows.lg,
		elevation: 8,
	},
	fabIconContainer: {
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
	},
	fabLine: {
		width: 24,
		height: 3,
		backgroundColor: colors.textOnPrimary,
		borderRadius: 2,
	},
	modalContent: {
		backgroundColor: colors.surface,
		padding: spacing.lg,
		paddingTop: spacing.sm,
		marginTop: "auto",
		borderTopLeftRadius: borderRadius.xl,
		borderTopRightRadius: borderRadius.xl,
		...shadows.lg,
	},
	modalHandle: {
		width: 40,
		height: 4,
		backgroundColor: colors.divider,
		borderRadius: 2,
		alignSelf: "center",
		marginBottom: spacing.md,
	},
	modalHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: spacing.md,
		position: "relative",
	},
	modalTitle: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textPrimary,
	},
	closeButton: {
		position: "absolute",
		right: 0,
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: colors.backgroundDark,
		justifyContent: "center",
		alignItems: "center",
	},
	closeButtonText: {
		fontSize: 24,
		color: colors.textSecondary,
		lineHeight: 26,
	},
	modalButtons: {
		gap: spacing.sm,
	},
	divider: {
		height: 1,
		backgroundColor: colors.divider,
		marginVertical: spacing.md,
	},
});

export default TopBar;
