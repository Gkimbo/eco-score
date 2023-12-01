import React, { useState } from "react";
import { Drawer, Modal, Portal, PaperProvider } from "react-native-paper";
import { useNavigate } from "react-router-native";

import SignOutButton from "./SignoutButton";
import HomeButton from "./HomeButton";
import { Pressable, View, StyleSheet, Text } from "react-native";
import CustomDrawerItem from "./CustomDrawerItem";
import AddHomeButton from "./AddHomeButton";
import AddBasicsButton from "./AddBasicInfoButton";
import EditCarButton from "./AddCarButton";

export interface IAppProps {
	dispatch: any;
}

const TopBar: React.FunctionComponent<IAppProps> = ({ dispatch }) => {
	const navigate = useNavigate();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
							padding: 20,
							marginTop: "69%",
						}}
					>
						<AddHomeButton setIsDrawerOpen={setIsDrawerOpen} />
						<AddBasicsButton setIsDrawerOpen={setIsDrawerOpen} />
						<EditCarButton setIsDrawerOpen={setIsDrawerOpen} />
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
		padding: 10,
		backgroundColor: "#3498db",
		position: "relative", // Add position relative to the container
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
