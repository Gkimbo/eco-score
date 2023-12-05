import React, { useState } from "react";
import { Star } from "lucide-react-native";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface RewardsScreenProps {
	isDrawerOpen: boolean;
	state: any;
	dispatch: any;
}

const RewardsPage: React.FC<RewardsScreenProps> = ({
	isDrawerOpen,
	state,
	dispatch,
}) => {
	const [error, setError] = useState<string | null>(null);
	const handleWatchAd = () => {
		dispatch({ type: "ADD_STARS", payload: 10 });
	};

	const handleDonateStars = () => {
		if (state.rewards >= 1000) {
			dispatch({ type: "DEDUCT_STARS", payload: 1000 });
			dispatch({ type: "PLANT_TREES", payload: 1 });

			alert("Thank you for donating stars! You planted a tree.");
		} else {
			setError("You need 1000 stars to donate!");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Your Rewards!</Text>
			<Star color="yellow" size={40} />
			<Text style={styles.rewardsText}>{state.rewards}</Text>

			<Pressable onPress={handleWatchAd} style={styles.button}>
				<Text style={styles.buttonText}>Watch Ad (+10 Stars)</Text>
			</Pressable>

			<Pressable onPress={handleDonateStars} style={styles.button}>
				<Text style={styles.buttonText}>Donate 1000 Stars</Text>
			</Pressable>

			{error && <Text style={styles.warningText}>{error}</Text>}

			<Text style={styles.infoText}>
				You've planted {state.treesPlanted} trees!
			</Text>

			<Text style={styles.infoText}>
				On average, a mature tree can absorb about 48 pounds of CO2 per year!
			</Text>

			<Text style={styles.infoText}>
				You've helped absorb {state.treesPlanted * 48} pounds of CO2 per year!
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "10%",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	rewardsText: {
		fontSize: 36,
		fontWeight: "bold",
		marginVertical: 10,
	},
	button: {
		marginTop: 20,
		padding: 12,
		backgroundColor: "#3498db",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	warningText: {
		marginTop: 10,
		color: "red",
		fontSize: 14,
		fontWeight: "bold",
	},
	infoText: {
		marginVertical: 10,
		fontSize: 14,
		textAlign: "center",
	},
});

export default RewardsPage;
