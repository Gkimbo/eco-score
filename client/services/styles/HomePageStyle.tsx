import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const colors = ["red", "orange", "grey", "green"];

const homePageStyles = StyleSheet.create({
	container: {
		// flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 30,
	},
	leftContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 20,
	},
	rightContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 20,
	},
	leftAndCenterContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	centerAndRightContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconWithNumber: {
		alignItems: "center",
		marginBottom: 10,
		borderRadius: 10,
		backgroundColor: "lightgreen",
		width: 40,
	},
	centerContainer: {
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
	topBarContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "lightgray",
		marginRight: 1,
		marginLeft: 1,
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
