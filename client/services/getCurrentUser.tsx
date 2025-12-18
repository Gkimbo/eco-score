import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";

const getCurrentUser = async () => {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) {
			return null;
		}

		const response = await fetch(`${API_URL}/api/v1/user-sessions/current`, {
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			}),
		});

		if (!response.ok) {
			const errorMessage = `${response.status} (${response.statusText})`;
			const error = new Error(errorMessage);
			throw error;
		}

		const userData = await response.json();
		return userData.token;
	} catch (error) {
		// If token doesn't exist or request fails, return null
		return null;
	}
};

export default getCurrentUser;
