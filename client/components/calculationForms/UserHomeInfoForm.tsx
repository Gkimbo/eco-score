import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import UserFormStyles from "../../services/styles/UserInputFormStyle";
import pickerSelectStyles from "../../services/styles/PickerSelectStyles";
import { useNavigate } from "react-router-native";
import { Home } from "../../services/types/carAndHomeType";

type UserHomeInfoForm = {
	user: any;
	home: Home;
};

const UserHomeInfoForm = () => {
	const { user } = useContext(AuthContext);
	const [userHomeInfo, setUserHomeInfoForm] = useState<UserHomeInfoForm>({
		user: user,
		home: {
			zipcode: "",
			yearBuilt: "",
			heatSource: "",
			airConditioning: "false",
			airConditioningSource: "",
			squareFeet: "",
			electricitySource: "",
			electricityUsage: "",
			recycling: "false",
			compost: "false",
			ovenType: "",
			electricityUnit: "",
		},
	});
	const [error, setError] = useState<string | null>(null);
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate = useNavigate();
	const handleZipCodeChange = (text: string) => {
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
		if (text.length > 4) {
			setError("Has to be a year!");
			return;
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

	const handleHeatSourceChange = (text: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				heatSource: text,
			},
		}));
	};

	const handleACChange = (text: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				airConditioning: text,
			},
		}));
	};

	const handleACSource = (text: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				airConditioningSource: text,
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

	const handleSquareFeetChange = (text: string) => {
		const value = text.replaceAll(
			/ Square Feet| Suare Feet| Sqare Feet| Squre Feet| Squae Feet| Squar Feet| SquareFeet| Square eet| Square Fet| Square Fee|Square Feet/g,
			""
		);
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(value)) {
			setError("Square footage can only be a number!");
			return;
		}
		if (value === "") {
			setError("Square Footage cannot be blank!");
		} else {
			setError(null);
		}
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				squareFeet: `${value} Square Feet`,
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
	const handleOvenChange = (unit: string) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				ovenType: unit,
			},
		}));
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		FetchData.addHomeInfo(userHomeInfo).then((response) => {
			setRedirect(true);
			console.log(response);
		});
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
					<Text style={UserFormStyles.title}>Your home</Text>
					<Text style={UserFormStyles.subtitle}>Home features!</Text>
					<Text style={UserFormStyles.smallTitle}>Zipcode:</Text>
					<TextInput
						mode="outlined"
						placeholder="02531..."
						value={userHomeInfo.home.zipcode}
						onChangeText={handleZipCodeChange}
						style={UserFormStyles.input}
					/>
					<Text style={UserFormStyles.smallTitle}>Square Feet:</Text>
					<TextInput
						mode="outlined"
						placeholder="2300 Square Feet"
						value={userHomeInfo.home.squareFeet}
						onChangeText={handleSquareFeetChange}
						style={UserFormStyles.input}
					/>
					<Text style={UserFormStyles.smallTitle}>Year Built:</Text>
					<TextInput
						mode="outlined"
						placeholder="1772..."
						value={userHomeInfo.home.yearBuilt}
						onChangeText={handleYearBuiltChange}
						style={UserFormStyles.input}
					/>
					<Text style={UserFormStyles.smallTitle}>Heat Source:</Text>
					<RNPickerSelect
						value={userHomeInfo.home.heatSource}
						onValueChange={handleHeatSourceChange}
						style={pickerSelectStyles}
						items={[
							{ label: "oil", value: "oil" },
							{ label: "Forced Hot Air", value: "forced hot air" },
							{ label: "Heat Pump", value: "heat pump" },
							{ label: "Electric baseboard", value: "electric baseboard" },
							{
								label: "Electric space heater",
								value: "electric space heater",
							},
							{
								label: "Electric boiler - baseboard",
								value: "electric boiler",
							},
							{ label: "Boiler - Baseboard", value: "boiler" },
							{ label: "Boiler - Radiator", value: "radiator" },
							{ label: "Wood Stove", value: "wood stove" },
							{ label: "Pellet Stove", value: "pellet stove" },
							{ label: "Corn Stove", value: "corn stove" },
							{ label: "Fire Place", value: "fire place" },
						]}
					/>
					<Text style={UserFormStyles.smallTitle}>
						What kind of Oven do you use?
					</Text>
					<RadioButton.Group
						onValueChange={handleOvenChange}
						value={userHomeInfo.home.ovenType}
					>
						<RadioButton.Item label="Gas" value="gas" />
						<RadioButton.Item label="Electric" value="electric" />
						<RadioButton.Item label="Wood Fire" value="wood" />
					</RadioButton.Group>
					<Text style={UserFormStyles.smallTitle}>AirConditioning:</Text>
					<RadioButton.Group
						onValueChange={handleACChange}
						value={userHomeInfo.home.airConditioning}
					>
						<RadioButton.Item label="I have an Air Conditioner" value="true" />
						<RadioButton.Item
							label="I don't have an Air Conditioner"
							value="false"
						/>
					</RadioButton.Group>

					{userHomeInfo.home.airConditioning === "true" ? (
						<>
							<Text style={UserFormStyles.smallTitle}>
								Air Conditioning Source:
							</Text>
							<RNPickerSelect
								value={userHomeInfo.home.airConditioningSource}
								onValueChange={handleACSource}
								style={pickerSelectStyles}
								items={[
									{ label: "Central AC", value: "central" },
									{ label: "Window Units", value: "window" },
									{ label: "Portable", value: "portable" },
									{ label: "Heat Pump", value: "heat pump" },
								]}
							/>
						</>
					) : null}
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
					<Text style={UserFormStyles.smallTitle}>
						{userHomeInfo.home.electricityUnit} Electricity Usage:
					</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							borderWidth: 1,
							borderColor: "#000",
							borderRadius: 5,
							backgroundColor: "#fff",
							padding: 5,
						}}
					>
						<TextInput
							placeholder="10,094"
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
					<RadioButton.Group
						onValueChange={handleElectricityUnitChange}
						value={userHomeInfo.home.electricityUnit}
					>
						<RadioButton.Item label="Yearly" value="yearly" />
						<RadioButton.Item label="Monthly" value="monthly" />
						<RadioButton.Item label="Daily" value="daily" />
					</RadioButton.Group>

					<Text style={UserFormStyles.smallTitle}>Do you recycle?</Text>
					<RadioButton.Group
						onValueChange={handleRecycleChange}
						value={userHomeInfo.home.recycling}
					>
						<RadioButton.Item label="Yes, I recycle" value="true" />
						<RadioButton.Item label="No, I don't recycle" value="false" />
					</RadioButton.Group>

					<Text style={UserFormStyles.smallTitle}>Do you compost?</Text>
					<RadioButton.Group
						onValueChange={handleCompostChange}
						value={userHomeInfo.home.compost}
					>
						<RadioButton.Item label="Yes, I compost" value="true" />
						<RadioButton.Item label="No, I don't compost" value="false" />
					</RadioButton.Group>
				</View>
				<Pressable onPress={handleSubmit}>
					<Text style={UserFormStyles.button}>Submit</Text>
				</Pressable>
				{error ? (
					<View>
						<Text style={UserFormStyles.error}>{error}</Text>
					</View>
				) : null}
			</form>
		</ScrollView>
	);
};

export default UserHomeInfoForm;
