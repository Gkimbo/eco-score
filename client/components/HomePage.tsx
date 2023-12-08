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
	lastLoginTimestamp: any;
	setLastLoginTimestamp: any;
}

const HomePage: React.FunctionComponent<IAppProps> = ({
	state,
	dispatch,
	isDrawerOpen,
	lastLoginTimestamp,
	setLastLoginTimestamp,
}) => {
	const [carCarbon, setCarCarbon] = useState<number>(0);
	const [homeCarbon, setHomeCarbon] = useState<number>(0);
	const [treeCarbon, setTreeCarbon] = useState<number>(0);
	const [isBlurred, setIsBlurred] = useState<boolean>(false);
	const [rewardsWindow, setRewardsWindow] = useState<boolean>(false);

	const navigate = useNavigate();

	let totalCarbon = carCarbon + homeCarbon - treeCarbon;

	const handleCarsPress = () => {
		navigate("/cars");
	};

	const handleHomesPress = () => {
		navigate("/homes");
	};

	const handleRewardsPress = () => {
		navigate("/rewards");
	};

	const handleTreePress = () => {
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
			if (car.annualCarbonFromDriving) {
				return total + car.annualCarbonFromDriving;
			} else {
				return total + 0;
			}
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

		const savedCarbonByTrees = (state.treesPlanted * 48) / 2000;
		setTreeCarbon(savedCarbonByTrees);

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
					dispatch({
						type: "PLANT_TREES_HOME",
						payload: response.user.info.treesPlanted,
					});
					dispatch({
						type: "STARS_HOME",
						payload: response.user.info.rewards,
					});
				}
			);
		}
	}, []);

	useEffect(() => {
		setIsBlurred(isDrawerOpen);
	}, [isDrawerOpen]);

	useEffect(() => {
		// Fetch user information and update last login timestamp...

		const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
		const isDayPassed = Date.now() - lastLoginTimestamp > oneDayInMilliseconds;

		if (isDayPassed) {
			dispatch({ type: "REWARD_USER", payload: 100 });
			setRewardsWindow(true);
			setLastLoginTimestamp(Date.now());
		}
	}, [lastLoginTimestamp]);

	return (
		<View style={[isBlurred && styles.blurredContainer]}>
			<View style={homePageStyles.container}>
				<View style={homePageStyles.leftAndCenterContainer}>
					<View style={homePageStyles.leftContainer}>
						<Pressable onPress={handleCarsPress}>
							<View style={homePageStyles.iconWithNumber}>
								<Text>🚗</Text>
								<Text style={{ color: "white" }}>{carCarbon || 0}</Text>
							</View>
						</Pressable>
						<Pressable onPress={handleHomesPress}>
							<View style={homePageStyles.iconWithNumber}>
								<Text>🏠</Text>
								<Text style={{ color: "white" }}>{homeCarbon || 0}</Text>
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
										height: `${Math.min(totalCarbon * 2.5, 100)}%`,
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
						<Pressable onPress={handleRewardsPress}>
							<View style={homePageStyles.iconWithNumber}>
								<Text>🌳</Text>
								<Text style={{ color: "white" }}>
									{(state.treesPlanted * 48) / 2000}
								</Text>
							</View>
						</Pressable>
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
				{state.cars.length !== 0 ? (
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
				) : null}
				{state.homes.length !== 0 ? (
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
				) : null}
				<Pressable onPress={handleTreePress}>
					<View style={ListStyles.buttonContainer}>
						<Text style={ListStyles.buttonText}>
							{state.treesPlanted >= 1
								? "Trees you've planted! Plant more!"
								: "Plant trees!"}
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
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							marginTop: 5,
							backgroundColor: "#fff",
							borderRadius: 10,
							padding: 10,
						}}
					>
						<Text>
							<Text
								style={{ color: "green", fontWeight: "bold", fontSize: 15 }}
							>
								{state.treesPlanted}
							</Text>{" "}
							Trees Planted!
						</Text>
						<Text style={styles.infoText}>
							which absorbs{" "}
							<Text
								style={{ fontSize: 15, fontWeight: "bold", color: "green" }}
							>
								{state.treesPlanted * 48 < 2000
									? state.treesPlanted * 48
									: (state.treesPlanted * 48) / 2000}
							</Text>{" "}
							{state.treesPlanted * 48 < 2000 ? "pounds" : "tons"} of CO2 per
							year!
						</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	blurredContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	infoText: {
		marginVertical: 5,
		fontSize: 14,
		textAlign: "center",
	},
});

export default HomePage;
