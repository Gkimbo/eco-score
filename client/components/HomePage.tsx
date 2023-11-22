import React, { useEffect } from "react";
import { Text, Pressable, View } from "react-native";
import homePageStyles from "../services/styles/HomePageStyle";
import FetchData from "../services/fetchData";

export interface IAppProps {
	state: any;
	dispatch: any;
}

const HomePage: React.FunctionComponent<IAppProps> = ({ state, dispatch }) => {
	const handlePress = (event: any) => {
		event.preventDefault();
		dispatch({ type: "CARBON", payload: 1 });
	};
	console.log(state);

	useEffect(() => {
		FetchData.get("/api/v1/user-info", state.currentUser).then((response) => {
			dispatch({ type: "USER_CAR", payload: response.user.cars });
			dispatch({
				type: "USER_INFO",
				payload: response.user.info,
			});
			dispatch({
				type: "USER_HOME",
				payload: response.user.homes,
			});
		});
	}, []);

	return (
		<View style={homePageStyles.container}>
			<View style={homePageStyles.leftAndCenterContainer}>
				<View style={homePageStyles.leftContainer}>
					<View style={homePageStyles.iconWithNumber}>
						<Text>🚗</Text>
						<Text>{state.userCars || 0}</Text>
					</View>
					<View style={homePageStyles.iconWithNumber}>
						<Text>🏠</Text>
						<Text>{state.homeCount || 0}</Text>
					</View>
					<View style={homePageStyles.iconWithNumber}>
						<Text>🏢</Text>
						<Text>{state.workCount || 0}</Text>
					</View>
				</View>

				<View style={homePageStyles.centerContainer}>
					<Text style={homePageStyles.header}>Your Score!</Text>
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
			</View>

			<View style={homePageStyles.centerAndRightContainer}>
				<View style={homePageStyles.rightContainer}>
					<View style={homePageStyles.iconWithNumber}>
						<Text>🌳</Text>
						<Text>{state.treesPlanted || 0}</Text>
					</View>
					<View style={homePageStyles.iconWithNumber}>
						<Text>☀️</Text>
						<Text>{state.solarPanelsBuilt || 0}</Text>
					</View>
					<View style={homePageStyles.iconWithNumber}>
						<Text>🌬️</Text>
						<Text>{state.windTurbinesBuilt || 0}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default HomePage;
