import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { Star } from "lucide-react-native";
import { colors, borderRadius, shadows, spacing, typography } from "../../services/styles/theme";

export interface IAppProps {
	setIsDrawerOpen: any;
}

const RewardsButton: React.FunctionComponent<IAppProps> = ({
	setIsDrawerOpen,
}) => {
	const navigate = useNavigate();

	const handlePress = () => {
		setIsDrawerOpen(false);
		navigate("/rewards");
	};

	return (
		<Pressable style={styles.button} onPress={handlePress}>
			<View style={styles.iconContainer}>
				<Star color={colors.highlight} fill={colors.highlight} size={20} />
			</View>
			<Text style={styles.buttonText}>Your Rewards</Text>
			<View style={styles.badge}>
				<Star color={colors.highlight} fill={colors.highlight} size={12} />
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.primaryDark,
		padding: spacing.md,
		borderRadius: borderRadius.lg,
		marginVertical: spacing.xs,
		...shadows.md,
	},
	iconContainer: {
		width: 36,
		height: 36,
		borderRadius: borderRadius.full,
		backgroundColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
		marginRight: spacing.md,
	},
	buttonText: {
		flex: 1,
		color: colors.textOnPrimary,
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
	},
	badge: {
		padding: spacing.xs,
	},
});

export default RewardsButton;
