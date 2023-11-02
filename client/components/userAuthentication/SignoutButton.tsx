import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";

export interface IAppProps {
	dispatch: any;
}

const SignOutButton: React.FunctionComponent<IAppProps> = ({ dispatch }) => {
	const navigate = useNavigate();

	const signOut = () => {
		fetch("http://localhost:3000/api/v1/user-sessions/logout", {
			method: "POST",
			credentials: "include",
		})
			.then((response) => {
				if (response.ok) {
					console.log("Successfully logged out");
					localStorage.removeItem("token");
					dispatch({ type: "CURRENT_USER", payload: null });
				} else {
					console.error("Failed to log out");
				}
			})
			.catch((error) => {
				console.error("An error occurred while logging out:", error);
			});
	};

	return (
		<TouchableOpacity style={styles.button} onPress={signOut}>
			<Text>Sign Out</Text>
		</TouchableOpacity>
	);
};

const styles = {
	button: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
};

export default SignOutButton;
