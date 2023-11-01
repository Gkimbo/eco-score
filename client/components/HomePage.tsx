import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import homePageStyles from "../services/styles/HomePageStyle";
import SignOutButton from "./userAuthentication/SignoutButton";

export interface IAppProps {
	state: any;
	dispatch: any;
}

const HomePage: React.FunctionComponent<IAppProps> = ({ state, dispatch }) => {
	const handlePress = (event: any) => {
		event.preventDefault();
		dispatch({ type: "CARBON", payload: 1 });
	};

	return (
		<View style={homePageStyles.container}>
			<SignOutButton />
			<Text style={homePageStyles.header}>{state.greeting}</Text>
			<TouchableOpacity onPress={handlePress}>
				<View style={homePageStyles.button}>
					<Text style={homePageStyles.text}>{state.carbon}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default HomePage;
