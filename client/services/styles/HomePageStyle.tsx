import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

const homePageStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		fontSize: 24,
		marginBottom: 20,
	},
	circleContainer: {
		width: 200,
		height: 200,
		borderRadius: 100,
		backgroundColor: "lightgray",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	circle: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		borderRadius: 100,
		backgroundColor: "green",
	},

	carbonText: {
		fontSize: 48,
		color: "white",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		textAlign: "center",
	},
	bottomBarContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		borderRadius: 30,
		backgroundColor: "lightgray",
		marginRight: 15,
		marginLeft: 15,
		marginBottom: 15,
	},
	logoutButton: {
		backgroundColor: "red",
		padding: 10,
		borderRadius: 5,
	},
	logoutButtonText: {
		color: "white",
		fontSize: 16,
	},
});

export default homePageStyles;
