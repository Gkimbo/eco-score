const reducer = (state: any, action: any) => {
	switch (action.type) {
		case "REMOVE_CLASS":
			return {
				...state,
				classes: state.classes.filter((c: string) => c !== action.payload),
			};
		case "ERROR":
			return {
				...state,
				error: action.payload,
			};
		case "CURRENT_USER":
			return {
				...state,
				currentUser: { token: action.payload },
			};
		case "USER_CAR":
			return {
				...state,
				cars: action.payload,
			};
		case "USER_INFO":
			return {
				...state,
				userInformation: action.payload,
			};
		case "USER_HOME":
			return {
				...state,
				homes: action.payload,
			};
		case "DELETE_CAR":
			return {
				...state,
				cars: state.cars.filter((car: any) => car.id !== action.payload),
			};
		case "DELETE_HOME":
			return {
				...state,
				homes: state.homes.filter((home: any) => home.id !== action.payload),
			};
		case "ADD_STARS":
			return {
				...state,
				rewards: state.rewards + action.payload,
			};
		case "DEDUCT_STARS":
			return {
				...state,
				rewards: state.rewards - action.payload,
			};
		case "PLANT_TREES":
			return {
				...state,
				treesPlanted: state.treesPlanted + action.payload,
			};
		case "PLANT_TREES_HOME":
			return {
				...state,
				treesPlanted: action.payload,
			};
		case "STARS_HOME":
			return {
				...state,
				rewards: action.payload,
			};
		default:
			throw new Error();
	}
};

export default reducer;
