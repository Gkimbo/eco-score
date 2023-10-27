import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";

const SignOutButton: React.FC = () => {
	const [shouldRedirect, setShouldRedirect] = useState(false);
	const navigate = useNavigate();

	const signOut = async () => {
		try {
			const response = await fetch("/api/v1/user-sessions", {
				method: "delete",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.statusText})`;
				const error = new Error(errorMessage);
				throw error;
			}
			const respBody = await response.json();
			setShouldRedirect(true);
			return { status: "ok" };
		} catch (err: any) {
			console.error(`Error in fetch: ${err.message}`);
		}
	};

	if (shouldRedirect) {
		navigate("/");
	}

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
