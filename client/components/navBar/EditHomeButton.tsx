import React, { useState, useEffect } from "react";
import { Text, Pressable } from "react-native";
import { useNavigate } from "react-router-native";

export interface IAppProps {}

const EditHomeButton: React.FunctionComponent<IAppProps> = () => {
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (redirect) {
			navigate("/home-form");
			setRedirect(false);
		}
	}, [redirect]);

	const handlePress = () => {
		setRedirect(true);
	};

	return (
		<Pressable style={styles.button} onPress={handlePress}>
			<Text style={styles.buttonText}>Edit Home info</Text>
		</Pressable>
	);
};

const styles = {
	button: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 50,
	},
	buttonText: {
		color: "white",
		fontSize: 10,
	},
};

export default EditHomeButton;
