import { Dimensions, StyleSheet } from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { height } = Dimensions.get("screen");
const heightLogo = height * 0.28;
const widthScreen = height * 0.45;

const ListStyles = StyleSheet.create({
	container: {
		marginTop: "20%",
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 15,
		marginTop: 10,
	},
	buttonText: {
		alignSelf: "center",
		fontSize: 18,
		fontWeight: "bold",
	},
	infoContainer: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#ddd",
		backgroundColor: "#fff",
		margin: 5,
		padding: 5,
	},
	title: {
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 20,
		fontWeight: "bold",
	},
});

export default ListStyles;
