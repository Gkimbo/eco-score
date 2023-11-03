import type React from "react";
import { Text, Pressable, View } from "react-native";

import homePageStyles from "../services/styles/HomePageStyle";

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
			<Text style={homePageStyles.header}>{state.greeting}</Text>
			<Pressable onPress={handlePress}>
				<View style={homePageStyles.circleContainer}>
					<View
						style={[
							homePageStyles.circle,
							{ height: `${Math.min(state.carbon, 100)}%` },
						]}
					/>
					<Text style={homePageStyles.carbonText}>{state.carbon}</Text>
				</View>
			</Pressable>
		</View>
	);
};

export default HomePage;
