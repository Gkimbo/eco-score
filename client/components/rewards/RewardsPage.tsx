import React, { useState, useEffect } from "react";
import { Star } from "lucide-react-native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import FetchData from "../../services/fetchData";

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
		const addRewards = FetchData.addReward({
			user: state.currentUser,
			rewards: 10,
		}).then((response) => {
			dispatch({ type: "ADD_STARS", payload: 10 });
			setError(null);
		});
	};

	const handleDonateStars = () => {
		if (state.rewards >= 1000) {
			const treesPlanted = FetchData.addTrees({
				user: state.currentUser,
			}).then((response) => {
				if (response.message) {
					setError(
						"Please update your basic user info before getting rewards or donating"
					);
				} else {
					setError(null);
					dispatch({ type: "DEDUCT_STARS", payload: 1000 });
					dispatch({ type: "PLANT_TREES", payload: 1 });
				}
			});
		} else {
			setError("You need 1000 stars to plant a tree!");
		}
	};

	return (
		<View
			style={{
				...styles.container,
				backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "transparent",
			}}
		>
			<Text style={styles.title}>Your Rewards!</Text>
			<Star color="yellow" size={40} />
			<Text style={styles.rewardsText}>{state.rewards}</Text>

			<Pressable onPress={handleWatchAd} style={styles.button}>
				<Text style={styles.buttonText}>Watch Ad (+10 Stars)</Text>
			</Pressable>

			<Pressable onPress={handleDonateStars} style={styles.button}>
				<Text style={styles.buttonText}>Donate Stars to plant a tree!</Text>
			</Pressable>

			{error && <Text style={styles.warningText}>{error}</Text>}
			<View
				style={{
					...styles.textContainer,
					backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.5)" : "#fff",
				}}
			>
				<Text style={styles.infoText}>
					You've planted {state.treesPlanted} trees!
				</Text>
				<Text style={styles.infoText}>
					which absorbs{" "}
					<Text style={{ fontSize: 15, fontWeight: "bold" }}>
						{state.treesPlanted * 48}
					</Text>{" "}
					pounds of CO2 per year!
				</Text>
			</View>
			<Text
				style={{
					fontSize: 14,
					color: "white",
					marginTop: 30,
					marginBottom: 20,
					marginRight: 15,
					marginLeft: 15,
					textAlign: "center",
				}}
			>
				On average, a mature tree can absorb about{" "}
				<Text style={{ color: "orange" }}>{48}</Text> pounds of CO2 per year!
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "5%",
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
		marginVertical: 5,
		fontSize: 14,
		textAlign: "center",
	},
	textContainer: {
		backgroundColor: "#fff",
		borderRadius: 8,
		marginTop: 15,
		marginRight: 15,
		marginLeft: 15,
		paddingRight: 10,
		paddingLeft: 10,
	},
});

export default RewardsPage;
