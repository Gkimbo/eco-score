import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import UserFormStyles from "../../services/styles/UserInputFormStyle";
import pickerSelectStyles from "../../services/styles/PickerSelectStyles";
import Autocomplete from "react-native-autocomplete-input";
import { carMakesUS } from "../../services/carArray";
import { useNavigate } from "react-router-native";
import carsData from "../../services/carModelArray";
import { Car } from "../../services/types/carAndHomeType";

export interface IAppProps {
	isDrawerOpen: any;
}

type UserCarInfoForm = {
	user: any;
	car: Car;
};

const UserCarInfoForm: React.FunctionComponent<IAppProps> = ({
	isDrawerOpen,
}) => {
	const { user } = useContext(AuthContext);
	const [chargeOnGrid, setChargeOnGrid] = useState<string>("yes");
	const [userCarInfo, setUserCarInfoForm] = useState<UserCarInfoForm>({
		user: user,
		car: {
			make: "",
			model: "",
			year: "",
			fuelType: "gas",
			carBatterySize: "",
			tank: "",
			zipCode: "",
			carbonPerTank: "",
			carbonPerCharge: "",
			carbonToMakeBattery: "",
			carbonPerMile: "",
			mileage: "",
			mileageUnit: "daily",
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

	const handleChargeMeansChange = (text: string) => {
		setChargeOnGrid(text);
	};

	const handleCarBatterySizeChange = (text: string) => {
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(text)) {
			setError("Battery size can only be a number!");
			return;
		}
		if (text === "") {
			setError("Battery size cannot be blank!");
		} else {
			setError(null);
		}
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				carBatterySize: text,
			},
		}));
	};

	const handleMileageUnitChange = (text: string) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				mileageUnit: text,
			},
		}));
	};

	const handleMileageChange = (text: string) => {
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(text)) {
			setError("Milage can only be a number!");
			return;
		}
		if (text === "") {
			setError("Mileage cannot be blank!");
		} else {
			setError(null);
		}
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				mileage: text,
			},
		}));
	};

	const handleTankSizeChange = (text: string) => {
		const regex = /^\d*(\.\d*)?(\s*)?$/;
		if (!regex.test(text)) {
			setError("Tank size can only be a number!");
			return;
		}
		if (text === "") {
			setError("Tank size cannot be blank!");
		} else {
			setError(null);
		}
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				tank: text,
			},
		}));
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (!userCarInfo.car.make) {
			setError("Your cars Make cannot be blank");
			return;
		}
		if (!userCarInfo.car.model) {
			setError("Your cars Model cannot be blank");
			return;
		}
		if (!userCarInfo.car.year) {
			setError("Your cars Year cannot be blank");
			return;
		}

		if (userCarInfo.car.fuelType === "electricity" && chargeOnGrid === "yes") {
			if (!userCarInfo.car.zipCode) {
				setError(
					"Please type in the zipcode where you primarily charge your car"
				);
				return;
			}
		} else if (userCarInfo.car.fuelType === "electricity") {
			userCarInfo.car.zipCode = "off grid";
		} else {
			if (!userCarInfo.car.tank) {
				setError("Please type in the tank size of your car");
				return;
			}
		}
		setError(null);
		FetchData.addCarInfo(userCarInfo).then((response) => {
			if (response === "No car found" || response === "Cannot find zipcode") {
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
							style={{
								padding: 10,
								borderBottomWidth: 1,
								borderBottomColor: "#ccc",
								borderRadius: 5,
								backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
							}}
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
								style={{
									padding: 10,
									borderBottomWidth: 1,
									borderBottomColor: "#ccc",
									borderRadius: 5,
									backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
								}}
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
						style={{
							...UserFormStyles.input,
							backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
						}}
					/>

					<Text style={UserFormStyles.smallTitle}>
						How many Miles do you drive on average {userCarInfo.car.mileageUnit}
						?
					</Text>
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
							placeholder="100"
							value={userCarInfo.car.mileage}
							onChangeText={handleMileageChange}
							style={{
								...UserFormStyles.input,
								borderWidth: 0,
								backgroundColor: "transparent",
							}}
						/>
						<Text style={{ paddingLeft: 10, color: "#000" }}>
							{userCarInfo.car.mileageUnit} miles
						</Text>
					</View>

					<View
						style={{
							...UserFormStyles.radioButtonContainer,
							backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
						}}
					>
						<View>
							<RadioButton.Group
								onValueChange={handleMileageUnitChange}
								value={userCarInfo.car.mileageUnit}
							>
								<RadioButton.Item label="Yearly" value="yearly" />
							</RadioButton.Group>
						</View>

						<View>
							<RadioButton.Group
								onValueChange={handleMileageUnitChange}
								value={userCarInfo.car.mileageUnit}
							>
								<RadioButton.Item label="Monthly" value="monthly" />
							</RadioButton.Group>
						</View>
						<View>
							<RadioButton.Group
								onValueChange={handleMileageUnitChange}
								value={userCarInfo.car.mileageUnit}
							>
								<RadioButton.Item label="Daily" value="daily" />
							</RadioButton.Group>
						</View>
					</View>

					<Text style={UserFormStyles.smallTitle}>Fuel Type:</Text>
					<RNPickerSelect
						value={userCarInfo.car.fuelType}
						onValueChange={handleFuelTypeChange}
						style={{ ...pickerSelectStyles }}
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
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									borderWidth: 1,
									borderColor: "#000",
									borderRadius: 5,
									backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
									padding: 5,
								}}
							>
								<TextInput
									value={`${userCarInfo.car.carBatterySize}`}
									onChangeText={handleCarBatterySizeChange}
									placeholder="68.6..."
									style={{
										...UserFormStyles.input,
										borderWidth: 0,
										backgroundColor: "transparent",
									}}
								/>
								<Text style={{ paddingLeft: 10, color: "#000" }}>kWh</Text>
							</View>

							<Text style={UserFormStyles.smallTitle}>
								Do you mainly charge your car on the grid?
							</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
									backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
								}}
							>
								<View>
									<RadioButton.Group
										onValueChange={handleChargeMeansChange}
										value={chargeOnGrid}
									>
										<RadioButton.Item label="Yes" value="yes" />
									</RadioButton.Group>
								</View>
								<View>
									<RadioButton.Group
										onValueChange={handleChargeMeansChange}
										value={chargeOnGrid}
									>
										<RadioButton.Item label="No" value="no" />
									</RadioButton.Group>
								</View>
							</View>
						</>
					) : null}
					{userCarInfo.car.fuelType === "electricity" &&
					chargeOnGrid === "yes" ? (
						<>
							<Text style={UserFormStyles.smallTitle}>
								Zipcode of cars primary charging location:
							</Text>
							<TextInput
								mode="outlined"
								value={`${userCarInfo.car.zipCode}`}
								onChangeText={handleZipCodeChange}
								style={{
									...UserFormStyles.input,
									backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
								}}
							/>
						</>
					) : null}
					{userCarInfo.car.fuelType !== "electricity" ? (
						<>
							<Text style={UserFormStyles.smallTitle}>Tank size:</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									borderWidth: 1,
									borderColor: "#000",
									borderRadius: 5,
									backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
									padding: 5,
								}}
							>
								<TextInput
									placeholder="10..."
									value={`${userCarInfo.car.tank}`}
									onChangeText={handleTankSizeChange}
									style={{
										...UserFormStyles.input,
										borderWidth: 0,
										backgroundColor: "transparent",
									}}
								/>
								<Text style={{ paddingLeft: 10, color: "#000" }}>gal</Text>
							</View>
						</>
					) : null}
					{userCarInfo.car.fuelType === "hybrid" && (
						<>
							<Text style={UserFormStyles.smallTitle}>Battery Size:</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									borderWidth: 1,
									borderColor: "#000",
									borderRadius: 5,
									backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
									padding: 5,
								}}
							>
								<TextInput
									value={`${userCarInfo.car.carBatterySize}`}
									onChangeText={handleCarBatterySizeChange}
									placeholder="68.6..."
									style={{
										...UserFormStyles.input,
										borderWidth: 0,
										backgroundColor: "transparent",
									}}
								/>
								<Text style={{ paddingLeft: 10, color: "#000" }}>kWh</Text>
							</View>
						</>
					)}
				</View>
				<View
					style={{
						zIndex: 1,
						elevation: Platform.OS === "android" ? 50 : 0,
					}}
				>
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
				</View>
			</form>
		</ScrollView>
	);
};

export default UserCarInfoForm;
