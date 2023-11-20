import React, { useState, useContext } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import UserFormStyles from "../../services/styles/UserInputFormStyle";
import pickerSelectStyles from "../../services/styles/PickerSelectStyles";

type UserCarInfoForm = {
	user: any;
	car: {
		make: string;
		model: string;
		year: string;
		fuelType: string;
		carBatterySize: string;
	};
};

const UserCarInfoForm = () => {
	const { user } = useContext(AuthContext);
	const [userCarInfo, setUserCarInfoForm] = useState<UserCarInfoForm>({
		user: user,
		car: {
			make: "",
			model: "",
			year: "",
			fuelType: "gas",
			carBatterySize: "68.6 kWh",
		},
	});
	const [error, setError] = useState<string | null>(null);

	const handleCarMakeChange = (text: string) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				make: text,
			},
		}));
	};

	const handleCarModelChange = (text: string) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				model: text,
			},
		}));
	};

	const handleCarYearChange = (text: string) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				year: text,
			},
		}));
	};

	const handleFuelTypeChange = (
		text: "gas" | "diesel" | "hybrid" | "electricity"
	) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				fuelType: text,
			},
		}));
	};

	const handleCarBatterySizeChange = (text: string) => {
		const value = text.replaceAll(/ kWh| Wh| kh| kW|kWh/g, "");
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(value)) {
			setError("Battery size can oly be a number!");
			return;
		}
		if (value === "") {
			setError("Battery size cannot be blank!");
		} else {
			setError(null);
		}
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				carBatterySize: `${value} kWh`,
			},
		}));
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		FetchData.addCarInfo(userCarInfo).then((response) => {
			console.log(response);
		});
	};
	return (
		<ScrollView contentContainerStyle={UserFormStyles.container}>
			<form onSubmit={handleSubmit}>
				<View>
					<Text style={UserFormStyles.title}>Your Car</Text>
					<Text style={UserFormStyles.subtitle}>
						What kind of car do you drive?
					</Text>
					<Text style={UserFormStyles.smallTitle}>Make:</Text>

					<TextInput
						mode="outlined"
						placeholder="Toyota..."
						value={userCarInfo.car.make}
						onChangeText={handleCarMakeChange}
						style={UserFormStyles.input}
					/>
					<Text style={UserFormStyles.smallTitle}>Model:</Text>
					<TextInput
						mode="outlined"
						placeholder="Corolla..."
						value={userCarInfo.car.model}
						onChangeText={handleCarModelChange}
						style={UserFormStyles.input}
					/>
					<Text style={UserFormStyles.smallTitle}>Year:</Text>
					<TextInput
						mode="outlined"
						placeholder="2019..."
						value={userCarInfo.car.year}
						onChangeText={handleCarYearChange}
						style={UserFormStyles.input}
					/>
					<Text style={UserFormStyles.smallTitle}>Fuel Type:</Text>
					<RNPickerSelect
						value={userCarInfo.car.fuelType}
						onValueChange={handleFuelTypeChange}
						style={pickerSelectStyles}
						items={[
							{ label: "Gas", value: "gas" },
							{ label: "Diesel", value: "diesel" },
							{ label: "Hybrid", value: "hybrid" },
							{ label: "Electric", value: "electricity" },
						]}
					/>
					{userCarInfo.car.fuelType === "electricity" ? (
						<>
							<Text style={UserFormStyles.smallTitle}>Battery Size:</Text>
							<TextInput
								mode="outlined"
								value={`${userCarInfo.car.carBatterySize}`}
								onChangeText={handleCarBatterySizeChange}
								style={UserFormStyles.input}
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

export default UserCarInfoForm;
