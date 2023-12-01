import React, { useState } from "react";
import {
	Text,
	View,
	Pressable,
	Animated,
	Easing,
	StyleSheet,
} from "react-native";

export interface IAppProps {
	state: any;
	onDeleteCar: (carId: number) => void;
	isBlurred: boolean;
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

let isBlurredOut;

const CarList: React.FunctionComponent<IAppProps> = ({
	state,
	onDeleteCar,
	isBlurred,
}) => {
	const cars = state.cars;
	isBlurredOut = isBlurred;
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
						backgroundColor: isBlurred ? "rgba(0, 0, 0, 0.5)" : "#fff",
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
								<View style={styles.infoContainer}>
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
					<Text style={styles.infoContainer}>
						{item.fuelType === "electricity"
							? `CO2 produced per charge: (${item.carbonPerCharge} lbs of CO2)`
							: `CO2 produced per tank: (${item.carbonPerTank} lbs of CO2)`}
					</Text>
					{item.fuelType === "electricity" && item.zipcode !== "off grid" && (
						<Text style={styles.infoContainer}>
							{`CO2 produced for 100,000 miles: (${(
								(Number(item.carbonPerMile) * 100000) /
								2000
							).toFixed(2)} tons of CO2)`}
						</Text>
					)}
					{item.fuelType === "hybrid" ? (
						<>
							<Text style={styles.infoContainer}>
								{`CO2 produced for 100,000 miles: (${(
									(Number(item.carbonPerMile) * 100000) /
									2000
								).toFixed(2)} tons of CO2)`}
							</Text>
							<Text style={styles.infoContainer}>
								{`CO2 produced manufacturing battery: (${(
									Number(item.carbonToMakeBattery) / 2000
								).toFixed(2)} tons of CO2)`}
							</Text>
							<View style={styles.infoContainer}>
								<Text>Total CO2 after 100,000 miles:</Text>
								<Text>
									{`(${(
										(Number(item.carbonPerMile) * 100000 +
											Number(item.carbonToMakeBattery)) /
											2000 +
										8.263
									).toFixed(2)} tons of CO2)`}
								</Text>
							</View>
						</>
					) : null}
					{item.fuelType === "gas" || item.fuelType === "diesel" ? (
						<>
							<Text style={styles.infoContainer}>
								{`CO2 produced for 100,000 miles: (${(
									(Number(item.carbonPerMile) * 100000) /
									2000
								).toFixed(2)} tons of CO2)`}
							</Text>
							<View style={styles.infoContainer}>
								<Text>Total CO2 after 100,000 miles:</Text>
								<Text>
									{`(${(
										(Number(item.carbonPerMile) * 100000) / 2000 +
										8.263
									).toFixed(2)} tons of CO2)`}
								</Text>
							</View>
						</>
					) : null}
					{item.fuelType === "electricity" ? (
						<>
							<Text style={styles.infoContainer}>
								{`CO2 produced manufacturing battery: (${(
									Number(item.carbonToMakeBattery) / 2000
								).toFixed(2)} tons of CO2)`}
							</Text>
							<View style={styles.infoContainer}>
								<Text>Total CO2 after 100,000 miles:</Text>

								{item.zipcode === "off grid" ? (
									<Text>
										{`(${(
											Number(item.carbonToMakeBattery) / 2000 +
											8.263
										).toFixed(2)} tons of CO2)`}
									</Text>
								) : (
									<Text>
										{`(${(
											(Number(item.carbonPerMile) * 100000 +
												Number(item.carbonToMakeBattery)) /
												2000 +
											8.263
										).toFixed(2)} tons of CO2)`}
									</Text>
								)}
							</View>
						</>
					) : null}
					{item.zipcode === "off grid" && (
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

const styles = StyleSheet.create({
	infoContainer: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#ddd",
		backgroundColor: isBlurredOut ? "rgba(0, 0, 0, 0.5)" : "#fff",
		margin: 5,
		padding: 5,
	},
});

export default CarList;
