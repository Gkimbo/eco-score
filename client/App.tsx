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
import CarList from "./components/lists/CarsList";
import HomeList from "./components/lists/HomesList";
import RewardsPage from "./components/rewards/RewardsPage";

const Home = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [lastLoginTimestamp, setLastLoginTimestamp] = useState<string>("0");
	const [rewardsWindow, setRewardsWindow] = useState<boolean>(false);
	const [state, dispatch] = useReducer(reducer, {
		currentUser: { token: null },
		cars: [],
		userInformation: null,
		homes: [],
		rewards: 0,
		treesPlanted: 0,
	});

	const fetchCurrentUser = async () => {
		try {
			const user = await getCurrentUser();
			dispatch({ type: "CURRENT_USER", payload: user.token });
			setLastLoginTimestamp(user.user.lastLogin);
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
						{state.currentUser.token ? (
							<>
								<Route
									path="/"
									element={
										<HomePage
											state={state}
											dispatch={dispatch}
											isDrawerOpen={isDrawerOpen}
											lastLoginTimestamp={lastLoginTimestamp}
											setLastLoginTimestamp={setLastLoginTimestamp}
											rewardsWindow={rewardsWindow}
											setRewardsWindow={setRewardsWindow}
										/>
									}
								/>
								<Route
									path="/basic-form"
									element={
										<UserBasicInfoForm
											isDrawerOpen={isDrawerOpen}
											state={state}
										/>
									}
								/>
								<Route
									path="/car-form"
									element={
										<UserCarInfoForm
											setIsDrawerOpen={setIsDrawerOpen}
											isDrawerOpen={isDrawerOpen}
											state={state}
										/>
									}
								/>
								<Route
									path="/home-form"
									element={
										<UserHomeInfoForm
											setIsDrawerOpen={setIsDrawerOpen}
											isDrawerOpen={isDrawerOpen}
											state={state}
										/>
									}
								/>
								<Route
									path="/cars"
									element={
										<CarList
											isDrawerOpen={isDrawerOpen}
											state={state}
											dispatch={dispatch}
										/>
									}
								/>
								<Route
									path="/homes"
									element={
										<HomeList
											isDrawerOpen={isDrawerOpen}
											state={state}
											dispatch={dispatch}
										/>
									}
								/>

								<Route
									path="/rewards"
									element={
										<RewardsPage
											setIsDrawerOpen={setIsDrawerOpen}
											isDrawerOpen={isDrawerOpen}
											state={state}
											dispatch={dispatch}
										/>
									}
								/>
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
							<TopBar
								dispatch={dispatch}
								isDrawerOpen={isDrawerOpen}
								setIsDrawerOpen={setIsDrawerOpen}
							/>
						</View>
					) : null}
				</SafeAreaView>
			</NativeRouter>
		</AuthProvider>
	);
};

export default Home;
