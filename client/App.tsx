import React, { useEffect, useReducer, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";

import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/userAuthentication/SignIn";
import SignUp from "./components/userAuthentication/SignUp";
import UserBasicInfoForm from "./components/calculationForms/UserBasicInfoForm";
import UserCarInfoForm from "./components/calculationForms/UserCarInfoForm";
import UserHomeInfoForm from "./components/calculationForms/UserHomeInfoForm";
import TopBar from "./components/navBar/TopBar";

import appStyles from "./services/styles/AppStyle";
import homePageStyles from "./services/styles/HomePageStyle";

import reducer from "./services/reducerFunction";
import getCurrentUser from "./services/getCurrentUser";
import { AuthProvider } from "./services/AuthContext";

const Home = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [state, dispatch] = useReducer(reducer, {
		carbon: 0,
		currentUser: { token: null },
		cars: [],
		userInformation: null,
		homes: [],
	});

	const fetchCurrentUser = async () => {
		try {
			const token = await getCurrentUser();
			dispatch({ type: "CURRENT_USER", payload: token });
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
				<SafeAreaView
					onLayout={(event) => {
						const { height } = event.nativeEvent.layout;
						console.log("SafeAreaView Height:", height);
					}}
					style={{ ...appStyles.container, paddingBottom: 60 }}
				>
					<Routes>
						{state.currentUser.token ? (
							<>
								<Route
									path="/"
									element={<HomePage state={state} dispatch={dispatch} />}
								/>
								<Route path="/basic-form" element={<UserBasicInfoForm />} />
								<Route path="/car-form" element={<UserCarInfoForm />} />
								<Route path="/home-form" element={<UserHomeInfoForm />} />
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
					{state.currentUser.token ? (
						<View style={homePageStyles.topBarContainer}>
							<TopBar dispatch={dispatch} />
						</View>
					) : null}
				</SafeAreaView>
			</NativeRouter>
		</AuthProvider>
	);
};

export default Home;
