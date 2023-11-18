import React, { useState, useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Switch,
	Pressable,
} from "react-native";
import { TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";

type UserBasicInfo = {
	user: any;
	zipcode: string;
	homeOwnership: "rent" | "own";
	car: {
		make: string;
		model: string;
		year: string;
		fuelType: string;
		carBatterySize: string;
	};
	milesDriven: string;
	milesDrivenUnit: "yearly" | "monthly" | "daily";
	commute: boolean;
	transportation: string;
	daysCommute: string;
	hasCar: boolean;
};

const UserBasicInfoForm = () => {
	const { user } = useContext(AuthContext);
	const [userBasicInfo, setUserBasicInfo] = useState<UserBasicInfo>({
		user: user,
		zipcode: "",
		homeOwnership: "rent",
		car: {
			make: "",
			model: "",
			year: "",
			fuelType: "gas",
			carBatterySize: "68.6 kWh",
		},
		milesDriven: "",
		milesDrivenUnit: "yearly",
		commute: false,
		transportation: "",
		daysCommute: "",
		hasCar: false,
	});
	console.log(userBasicInfo);

	const handleLocationChange = (text: string) => {
		setUserBasicInfo((prevState) => ({ ...prevState, zipcode: text }));
	};

	const handleHomeOwnershipChange = (value: string) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			homeOwnership: value as "rent" | "own",
		}));
	};

	const handleCarMakeChange = (text: string) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				make: text,
			},
		}));
	};

	const handleCarModelChange = (text: string) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				model: text,
			},
		}));
	};

	const handleCarYearChange = (text: string) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				year: text,
			},
		}));
	};

	const handleMilesDrivenChange = (text: string) => {
		setUserBasicInfo((prevState) => ({ ...prevState, milesDriven: text }));
	};

	const handleFuelTypeChange = (text: string) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				fuelType: text,
			},
		}));
	};

	const handleCarBatterySizeChange = (text: string) => {
		const value = text.replaceAll(/ kWh| Wh| kh| kW|kWh/g, "");
		setUserBasicInfo((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				carBatterySize: `${value} kWh`,
			},
		}));
	};

	const handleMilesDrivenUnitChange = (
		unit: "yearly" | "monthly" | "daily"
	) => {
		setUserBasicInfo((prevState) => ({ ...prevState, milesDrivenUnit: unit }));
	};

	const handleCommuteChange = () => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			commute: !prevState.commute,
		}));
	};

	const handleHasCarChange = () => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			hasCar: !prevState.hasCar,
		}));
	};

	const handleTransportationChange = (value: string) => {
		setUserBasicInfo((prevState) => ({ ...prevState, transportation: value }));
	};

	const handleDaysCommuteChange = (text: string) => {
		setUserBasicInfo((prevState) => ({ ...prevState, daysCommute: text }));
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		FetchData.addBasicInfo(userBasicInfo).then((response) => {
			console.log(response);
		});
	};
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<form onSubmit={handleSubmit}>
				<Text style={styles.title}>User Basic Info form page</Text>
				<Text style={styles.subtitle}>Where do you live?</Text>
				<TextInput
					mode="outlined"
					placeholder="Please Type your zipcode"
					value={userBasicInfo.zipcode}
					onChangeText={handleLocationChange}
					style={styles.input}
				/>
				<Text style={styles.subtitle}>Do you rent or own?</Text>
				<RNPickerSelect
					value={userBasicInfo.homeOwnership}
					onValueChange={handleHomeOwnershipChange}
					style={pickerSelectStyles}
					items={[
						{ label: "Rent", value: "rent" },
						{ label: "Own", value: "own" },
					]}
				/>
				<View style={styles.commuteContainer}>
					<Text style={styles.subtitle}>Do you have a car?</Text>
					<Switch
						value={userBasicInfo.hasCar}
						onValueChange={handleHasCarChange}
					/>
				</View>

				{userBasicInfo.hasCar ? (
					<View>
						<Text style={styles.subtitle}>What kind of car do you drive?</Text>
						<Text style={styles.smallTitle}>Make:</Text>

						<TextInput
							mode="outlined"
							placeholder="Toyota..."
							value={userBasicInfo.car.make}
							onChangeText={handleCarMakeChange}
							style={styles.input}
						/>
						<Text style={styles.smallTitle}>Model:</Text>
						<TextInput
							mode="outlined"
							placeholder="Corolla..."
							value={userBasicInfo.car.model}
							onChangeText={handleCarModelChange}
							style={styles.input}
						/>
						<Text style={styles.smallTitle}>Year:</Text>
						<TextInput
							mode="outlined"
							placeholder="2019"
							value={userBasicInfo.car.year}
							onChangeText={handleCarYearChange}
							style={styles.input}
						/>
						<Text style={styles.smallTitle}>Fuel Type:</Text>
						<RNPickerSelect
							value={userBasicInfo.car.fuelType}
							onValueChange={handleFuelTypeChange}
							style={pickerSelectStyles}
							items={[
								{ label: "Gas", value: "gas" },
								{ label: "Diesel", value: "diesel" },
								{ label: "Hybrid", value: "hybrid" },
								{ label: "Electric", value: "electricity" },
							]}
						/>
						{userBasicInfo.car.fuelType === "electricity" ? (
							<>
								<Text style={styles.smallTitle}>Battery Size:</Text>
								<TextInput
									mode="outlined"
									value={`${userBasicInfo.car.carBatterySize}`}
									onChangeText={handleCarBatterySizeChange}
									style={styles.input}
								/>
							</>
						) : null}
						<Text style={styles.subtitle}>How many miles do you drive?</Text>
						<View style={styles.milesContainer}>
							<TextInput
								mode="outlined"
								value={userBasicInfo.milesDriven}
								onChangeText={handleMilesDrivenChange}
								style={styles.unitInput}
							/>
							<RNPickerSelect
								value={userBasicInfo.milesDrivenUnit}
								onValueChange={handleMilesDrivenUnitChange}
								style={pickerSelectStyles}
								items={[
									{ label: "Yearly", value: "yearly" },
									{ label: "Monthly", value: "monthly" },
									{ label: "Daily", value: "daily" },
								]}
							/>
						</View>
					</View>
				) : null}

				<View style={styles.commuteContainer}>
					<Text style={styles.subtitle}>Do you commute to work?</Text>
					<Switch
						value={userBasicInfo.commute}
						onValueChange={handleCommuteChange}
					/>
				</View>

				{userBasicInfo.commute && (
					<>
						<Text style={styles.subtitle}>
							How many days a week do you commute?
						</Text>
						<TextInput
							mode="outlined"
							value={userBasicInfo.daysCommute}
							onChangeText={handleDaysCommuteChange}
							style={styles.input}
						/>
					</>
				)}

				<Text style={styles.subtitle}>Mode of transportation</Text>
				<TextInput
					value={userBasicInfo.transportation}
					onChangeText={handleTransportationChange}
					style={styles.input}
				/>
				<Pressable onPress={handleSubmit}>
					<Text>Submit</Text>
				</Pressable>
			</form>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 16,
	},
	input: {
		marginBottom: 16,
	},
	modeInput: {
		marginBottom: 30,
	},
	checkbox: {
		marginBottom: 16,
	},
	commuteContainer: {
		marginTop: 16,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
		textAlign: "center",
	},
	smallTitle: {
		fontSize: 10,
		fontWeight: "bold",
		marginBottom: 4,
		textAlign: "center",
	},

	milesContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	unitInput: {
		flex: 1,
		marginLeft: 8,
	},
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginBottom: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 4,
		color: "black",
	},
	inputAndroid: {
		marginBottom: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 4,
		color: "black",
	},
});

export default UserBasicInfoForm;
