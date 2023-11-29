const reducer = (state: any, action: any) => {
	switch (action.type) {
		case "CARBON":
			return {
				...state,
				carbon: state.carbon + action.payload,
			};
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
		default:
			throw new Error();
	}
};

export default reducer;
