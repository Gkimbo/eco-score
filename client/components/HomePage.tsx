import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import homePageStyles from "../services/styles/HomePageStyle";
import FetchData from "../services/fetchData";
import CarList from "./lists/CarLists";
import UserFormStyles from "../services/styles/UserInputFormStyle";
import DeleteData from "../services/DeleteData";
import HomeList from "./lists/HomeLists";

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

	let totalCarbon = carCarbon + homeCarbon;

	const onDeleteCar = async (id: number) => {
		try {
			const deleteCar = await DeleteData.deleteCar(id);
			if (deleteCar) {
				dispatch({ type: "DELETE_CAR", payload: id });
			}
		} catch (error) {
			console.error("Error deleting car:", error);
		}
	};

	const onDeleteHome = async (id: number) => {
		try {
			const deleteHome = await DeleteData.deleteHome(id);
			if (deleteHome) {
				dispatch({ type: "DELETE_HOME", payload: id });
			}
		} catch (error) {
			console.error("Error deleting car:", error);
		}
	};

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
						<View style={homePageStyles.iconWithNumber}>
							<Text>🚗</Text>
							<Text>{carCarbon || 0}</Text>
						</View>
						<View style={homePageStyles.iconWithNumber}>
							<Text>🏠</Text>
							<Text>{homeCarbon || 0}</Text>
						</View>
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
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					marginTop: 20,
				}}
			>
				<Text style={UserFormStyles.title}>
					{state.cars.length === 0
						? ""
						: state.cars.length === 1
						? "Your Car"
						: "Your Cars"}
				</Text>
				<CarList
					state={state}
					onDeleteCar={onDeleteCar}
					isBlurred={isBlurred}
				/>
				<Text
					style={{
						fontSize: 14,
						color: "white",
						marginTop: 30,
						marginBottom: 20,
						textAlign: "center",
						marginRight: 5,
						marginLeft: 5,
					}}
				>
					Average amount of CO2 to produce a car:{" "}
					<Text style={{ color: "orange" }}>{16526 / 2000}</Text> Tons not
					including high voltage battery
				</Text>
				<Text style={UserFormStyles.title}>
					{state.homes.length === 0
						? ""
						: state.homes.length === 1
						? "Your Home"
						: "Your Homes"}
				</Text>
				<HomeList
					state={state}
					onDeleteHome={onDeleteHome}
					isBlurred={isBlurred}
				/>
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
