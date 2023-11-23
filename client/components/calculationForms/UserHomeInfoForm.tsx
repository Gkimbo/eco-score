import React, { useState, useContext } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import UserFormStyles from "../../services/styles/UserInputFormStyle";
import pickerSelectStyles from "../../services/styles/PickerSelectStyles";

type UserHomeInfoForm = {
	user: any;
	home: {
		zipcode: string;
		yearBuilt: string;
		heatSource: string;
		airConditioning: string;
		airConditioningSource: string;
		squareFeet: string;
		electricitySource: string;
		electricityUsage: string;
		recycling: boolean;
		compost: boolean;
		ovenType: string;
	};
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
			recycling: false,
			compost: false,
			ovenType: "",
		},
	});
	const [error, setError] = useState<string | null>(null);
	console.log(userHomeInfo);
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

	const handleSubmit = (event: any) => {
		event.preventDefault();
		FetchData.addHomeInfo(userHomeInfo).then((response) => {
			console.log(response);
		});
	};
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
