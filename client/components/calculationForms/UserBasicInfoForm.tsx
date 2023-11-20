import React, { useState, useContext } from "react";
import { View, Text, ScrollView, Switch, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import UserFormStyles from "../../services/styles/UserInputFormStyle";
import pickerSelectStyles from "../../services/styles/pickerSelectStyles";

type UserBasicInfo = {
	user: any;
	zipcode: string;
	homeOwnership: "rent" | "own";
	milesDriven: string;
	milesDrivenUnit: "yearly" | "monthly" | "daily";
	commute: boolean;
	transportation:
		| "drive own car"
		| "train"
		| "bus"
		| "walk"
		| "bicycle"
		| "electric scooter"
		| "ride share";
	daysCommute: string;
	hasCar: boolean;
};

const UserBasicInfoForm = () => {
	const { user } = useContext(AuthContext);
	const [userBasicInfo, setUserBasicInfo] = useState<UserBasicInfo>({
		user: user,
		zipcode: "",
		homeOwnership: "rent",
		milesDriven: "",
		milesDrivenUnit: "yearly",
		commute: false,
		transportation: "drive own car",
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

	const handleHasCarChange = () => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			hasCar: !prevState.hasCar,
		}));
	};

	const handleTransportationChange = (
		unit:
			| "drive own car"
			| "train"
			| "bus"
			| "walk"
			| "bicycle"
			| "electric scooter"
			| "ride share"
	) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			transportation: unit,
		}));
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
		<ScrollView contentContainerStyle={UserFormStyles.container}>
			<form onSubmit={handleSubmit}>
				<Text style={UserFormStyles.title}>User Basic Info form page</Text>
				<Text style={UserFormStyles.subtitle}>Where do you live?</Text>
				<TextInput
					mode="outlined"
					placeholder="Please Type your zipcode"
					value={userBasicInfo.zipcode}
					onChangeText={handleLocationChange}
					style={UserFormStyles.input}
				/>
				<Text style={UserFormStyles.subtitle}>Do you rent or own?</Text>
				<RNPickerSelect
					value={userBasicInfo.homeOwnership}
					onValueChange={handleHomeOwnershipChange}
					style={pickerSelectStyles}
					items={[
						{ label: "Rent", value: "rent" },
						{ label: "Own", value: "own" },
					]}
				/>
				<View style={UserFormStyles.commuteContainer}>
					<Text style={UserFormStyles.subtitle}>Do you have a car?</Text>
					<Switch
						value={userBasicInfo.hasCar}
						onValueChange={handleHasCarChange}
					/>
				</View>
				<View>
					<Text style={UserFormStyles.subtitle}>
						How many miles do you drive?
					</Text>
					<View style={UserFormStyles.milesContainer}>
						<TextInput
							mode="outlined"
							value={userBasicInfo.milesDriven}
							onChangeText={handleMilesDrivenChange}
							style={UserFormStyles.unitInput}
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

				<View style={UserFormStyles.commuteContainer}>
					<Text style={UserFormStyles.subtitle}>Do you commute to work?</Text>
					<Switch
						value={userBasicInfo.commute}
						onValueChange={handleCommuteChange}
					/>

					{userBasicInfo.commute && (
						<>
							<Text style={UserFormStyles.subtitle}>
								How many days a week do you commute?
							</Text>
							<TextInput
								mode="outlined"
								value={userBasicInfo.daysCommute}
								onChangeText={handleDaysCommuteChange}
								style={UserFormStyles.input}
							/>
							<Text style={UserFormStyles.subtitle}>
								Mode of transportation.
							</Text>
							<RNPickerSelect
								value={userBasicInfo.transportation}
								onValueChange={handleTransportationChange}
								style={pickerSelectStyles}
								items={[
									{ label: "Drive own car", value: "drive own car" },
									{ label: "Train", value: "train" },
									{ label: "Bus", value: "bus" },
									{ label: "Walk", value: "walk" },
									{ label: "Bicycle", value: "bicycle" },
									{ label: "Electric Scooter", value: "electric scooter" },
									{
										label: "Ride Share: Uber, Lyft or equivalent",
										value: "ride share",
									},
								]}
							/>
						</>
					)}
				</View>
				<Pressable onPress={handleSubmit}>
					<Text style={UserFormStyles.button}>Submit</Text>
				</Pressable>
			</form>
		</ScrollView>
	);
};

export default UserBasicInfoForm;
