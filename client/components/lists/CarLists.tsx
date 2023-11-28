import React, { useState } from "react";
import { Text, View, Pressable, Animated, Easing } from "react-native";
import UserFormStyles from "../../services/styles/UserInputFormStyle";

export interface IAppProps {
	state: any;
	onDeleteCar: (carId: number) => void;
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

const CarList: React.FunctionComponent<IAppProps> = ({
	state,
	onDeleteCar,
}) => {
	const cars = state.cars;

	const [deleteAnimation] = useState(new Animated.Value(0));

	const handleDeletePress = (carId: number) => {
		Animated.sequence([
			Animated.timing(deleteAnimation, {
				toValue: 1,
				duration: 300,
				easing: Easing.linear,
				useNativeDriver: false,
			}),
			Animated.timing(deleteAnimation, {
				toValue: 0,
				duration: 300,
				easing: Easing.linear,
				useNativeDriver: false,
			}),
		]).start(() => onDeleteCar(carId));
	};

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
					{" "}
					<Pressable
						onPress={() => handleDeletePress(item.id)}
						style={({ pressed }) => ({
							position: "absolute",
							top: 0, // Adjusted to be at the top edge
							right: 0, // Adjusted to be at the right edge
							zIndex: 2,
							opacity: pressed ? 0.5 : 1,
						})}
					>
						{({ pressed }) => (
							<Animated.View
								style={{
									transform: [
										{
											rotate: deleteAnimation.interpolate({
												inputRange: [0, 1],
												outputRange: ["0deg", "180deg"],
											}),
										},
									],
								}}
							>
								<View
									style={{
										width: 30,
										height: 30,
										borderRadius: 15,
										backgroundColor: pressed ? "darkred" : "red",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Text
										style={{
											color: "white",
											fontWeight: "bold",
										}}
									>
										{pressed ? "Delete Car" : "X"}
									</Text>
								</View>
							</Animated.View>
						)}
					</Pressable>
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
