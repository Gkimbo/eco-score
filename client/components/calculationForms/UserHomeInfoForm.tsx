import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import { useNavigate, useLocation } from "react-router-native";
import { Home } from "../../services/types/carAndHomeFormType";
import { Home as HomeType } from "../../services/types/carAndHomeType";
import AddBasicsButton from "../navBar/AddBasicInfoButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing, borderRadius, typography, shadows } from "../../services/styles/theme";

// Generate year options from current year down to 1800
const currentYear = new Date().getFullYear();
const YEAR_BUILT_OPTIONS = Array.from({ length: currentYear - 1799 }, (_, i) => ({
	label: String(currentYear - i),
	value: String(currentYear - i),
}));

const ELECTRICITY_SOURCE_OPTIONS = [
	{ label: "Grid Power", value: "grid", icon: "🔌" },
	{ label: "Solar", value: "solar", icon: "☀️" },
	{ label: "Wind", value: "wind", icon: "💨" },
	{ label: "Hydro Electric", value: "hydro", icon: "💧" },
];

export interface IAppProps {
	isDrawerOpen: boolean;
	setIsDrawerOpen: any;
	state: any;
	dispatch?: any;
}

type UserHomeInfoFormType = {
	user: any;
	home: Home;
};

const UserHomeInfoForm: React.FunctionComponent<IAppProps> = ({
	isDrawerOpen,
	setIsDrawerOpen,
	state,
	dispatch,
}) => {
	const { user } = useContext(AuthContext);
	const insets = useSafeAreaInsets();
	const [error, setError] = useState<string | null>(null);
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate = useNavigate();
	const location = useLocation();

	// Check if we're editing an existing home
	const editingHome = (location.state as { editingHome?: HomeType })?.editingHome;
	const isEditing = !!editingHome;

	const getInitialHomeState = (): Home => {
		if (editingHome) {
			return {
				zipcode: editingHome.zipcode || "",
				yearBuilt: editingHome.yearBuilt || "",
				squareFeet: editingHome.squareFeet || "",
				electricitySource: editingHome.electricitySource || "",
				electricityUsage: editingHome.electricityUsage || "",
				gasUsage: editingHome.gasUsage || "",
				oilUsage: editingHome.oilUsage || "",
				gasUnit: editingHome.gasUnit || "yearly",
				oilUnit: editingHome.oilUnit || "yearly",
				oilVolume: editingHome.oilVolume || "gallons",
				recycling: editingHome.recycling || "no",
				compost: editingHome.compost || "no",
				electricityUnit: editingHome.electricityUnit || "yearly",
				gas: editingHome.gas || "no",
				oil: editingHome.oil || "no",
				batteryBackup: editingHome.batteryBackup || "no",
				batteryBankSize: editingHome.batteryBankSize || "",
				propane: editingHome.propane || "no",
				propaneUsage: editingHome.propaneUsage || "",
				wood: editingHome.wood || "no",
				woodUsage: editingHome.woodUsage || "",
				woodType: editingHome.woodType || "firewood",
				electricHeat: editingHome.electricHeat || "no",
			};
		}
		return {
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
			recycling: "no",
			compost: "no",
			electricityUnit: "yearly",
			gas: "no",
			oil: "no",
			batteryBackup: "no",
			batteryBankSize: "",
			propane: "no",
			propaneUsage: "",
			wood: "no",
			woodUsage: "",
			woodType: "firewood",
			electricHeat: "no",
		};
	};

	const [userHomeInfo, setUserHomeInfoForm] = useState<UserHomeInfoFormType>({
		user: user,
		home: getInitialHomeState(),
	});

	const handleInputChange = (field: keyof Home, value: string) => {
		setError(null);
		setUserHomeInfoForm((prevState) => ({
			...prevState,
			home: {
				...prevState.home,
				[field]: value,
			},
		}));
	};

	const handleNumericInput = (field: keyof Home, text: string) => {
		const numericText = text.replace(/[^0-9.]/g, "");
		handleInputChange(field, numericText);
	};

	const toggleCheckbox = (field: keyof Home) => {
		const currentValue = userHomeInfo.home[field];
		const newValue = currentValue === "yes" ? "no" : "yes";
		handleInputChange(field, newValue);
	};

	const handleSubmit = () => {
		if (!userHomeInfo.home.zipcode || userHomeInfo.home.zipcode.length !== 5) {
			setError("Please enter a valid 5-digit zipcode");
			return;
		}
		if (!userHomeInfo.home.yearBuilt) {
			setError("Please select the year your home was built");
			return;
		}
		if (!userHomeInfo.home.squareFeet) {
			setError("Please enter your home's square footage");
			return;
		}
		if (!userHomeInfo.home.electricitySource) {
			setError("Please select your electricity source");
			return;
		}
		if (!userHomeInfo.home.electricityUsage) {
			setError("Please enter your electricity usage");
			return;
		}
		if (userHomeInfo.home.gas === "yes" && !userHomeInfo.home.gasUsage) {
			setError("Please enter your natural gas usage");
			return;
		}
		if (userHomeInfo.home.oil === "yes" && !userHomeInfo.home.oilUsage) {
			setError("Please enter your heating oil usage");
			return;
		}
		if (userHomeInfo.home.batteryBackup === "yes" && !userHomeInfo.home.batteryBankSize) {
			setError("Please enter your battery bank size");
			return;
		}

		setError(null);

		if (isEditing && editingHome) {
			// Update existing home
			FetchData.updateHomeInfo({
				user: user,
				id: editingHome.id,
				home: userHomeInfo.home,
			}).then((response) => {
				if (typeof response === "string" || response?.error) {
					setError(response?.error || response || "Failed to update home. Please try again.");
				} else {
					// Refetch user data to get updated homes list, then redirect
					if (dispatch) {
						FetchData.get("/api/v1/user-info", user).then((userData) => {
							if (userData.user) {
								dispatch({ type: "USER_HOME", payload: userData.user.homes });
								dispatch({ type: "USER_CAR", payload: userData.user.cars });
								dispatch({ type: "USER_INFO", payload: userData.user.info });
							}
							setRedirect(true);
						});
					} else {
						setRedirect(true);
					}
				}
			});
		} else {
			// Add new home
			FetchData.addHomeInfo(userHomeInfo).then((response) => {
				// Check for error responses (string messages from backend)
				if (typeof response === "string" || response?.error) {
					setError(response?.error || response || "Failed to add home. Please try again.");
				} else {
					// Refetch user data to get updated homes list, then redirect
					if (dispatch) {
						FetchData.get("/api/v1/user-info", user).then((userData) => {
							if (userData.user) {
								dispatch({ type: "USER_HOME", payload: userData.user.homes });
								dispatch({ type: "USER_CAR", payload: userData.user.cars });
								dispatch({ type: "USER_INFO", payload: userData.user.info });
							}
							setRedirect(true);
						});
					} else {
						setRedirect(true);
					}
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

	if (!state.userInformation) {
		return (
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			>
				<View style={styles.noInfoContainer}>
					<Text style={styles.noInfoIcon}>🏠</Text>
					<Text style={styles.noInfoTitle}>Add Your Basic Info First</Text>
					<Text style={styles.noInfoSubtitle}>
						Please fill out your basic information before adding a home
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
				<Text style={styles.headerTitle}>{isEditing ? "Edit Your Home" : "Add Your Home"}</Text>
				<Text style={styles.headerSubtitle}>
					{isEditing ? "Update your household information" : "Help us calculate your household emissions"}
				</Text>
			</View>

			{/* Location Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>📍</Text>
					<Text style={styles.cardTitle}>Location & Size</Text>
				</View>

				<Text style={styles.label}>Zipcode</Text>
				<TextInput
					mode="outlined"
					placeholder="12345"
					value={userHomeInfo.home.zipcode}
					onChangeText={(text) => handleNumericInput("zipcode", text)}
					keyboardType="numeric"
					maxLength={5}
					style={styles.textInput}
					outlineColor={colors.border}
					activeOutlineColor={colors.primary}
					outlineStyle={{ borderRadius: borderRadius.md }}
				/>

				<Text style={[styles.label, { marginTop: spacing.md }]}>Square Footage</Text>
				<TextInput
					mode="outlined"
					placeholder="e.g. 1800"
					value={userHomeInfo.home.squareFeet}
					onChangeText={(text) => handleNumericInput("squareFeet", text)}
					keyboardType="numeric"
					style={styles.textInput}
					outlineColor={colors.border}
					activeOutlineColor={colors.primary}
					outlineStyle={{ borderRadius: borderRadius.md }}
					right={<TextInput.Affix text="sq ft" />}
				/>
				<Text style={styles.helperText}>
					US average home: ~2,300 sq ft
				</Text>

				<Text style={[styles.label, { marginTop: spacing.md }]}>Year Built</Text>
				<View style={styles.pickerContainer}>
					<RNPickerSelect
						value={userHomeInfo.home.yearBuilt}
						onValueChange={(value) => handleInputChange("yearBuilt", value)}
						style={pickerStyles}
						placeholder={{ label: "Select year built...", value: "" }}
						items={YEAR_BUILT_OPTIONS}
						useNativeAndroidPickerStyle={false}
						Icon={() => <Text style={styles.pickerIcon}>▼</Text>}
					/>
				</View>
			</View>

			{/* Electricity Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>⚡</Text>
					<Text style={styles.cardTitle}>Electricity</Text>
				</View>

				<Text style={styles.label}>Primary electricity source</Text>
				<View style={styles.sourceGrid}>
					{ELECTRICITY_SOURCE_OPTIONS.map((option) => (
						<Pressable
							key={option.value}
							style={[
								styles.sourceButton,
								userHomeInfo.home.electricitySource === option.value && styles.sourceButtonActive,
							]}
							onPress={() => handleInputChange("electricitySource", option.value)}
						>
							<Text style={styles.sourceIcon}>{option.icon}</Text>
							<Text
								style={[
									styles.sourceText,
									userHomeInfo.home.electricitySource === option.value && styles.sourceTextActive,
								]}
							>
								{option.label}
							</Text>
						</Pressable>
					))}
				</View>

				<Text style={[styles.label, { marginTop: spacing.lg }]}>
					{userHomeInfo.home.electricitySource !== "grid" && userHomeInfo.home.electricitySource
						? "Grid electricity usage (kWh/year)"
						: "Electricity usage (kWh/year)"}
				</Text>
				<TextInput
					mode="outlined"
					placeholder="e.g. 10500"
					value={userHomeInfo.home.electricityUsage}
					onChangeText={(text) => handleNumericInput("electricityUsage", text)}
					keyboardType="numeric"
					style={styles.textInput}
					outlineColor={colors.border}
					activeOutlineColor={colors.primary}
					outlineStyle={{ borderRadius: borderRadius.md }}
					right={<TextInput.Affix text="kWh" />}
				/>
				<Text style={styles.helperText}>
					Check your electric bill. US average: ~10,500 kWh/year
				</Text>

				{/* Battery Backup */}
				<View style={styles.divider} />
				<Pressable
					style={styles.checkboxRow}
					onPress={() => toggleCheckbox("batteryBackup")}
				>
					<Checkbox
						status={userHomeInfo.home.batteryBackup === "yes" ? "checked" : "unchecked"}
						onPress={() => toggleCheckbox("batteryBackup")}
						color={colors.primary}
					/>
					<Text style={styles.checkboxLabel}>I have a battery backup system</Text>
				</Pressable>

				{userHomeInfo.home.batteryBackup === "yes" && (
					<View style={styles.subSection}>
						<Text style={styles.label}>Battery bank size (kWh)</Text>
						<TextInput
							mode="outlined"
							placeholder="e.g. 13.5"
							value={userHomeInfo.home.batteryBankSize}
							onChangeText={(text) => handleNumericInput("batteryBankSize", text)}
							keyboardType="numeric"
							style={styles.textInput}
							outlineColor={colors.border}
							activeOutlineColor={colors.primary}
							outlineStyle={{ borderRadius: borderRadius.md }}
							right={<TextInput.Affix text="kWh" />}
						/>
						<Text style={styles.helperText}>
							Common: Tesla Powerwall (13.5), Enphase IQ (10)
						</Text>
					</View>
				)}
			</View>

			{/* Other Energy Sources Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>🔥</Text>
					<Text style={styles.cardTitle}>Heating Fuels</Text>
				</View>

				{/* Natural Gas */}
				<Pressable
					style={styles.checkboxRow}
					onPress={() => toggleCheckbox("gas")}
				>
					<Checkbox
						status={userHomeInfo.home.gas === "yes" ? "checked" : "unchecked"}
						onPress={() => toggleCheckbox("gas")}
						color={colors.primary}
					/>
					<Text style={styles.checkboxLabel}>My home uses natural gas</Text>
				</Pressable>

				{userHomeInfo.home.gas === "yes" && (
					<View style={styles.subSection}>
						<Text style={styles.label}>Natural gas usage (therms/year)</Text>
						<TextInput
							mode="outlined"
							placeholder="e.g. 650"
							value={userHomeInfo.home.gasUsage}
							onChangeText={(text) => handleNumericInput("gasUsage", text)}
							keyboardType="numeric"
							style={styles.textInput}
							outlineColor={colors.border}
							activeOutlineColor={colors.primary}
							outlineStyle={{ borderRadius: borderRadius.md }}
							right={<TextInput.Affix text="therms" />}
						/>
						<Text style={styles.helperText}>
							Check your gas bill. US average: ~500-800 therms/year
						</Text>
					</View>
				)}

				<View style={styles.divider} />

				{/* Heating Oil */}
				<Pressable
					style={styles.checkboxRow}
					onPress={() => toggleCheckbox("oil")}
				>
					<Checkbox
						status={userHomeInfo.home.oil === "yes" ? "checked" : "unchecked"}
						onPress={() => toggleCheckbox("oil")}
						color={colors.primary}
					/>
					<Text style={styles.checkboxLabel}>My home uses heating oil</Text>
				</Pressable>

				{userHomeInfo.home.oil === "yes" && (
					<View style={styles.subSection}>
						<Text style={styles.label}>Heating oil usage (gallons/year)</Text>
						<TextInput
							mode="outlined"
							placeholder="e.g. 600"
							value={userHomeInfo.home.oilUsage}
							onChangeText={(text) => handleNumericInput("oilUsage", text)}
							keyboardType="numeric"
							style={styles.textInput}
							outlineColor={colors.border}
							activeOutlineColor={colors.primary}
							outlineStyle={{ borderRadius: borderRadius.md }}
							right={<TextInput.Affix text="gal" />}
						/>
						<Text style={styles.helperText}>
							Check your oil delivery receipts. Average: ~500-800 gal/year
						</Text>
					</View>
				)}

				<View style={styles.divider} />

				{/* Propane */}
				<Pressable
					style={styles.checkboxRow}
					onPress={() => toggleCheckbox("propane")}
				>
					<Checkbox
						status={userHomeInfo.home.propane === "yes" ? "checked" : "unchecked"}
						onPress={() => toggleCheckbox("propane")}
						color={colors.primary}
					/>
					<Text style={styles.checkboxLabel}>My home uses propane</Text>
				</Pressable>

				{userHomeInfo.home.propane === "yes" && (
					<View style={styles.subSection}>
						<Text style={styles.label}>Propane usage (gallons/year)</Text>
						<TextInput
							mode="outlined"
							placeholder="e.g. 500"
							value={userHomeInfo.home.propaneUsage}
							onChangeText={(text) => handleNumericInput("propaneUsage", text)}
							keyboardType="numeric"
							style={styles.textInput}
							outlineColor={colors.border}
							activeOutlineColor={colors.primary}
							outlineStyle={{ borderRadius: borderRadius.md }}
							right={<TextInput.Affix text="gal" />}
						/>
						<Text style={styles.helperText}>
							Check your propane delivery receipts. Average: ~400-800 gal/year
						</Text>
					</View>
				)}

				<View style={styles.divider} />

				{/* Wood / Pellets */}
				<Pressable
					style={styles.checkboxRow}
					onPress={() => toggleCheckbox("wood")}
				>
					<Checkbox
						status={userHomeInfo.home.wood === "yes" ? "checked" : "unchecked"}
						onPress={() => toggleCheckbox("wood")}
						color={colors.primary}
					/>
					<Text style={styles.checkboxLabel}>My home uses wood or pellet heating</Text>
				</Pressable>

				{userHomeInfo.home.wood === "yes" && (
					<View style={styles.subSection}>
						<Text style={styles.label}>Wood type</Text>
						<View style={styles.chipRow}>
							<Pressable
								style={[
									styles.chip,
									userHomeInfo.home.woodType === "firewood" && styles.chipActive,
								]}
								onPress={() => handleInputChange("woodType", "firewood")}
							>
								<Text
									style={[
										styles.chipText,
										userHomeInfo.home.woodType === "firewood" && styles.chipTextActive,
									]}
								>
									🪵 Firewood
								</Text>
							</Pressable>
							<Pressable
								style={[
									styles.chip,
									userHomeInfo.home.woodType === "pellets" && styles.chipActive,
								]}
								onPress={() => handleInputChange("woodType", "pellets")}
							>
								<Text
									style={[
										styles.chipText,
										userHomeInfo.home.woodType === "pellets" && styles.chipTextActive,
									]}
								>
									🔥 Pellets
								</Text>
							</Pressable>
						</View>

						<Text style={[styles.label, { marginTop: spacing.md }]}>
							{userHomeInfo.home.woodType === "pellets"
								? "Pellet usage (tons/year)"
								: "Firewood usage (cords/year)"}
						</Text>
						<TextInput
							mode="outlined"
							placeholder={userHomeInfo.home.woodType === "pellets" ? "e.g. 3" : "e.g. 4"}
							value={userHomeInfo.home.woodUsage}
							onChangeText={(text) => handleNumericInput("woodUsage", text)}
							keyboardType="numeric"
							style={styles.textInput}
							outlineColor={colors.border}
							activeOutlineColor={colors.primary}
							outlineStyle={{ borderRadius: borderRadius.md }}
							right={<TextInput.Affix text={userHomeInfo.home.woodType === "pellets" ? "tons" : "cords"} />}
						/>
						<Text style={styles.helperText}>
							{userHomeInfo.home.woodType === "pellets"
								? "Average home uses 2-4 tons of pellets per heating season"
								: "Average home uses 3-5 cords per heating season"}
						</Text>
					</View>
				)}

				<View style={styles.divider} />

				{/* Electric Heat */}
				<Pressable
					style={styles.checkboxRow}
					onPress={() => toggleCheckbox("electricHeat")}
				>
					<Checkbox
						status={userHomeInfo.home.electricHeat === "yes" ? "checked" : "unchecked"}
						onPress={() => toggleCheckbox("electricHeat")}
						color={colors.primary}
					/>
					<View style={styles.checkboxContent}>
						<Text style={styles.checkboxLabel}>My home uses electric heating</Text>
						<Text style={styles.checkboxHelper}>Heat pump, baseboard, or space heaters</Text>
					</View>
				</Pressable>

				{userHomeInfo.home.electricHeat === "yes" && (
					<View style={styles.infoBox}>
						<Text style={styles.infoBoxText}>
							Electric heating is already included in your electricity usage above. No additional input needed.
						</Text>
					</View>
				)}
			</View>

			{/* Eco Practices Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>🌱</Text>
					<Text style={styles.cardTitle}>Eco-Friendly Practices</Text>
				</View>

				<Pressable
					style={styles.checkboxRow}
					onPress={() => {
						const newValue = userHomeInfo.home.recycling === "yes" ? "no" : "yes";
						handleInputChange("recycling", newValue);
					}}
				>
					<Checkbox
						status={userHomeInfo.home.recycling === "yes" ? "checked" : "unchecked"}
						onPress={() => {
							const newValue = userHomeInfo.home.recycling === "yes" ? "no" : "yes";
							handleInputChange("recycling", newValue);
						}}
						color={colors.primary}
					/>
					<View style={styles.checkboxContent}>
						<Text style={styles.checkboxLabel}>♻️ I recycle</Text>
						<Text style={styles.checkboxHelper}>Paper, plastic, glass, and metal</Text>
					</View>
				</Pressable>

				<View style={styles.divider} />

				<Pressable
					style={styles.checkboxRow}
					onPress={() => {
						const newValue = userHomeInfo.home.compost === "yes" ? "no" : "yes";
						handleInputChange("compost", newValue);
					}}
				>
					<Checkbox
						status={userHomeInfo.home.compost === "yes" ? "checked" : "unchecked"}
						onPress={() => {
							const newValue = userHomeInfo.home.compost === "yes" ? "no" : "yes";
							handleInputChange("compost", newValue);
						}}
						color={colors.primary}
					/>
					<View style={styles.checkboxContent}>
						<Text style={styles.checkboxLabel}>🌿 I compost</Text>
						<Text style={styles.checkboxHelper}>Food scraps and yard waste</Text>
					</View>
				</Pressable>
			</View>

			{/* Error Message */}
			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}

			{/* Submit Button */}
			<Pressable style={styles.submitButton} onPress={handleSubmit}>
				<Text style={styles.submitButtonText}>{isEditing ? "Update Home" : "Add Home"}</Text>
			</Pressable>

			{/* Solar Bonus Message */}
			{userHomeInfo.home.electricitySource === "solar" && (
				<View style={styles.bonusContainer}>
					<Text style={styles.bonusText}>☀️ Great choice! Solar power significantly reduces emissions</Text>
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
		justifyContent: "center" as const,
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
	textInput: {
		backgroundColor: colors.surface,
		fontSize: typography.fontSizes.lg,
	},
	helperText: {
		fontSize: typography.fontSizes.sm,
		color: colors.textMuted,
		marginTop: spacing.xs,
		fontStyle: "italic",
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
	sourceGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing.sm,
	},
	sourceButton: {
		flex: 1,
		minWidth: "45%",
		paddingVertical: spacing.md,
		borderRadius: borderRadius.md,
		backgroundColor: colors.backgroundDark,
		alignItems: "center",
		borderWidth: 2,
		borderColor: "transparent",
	},
	sourceButtonActive: {
		backgroundColor: colors.primarySoft + "30",
		borderColor: colors.primary,
	},
	sourceIcon: {
		fontSize: 28,
		marginBottom: spacing.xs,
	},
	sourceText: {
		fontSize: typography.fontSizes.sm,
		fontWeight: typography.fontWeights.medium,
		color: colors.textSecondary,
		textAlign: "center",
	},
	sourceTextActive: {
		color: colors.primary,
		fontWeight: typography.fontWeights.semibold,
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
	checkboxContent: {
		marginLeft: spacing.xs,
		flex: 1,
	},
	checkboxHelper: {
		fontSize: typography.fontSizes.sm,
		color: colors.textMuted,
		marginLeft: spacing.xs,
	},
	subSection: {
		marginTop: spacing.md,
		paddingTop: spacing.md,
		paddingLeft: spacing.xl,
	},
	divider: {
		height: 1,
		backgroundColor: colors.divider,
		marginVertical: spacing.md,
	},
	chipRow: {
		flexDirection: "row",
		gap: spacing.sm,
	},
	chip: {
		flex: 1,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderRadius: borderRadius.md,
		backgroundColor: colors.backgroundDark,
		alignItems: "center",
		borderWidth: 2,
		borderColor: "transparent",
	},
	chipActive: {
		backgroundColor: colors.primarySoft + "30",
		borderColor: colors.primary,
	},
	chipText: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.medium,
		color: colors.textSecondary,
	},
	chipTextActive: {
		color: colors.primary,
		fontWeight: typography.fontWeights.semibold,
	},
	infoBox: {
		backgroundColor: colors.primarySoft + "20",
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginTop: spacing.md,
		marginLeft: spacing.xl,
	},
	infoBoxText: {
		fontSize: typography.fontSizes.sm,
		color: colors.textSecondary,
		fontStyle: "italic",
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
		textAlign: "center",
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

export default UserHomeInfoForm;
