import React, { useEffect, useState } from "react";
import { Text, Pressable, View } from "react-native";
import homePageStyles from "../services/styles/HomePageStyle";
import FetchData from "../services/fetchData";
import CarList from "./lists/CarLists";
import UserFormStyles from "../services/styles/UserInputFormStyle";
import DeleteData from "../services/DeleteData";
import HomeList from "./lists/HomeLists";

export interface IAppProps {
	state: any;
	dispatch: any;
}

const HomePage: React.FunctionComponent<IAppProps> = ({ state, dispatch }) => {
	const [carCarbon, setCarCarbon] = useState<number>(0);
	const [homeCarbon, setHomeCarbon] = useState<number>(0);

	const handlePress = (event: any) => {
		event.preventDefault();
		dispatch({ type: "CARBON", payload: 1 });
	};

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
			if (car.carbonPerTank) {
				return (
					total + parseInt(car.carbonPerTank) + averageCarbonToProduceAnyCar
				);
			} else {
				return (
					total +
					parseInt(car.carbonPerCharge) +
					parseInt(car.carbonToMakeBattery) +
					averageCarbonToProduceAnyCar
				);
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

	return (
		<>
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
										{ height: `${Math.min(carCarbon + homeCarbon, 100)}%` },
									]}
								/>
								<Text>You Produce</Text>
								<Text style={homePageStyles.carbonText}>
									{carCarbon + homeCarbon}
								</Text>
								<Text>tons of CO2 annually</Text>
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
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					marginTop: 20,
				}}
			>
				<Text style={UserFormStyles.title}>Your Cars</Text>
				<CarList state={state} onDeleteCar={onDeleteCar} />
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
				<Text style={UserFormStyles.title}>Your Homes</Text>
				<HomeList state={state} onDeleteHome={onDeleteHome} />
			</View>
		</>
	);
};

export default HomePage;
