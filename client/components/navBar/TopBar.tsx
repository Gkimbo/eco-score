import React, { useState } from "react";
import { Drawer, Modal, Portal, PaperProvider } from "react-native-paper";
import { useNavigate } from "react-router-native";
import SignOutButton from "./SignoutButton";
import HomeButton from "./HomeButton";
import { Pressable, View, StyleSheet, Text } from "react-native";
import AddHomeButton from "./AddHomeButton";
import AddBasicsButton from "./AddBasicInfoButton";
import EditCarButton from "./AddCarButton";
import RewardsButton from "./RewardsButton";

export interface IAppProps {
	dispatch: any;
	isDrawerOpen: boolean;
	setIsDrawerOpen: any;
}

const TopBar: React.FunctionComponent<IAppProps> = ({
	dispatch,
	isDrawerOpen,
	setIsDrawerOpen,
}) => {
	const navigate = useNavigate();
	const hideModal = () => setIsDrawerOpen(false);

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<PaperProvider>
			<View style={styles.container}>
				<HomeButton />
				<Pressable onPress={toggleDrawer} style={styles.drawerButton}>
					<Text style={styles.drawerButtonText}>+</Text>
				</Pressable>
				<Portal>
					<Modal
						visible={isDrawerOpen}
						onDismiss={hideModal}
						contentContainerStyle={{
							backgroundColor: "white",
							padding: 5,
							marginTop: "80%",
							alignItems: "center",
						}}
					>
						<AddHomeButton setIsDrawerOpen={setIsDrawerOpen} />
						<AddBasicsButton setIsDrawerOpen={setIsDrawerOpen} />
						<EditCarButton setIsDrawerOpen={setIsDrawerOpen} />
						<RewardsButton setIsDrawerOpen={setIsDrawerOpen} />
					</Modal>
				</Portal>
				<SignOutButton dispatch={dispatch} />
			</View>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 5,
		backgroundColor: "#3498db",
		position: "relative",
	},
	drawerButton: {
		position: "absolute",
		right: "50%",
		transform: [{ translateX: 35 }],
		padding: 10,
		height: 70,
		width: 70,
		marginTop: 25,
		borderRadius: 50,
		backgroundColor: "green",
		justifyContent: "center",
		alignItems: "center",
	},
	drawerButtonText: {
		fontWeight: "bold",
		fontSize: 30,
		color: "white",
	},
});

export default TopBar;
