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
	location: string;
	homeOwnership: "rent" | "own";
	car: string;
	milesDriven: string;
	milesDrivenUnit: "yearly" | "monthly" | "daily";
	commute: boolean;
	transportation: string;
	daysCommute: string;
};

const UserBasicInfoForm = () => {
	const { user } = useContext(AuthContext);
	const [userBasicInfo, setUserBasicInfo] = useState<UserBasicInfo>({
		user: user,
		location: "",
		homeOwnership: "rent",
		car: "",
		milesDriven: "",
		milesDrivenUnit: "yearly",
		commute: false,
		transportation: "",
		daysCommute: "",
	});

	const handleLocationChange = (text: string) => {
		setUserBasicInfo((prevState) => ({ ...prevState, location: text }));
	};

	const handleHomeOwnershipChange = (value: string) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			homeOwnership: value as "rent" | "own",
		}));
	};

	const handleCarChange = (text: string) => {
		setUserBasicInfo((prevState) => ({ ...prevState, car: text }));
	};

	const handleMilesDrivenChange = (text: string) => {
		setUserBasicInfo((prevState) => ({ ...prevState, milesDriven: text }));
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
					placeholder="Boston"
					value={userBasicInfo.location}
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
				<Text style={styles.subtitle}>What kind of car do you drive?</Text>
				<TextInput
					mode="outlined"
					placeholder="Toyota Corolla"
					value={userBasicInfo.car}
					onChangeText={handleCarChange}
					style={styles.input}
				/>
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
