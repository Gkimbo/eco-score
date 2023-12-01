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
	onDeleteHome: (homeId: number) => void;
	isBlurred: boolean;
}
export type Home = {
	id: number;
	zipcode: string;
	yearBuilt: string;
	squareFeet: string;
	electricitySource: string;
	electricityUsage: string;
	recycling: string;
	compost: string;
	electricityUnit: string;
	gasUnit: string;
	gasUsage: string;
	oilUsage: string;
	oilUnit: string;
	oilVolume: string;
	oil: string;
	gas: string;
	batteryBackup: string;
	batteryBankSize: string;
	carbonForAnnualPower: string;
	carbonFromAnnualGas: string | null;
	carbonFromAnnualOil: string | null;
	carbonFromBatteryBank: string | null;
	totalAnnualCarbon: string;
	totalStaticCarbon: string;
};

const HomeList: React.FunctionComponent<IAppProps> = ({
	state,
	onDeleteHome,
	isBlurred,
}) => {
	const homes = state.homes;

	const [deleteAnimation] = useState(new Animated.Value(0));
	const [deleteConfirmation, setDeleteConfirmation] = useState<any>({});

	const handleNoPress = (homeId: number) => {
		setDeleteConfirmation((prevConfirmations: any) => ({
			[homeId]: !prevConfirmations[homeId],
		}));
	};

	const handleDeletePress = (homeId: number) => {
		setDeleteConfirmation((prevConfirmations: any) => ({
			[homeId]: !prevConfirmations[homeId],
		}));
		if (deleteConfirmation[homeId]) {
			Animated.timing(deleteAnimation, {
				toValue: 0,
				duration: 300,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start(() => {
				onDeleteHome(homeId);
				setDeleteConfirmation((prevConfirmations: any) => ({
					...prevConfirmations,
					[homeId]: false,
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
			{homes.map((item: Home) => (
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
										width: deleteConfirmation[item.id] ? 75 : pressed ? 40 : 30,
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
										{deleteConfirmation[item.id] ? "Delete Home" : "X"}
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
										Keep Home
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
						{item.zipcode}
					</Text>
					<Text
						style={{
							fontSize: 10,
							color: "#333",
							textAlign: "center",
						}}
					>
						{item.yearBuilt}
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
						Total CO2 produced per Year: (
						{(Number(item.totalAnnualCarbon) / 2000).toFixed(2)} tons of CO2)
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
						CO2 produced from electricity usage: (
						{(Number(item.carbonForAnnualPower) / 2000).toFixed(2)} tons) of CO2
					</Text>

					{item.batteryBackup === "yes" && (
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
							CO2 produced manufacturing batteries in your system: (
							{(Number(item.carbonFromBatteryBank) / 2000).toFixed(2)} tons of
							CO2)
						</Text>
					)}
					{item.gas === "yes" && (
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
							CO2 produced from Natural Gas in your home: (
							{(Number(item.carbonFromAnnualGas) / 2000).toFixed(2)} tons of
							CO2)
						</Text>
					)}
					{item.oil === "yes" && (
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
							CO2 produced from oil heat in your home: (
							{(Number(item.carbonFromAnnualOil) / 2000).toFixed(2)} lbs of CO2)
						</Text>
					)}
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	blurredContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
});

export default HomeList;
