import React, { useState, useEffect } from "react";
import { Text, Pressable, ViewStyle, TextStyle } from "react-native";
import { useNavigate } from "react-router-native";
import { Star } from "lucide-react-native";

export interface IAppProps {
	setIsDrawerOpen: any;
}

const RewardsButton: React.FunctionComponent<IAppProps> = ({
	setIsDrawerOpen,
}) => {
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (redirect) {
			setIsDrawerOpen(false);
			navigate("/rewards");
			setRedirect(false);
		}
	}, [redirect]);

	const handlePress = () => {
		setRedirect(true);
	};

	return (
		<Pressable style={styles.button} onPress={handlePress}>
			<Star color="yellow" size={20} />
			<Text style={styles.buttonText}>Your Rewards</Text>
		</Pressable>
	);
};

interface Styles {
	button: ViewStyle;
	buttonText: TextStyle; // Separate TextStyle for text styles
}

const styles: Styles = {
	button: {
		backgroundColor: "grey",
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

export default RewardsButton;
