import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import UserFormStyles from "../../services/styles/UserInputFormStyle";
import pickerSelectStyles from "../../services/styles/PickerSelectStyles";
import Autocomplete from "react-native-autocomplete-input";
import { carMakesUS } from "../../services/carArray";
import { useNavigate } from "react-router-native";
import carsData from "../../services/carModelArray";

type UserCarInfoForm = {
	user: any;
	car: {
		make: string;
		model: string;
		year: string;
		fuelType: string;
		carBatterySize: string;
		zipCode: string;
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
			zipCode: "",
		},
	});
	const [redirect, setRedirect] = useState<boolean>(false);
	const [carMakes, setCarMakes] = useState<string[]>([]);
	const [carModels, setCarModels] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleCarMakeChange = (text: string) => {
		const carMakesData = carMakesUS;
		const filteredCarMakes = carMakesData.filter((make) =>
			make.toLowerCase().includes(text.toLowerCase())
		);

		setCarMakes(filteredCarMakes);
		setError(null);
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				make: text,
			},
		}));
	};

	const handleCarMakeSelect = (value: string) => {
		setError(null);
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				make: value,
			},
		}));
		setCarMakes([]);
	};

	const handleCarModelChange = (text: string) => {
		let carModelData;
		const make = userCarInfo.car.make;
		if (carsData[make as keyof typeof carsData]) {
			carModelData = carsData[make as keyof typeof carsData];
			setError(null);
		} else {
			setError(`The make ${make} does not exist in carsData`);
			return;
		}

		const filteredCarModels = carModelData.filter((make) =>
			make.toLowerCase().includes(text.toLowerCase())
		);

		setCarModels(filteredCarModels);
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				model: text,
			},
		}));
	};

	const handleCarModelSelect = (value: string) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				model: value,
			},
		}));
		setCarModels([]);
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

	const handleZipCodeChange = (text: string) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				zipCode: text,
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
			setError("Battery size can only be a number!");
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
		if (userCarInfo.car.fuelType === "electricity") {
			if (!userCarInfo.car.zipCode) {
				setError(
					"Please type in the zipcode where you primarily charge your car"
				);
				return;
			} else {
				setError("");
			}
		}
		FetchData.addCarInfo(userCarInfo).then((response) => {
			if (response === "No car found") {
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
		<ScrollView contentContainerStyle={UserFormStyles.container}>
			<form onSubmit={handleSubmit}>
				<View>
					<Text style={UserFormStyles.title}>Your Car</Text>
					<Text style={UserFormStyles.subtitle}>
						What kind of car do you drive?
					</Text>
					<View
						style={{
							zIndex: 3,
						}}
					>
						<Text style={UserFormStyles.smallTitle}>Make:</Text>
						<Autocomplete
							data={carMakes}
							value={userCarInfo.car.make}
							onChangeText={handleCarMakeChange}
							flatListProps={{
								renderItem: ({ item }) => (
									<Pressable
										style={{
											padding: 10,
											borderBottomWidth: 1,
											borderBottomColor: "#ccc",
										}}
										onPress={() => handleCarMakeSelect(item)}
									>
										<Text style={{ fontSize: 16 }}>{item}</Text>
									</Pressable>
								),
								keyExtractor: (_, index) => index.toString(),
							}}
						/>
					</View>
					{userCarInfo.car.make ? (
						<View
							style={{
								zIndex: 2,
							}}
						>
							<Text style={UserFormStyles.smallTitle}>Model:</Text>
							<Autocomplete
								data={carModels}
								value={userCarInfo.car.model}
								onChangeText={handleCarModelChange}
								flatListProps={{
									renderItem: ({ item }) => (
										<Pressable
											style={{
												padding: 10,
												borderBottomWidth: 1,
												borderBottomColor: "#ccc",
											}}
											onPress={() => handleCarModelSelect(item)}
										>
											<Text style={{ fontSize: 16 }}>{item}</Text>
										</Pressable>
									),
									keyExtractor: (_, index) => index.toString(),
								}}
							/>
						</View>
					) : null}

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
							<Text style={UserFormStyles.smallTitle}>
								Zipcode of cars primary charging location:
							</Text>
							<TextInput
								mode="outlined"
								value={`${userCarInfo.car.zipCode}`}
								onChangeText={handleZipCodeChange}
								style={UserFormStyles.input}
							/>
						</>
					) : null}
				</View>
				<View
					style={{
						zIndex: 1,
						elevation: Platform.OS === "android" ? 50 : 0,
					}}
				>
					<Pressable onPress={handleSubmit}>
						<Text style={UserFormStyles.button}>Submit</Text>
					</Pressable>
					{error ? (
						<View>
							<Text style={UserFormStyles.error}>{error}</Text>
						</View>
					) : null}
				</View>
			</form>
		</ScrollView>
	);
};

export default UserCarInfoForm;
