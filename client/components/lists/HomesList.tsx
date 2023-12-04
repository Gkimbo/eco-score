import { ScrollView, Text, Pressable, View } from "react-native";
import DeleteData from "../../services/DeleteData";
import HomeTile from "./tiles/HomeTile";
import ListStyles from "../../services/styles/ListStyles";

export interface IAppProps {
	state: any;
	dispatch: any;
	isDrawerOpen: boolean;
}

const HomeList: React.FunctionComponent<IAppProps> = ({
	state,
	dispatch,
	isDrawerOpen,
}) => {
	const onDeleteHome = async (id: number) => {
		try {
			const deleteHome = await DeleteData.deleteHome(id);
			if (deleteHome) {
				dispatch({ type: "DELETE_HOME", payload: id });
			}
		} catch (error) {
			console.error("Error deleting car:", error);
		}
	};

	return (
		<View style={ListStyles.container}>
			<HomeTile
				state={state}
				onDeleteHome={onDeleteHome}
				isBlurred={isDrawerOpen}
			/>
		</View>
	);
};

export default HomeList;
