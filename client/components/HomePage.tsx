import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import homePageStyles from "../services/styles/HomePageStyle";
import FetchData from "../services/fetchData";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ListStyles from "../services/styles/ListStyles";
import { Car, Home } from "../services/types/carAndHomeType";
import CarHighlights from "./lists/highlights/CarHighlights";
import HomeHighlights from "./lists/highlights/HomeHighlights";
import Rewards from "./rewards/RewardsDisplay";

export interface IAppProps {
	state: any;
	dispatch: any;
	isDrawerOpen: any;
}

const HomePage: React.FunctionComponent<IAppProps> = ({
	state,
	dispatch,
	isDrawerOpen,
}) => {
	const [carCarbon, setCarCarbon] = useState<number>(0);
	const [homeCarbon, setHomeCarbon] = useState<number>(0);
	const [isBlurred, setIsBlurred] = useState<boolean>(false);
	const navigate = useNavigate();

	let totalCarbon = carCarbon + homeCarbon;

	const handleCarsPress = () => {
		navigate("/cars");
	};

	const handleHomesPress = () => {
		navigate("/homes");
	};

	const handleRewardsPress = () => {
		navigate("/rewards");
	};

	const cars = state.cars.map((car: Car) => {
		return <CarHighlights key={car.id} car={car} isBlurred={isBlurred} />;
	});

	const homes = state.homes.map((home: Home) => {
		return <HomeHighlights key={home.id} home={home} isBlurred={isBlurred} />;
	});

	useEffect(() => {
		const averageCarbonToProduceAnyCar = 16526;
		const totalCarbon = state.cars.reduce((total: any, car: any) => {
			return total + car.annualCarbonFromDriving;
		}, 0);
		const tonsOfCarCarbon = totalCarbon / 2000;
		let roundedCarNumber: number = Number(tonsOfCarCarbon.toFixed(2));
		setCarCarbon(roundedCarNumber);

		const totalHomeCarbon = state.homes.reduce((total: number, home: any) => {
			return (
				total +
				parseInt(home.totalAnnualCarbon) +
				parseInt(home.totalStaticCarbon)
			);
		}, 0);

		const homeCarbonInTons = totalHomeCarbon / 2000;
		let roundedHomeNumber: number = Number(homeCarbonInTons.toFixed(2));
		setHomeCarbon(roundedHomeNumber);
	}, [state.cars, state.homes]);

	useEffect(() => {
		if (state.currentUser.token) {
			FetchData.get("/api/v1/user-info", state.currentUser.token).then(
				(response) => {
					dispatch({ type: "USER_CAR", payload: response.user.cars });
					dispatch({
						type: "USER_INFO",
						payload: response.user.info,
					});
					dispatch({
						type: "USER_HOME",
						payload: response.user.homes,
					});
				}
			);
		}
	}, []);

	useEffect(() => {
		setIsBlurred(isDrawerOpen);
	}, [isDrawerOpen]);

	return (
		<View style={[isBlurred && styles.blurredContainer]}>
			<View style={homePageStyles.container}>
				<View style={homePageStyles.leftAndCenterContainer}>
					<View style={homePageStyles.leftContainer}>
						<Pressable onPress={handleCarsPress}>
							<View style={homePageStyles.iconWithNumber}>
								<Text>🚗</Text>
								<Text>{carCarbon || 0}</Text>
							</View>
						</Pressable>
						<Pressable onPress={handleHomesPress}>
							<View style={homePageStyles.iconWithNumber}>
								<Text>🏠</Text>
								<Text>{homeCarbon || 0}</Text>
							</View>
						</Pressable>
					</View>

					<View style={homePageStyles.centerContainer}>
						<Text style={homePageStyles.header}>Your Score!</Text>

						<View style={homePageStyles.circleContainer}>
							<View
								style={[
									homePageStyles.circle,
									{
										height: `${Math.min((carCarbon + homeCarbon) * 2.5, 100)}%`,
									},
								]}
							/>
							<Text>You Produce</Text>
							<Text style={homePageStyles.carbonText}>
								{totalCarbon.toFixed(2)}
							</Text>
							<Text>tons of CO2 annually</Text>
						</View>
					</View>
				</View>

				<View style={homePageStyles.centerAndRightContainer}>
					<View style={homePageStyles.rightContainer}>
						<Pressable onPress={handleRewardsPress}>
							<View style={homePageStyles.iconWithNumber}>
								<Rewards userRewards={state.rewards} />
							</View>
						</Pressable>
						<View style={homePageStyles.iconWithNumber}>
							<Text>🌳</Text>
							<Text>{state.treesPlanted || 0}</Text>
						</View>
					</View>
				</View>
			</View>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					marginTop: 20,
				}}
			>
				<Pressable onPress={handleCarsPress}>
					<View style={ListStyles.buttonContainer}>
						<Text style={ListStyles.buttonText}>
							{state.cars.length === 0
								? ""
								: state.cars.length === 1
								? "Your Car"
								: "Your Cars"}
						</Text>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginLeft: 15,
							}}
						>
							<Icon
								name="arrow-right"
								size={20}
								color="black"
								style={{ marginRight: 10 }}
							/>
						</View>
					</View>
					{cars}
				</Pressable>

				<Pressable onPress={handleHomesPress}>
					<View style={ListStyles.buttonContainer}>
						<Text style={ListStyles.buttonText}>
							{state.homes.length === 0
								? ""
								: state.homes.length === 1
								? "Your Home"
								: "Your Homes"}
						</Text>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginLeft: 15,
							}}
						>
							<Icon
								name="arrow-right"
								size={20}
								color="black"
								style={{ marginRight: 10 }}
							/>
						</View>
					</View>
					{homes}
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	blurredContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
});

export default HomePage;
