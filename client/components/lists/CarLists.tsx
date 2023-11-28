import React from "react";
import { Text, View } from "react-native";
import UserFormStyles from "../../services/styles/UserInputFormStyle";

export interface IAppProps {
	state: any;
}
export type Car = {
	id: number;
	make: string;
	model: string;
	year: string;
	tank: string;
	fuelType: "gas" | "diesel" | "hybrid" | "electricity";
	carBatterySize: string;
	zipcode: string;
	carbonPerTank: string;
	carbonPerCharge: string;
	carbonToMakeBattery: string;
	carbonPerMile: string;
};

const CarList: React.FunctionComponent<IAppProps> = ({ state }) => {
	const cars = state.cars;

	return (
		<View>
			{cars.map((item: Car) => (
				<View
					key={item.id}
					style={{
						justifyContent: "center",
						borderWidth: 1,
						borderRadius: 10,
						borderColor: "#ddd",
						backgroundColor: "#fff",
						margin: 10,
						padding: 10,
						height: "auto",
						alignItems: "stretch",
					}}
				>
					<Text
						style={{
							fontSize: 16,
							color: "#333",
							textAlign: "center",
						}}
					>
						{item.make} - {item.model}
					</Text>
					<Text
						style={{
							borderWidth: 1,
							borderRadius: 10,
							borderColor: "#ddd",
							backgroundColor: "#fff",
							margin: 5,
							padding: 5,
						}}
					>
						{item.fuelType === "electricity"
							? `CO2 produced per charge: (${item.carbonPerCharge} lbs of CO2)`
							: `CO2 produced per tank: (${item.carbonPerTank} lbs of CO2)`}
					</Text>
					{item.fuelType === "electricity" && item.zipcode !== "off grid" && (
						<Text
							style={{
								borderWidth: 1,
								borderRadius: 10,
								borderColor: "#ddd",
								backgroundColor: "#fff",
								margin: 5,
								padding: 5,
							}}
						>
							{`CO2 produced for 100,000 miles: (${(
								(Number(item.carbonPerMile) * 100000) /
								2000
							).toFixed(2)} tons of CO2)`}
						</Text>
					)}
					{item.fuelType === "gas" || item.fuelType === "diesel" ? (
						<Text
							style={{
								borderWidth: 1,
								borderRadius: 10,
								borderColor: "#ddd",
								backgroundColor: "#fff",
								margin: 5,
								padding: 5,
							}}
						>
							{`CO2 produced for 100,000 miles: (${(
								(Number(item.carbonPerMile) * 100000) /
								2000
							).toFixed(2)} tons of CO2)`}
						</Text>
					) : null}
					{item.fuelType === "electricity" ? (
						<Text
							style={{
								borderWidth: 1,
								borderRadius: 10,
								borderColor: "#ddd",
								backgroundColor: "#fff",
								margin: 5,
								padding: 5,
							}}
						>
							{`CO2 produced manufacturing battery: (${(
								Number(item.carbonToMakeBattery) / 2000
							).toFixed(2)} tons of CO2)`}
						</Text>
					) : null}
					{item.fuelType === "electricity" && item.zipcode === "off grid" && (
						<Text
							style={{
								fontSize: 14,
								color: "#777",
								marginTop: 5,
								textAlign: "center",
							}}
						>
							This car is charged off the grid
						</Text>
					)}
				</View>
			))}
		</View>
	);
};

export default CarList;
