import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import { AuthContext } from "../../services/AuthContext";
import FetchData from "../../services/fetchData";
import { useNavigate } from "react-router-native";
import DeleteData from "../../services/DeleteData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing, borderRadius, typography, shadows } from "../../services/styles/theme";

const MILES_DRIVEN_OPTIONS = [
	{ label: "< 5k", fullLabel: "Less than 5,000", value: "5000" },
	{ label: "5-10k", fullLabel: "5,000 - 10,000", value: "7500" },
	{ label: "10-15k", fullLabel: "10,000 - 15,000", value: "12500" },
	{ label: "15-20k", fullLabel: "15,000 - 20,000", value: "17500" },
	{ label: "20-30k", fullLabel: "20,000 - 30,000", value: "25000" },
	{ label: "30k+", fullLabel: "More than 30,000", value: "35000" },
];

const TRANSPORTATION_OPTIONS = [
	{ label: "Car", value: "drive own car", icon: "🚗" },
	{ label: "Train", value: "train", icon: "🚆" },
	{ label: "Bus", value: "bus", icon: "🚌" },
	{ label: "Walk", value: "walk", icon: "🚶" },
	{ label: "Bike", value: "bicycle", icon: "🚲" },
	{ label: "Scooter", value: "electric scooter", icon: "🛴" },
	{ label: "Rideshare", value: "ride share", icon: "🚕" },
];

export interface IAppProps {
	isDrawerOpen: any;
	state: any;
}

