import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import { useNavigate } from "react-router-native";

import Icon from "react-native-vector-icons/FontAwesome";

export interface IAppProps {}

const HomeButton: React.FunctionComponent<IAppProps> = () => {
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (redirect) {
			navigate("/");
			setRedirect(false);
		}
	}, [redirect]);

	const handlePress = () => {
		setRedirect(true);
	};

	return (
		<Pressable style={styles.button} onPress={handlePress}>
			<Icon name="home" size={20} color="white" />
		</Pressable>
	);
};

const styles = {
	button: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 50,
	},
};

export default HomeButton;
