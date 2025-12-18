import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors, borderRadius, shadows, spacing, typography } from "../../services/styles/theme";

export interface IAppProps {
	setIsDrawerOpen: any;
}

const AddCarButton: React.FunctionComponent<IAppProps> = ({
	setIsDrawerOpen,
}) => {
	const navigate = useNavigate();

	const handlePress = () => {
		setIsDrawerOpen(false);
		navigate("/car-form");
	};

	return (
		<Pressable style={styles.button} onPress={handlePress}>
			<View style={styles.iconContainer}>
				<Icon name="car" size={18} color={colors.textOnPrimary} />
			</View>
			<Text style={styles.buttonText}>Add Car</Text>
			<Icon name="chevron-right" size={14} color={colors.textMuted} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		padding: spacing.md,
		borderRadius: borderRadius.lg,
		marginVertical: spacing.xs,
		...shadows.sm,
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
		color: colors.textPrimary,
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.medium,
	},
});

export default AddCarButton;
