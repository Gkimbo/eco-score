import { View, StyleSheet } from "react-native";
import React from "react";

import SignOutButton from "./SignoutButton";
import AddBasicsButton from "./AddBasicInfoButton";
import HomeButton from "./HomeButton";
import EditCarButton from "./EditCarButton";

export interface IAppProps {
	dispatch: any;
}

const BottomBar: React.FunctionComponent<IAppProps> = ({ dispatch }) => {
	return (
		<>
			<HomeButton />
			<AddBasicsButton />
			<EditCarButton />
			<SignOutButton dispatch={dispatch} />
		</>
	);
};

export default BottomBar;
