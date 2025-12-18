import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../services/config";
import { colors, borderRadius, shadows, spacing } from "../../services/styles/theme";

export interface IAppProps {
	dispatch: any;
}

const SignOutButton: React.FunctionComponent<IAppProps> = ({ dispatch }) => {
	const navigate = useNavigate();

	const signOut = async () => {
		try {
			const response = await fetch(`${API_URL}/api/v1/user-sessions/logout`, {
				method: "POST",
				credentials: "include",
			});

			if (response.ok) {
				await AsyncStorage.removeItem("token");
				dispatch({
					type: "PLANT_TREES_HOME",
					payload: 0,
				});
				dispatch({
					type: "STARS_HOME",
					payload: 0,
				});
				dispatch({ type: "CURRENT_USER", payload: null });
				navigate("/");
			} else {
				console.error("Failed to log out");
			}
		} catch (error) {
			console.error("An error occurred while logging out:", error);
		}
	};

	return (
		<Pressable style={styles.button} onPress={signOut}>
			<Icon name="sign-out" size={20} color={colors.textOnPrimary} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.error,
		padding: spacing.sm,
		borderRadius: borderRadius.full,
		...shadows.sm,
	},
});

export default SignOutButton;
