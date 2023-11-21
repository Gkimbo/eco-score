import React from "react";

import SignOutButton from "./SignoutButton";
import AddBasicsButton from "./AddBasicInfoButton";
import HomeButton from "./HomeButton";
import EditCarButton from "./EditCarButton";
import EditHomeButton from "./EditHomeButton";

export interface IAppProps {
	dispatch: any;
}

const TopBar: React.FunctionComponent<IAppProps> = ({ dispatch }) => {
	return (
		<>
			<HomeButton />
			<AddBasicsButton />
			<EditCarButton />
			<EditHomeButton />
			<SignOutButton dispatch={dispatch} />
		</>
	);
};

export default TopBar;
