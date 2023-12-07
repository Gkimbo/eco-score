import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import UserFormStyles from "../../services/styles/UserInputFormStyle";
import pickerSelectStyles from "../../services/styles/PickerSelectStyles";
import { useNavigate } from "react-router-native";
import { Home } from "../../services/types/carAndHomeFormType";
import AddBasicsButton from "../navBar/AddBasicInfoButton";

export interface IAppProps {
	isDrawerOpen: boolean;
	setIsDrawerOpen: any;
	state: any;
}

type UserHomeInfoForm = {
	user: any;
	home: Home;
};

const UserHomeInfoForm: React.FunctionComponent<IAppProps> = ({
	isDrawerOpen,
	setIsDrawerOpen,
	state,
}) => {
	const { user } = useContext(AuthContext);
	const [userHomeInfo, setUserHomeInfoForm] = useState<UserHomeInfoForm>({
		user: user,
		home: {
			zipcode: "",
			yearBuilt: "",
			squareFeet: "",
			electricitySource: "",
			electricityUsage: "",
			gasUsage: "",
			oilUsage: "",
			gasUnit: "yearly",
			oilUnit: "yearly",
			oilVolume: "gallons",
			recycling: "false",
			compost: "false",
			electricityUnit: "yearly",
			gas: "no",
			oil: "no",
			batteryBackup: "no",
			batteryBankSize: "",
		},
	});
	const [error, setError] = useState<string | null>(null);
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleZipCodeChange = (text: string) => {
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(text)) {
			setError("Zipcode can only be a number!");
			return;
		}
		if (text === "") {
			setError("Zipcode cannot be blank!");
		} else if (text.length !== 5) {
			setError("A zipcode needs 5 numbers");
		} else {
			setError(null);
		}
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				zipcode: text,
			},
		}));
	};

	const handleYearBuiltChange = (text: string) => {
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(text)) {
			setError("Has to be a year!");
			return;
		}
		if (text.length !== 4) {
			setError("Has to be a year!");
		} else {
			setError(null);
		}
		if (text === "") {
			setError("Year Built cannot be blank!");
		} else {
			setError(null);
		}
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				yearBuilt: text,
			},
		}));
	};

	const handleElectricitySource = (text: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				electricitySource: text,
			},
		}));
	};
	const handleSquareFeetChange = (text: string) => {
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(text)) {
			setError("Square footage can only be a number!");
			return;
		}
		if (text === "") {
			setError("Square Footage cannot be blank!");
		} else {
			setError(null);
		}
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				squareFeet: text,
			},
		}));
	};

	const handleElectricityUsage = (text: string) => {
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(text)) {
			setError("Usage must be a number");
			return;
		}
		if (text === "") {
			setError("Usage cannot be blank!");
		} else {
			setError(null);
		}
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				electricityUsage: text,
			},
		}));
	};

	const handleBatteryBankSize = (text: string) => {
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(text)) {
			setError("Size of your battery bank must be a number");
			return;
		}
		if (text === "") {
			setError("Size of your battery bank cannot be blank!");
		} else {
			setError(null);
		}
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				batteryBankSize: text,
			},
		}));
	};

	const handleUsesGasChange = (unit: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				gas: unit,
			},
		}));
	};
	const handleUsesOilChange = (unit: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				oil: unit,
			},
		}));
	};

	const handleGasUnitChange = (unit: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				gasUnit: unit,
			},
		}));
	};

	const handleGasUsage = (text: string) => {
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(text)) {
			setError("Usage must be a number");
			return;
		}
		if (text === "") {
			setError("Usage cannot be blank!");
		} else {
			setError(null);
		}
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				gasUsage: text,
			},
		}));
	};

	const handleOilUsage = (text: string) => {
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(text)) {
			setError("Usage must be a number");
			return;
		}
		if (text === "") {
			setError("Usage cannot be blank!");
		} else {
			setError(null);
		}
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				oilUsage: text,
			},
		}));
	};

	const handleOilUnitChange = (unit: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				oilUnit: unit,
			},
		}));
	};

	const handleOilVolumeChange = (text: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				oilVolume: text,
			},
		}));
	};

	const handleElectricityUnitChange = (unit: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				electricityUnit: unit,
			},
		}));
	};

	const handleUsesBatteryBankChange = (unit: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				batteryBackup: unit,
			},
		}));
	};
	const handleRecycleChange = (unit: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				recycling: unit,
			},
		}));
	};

	const handleCompostChange = (unit: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				compost: unit,
			},
		}));
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (!userHomeInfo.home.zipcode) {
			setError("Please type in your homes zipcode");
			return;
		} else if (!userHomeInfo.home.yearBuilt) {
			setError("Type in the year your home was built");
			return;
		} else if (!userHomeInfo.home.squareFeet) {
			setError("Type in your homes estimated Square Footage");
			return;
		} else if (!userHomeInfo.home.electricitySource) {
			setError("You need to select the source of your homes electricity");
			return;
		} else if (!userHomeInfo.home.electricityUsage) {
			setError("Type in your estimated electricity usage");
			return;
		} else if (userHomeInfo.home.gas === "yes" && !userHomeInfo.home.gasUsage) {
			setError("Type in your estimated gas usage");
			return;
		} else if (userHomeInfo.home.oil === "yes" && !userHomeInfo.home.oilUsage) {
			setError("Type in your estimated oil usage");
			return;
		}
		setError(null);
		FetchData.addHomeInfo(userHomeInfo).then((response) => {
			if (response === "Cannot find zipcode") {
				setError(response);
			} else {
				setError(null);
				setRedirect(true);
			}
		});
	};

	useEffect(() => {
		if (redirect) {
			navigate("/");
			setRedirect(false);
		}
	}, [redirect]);

	return (
		<ScrollView
			contentContainerStyle={{
				marginTop: 85,
				marginLeft: 15,
				marginRight: 15,
			}}
		>
			{state.userInformation ? (
				<form onSubmit={handleSubmit}>
					<View>
						<Text style={UserFormStyles.title}>Your home</Text>
						<Text style={UserFormStyles.subtitle}>Home features!</Text>
						<Text style={UserFormStyles.smallTitle}>Zipcode:</Text>
						<TextInput
							mode="outlined"
							placeholder="02531..."
							value={userHomeInfo.home.zipcode}
							onChangeText={handleZipCodeChange}
							style={{
								...UserFormStyles.input,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						/>
						<Text style={UserFormStyles.smallTitle}>Square Feet:</Text>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: "#000",
								borderRadius: 5,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
								padding: 5,
								marginBottom: 20,
							}}
						>
							<TextInput
								value={`${userHomeInfo.home.squareFeet}`}
								onChangeText={handleSquareFeetChange}
								placeholder="1500..."
								style={{
									...UserFormStyles.input,
									borderWidth: 0,
									backgroundColor: "transparent",
								}}
							/>
							<Text style={{ paddingLeft: 10, color: "#000" }}>
								Square Feet
							</Text>
						</View>

						<Text style={UserFormStyles.smallTitle}>Year Built:</Text>
						<TextInput
							mode="outlined"
							placeholder="1772..."
							value={userHomeInfo.home.yearBuilt}
							onChangeText={handleYearBuiltChange}
							style={{
								...UserFormStyles.input,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						/>
						<View
							style={{
								...UserFormStyles.pickerContainer,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						>
							<Text style={UserFormStyles.smallTitle}>Electricity Source:</Text>
							<RNPickerSelect
								value={userHomeInfo.home.electricitySource}
								onValueChange={handleElectricitySource}
								style={pickerSelectStyles}
								items={[
									{ label: "Grid", value: "grid" },
									{ label: "Solar", value: "solar" },
									{ label: "Wind", value: "wind" },
									{ label: "Hydro Electric", value: "hydro" },
								]}
							/>
						</View>
						{userHomeInfo.home.electricitySource !== "grid" ? (
							<Text style={UserFormStyles.smallTitle}>
								{userHomeInfo.home.electricityUnit.charAt(0).toUpperCase() +
									userHomeInfo.home.electricityUnit.slice(1)}{" "}
								Electricity Usage from the grid:
							</Text>
						) : (
							<Text style={UserFormStyles.smallTitle}>
								{userHomeInfo.home.electricityUnit.charAt(0).toUpperCase() +
									userHomeInfo.home.electricityUnit.slice(1)}{" "}
								Electricity Usage:
							</Text>
						)}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: "#000",
								borderRadius: 5,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
								padding: 5,
								marginBottom: 20,
							}}
						>
							<TextInput
								placeholder="10,094..."
								value={userHomeInfo.home.electricityUsage}
								onChangeText={handleElectricityUsage}
								style={{
									...UserFormStyles.input,
									borderWidth: 0,
									backgroundColor: "transparent",
								}}
							/>
							<Text style={{ paddingLeft: 10, color: "#000" }}>kWh</Text>
						</View>
						<Text style={UserFormStyles.smallTitle}>
							Electricity usage time period:
						</Text>

						<View
							style={{
								...UserFormStyles.radioButtonContainer,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						>
							<View>
								<RadioButton.Group
									onValueChange={handleElectricityUnitChange}
									value={userHomeInfo.home.electricityUnit}
								>
									<RadioButton.Item label="Yearly" value="yearly" />
								</RadioButton.Group>
							</View>

							<View>
								<RadioButton.Group
									onValueChange={handleElectricityUnitChange}
									value={userHomeInfo.home.electricityUnit}
								>
									<RadioButton.Item label="Monthly" value="monthly" />
								</RadioButton.Group>
							</View>
						</View>
						<Text style={UserFormStyles.smallTitle}>
							Do you use have a Battery backup or off grid battery bank?
						</Text>
						<View
							style={{
								...UserFormStyles.radioButtonContainer,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						>
							<View>
								<RadioButton.Group
									onValueChange={handleUsesBatteryBankChange}
									value={userHomeInfo.home.batteryBackup}
								>
									<RadioButton.Item label="Yes" value="yes" />
								</RadioButton.Group>
							</View>
							<View>
								<RadioButton.Group
									onValueChange={handleUsesBatteryBankChange}
									value={userHomeInfo.home.batteryBackup}
								>
									<RadioButton.Item label="No" value="no" />
								</RadioButton.Group>
							</View>
						</View>
						{userHomeInfo.home.batteryBackup === "yes" ? (
							<>
								<Text style={UserFormStyles.smallTitle}>
									Battery Bank size:
								</Text>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										borderWidth: 1,
										borderColor: "#000",
										borderRadius: 5,
										backgroundColor: isDrawerOpen
											? "rgba(0, 0, 0, 0.5)"
											: "#fff",
										padding: 5,
										marginBottom: 20,
									}}
								>
									<TextInput
										placeholder="24..."
										value={userHomeInfo.home.batteryBankSize}
										onChangeText={handleBatteryBankSize}
										style={{
											...UserFormStyles.input,
											borderWidth: 0,
											backgroundColor: "transparent",
										}}
									/>
									<Text style={{ paddingLeft: 10, color: "#000" }}>kWh</Text>
								</View>
							</>
						) : null}
						<Text style={UserFormStyles.smallTitle}>
							Do you use Gas in this home?
						</Text>
						<View
							style={{
								...UserFormStyles.radioButtonContainer,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						>
							<View>
								<RadioButton.Group
									onValueChange={handleUsesGasChange}
									value={userHomeInfo.home.gas}
								>
									<RadioButton.Item label="Yes" value="yes" />
								</RadioButton.Group>
							</View>
							<View>
								<RadioButton.Group
									onValueChange={handleUsesGasChange}
									value={userHomeInfo.home.gas}
								>
									<RadioButton.Item label="No" value="no" />
								</RadioButton.Group>
							</View>
						</View>
						{userHomeInfo.home.gas === "yes" ? (
							<>
								<Text style={UserFormStyles.smallTitle}>
									{userHomeInfo.home.gasUnit.charAt(0).toUpperCase() +
										userHomeInfo.home.gasUnit.slice(1)}{" "}
									Gas Usage:
								</Text>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										borderWidth: 1,
										borderColor: "#000",
										borderRadius: 5,
										backgroundColor: isDrawerOpen
											? "rgba(0, 0, 0, 0.5)"
											: "#fff",
										padding: 5,
										marginBottom: 20,
									}}
								>
									<TextInput
										placeholder="1440..."
										value={userHomeInfo.home.gasUsage}
										onChangeText={handleGasUsage}
										style={{
											...UserFormStyles.input,
											borderWidth: 0,
											backgroundColor: "transparent",
										}}
									/>
									<Text style={{ paddingLeft: 10, color: "#000" }}>therms</Text>
								</View>

								<Text style={UserFormStyles.smallTitle}>
									Gas usage time period:
								</Text>
								<View
									style={{
										...UserFormStyles.radioButtonContainer,
										backgroundColor: isDrawerOpen
											? "rgba(0, 0, 0, 0.5)"
											: "#fff",
									}}
								>
									<View>
										<RadioButton.Group
											onValueChange={handleGasUnitChange}
											value={userHomeInfo.home.gasUnit}
										>
											<RadioButton.Item label="Yearly" value="yearly" />
										</RadioButton.Group>
									</View>

									<View>
										<RadioButton.Group
											onValueChange={handleGasUnitChange}
											value={userHomeInfo.home.gasUnit}
										>
											<RadioButton.Item label="Monthly" value="monthly" />
										</RadioButton.Group>
									</View>
								</View>
							</>
						) : null}
						<Text style={UserFormStyles.smallTitle}>
							Do you use Oil in this home?
						</Text>
						<View
							style={{
								...UserFormStyles.radioButtonContainer,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						>
							<View>
								<RadioButton.Group
									onValueChange={handleUsesOilChange}
									value={userHomeInfo.home.oil}
								>
									<RadioButton.Item label="Yes" value="yes" />
								</RadioButton.Group>
							</View>

							<View>
								<RadioButton.Group
									onValueChange={handleUsesOilChange}
									value={userHomeInfo.home.oil}
								>
									<RadioButton.Item label="No" value="no" />
								</RadioButton.Group>
							</View>
						</View>
						{userHomeInfo.home.oil === "yes" ? (
							<>
								<Text style={UserFormStyles.smallTitle}>
									{userHomeInfo.home.oilUnit.charAt(0).toUpperCase() +
										userHomeInfo.home.oilUnit.slice(1)}{" "}
									Oil Usage:
								</Text>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										borderWidth: 1,
										borderColor: "#000",
										borderRadius: 5,
										backgroundColor: isDrawerOpen
											? "rgba(0, 0, 0, 0.5)"
											: "#fff",
										padding: 5,
										marginBottom: 20,
									}}
								>
									<TextInput
										placeholder={
											userHomeInfo.home.oilVolume === "gallons"
												? "700..."
												: "2649..."
										}
										value={userHomeInfo.home.oilUsage}
										onChangeText={handleOilUsage}
										style={{
											...UserFormStyles.input,
											borderWidth: 0,
											backgroundColor: "transparent",
										}}
									/>
									<Text style={{ paddingLeft: 10, color: "#000" }}>
										{userHomeInfo.home.oilVolume.charAt(0).toUpperCase() +
											userHomeInfo.home.oilVolume.slice(1)}
									</Text>
								</View>
								<Text style={UserFormStyles.smallTitle}>
									Oil unit of measurement:
								</Text>
								<View
									style={{
										...UserFormStyles.radioButtonContainer,
										backgroundColor: isDrawerOpen
											? "rgba(0, 0, 0, 0.5)"
											: "#fff",
									}}
								>
									<View>
										<RadioButton.Group
											onValueChange={handleOilVolumeChange}
											value={userHomeInfo.home.oilVolume}
										>
											<RadioButton.Item label="Gallons" value="gallons" />
										</RadioButton.Group>
									</View>
									<View>
										<RadioButton.Group
											onValueChange={handleOilVolumeChange}
											value={userHomeInfo.home.oilVolume}
										>
											<RadioButton.Item label="Liters" value="liters" />
										</RadioButton.Group>
									</View>
								</View>
								<Text style={UserFormStyles.smallTitle}>
									Oil usage time period:
								</Text>

								<View
									style={{
										...UserFormStyles.radioButtonContainer,
										backgroundColor: isDrawerOpen
											? "rgba(0, 0, 0, 0.5)"
											: "#fff",
									}}
								>
									<View>
										<RadioButton.Group
											onValueChange={handleOilUnitChange}
											value={userHomeInfo.home.oilUnit}
										>
											<RadioButton.Item label="Yearly" value="yearly" />
										</RadioButton.Group>
									</View>
									<View>
										<RadioButton.Group
											onValueChange={handleOilUnitChange}
											value={userHomeInfo.home.oilUnit}
										>
											<RadioButton.Item label="Monthly" value="monthly" />
										</RadioButton.Group>
									</View>
								</View>
							</>
						) : null}

						<Text style={UserFormStyles.smallTitle}>Do you recycle?</Text>
						<View
							style={{
								flexDirection: "column",
								justifyContent: "center",
								borderWidth: 1,
								borderColor: "#000",
								borderRadius: 5,
								marginBottom: 20,
								paddingLeft: 50,
								paddingRight: 50,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						>
							<View>
								<RadioButton.Group
									onValueChange={handleRecycleChange}
									value={userHomeInfo.home.recycling}
								>
									<RadioButton.Item label="Yes, I recycle" value="true" />
								</RadioButton.Group>
							</View>
							<View>
								<RadioButton.Group
									onValueChange={handleRecycleChange}
									value={userHomeInfo.home.recycling}
								>
									<RadioButton.Item label="No, I don't recycle" value="false" />
								</RadioButton.Group>
							</View>
						</View>

						<Text style={UserFormStyles.smallTitle}>Do you compost?</Text>
						<View
							style={{
								flexDirection: "column",
								justifyContent: "center",
								borderWidth: 1,
								borderColor: "#000",
								borderRadius: 5,
								marginBottom: 20,
								paddingLeft: 50,
								paddingRight: 50,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
						>
							<View>
								<RadioButton.Group
									onValueChange={handleCompostChange}
									value={userHomeInfo.home.compost}
								>
									<RadioButton.Item label="Yes, I compost" value="true" />
								</RadioButton.Group>
							</View>
							<View>
								<RadioButton.Group
									onValueChange={handleCompostChange}
									value={userHomeInfo.home.compost}
								>
									<RadioButton.Item label="No, I don't compost" value="false" />
								</RadioButton.Group>
							</View>
						</View>
					</View>
					<Pressable onPress={handleSubmit}>
						<Text
							style={{
								...UserFormStyles.button,
								backgroundColor: isDrawerOpen
									? "rgba(0, 0, 0, 0.5)"
									: "#f9bc60",
							}}
						>
							Submit
						</Text>
					</Pressable>
					{error ? (
						<View>
							<Text style={UserFormStyles.error}>{error}</Text>
						</View>
					) : null}
				</form>
			) : (
				<View
					style={{
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontSize: 25,
							color: "white",
							marginTop: 30,
							marginBottom: 20,
							marginRight: 15,
							marginLeft: 15,
							textAlign: "center",
						}}
					>
						Please fill out your basic Information to add a your home and gain
						rewards!
					</Text>
					<View
						style={{
							width: "80%",
							height: "90%",
							marginTop: 30,
							marginBottom: 20,
							marginRight: 15,
							marginLeft: 15,
							alignItems: "center",
						}}
					>
						<AddBasicsButton setIsDrawerOpen={setIsDrawerOpen} />
					</View>
				</View>
			)}
		</ScrollView>
	);
};

export default UserHomeInfoForm;
