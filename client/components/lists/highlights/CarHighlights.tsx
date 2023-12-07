import { ScrollView, Text, Pressable, View } from "react-native";
import ListStyles from "../../../services/styles/ListStyles";
import { Car } from "../../../services/types/carAndHomeType";

export interface IAppProps {
	car: Car;
	isBlurred: boolean;
}

const CarHighlights: React.FunctionComponent<IAppProps> = ({
	car,
	isBlurred,
}) => {
	return (
		<View
			style={{
				flexDirection: "row",
				flexWrap: "wrap",
				justifyContent: "center",
				borderWidth: 1,
				borderRadius: 10,
				borderColor: "#ddd",
				backgroundColor: isBlurred ? "rgba(0, 0, 0, 0.5)" : "#fff",
				margin: 10,
				padding: 10,
				height: "auto",
				alignItems: "stretch",
			}}
		>
			<View style={{ flexDirection: "column", justifyContent: "center" }}>
				<Text>
					{car.make} - {car.model}
				</Text>
				<Text
					style={{
						fontSize: 10,
						color: "#333",
						textAlign: "center",
					}}
				>
					{car.year}
				</Text>
			</View>

			{car.fuelType === "hybrid" ? (
				<View style={ListStyles.infoContainer}>
					<Text>Total CO2 after 100,000 miles:</Text>
					<Text>
						(
						<Text
							style={{
								fontSize: 15,
								color: "brown",
								fontWeight: "bold",
							}}
						>
							{(
								(Number(car.carbonPerMile) * 100000 +
									Number(car.carbonToMakeBattery)) /
									2000 +
								8.263
							).toFixed(2)}
						</Text>{" "}
						tons of CO2)
					</Text>
				</View>
			) : null}
			{car.fuelType === "gas" || car.fuelType === "diesel" ? (
				<>
					<View style={ListStyles.infoContainer}>
						<Text>Total CO2 after 100,000 miles:</Text>
						<Text>
							(
							<Text
								style={{
									fontSize: 15,
									color: "brown",
									fontWeight: "bold",
								}}
							>
								{((Number(car.carbonPerMile) * 100000) / 2000 + 8.263).toFixed(
									2
								)}
							</Text>{" "}
							tons of CO2)
						</Text>
					</View>
				</>
			) : null}
			{car.fuelType === "electricity" ? (
				<View style={ListStyles.infoContainer}>
					<Text>Total CO2 after 100,000 miles:</Text>

					{car.zipCode === "off grid" ? (
						<Text>
							({" "}
							<Text
								style={{
									fontSize: 15,
									color: "brown",
									fontWeight: "bold",
								}}
							>
								{(Number(car.carbonToMakeBattery) / 2000 + 8.263).toFixed(2)}
							</Text>{" "}
							tons of CO2)
						</Text>
					) : (
						<Text>
							(
							<Text
								style={{
									fontSize: 15,
									color: "brown",
									fontWeight: "bold",
								}}
							>
								{(
									(Number(car.carbonPerMile) * 100000 +
										Number(car.carbonToMakeBattery)) /
										2000 +
									8.263
								).toFixed(2)}
							</Text>{" "}
							tons of CO2)
						</Text>
					)}
				</View>
			) : null}
		</View>
	);
};

export default CarHighlights;
