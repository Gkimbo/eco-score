import React, { useState, useEffect } from "react";
import { Text, Pressable, ViewStyle, TextStyle } from "react-native";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";

export interface IAppProps {
	setIsDrawerOpen: any;
}

const AddHomeButton: React.FunctionComponent<IAppProps> = ({
	setIsDrawerOpen,
}) => {
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (redirect) {
			setIsDrawerOpen(false);
			navigate("/home-form");
			setRedirect(false);
		}
	}, [redirect]);

	const handlePress = () => {
		setRedirect(true);
	};

	return (
		<Pressable style={styles.button} onPress={handlePress}>
			<Icon name="home" size={20} color="white" style={{ marginRight: 5 }} />
			<Text style={styles.buttonText}>Add Home</Text>
		</Pressable>
	);
};

interface Styles {
	button: ViewStyle;
	buttonText: TextStyle; // Separate TextStyle for text styles
}

const styles: Styles = {
	button: {
		backgroundColor: "#f9bc60",
		padding: 10,
		borderRadius: 50,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
		width: "50%",
		height: "20%",
	},
	buttonText: {
		color: "black",
		fontSize: 15,
	},
};

export default AddHomeButton;
