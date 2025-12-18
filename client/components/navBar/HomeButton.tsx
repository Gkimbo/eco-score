import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors, borderRadius, shadows, spacing } from "../../services/styles/theme";

export interface IAppProps {}

const HomeButton: React.FunctionComponent<IAppProps> = () => {
	const navigate = useNavigate();

	const handlePress = () => {
		navigate("/");
	};

	return (
		<Pressable style={styles.button} onPress={handlePress}>
			<Icon name="home" size={20} color={colors.textOnPrimary} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primaryLight,
		padding: spacing.sm,
		borderRadius: borderRadius.full,
		...shadows.sm,
	},
});

export default HomeButton;
