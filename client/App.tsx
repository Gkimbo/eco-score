import React, { useEffect, useReducer, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";

import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/userAuthentication/SignIn";
import SignUp from "./components/userAuthentication/SignUp";
import reducer from "./services/reducerFunction";
import appStyles from "./services/styles/AppStyle";
import getCurrentUser from "./services/getCurrentUser";
import { AuthProvider } from "./services/AuthContext";

const Home = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [state, dispatch] = useReducer(reducer, {
		carbon: 0,
		greeting: "Your carbon footprint",
		currentUser: null,
	});

	const fetchCurrentUser = async () => {
		try {
			const token = await getCurrentUser();
			dispatch({ type: "CURRENT_USER", payload: { token } });
		} catch (err) {
			dispatch({ type: "CURRENT_USER", payload: null });
		}
	};

	useEffect(() => {
		fetchCurrentUser();
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<AuthProvider>
			<NativeRouter>
				<SafeAreaView style={appStyles.container}>
					<Routes>
						{state.currentUser ? (
							<Route
								path="/"
								element={<HomePage state={state} dispatch={dispatch} />}
							/>
						) : (
							<Route
								path="/"
								element={<LandingPage state={state} dispatch={dispatch} />}
							/>
						)}
						<Route
							path="/sign-in"
							element={<SignIn state={state} dispatch={dispatch} />}
						/>
						<Route
							path="/sign-up"
							element={<SignUp state={state} dispatch={dispatch} />}
						/>
					</Routes>
				</SafeAreaView>
			</NativeRouter>
		</AuthProvider>
	);
};

export default Home;
