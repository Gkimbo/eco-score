import React, { useState, useContext } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
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
		airConditioning: boolean;
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
			airConditioning: false,
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

	const handleACChange = (text: true | false) => {
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				airConditioning: true,
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
					<Text style={UserFormStyles.subtitle}>
						What kind of home do you drive?
					</Text>
					<Text style={UserFormStyles.smallTitle}>Zipcode:</Text>

					<TextInput
						mode="outlined"
						placeholder="02531..."
						value={userHomeInfo.home.zipcode}
						onChangeText={handleZipCodeChange}
						style={UserFormStyles.input}
					/>
					<Text style={UserFormStyles.smallTitle}>Year Built:</Text>
					<TextInput
						mode="outlined"
						placeholder="Corolla..."
						value={userHomeInfo.home.yearBuilt}
						onChangeText={handleYearBuiltChange}
						style={UserFormStyles.input}
					/>
					<Text style={UserFormStyles.smallTitle}>Heat Source:</Text>
					<TextInput
						mode="outlined"
						placeholder="boiler..."
						value={userHomeInfo.home.heatSource}
						onChangeText={handleHeatSourceChange}
						style={UserFormStyles.input}
					/>
					<Text style={UserFormStyles.smallTitle}>AirConditioning:</Text>
					<RNPickerSelect
						value={userHomeInfo.home.airConditioning}
						onValueChange={handleACChange}
						style={pickerSelectStyles}
						items={[
							{ label: "Gas", value: "gas" },
							{ label: "Diesel", value: "diesel" },
							{ label: "Hybrid", value: "hybrid" },
							{ label: "Electric", value: "electricity" },
						]}
					/>

					<Text style={UserFormStyles.smallTitle}>
						Air Conditioning Source:
					</Text>
					<TextInput
						mode="outlined"
						value={`${userHomeInfo.home.airConditioningSource}`}
						onChangeText={handleACSource}
						style={UserFormStyles.input}
					/>
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
