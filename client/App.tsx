import React, { useEffect, useReducer, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

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
import RewardsHub from "./components/rewards/RewardsHub";
import EarnStarsPage from "./components/rewards/EarnStarsPage";
import LearnPage from "./components/rewards/LearnPage";
import ShopPage from "./components/rewards/ShopPage";

const Home = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [state, dispatch] = useReducer(reducer, {
		currentUser: { token: null },
		cars: [],
		userInformation: null,
		homes: [],
		rewards: 0,
		treesPlanted: 0,
		achievements: [],
		checkInStreak: 0,
		lastCheckIn: null,
		tipsRead: "[]",
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
			<SafeAreaProvider>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator size="large" />
				</View>
			</SafeAreaProvider>
		);
	}

	return (
		<SafeAreaProvider>
			<NativeRouter>
				<PaperProvider>
					<AuthProvider>
						<View style={{ ...appStyles.container, paddingBottom: 60 }}>
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
											dispatch={dispatch}
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
											dispatch={dispatch}
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
										<RewardsHub
											setIsDrawerOpen={setIsDrawerOpen}
											isDrawerOpen={isDrawerOpen}
											state={state}
											dispatch={dispatch}
										/>
									}
								/>
								<Route
									path="/rewards/earn"
									element={
										<EarnStarsPage
											setIsDrawerOpen={setIsDrawerOpen}
											isDrawerOpen={isDrawerOpen}
											state={state}
											dispatch={dispatch}
										/>
									}
								/>
								<Route
									path="/rewards/learn"
									element={
										<LearnPage
											setIsDrawerOpen={setIsDrawerOpen}
											isDrawerOpen={isDrawerOpen}
											state={state}
											dispatch={dispatch}
										/>
									}
								/>
								<Route
									path="/rewards/shop"
									element={
										<ShopPage
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
						</View>
					</AuthProvider>
				</PaperProvider>
			</NativeRouter>
		</SafeAreaProvider>
	);
};

export default Home;