type UserBasicInfo = {
	user: any;
	zipcode: string;
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
	const insets = useSafeAreaInsets();
	const [redirect, setRedirect] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [userBasicInfo, setUserBasicInfo] = useState<UserBasicInfo>({
		user: user,
		zipcode: "",
		homeOwnership: "rent",
		milesDriven: "",
		milesDrivenUnit: "yearly",
		commute: "no",
		transportation: "drive own car",
		daysCommute: "",
		hasCar: "no",
	});
	const navigate = useNavigate();

	const handleLocationChange = (text: string) => {
		const numericText = text.replace(/[^0-9]/g, '');
		setUserBasicInfo((prevState) => ({ ...prevState, zipcode: numericText }));
		if (numericText.length === 5) {
			setError(null);
		}
	};

	const handleHomeOwnershipChange = (value: "rent" | "own") => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			homeOwnership: value,
		}));
	};

	const handleMilesDrivenChange = (value: string) => {
		setUserBasicInfo((prevState) => ({ ...prevState, milesDriven: value }));
	};

	const handleCommuteChange = (value: string) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			commute: value,
		}));
	};

	const handleHasCarChange = (value: string) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			hasCar: value,
		}));
	};

	const handleTransportationChange = (value: any) => {
		setUserBasicInfo((prevState) => ({
			...prevState,
			transportation: value,
		}));
	};

	const handleDaysCommuteChange = (value: string) => {
		setUserBasicInfo((prevState) => ({ ...prevState, daysCommute: value }));
	};

	const handleSubmit = () => {
		if (!userBasicInfo.zipcode || userBasicInfo.zipcode.length !== 5) {
			setError("Please enter a valid 5-digit zipcode");
			return;
		}
		if (userBasicInfo.hasCar === "yes" && !userBasicInfo.milesDriven) {
			setError("Please select how many miles you drive");
			return;
		}
		if (userBasicInfo.commute === "yes" && !userBasicInfo.daysCommute) {
			setError("Please select how many days you commute");
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
		<ScrollView
			style={styles.scrollView}
			contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Tell Us About You</Text>
				<Text style={styles.headerSubtitle}>
					Help us calculate your carbon footprint
				</Text>
			</View>

			{/* Location Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>📍</Text>
					<Text style={styles.cardTitle}>Location</Text>
				</View>
				<Text style={styles.label}>What's your zipcode?</Text>
				<TextInput
					mode="outlined"
					placeholder="12345"
					value={userBasicInfo.zipcode}
					onChangeText={handleLocationChange}
					keyboardType="numeric"
					maxLength={5}
					style={styles.textInput}
					outlineColor={colors.border}
					activeOutlineColor={colors.primary}
					outlineStyle={{ borderRadius: borderRadius.md }}
				/>
			</View>

			{/* Housing Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>🏠</Text>
					<Text style={styles.cardTitle}>Housing</Text>
				</View>
				<Text style={styles.label}>Do you rent or own?</Text>
				<View style={styles.segmentedControl}>
					<Pressable
						style={[
							styles.segmentButton,
							userBasicInfo.homeOwnership === "rent" && styles.segmentButtonActive,
						]}
						onPress={() => handleHomeOwnershipChange("rent")}
					>
						<Text style={styles.segmentIcon}>🔑</Text>
						<Text
							style={[
								styles.segmentText,
								userBasicInfo.homeOwnership === "rent" && styles.segmentTextActive,
							]}
						>
							Rent
						</Text>
					</Pressable>
					<Pressable
						style={[
							styles.segmentButton,
							userBasicInfo.homeOwnership === "own" && styles.segmentButtonActive,
						]}
						onPress={() => handleHomeOwnershipChange("own")}
					>
						<Text style={styles.segmentIcon}>🏡</Text>
						<Text
							style={[
								styles.segmentText,
								userBasicInfo.homeOwnership === "own" && styles.segmentTextActive,
							]}
						>
							Own
						</Text>
					</Pressable>
				</View>
			</View>

			{/* Transportation Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>🚗</Text>
					<Text style={styles.cardTitle}>Transportation</Text>
				</View>

				<Pressable
					style={styles.checkboxRow}
					onPress={() => handleHasCarChange(userBasicInfo.hasCar === "yes" ? "no" : "yes")}
				>
					<Checkbox
						status={userBasicInfo.hasCar === "yes" ? "checked" : "unchecked"}
						onPress={() => handleHasCarChange(userBasicInfo.hasCar === "yes" ? "no" : "yes")}
						color={colors.primary}
					/>
					<Text style={styles.checkboxLabel}>I have a car</Text>
				</Pressable>

				{userBasicInfo.hasCar === "yes" && (
					<View style={styles.subSection}>
						<Text style={styles.label}>Miles driven per year</Text>
						<View style={styles.chipGrid}>
							{MILES_DRIVEN_OPTIONS.map((option) => (
								<Pressable
									key={option.value}
									style={[
										styles.chip,
										userBasicInfo.milesDriven === option.value && styles.chipActive,
									]}
									onPress={() => handleMilesDrivenChange(option.value)}
								>
									<Text
										style={[
											styles.chipText,
											userBasicInfo.milesDriven === option.value && styles.chipTextActive,
										]}
									>
										{option.label}
									</Text>
								</Pressable>
							))}
						</View>
					</View>
				)}
			</View>

			{/* Commute Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardIcon}>💼</Text>
					<Text style={styles.cardTitle}>Work Commute</Text>
				</View>

				<Pressable
					style={styles.checkboxRow}
					onPress={() => handleCommuteChange(userBasicInfo.commute === "yes" ? "no" : "yes")}
				>
					<Checkbox
						status={userBasicInfo.commute === "yes" ? "checked" : "unchecked"}
						onPress={() => handleCommuteChange(userBasicInfo.commute === "yes" ? "no" : "yes")}
						color={colors.primary}
					/>
					<Text style={styles.checkboxLabel}>I commute to work</Text>
				</Pressable>

				{userBasicInfo.commute === "yes" && (
					<View style={styles.subSection}>
						<Text style={styles.label}>Days per week</Text>
						<View style={styles.daysRow}>
							{[1, 2, 3, 4, 5, 6, 7].map((day) => (
								<Pressable
									key={day}
									style={[
										styles.dayButton,
										userBasicInfo.daysCommute === String(day) && styles.dayButtonActive,
									]}
									onPress={() => handleDaysCommuteChange(String(day))}
								>
									<Text
										style={[
											styles.dayText,
											userBasicInfo.daysCommute === String(day) && styles.dayTextActive,
										]}
									>
										{day}
									</Text>
								</Pressable>
							))}
						</View>

						<Text style={[styles.label, { marginTop: spacing.md }]}>How do you get there?</Text>
						<View style={styles.transportGrid}>
							{TRANSPORTATION_OPTIONS.map((option) => (
								<Pressable
									key={option.value}
									style={[
										styles.transportButton,
										userBasicInfo.transportation === option.value && styles.transportButtonActive,
									]}
									onPress={() => handleTransportationChange(option.value)}
								>
									<Text style={styles.transportIcon}>{option.icon}</Text>
									<Text
										style={[
											styles.transportText,
											userBasicInfo.transportation === option.value && styles.transportTextActive,
										]}
									>
										{option.label}
									</Text>
								</Pressable>
							))}
						</View>
					</View>
				)}
			</View>

			{/* Error Message */}
			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}

			{/* Submit Button */}
			<Pressable style={styles.submitButton} onPress={handleSubmit}>
				<Text style={styles.submitButtonText}>Save Information</Text>
			</Pressable>

			<View style={{ height: insets.bottom + 40 }} />
		</ScrollView>
	);
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
	segmentedControl: {
		flexDirection: "row",
		gap: spacing.sm,
	},
	segmentButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderRadius: borderRadius.md,
		backgroundColor: colors.backgroundDark,
		borderWidth: 2,
		borderColor: "transparent",
	},
	segmentButtonActive: {
		backgroundColor: colors.primarySoft + "30",
		borderColor: colors.primary,
	},
	segmentIcon: {
		fontSize: 20,
		marginRight: spacing.sm,
	},
	segmentText: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.medium,
		color: colors.textSecondary,
	},
	segmentTextActive: {
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
	subSection: {
		marginTop: spacing.md,
		paddingTop: spacing.md,
		borderTopWidth: 1,
		borderTopColor: colors.divider,
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
	daysRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	dayButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.backgroundDark,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.border,
	},
	dayButtonActive: {
		backgroundColor: colors.primary,
		borderColor: colors.primary,
	},
	dayText: {
		fontSize: typography.fontSizes.lg,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textSecondary,
	},
	dayTextActive: {
		color: colors.textOnPrimary,
	},
	transportGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing.sm,
	},
	transportButton: {
		width: "30%",
		paddingVertical: spacing.md,
		borderRadius: borderRadius.md,
		backgroundColor: colors.backgroundDark,
		alignItems: "center",
		borderWidth: 2,
		borderColor: "transparent",
	},
	transportButtonActive: {
		backgroundColor: colors.primarySoft + "30",
		borderColor: colors.primary,
	},
	transportIcon: {
		fontSize: 24,
		marginBottom: spacing.xs,
	},
	transportText: {
		fontSize: typography.fontSizes.sm,
		fontWeight: typography.fontWeights.medium,
		color: colors.textSecondary,
	},
	transportTextActive: {
		color: colors.primary,
		fontWeight: typography.fontWeights.semibold,
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
});

export default UserBasicInfoForm;
