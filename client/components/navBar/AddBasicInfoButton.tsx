import React, { useState, useEffect } from "react";
import { Text, Pressable, ViewStyle, TextStyle } from "react-native";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";

export interface IAppProps {
	setIsDrawerOpen: any;
}

const AddBasicsButton: React.FunctionComponent<IAppProps> = ({
	setIsDrawerOpen,
}) => {
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (redirect) {
			setIsDrawerOpen(false);
			navigate("/basic-form");
			setRedirect(false);
		}
	}, [redirect]);

	const handlePress = () => {
		setRedirect(true);
	};

	return (
		<Pressable style={styles.button} onPress={handlePress}>
			<Icon
				name="user-plus"
				size={20}
				color="white"
				style={{ marginRight: 5 }}
			/>
			<Text style={styles.buttonText}>Add Basic info</Text>
		</Pressable>
	);
};

interface Styles {
	button: ViewStyle;
	buttonText: TextStyle; // Separate TextStyle for text styles
}

const styles: Styles = {
	button: {
		backgroundColor: "#004643",
		padding: 10,
		borderRadius: 50,
		margin: 5,
		alignItems: "center",
		justifyContent: "center",
		width: "50%",
		height: "20%",
	},
	buttonText: {
		color: "white",
		fontSize: 15,
	},
};

export default AddBasicsButton;
