import { View, StyleSheet } from "react-native";
import React from "react";

import SignOutButton from "./SignoutButton";
import AddBasicsButton from "./AddBasicInfoButton";
import HomeButton from "./HomeButton";

export interface IAppProps {
	dispatch: any;
}

const BottomBar: React.FunctionComponent<IAppProps> = ({ dispatch }) => {
	return (
		<>
			<HomeButton />
			<AddBasicsButton />
			<SignOutButton dispatch={dispatch} />
		</>
	);
};

export default BottomBar;
