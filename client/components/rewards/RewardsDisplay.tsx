import React from "react";
import { Star } from "lucide-react-native";
import { View, Text, StyleSheet } from "react-native";

interface RewardsScreenProps {
	userRewards: number;
}

const Rewards: React.FC<RewardsScreenProps> = ({ userRewards }) => {
	return (
		<>
			<Star color="yellow" size={20} />
			<Text style={{ color: "white" }}>{userRewards}</Text>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Rewards;
