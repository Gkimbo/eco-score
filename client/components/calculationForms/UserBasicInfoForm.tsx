import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, Switch, Pressable } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import UserFormStyles from "../../services/styles/UserInputFormStyle";
import pickerSelectStyles from "../../services/styles/PickerSelectStyles";
import { useNavigate } from "react-router-native";
import DeleteData from "../../services/DeleteData";

export interface IAppProps {
	isDrawerOpen: any;
	state: any;
}

type UserBasicInfo = {
	user: any;
	homeOwnership: "rent" | "own";
	milesDriven: string;
	milesDrivenUnit: "yearly" | "monthly" | "daily";
	commute: string;
	transportation:
		| "drive own car"
		| "train"
		| "bus"
		| "walk"
		| "bicycle"
		| "electric scooter"
		| "ride share";
	daysCommute: string;
	hasCar: string;
};

const UserBasicInfoForm: React.FunctionComponent<IAppProps> = ({
	isDrawerOpen,
	state,
}) => {
	const { user } = useContext(AuthContext);
	const [redirect, setRedirect] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [userBasicInfo, setUserBasicInfo] = useState<UserBasicInfo>({
		user: user,
		homeOwnership: "rent",
		milesDriven: "",
		milesDrivenUnit: "yearly",
		commute: "no",
		hasCar: "no",
		transportation: "walk",
		daysCommute: "",
	});
	const navigate = useNavigate();

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

	const handleCommuteChange = (text: string) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			commute: text,
		}));
	};

	const handleHasCarChange = (text: string) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			hasCar: text,
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
		if (text === "" || (Number(text) >= 1 && Number(text) <= 7)) {
			setUserBasicInfo((prevState) => ({ ...prevState, daysCommute: text }));
			setError(null);
		} else {
			setError("Days of the week must be a number between 1 and 7");
		}
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (userBasicInfo.commute === "yes" && userBasicInfo.daysCommute == "") {
			setError("How many days do you commute per week?");
			return;
		}
		setError(null);
		if (!state.userInformation) {
			FetchData.addBasicInfo(userBasicInfo).then((response) => {
				if (response.user) {
					setRedirect(true);
				}
			});
		} else {
			DeleteData.updateUserInfo(userBasicInfo).then((response) => {
				if (response) {
					setRedirect(true);
				}
			});
		}
	};

	useEffect(() => {
		if (redirect) {
			navigate("/");
			setRedirect(false);
		}
	}, [redirect]);
	return (
		<ScrollView contentContainerStyle={UserFormStyles.container}>
			<form onSubmit={handleSubmit}>
				<View>
					<Text style={UserFormStyles.title}>User Basic Info form page</Text>
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
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						>
							<View>
								<RadioButton.Group
									onValueChange={handleHasCarChange}
									value={userBasicInfo.hasCar}
								>
									<RadioButton.Item label="Yes" value="yes" />
								</RadioButton.Group>
							</View>
							<View>
								<RadioButton.Group
									onValueChange={handleHasCarChange}
									value={userBasicInfo.hasCar}
								>
									<RadioButton.Item label="No" value="no" />
								</RadioButton.Group>
							</View>
						</View>
					</View>
					{userBasicInfo.hasCar === "yes" && (
						<View>
							<Text style={UserFormStyles.subtitle}>
								How many miles do you drive?
							</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									borderWidth: 1,
									borderColor: "#000",
									borderRadius: 5,
									backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
									padding: 5,
								}}
							>
								<TextInput
									value={userBasicInfo.milesDriven}
									onChangeText={handleMilesDrivenChange}
									style={{
										...UserFormStyles.input,
										borderWidth: 0,
										backgroundColor: "transparent",
									}}
								/>
								<View style={{ marginTop: 10 }}>
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
						</View>
					)}

					<View style={UserFormStyles.commuteContainer}>
						<Text style={UserFormStyles.subtitle}>Do you commute to work?</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						>
							<View>
								<RadioButton.Group
									onValueChange={handleCommuteChange}
									value={userBasicInfo.commute}
								>
									<RadioButton.Item label="Yes" value="yes" />
								</RadioButton.Group>
							</View>
							<View>
								<RadioButton.Group
									onValueChange={handleCommuteChange}
									value={userBasicInfo.commute}
								>
									<RadioButton.Item label="No" value="no" />
								</RadioButton.Group>
							</View>
						</View>

						{userBasicInfo.commute === "yes" && (
							<>
								<Text style={{ ...UserFormStyles.subtitle, marginTop: 15 }}>
									How many days a week do you commute?
								</Text>
								<TextInput
									mode="outlined"
									value={userBasicInfo.daysCommute}
									onChangeText={handleDaysCommuteChange}
									style={{
										...UserFormStyles.input,
										backgroundColor: isDrawerOpen
											? "rgba(0, 0, 0, 0.5)"
											: "#fff",
									}}
								/>
								{error && (
									<Text
										style={{
											color: "red",
											alignSelf: "center",
											fontWeight: "bold",
											fontSize: 15,
											marginBottom: 15,
										}}
									>
										{error}
									</Text>
								)}
								<Text style={UserFormStyles.subtitle}>
									Mode of transportation.
								</Text>
								{userBasicInfo.hasCar === "yes" ? (
									<RNPickerSelect
										value={userBasicInfo.transportation}
										onValueChange={handleTransportationChange}
										style={pickerSelectStyles}
										items={[
											{
												label: "Drive own car",
												value: "drive own car",
											},
											{ label: "Walk", value: "walk" },
											{ label: "Train", value: "train" },
											{ label: "Bus", value: "bus" },
											{ label: "Bicycle", value: "bicycle" },
											{ label: "Electric Scooter", value: "electric scooter" },
											{
												label: "Ride Share: Uber, Lyft or equivalent",
												value: "ride share",
											},
										]}
									/>
								) : (
									<RNPickerSelect
										value={userBasicInfo.transportation}
										onValueChange={handleTransportationChange}
										style={pickerSelectStyles}
										items={[
											{ label: "Walk", value: "walk" },
											{ label: "Train", value: "train" },
											{ label: "Bus", value: "bus" },
											{ label: "Bicycle", value: "bicycle" },
											{ label: "Electric Scooter", value: "electric scooter" },
											{
												label: "Ride Share: Uber, Lyft or equivalent",
												value: "ride share",
											},
										]}
									/>
								)}
							</>
						)}
					</View>
				</View>
				<Pressable onPress={handleSubmit}>
					<Text
						style={{
							...UserFormStyles.button,
							backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#f9bc60",
						}}
					>
						Submit
					</Text>
				</Pressable>
			</form>
		</ScrollView>
	);
};

export default UserBasicInfoForm;
