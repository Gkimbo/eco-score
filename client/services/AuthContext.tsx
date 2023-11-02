import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
	token: string;
}

interface AuthContextProps {
	user: User | null;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	login: () => {},
	logout: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		// Check if a token exists in AsyncStorage when the app starts
		checkToken();
	}, []);

	const checkToken = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (token) {
				// Token exists, validate it on the server-side
				// You need to implement the server-side validation logic here
				// If the token is valid, set the user as logged in
				setUser({ token });
			}
		} catch (error) {
			console.log("Error checking token:", error);
		}
	};

	const login = async (token: string) => {
		try {
			// Save the token to AsyncStorage
			await AsyncStorage.setItem("token", token);
			// Set the user as logged in
			setUser({ token });
		} catch (error) {
			console.log("Error saving token:", error);
		}
	};

	const logout = async () => {
		try {
			// Remove the token from AsyncStorage
			await AsyncStorage.removeItem("token");
			// Set the user as logged out
			setUser(null);
		} catch (error) {
			console.log("Error removing token:", error);
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
