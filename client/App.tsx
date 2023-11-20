import React, { useEffect, useReducer, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";

import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/userAuthentication/SignIn";
import SignUp from "./components/userAuthentication/SignUp";
import UserBasicInfoForm from "./components/calculationForms/UserBasicInfoForm";
import UserCarInfoForm from "./components/calculationForms/UserCarInfoForm";
import BottomBar from "./components/navBar/BottomBar";

import appStyles from "./services/styles/AppStyle";
import homePageStyles from "./services/styles/HomePageStyle";

import reducer from "./services/reducerFunction";
import getCurrentUser from "./services/getCurrentUser";
import { AuthProvider } from "./services/AuthContext";

const Home = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [state, dispatch] = useReducer(reducer, {
		carbon: 0,
		greeting: "Your Score!",
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
		}, 2000);
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
				<SafeAreaView style={{ ...appStyles.container, paddingBottom: 60 }}>
					<Routes>
						{state.currentUser ? (
							<>
								<Route
									path="/"
									element={<HomePage state={state} dispatch={dispatch} />}
								/>
								<Route path="/basic-form" element={<UserBasicInfoForm />} />
								<Route path="/car-form" element={<UserCarInfoForm />} />
							</>
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
					{state.currentUser ? (
						<View style={homePageStyles.bottomBarContainer}>
							<BottomBar dispatch={dispatch} />
						</View>
					) : null}
				</SafeAreaView>
			</NativeRouter>
		</AuthProvider>
	);
};

export default Home;
