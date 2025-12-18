import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import { useNavigate } from "react-router-native";
import { carMakesUS } from "../../services/carArray";
import carsData from "../../services/carModelArray";
import { Car } from "../../services/types/carAndHomeFormType";
import AddBasicsButton from "../navBar/AddBasicInfoButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing, borderRadius, typography, shadows } from "../../services/styles/theme";

// Generate year options from current year down to 1990
const currentYear = new Date().getFullYear() + 1;
const YEAR_OPTIONS = Array.from({ length: currentYear - 1989 }, (_, i) => ({
	label: String(currentYear - i),
	value: String(currentYear - i),
}));

const FUEL_TYPE_OPTIONS = [
	{ label: "Gas", value: "gas", icon: "⛽" },
	{ label: "Diesel", value: "diesel", icon: "🛢️" },
	{ label: "Hybrid", value: "hybrid", icon: "🔋" },
	{ label: "Electric", value: "electricity", icon: "⚡" },
];

const MILEAGE_OPTIONS = [
	{ label: "< 20", value: "15" },
	{ label: "20-40", value: "30" },
	{ label: "40-60", value: "50" },
	{ label: "60-80", value: "70" },
	{ label: "80-100", value: "90" },
	{ label: "100+", value: "120" },
];

const TANK_SIZE_OPTIONS = [
	{ label: "Small (8-10 gal)", value: "9" },
	{ label: "Compact (10-12 gal)", value: "11" },
	{ label: "Medium (12-14 gal)", value: "13" },
	{ label: "Standard (14-16 gal)", value: "15" },
	{ label: "Large (16-18 gal)", value: "17" },
	{ label: "SUV/Truck (18-22 gal)", value: "20" },
	{ label: "Large Truck (22-30 gal)", value: "26" },
];

// Common EV battery sizes for reference
const COMMON_BATTERY_SIZES = [
	{ make: "Tesla Model 3 SR", kWh: 60 },
	{ make: "Tesla Model 3 LR", kWh: 82 },
	{ make: "Tesla Model Y", kWh: 75 },
	{ make: "Tesla Model S", kWh: 100 },
	{ make: "Polestar 2 SR", kWh: 69 },
	{ make: "Polestar 2 LR", kWh: 78 },
	{ make: "Rivian R1T/R1S", kWh: 135 },
	{ make: "Ford Mustang Mach-E", kWh: 91 },
	{ make: "Chevy Bolt", kWh: 66 },
	{ make: "Nissan Leaf", kWh: 62 },
	{ make: "BMW iX", kWh: 111 },
	{ make: "Lucid Air", kWh: 118 },
	{ make: "Hyundai Ioniq 6", kWh: 77 },
	{ make: "Kia EV6", kWh: 77 },
	{ make: "VW ID.4", kWh: 82 },
];

export interface IAppProps {
	isDrawerOpen: boolean;
	setIsDrawerOpen: any;
	state: any;
	dispatch: any;
}

type UserCarInfoForm = {
	user: any;
	car: Car;
};

