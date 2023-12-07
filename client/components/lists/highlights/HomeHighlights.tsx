import { ScrollView, Text, Pressable, View } from "react-native";
import ListStyles from "../../../services/styles/ListStyles";
import { Home } from "../../../services/types/carAndHomeType";

export interface IAppProps {
	home: Home;
	isBlurred: boolean;
}

const HomeHighlights: React.FunctionComponent<IAppProps> = ({
	home,
	isBlurred,
}) => {
	return (
		<View
			style={{
				flexDirection: "row",
				flexWrap: "wrap",
				justifyContent: "center",
				borderWidth: 1,
				borderRadius: 10,
				borderColor: "#ddd",
				backgroundColor: isBlurred ? "rgba(0, 0, 0, 0.5)" : "#fff",
				margin: 10,
				padding: 10,
				height: "auto",
				alignItems: "stretch",
				paddingRight: 30,
				paddingLeft: 30,
			}}
		>
			<View style={{ flexDirection: "column", justifyContent: "center" }}>
				<Text
					style={{
						fontSize: 16,
						color: "#333",
						textAlign: "center",
					}}
				>
					{home.zipcode}
				</Text>
				<Text
					style={{
						fontSize: 10,
						color: "#333",
						textAlign: "center",
					}}
				>
					{home.yearBuilt}
				</Text>
			</View>
			<View style={ListStyles.infoContainer}>
				<Text> Total CO2 produced per Year: </Text>
				<Text>
					(
					<Text
						style={{
							fontSize: 15,
							color: "brown",
							fontWeight: "bold",
						}}
					>
						{(Number(home.totalAnnualCarbon) / 2000).toFixed(2)}
					</Text>{" "}
					tons of CO2 )
				</Text>
			</View>
		</View>
	);
};

export default HomeHighlights;
