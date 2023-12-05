import { ScrollView, Text, Pressable, View } from "react-native";
import DeleteData from "../../services/DeleteData";
import CarTile from "./tiles/CarTile";
import ListStyles from "../../services/styles/ListStyles";

export interface IAppProps {
	state: any;
	dispatch: any;
	isDrawerOpen: boolean;
}

const CarList: React.FunctionComponent<IAppProps> = ({
	state,
	dispatch,
	isDrawerOpen,
}) => {
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

	return (
		<View style={ListStyles.container}>
			<Text style={ListStyles.title}>Your Cars!</Text>
			<CarTile
				state={state}
				onDeleteCar={onDeleteCar}
				isBlurred={isDrawerOpen}
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
		</View>
	);
};

export default CarList;