const UserCarInfoForm: React.FunctionComponent<IAppProps> = ({
	isDrawerOpen,
	setIsDrawerOpen,
	state,
	dispatch,
}) => {
	const { user } = useContext(AuthContext);
	const insets = useSafeAreaInsets();
	const [chargeOnGrid, setChargeOnGrid] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
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
			mileage: "",
			mileageUnit: "daily",
		},
	});
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate = useNavigate();

	// Get car makes as picker options
	const carMakeOptions = carMakesUS.map((make) => ({
		label: make,
		value: make,
	}));

	// Get car models based on selected make
	const getModelOptions = () => {
		if (!userCarInfo.car.make) return [];
		const models = carsData[userCarInfo.car.make as keyof typeof carsData];
		if (!models) return [];
		return models.map((model) => ({
			label: model,
			value: model,
		}));
	};

	const handleMakeChange = (value: string) => {
		setError(null);
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				make: value,
				model: "", // Reset model when make changes
			},
		}));
	};

	const handleModelChange = (value: string) => {
		setError(null);
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				model: value,
			},
		}));
	};

	const handleYearChange = (value: string) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				year: value,
			},
		}));
	};

	const handleFuelTypeChange = (value: "gas" | "diesel" | "hybrid" | "electricity") => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				fuelType: value,
			},
		}));
	};

	const handleMileageChange = (value: string) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				mileage: value,
			},
		}));
	};

	const handleTankSizeChange = (value: string) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				tank: value,
			},
		}));
	};

	const handleBatterySizeChange = (value: string) => {
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				carBatterySize: value,
			},
		}));
	};

	const handleZipCodeChange = (text: string) => {
		const numericText = text.replace(/[^0-9]/g, "");
		setUserCarInfoForm((prevState) => ({
			...prevState,
			car: {
				...prevState.car,
				zipCode: numericText,
			},
		}));
	};

	const handleSubmit = () => {
		if (!userCarInfo.car.make) {
			setError("Please select your car's make");
			return;
		}
		if (!userCarInfo.car.model) {
			setError("Please select your car's model");
			return;
		}
		if (!userCarInfo.car.year) {
			setError("Please select your car's year");
			return;
		}
		if (!userCarInfo.car.mileage) {
			setError("Please select your daily mileage");
			return;
		}

		if (userCarInfo.car.fuelType === "electricity") {
			if (!userCarInfo.car.carBatterySize) {
				setError("Please select your car's battery size");
				return;
			}
			if (chargeOnGrid && (!userCarInfo.car.zipCode || userCarInfo.car.zipCode.length !== 5)) {
				setError("Please enter a valid 5-digit zipcode for charging location");
				return;
			}
			if (!chargeOnGrid) {
				userCarInfo.car.zipCode = "off grid";
			}
		} else if (userCarInfo.car.fuelType === "hybrid") {
			if (!userCarInfo.car.tank) {
				setError("Please select your car's tank size");
				return;
			}
			if (!userCarInfo.car.carBatterySize) {
				setError("Please select your car's battery size");
				return;
			}
		} else {
			if (!userCarInfo.car.tank) {
				setError("Please select your car's tank size");
				return;
			}
		}

		setError(null);
		FetchData.addCarInfo(userCarInfo).then((response) => {
			// Check for error responses
			if (typeof response === "string" || response?.error) {
				setError(response?.error || response || "Failed to add car. Please try again.");
			} else {
				// Add EV reward if applicable
				if (userCarInfo.car.fuelType === "electricity") {
					FetchData.addReward({
						user: userCarInfo.user,
						rewards: 100,
					}).then(() => {
						dispatch({ type: "ADD_STARS", payload: 100 });
					});
				}
				// Refetch user data to get the updated cars list with calculated fields, then redirect
				FetchData.get("/api/v1/user-info", user).then((userData) => {
					if (userData.user) {
						dispatch({ type: "USER_CAR", payload: userData.user.cars });
						dispatch({ type: "USER_INFO", payload: userData.user.info });
						dispatch({ type: "USER_HOME", payload: userData.user.homes });
						dispatch({ type: "PLANT_TREES_HOME", payload: userData.user.info?.treesPlanted || 0 });
						dispatch({ type: "STARS_HOME", payload: userData.user.info?.rewards || 0 });
					}
					setRedirect(true);
				});
			}
		});
	};

	useEffect(() => {
		if (redirect) {
			navigate("/");
			setRedirect(false);
		}
	}, [redirect]);

	if (!state.userInformation) {
		return (
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			>
				<View style={styles.noInfoContainer}>
					<Text style={styles.noInfoIcon}>🚗</Text>
					<Text style={styles.noInfoTitle}>Add Your Basic Info First</Text>
					<Text style={styles.noInfoSubtitle}>
						Please fill out your basic information before adding a car
					</Text>
					<View style={{ marginTop: spacing.lg, width: "100%" }}>
						<AddBasicsButton setIsDrawerOpen={setIsDrawerOpen} />
					</View>
				</View>
			</ScrollView>
		);
	}

	return (
		<ScrollView
			style={styles.scrollView}
			contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Add Your Car</Text>
				<Text style={styles.headerSubtitle}>
					Help us calculate your vehicle emissions
				</Text>
			</View>

			{/* Car Details Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>🚗</Text>
					<Text style={styles.cardTitle}>Vehicle Details</Text>
				</View>

				<Text style={styles.label}>Make</Text>
				<View style={styles.pickerContainer}>
					<RNPickerSelect
						value={userCarInfo.car.make}
						onValueChange={handleMakeChange}
						style={pickerStyles}
						placeholder={{ label: "Select car make...", value: "" }}
						items={carMakeOptions}
						useNativeAndroidPickerStyle={false}
						Icon={() => <Text style={styles.pickerIcon}>▼</Text>}
					/>
				</View>

				{userCarInfo.car.make && (
					<>
						<Text style={styles.label}>Model</Text>
						<View style={styles.pickerContainer}>
							<RNPickerSelect
								value={userCarInfo.car.model}
								onValueChange={handleModelChange}
								style={pickerStyles}
								placeholder={{ label: "Select model...", value: "" }}
								items={getModelOptions()}
								useNativeAndroidPickerStyle={false}
								Icon={() => <Text style={styles.pickerIcon}>▼</Text>}
							/>
						</View>
					</>
				)}

				{userCarInfo.car.model && (
					<>
						<Text style={styles.label}>Year</Text>
						<View style={styles.pickerContainer}>
							<RNPickerSelect
								value={userCarInfo.car.year}
								onValueChange={handleYearChange}
								style={pickerStyles}
								placeholder={{ label: "Select year...", value: "" }}
								items={YEAR_OPTIONS}
								useNativeAndroidPickerStyle={false}
								Icon={() => <Text style={styles.pickerIcon}>▼</Text>}
							/>
						</View>
					</>
				)}
			</View>

			{/* Fuel Type Card */}
			{userCarInfo.car.year && (
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Text style={styles.cardIcon}>⛽</Text>
						<Text style={styles.cardTitle}>Fuel Type</Text>
					</View>

					<View style={styles.fuelGrid}>
						{FUEL_TYPE_OPTIONS.map((option) => (
							<Pressable
								key={option.value}
								style={[
									styles.fuelButton,
									userCarInfo.car.fuelType === option.value && styles.fuelButtonActive,
								]}
								onPress={() => handleFuelTypeChange(option.value as any)}
							>
								<Text style={styles.fuelIcon}>{option.icon}</Text>
								<Text
									style={[
										styles.fuelText,
										userCarInfo.car.fuelType === option.value && styles.fuelTextActive,
									]}
								>
									{option.label}
								</Text>
							</Pressable>
						))}
					</View>
				</View>
			)}

			{/* Usage Card */}
			{userCarInfo.car.fuelType && userCarInfo.car.year && (
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Text style={styles.cardIcon}>📊</Text>
						<Text style={styles.cardTitle}>Daily Usage</Text>
					</View>

					<Text style={styles.label}>Miles driven per day</Text>
					<View style={styles.chipGrid}>
						{MILEAGE_OPTIONS.map((option) => (
							<Pressable
								key={option.value}
								style={[
									styles.chip,
									userCarInfo.car.mileage === option.value && styles.chipActive,
								]}
								onPress={() => handleMileageChange(option.value)}
							>
								<Text
									style={[
										styles.chipText,
										userCarInfo.car.mileage === option.value && styles.chipTextActive,
									]}
								>
									{option.label}
								</Text>
							</Pressable>
						))}
					</View>
				</View>
			)}

			{/* Tank/Battery Card - For Gas/Diesel */}
			{userCarInfo.car.mileage && (userCarInfo.car.fuelType === "gas" || userCarInfo.car.fuelType === "diesel") && (
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Text style={styles.cardIcon}>🛢️</Text>
						<Text style={styles.cardTitle}>Tank Size</Text>
					</View>

					<Text style={styles.label}>Select your tank size</Text>
					<View style={styles.pickerContainer}>
						<RNPickerSelect
							value={userCarInfo.car.tank}
							onValueChange={handleTankSizeChange}
							style={pickerStyles}
							placeholder={{ label: "Select tank size...", value: "" }}
							items={TANK_SIZE_OPTIONS}
							useNativeAndroidPickerStyle={false}
							Icon={() => <Text style={styles.pickerIcon}>▼</Text>}
						/>
					</View>
				</View>
			)}

			{/* Battery Card - For Electric */}
			{userCarInfo.car.mileage && userCarInfo.car.fuelType === "electricity" && (
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Text style={styles.cardIcon}>🔋</Text>
						<Text style={styles.cardTitle}>Battery & Charging</Text>
					</View>

					<Text style={styles.label}>Battery size (kWh)</Text>
					<View style={styles.inputRow}>
						<TextInput
							mode="outlined"
							placeholder="e.g. 78"
							value={userCarInfo.car.carBatterySize}
							onChangeText={(text) => {
								const numericText = text.replace(/[^0-9.]/g, "");
								handleBatterySizeChange(numericText);
							}}
							keyboardType="numeric"
							style={[styles.textInput, { flex: 1 }]}
							outlineColor={colors.border}
							activeOutlineColor={colors.primary}
							outlineStyle={{ borderRadius: borderRadius.md }}
							right={<TextInput.Affix text="kWh" />}
						/>
					</View>

					<Text style={styles.helperText}>
						Common sizes: Polestar 2 (78), Tesla Model 3 (82), Chevy Bolt (66)
					</Text>

					<View style={styles.divider} />

					<Pressable
						style={styles.checkboxRow}
						onPress={() => setChargeOnGrid(!chargeOnGrid)}
					>
						<Checkbox
							status={chargeOnGrid ? "checked" : "unchecked"}
							onPress={() => setChargeOnGrid(!chargeOnGrid)}
							color={colors.primary}
						/>
						<Text style={styles.checkboxLabel}>I charge on the grid</Text>
					</Pressable>

					{chargeOnGrid && (
						<View style={styles.subSection}>
							<Text style={styles.label}>Charging location zipcode</Text>
							<TextInput
								mode="outlined"
								placeholder="12345"
								value={userCarInfo.car.zipCode}
								onChangeText={handleZipCodeChange}
								keyboardType="numeric"
								maxLength={5}
								style={styles.textInput}
								outlineColor={colors.border}
								activeOutlineColor={colors.primary}
								outlineStyle={{ borderRadius: borderRadius.md }}
							/>
						</View>
					)}
				</View>
			)}

			{/* Hybrid Card */}
			{userCarInfo.car.mileage && userCarInfo.car.fuelType === "hybrid" && (
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Text style={styles.cardIcon}>🔋</Text>
						<Text style={styles.cardTitle}>Tank & Battery</Text>
					</View>

					<Text style={styles.label}>Tank size</Text>
					<View style={styles.pickerContainer}>
						<RNPickerSelect
							value={userCarInfo.car.tank}
							onValueChange={handleTankSizeChange}
							style={pickerStyles}
							placeholder={{ label: "Select tank size...", value: "" }}
							items={TANK_SIZE_OPTIONS}
							useNativeAndroidPickerStyle={false}
							Icon={() => <Text style={styles.pickerIcon}>▼</Text>}
						/>
					</View>

					<Text style={[styles.label, { marginTop: spacing.md }]}>Battery size (kWh)</Text>
					<View style={styles.inputRow}>
						<TextInput
							mode="outlined"
							placeholder="e.g. 18"
							value={userCarInfo.car.carBatterySize}
							onChangeText={(text) => {
								const numericText = text.replace(/[^0-9.]/g, "");
								handleBatterySizeChange(numericText);
							}}
							keyboardType="numeric"
							style={[styles.textInput, { flex: 1 }]}
							outlineColor={colors.border}
							activeOutlineColor={colors.primary}
							outlineStyle={{ borderRadius: borderRadius.md }}
							right={<TextInput.Affix text="kWh" />}
						/>
					</View>
					<Text style={styles.helperText}>
						Hybrid batteries are typically 1-18 kWh (e.g. Prius: 8.8, RAV4 Prime: 18)
					</Text>
				</View>
			)}

			{/* Error Message */}
			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}

			{/* Submit Button */}
			<Pressable style={styles.submitButton} onPress={handleSubmit}>
				<Text style={styles.submitButtonText}>Add Car</Text>
			</Pressable>

			{/* EV Bonus Message */}
			{userCarInfo.car.fuelType === "electricity" && (
				<View style={styles.bonusContainer}>
					<Text style={styles.bonusText}>🌱 +100 reward points for driving electric!</Text>
				</View>
			)}

			<View style={{ height: insets.bottom + 40 }} />
		</ScrollView>
	);
};

