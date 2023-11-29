import React, { useState } from "react";
import { Text, View, Pressable, Animated, Easing } from "react-native";

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
	const [deleteConfirmation, setDeleteConfirmation] = useState<any>({});

	const handleNoPress = (carId: number) => {
		setDeleteConfirmation((prevConfirmations: any) => ({
			[carId]: !prevConfirmations[carId],
		}));
	};

	const handleDeletePress = (carId: number) => {
		setDeleteConfirmation((prevConfirmations: any) => ({
			[carId]: !prevConfirmations[carId],
		}));
		if (deleteConfirmation[carId]) {
			Animated.timing(deleteAnimation, {
				toValue: 0,
				duration: 300,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start(() => {
				onDeleteCar(carId);
				setDeleteConfirmation((prevConfirmations: any) => ({
					...prevConfirmations,
					[carId]: false,
				}));
			});
		} else {
			Animated.timing(deleteAnimation, {
				toValue: 1,
				duration: 300,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start();
		}
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
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Pressable
							onPress={() => handleDeletePress(item.id)}
							accessible={true}
							accessibilityLabel="Delete Button"
						>
							{({ pressed }) => (
								<Animated.View
									style={{
										borderRadius: 20,
										marginRight: 10,
										width: deleteConfirmation[item.id] ? 65 : pressed ? 40 : 30,
										height: deleteConfirmation[item.id]
											? 25
											: pressed
											? 40
											: 30,
										backgroundColor: deleteConfirmation[item.id]
											? "red"
											: pressed
											? "red"
											: "#d65d5d",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Text
										style={{
											color: "white",
											fontWeight: "bold",
											fontSize: deleteConfirmation[item.id] ? 10 : 14,
										}}
									>
										{deleteConfirmation[item.id] ? "Delete Car" : "X"}
									</Text>
								</Animated.View>
							)}
						</Pressable>

						{deleteConfirmation[item.id] && (
							<Pressable
								onPress={() => handleNoPress(item.id)}
								accessible={true}
								accessibilityLabel="No Button"
							>
								<View
									style={{
										borderRadius: 20,
										width: 65,
										height: 25,
										backgroundColor: "green",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Text
										style={{
											color: "white",
											fontWeight: "bold",
											fontSize: 10,
										}}
									>
										Keep Car
									</Text>
								</View>
							</Pressable>
						)}
					</View>
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
							fontSize: 10,
							color: "#333",
							textAlign: "center",
						}}
					>
						{item.year}
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