const pickerStyles = {
	inputIOS: {
		fontSize: typography.fontSizes.lg,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		color: colors.textPrimary,
		paddingRight: 30,
	},
	inputAndroid: {
		fontSize: typography.fontSizes.lg,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		color: colors.textPrimary,
		paddingRight: 30,
	},
	placeholder: {
		color: colors.textMuted,
	},
	iconContainer: {
		top: 12,
		right: 12,
	},
	viewContainer: {
		justifyContent: "center",
	},
};

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: colors.background,
	},
	container: {
		paddingHorizontal: spacing.md,
		paddingBottom: spacing.xl,
	},
	header: {
		marginBottom: spacing.lg,
		alignItems: "center",
	},
	headerTitle: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
		marginBottom: spacing.xs,
	},
	headerSubtitle: {
		fontSize: typography.fontSizes.lg,
		color: colors.textSecondary,
	},
	card: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginBottom: spacing.md,
		...shadows.sm,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.md,
	},
	cardIcon: {
		fontSize: 24,
		marginRight: spacing.sm,
	},
	cardTitle: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
	label: {
		fontSize: typography.fontSizes.md,
		color: colors.textSecondary,
		marginBottom: spacing.sm,
	},
	pickerContainer: {
		backgroundColor: colors.backgroundDark,
		borderRadius: borderRadius.md,
		borderWidth: 1,
		borderColor: colors.border,
		marginBottom: spacing.sm,
		minHeight: 50,
		justifyContent: "center",
	},
	pickerIcon: {
		fontSize: 14,
		color: colors.textSecondary,
		paddingRight: spacing.sm,
	},
	textInput: {
		backgroundColor: colors.surface,
		fontSize: typography.fontSizes.lg,
	},
	inputRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	helperText: {
		fontSize: typography.fontSizes.sm,
		color: colors.textMuted,
		marginTop: spacing.xs,
		fontStyle: "italic",
	},
	fuelGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing.sm,
	},
	fuelButton: {
		flex: 1,
		minWidth: "45%",
		paddingVertical: spacing.md,
		borderRadius: borderRadius.md,
		backgroundColor: colors.backgroundDark,
		alignItems: "center",
		borderWidth: 2,
		borderColor: "transparent",
	},
	fuelButtonActive: {
		backgroundColor: colors.primarySoft + "30",
		borderColor: colors.primary,
	},
	fuelIcon: {
		fontSize: 28,
		marginBottom: spacing.xs,
	},
	fuelText: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
		color: colors.textSecondary,
	},
	fuelTextActive: {
		color: colors.primary,
		fontWeight: typography.fontWeights.semibold,
	},
	chipGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing.sm,
	},
	chip: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderRadius: borderRadius.full,
		backgroundColor: colors.backgroundDark,
		borderWidth: 1,
		borderColor: colors.border,
	},
	chipActive: {
		backgroundColor: colors.primary,
		borderColor: colors.primary,
	},
	chipText: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
		color: colors.textSecondary,
	},
	chipTextActive: {
		color: colors.textOnPrimary,
	},
	checkboxRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: spacing.xs,
	},
	checkboxLabel: {
		fontSize: typography.fontSizes.lg,
		color: colors.textPrimary,
		marginLeft: spacing.xs,
	},
	subSection: {
		marginTop: spacing.md,
		paddingTop: spacing.md,
		borderTopWidth: 1,
		borderTopColor: colors.divider,
	},
	divider: {
		height: 1,
		backgroundColor: colors.divider,
		marginVertical: spacing.md,
	},
	errorContainer: {
		backgroundColor: colors.error + "15",
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginBottom: spacing.md,
		borderLeftWidth: 4,
		borderLeftColor: colors.error,
	},
	errorText: {
		color: colors.error,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
	},
	submitButton: {
		backgroundColor: colors.primary,
		paddingVertical: spacing.lg,
		borderRadius: borderRadius.lg,
		alignItems: "center",
		...shadows.md,
	},
	submitButtonText: {
		color: colors.textOnPrimary,
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.bold,
	},
	bonusContainer: {
		backgroundColor: colors.primarySoft + "30",
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginTop: spacing.md,
		alignItems: "center",
	},
	bonusText: {
		color: colors.primaryDark,
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
	},
	noInfoContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: spacing.xl,
		paddingTop: spacing.xxl,
	},
	noInfoIcon: {
		fontSize: 64,
		marginBottom: spacing.lg,
	},
	noInfoTitle: {
		fontSize: typography.fontSizes.xxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.textPrimary,
		textAlign: "center",
		marginBottom: spacing.sm,
	},
	noInfoSubtitle: {
		fontSize: typography.fontSizes.lg,
		color: colors.textSecondary,
		textAlign: "center",
	},
});

export default UserCarInfoForm;
