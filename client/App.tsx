import { useEffect, useMemo, useReducer, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";

import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/userAuthentication/SignIn";
import SignUp from "./components/userAuthentication/SignUp";
import reducer from "./services/reducerFunction";
import appStyles from "./services/styles/AppStyle";
import getCurrentUser from "./services/getCurrentUser";

const Home = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [currentUser, setCurrentUser] = useState<any>(undefined);
	const [state, dispatch] = useReducer(reducer, {
		carbon: 0,
		greeting: "Your carbon footprint",
	});
	console.log(currentUser);

	const fetchCurrentUser = async () => {
		try {
			const user = await getCurrentUser();
			setCurrentUser(user);
		} catch (err) {
			setCurrentUser(null);
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
		<NativeRouter>
			<SafeAreaView style={appStyles.container}>
				<Routes>
					{currentUser ? (
						<Route
							path="/"
							element={
								<HomePage
									state={state}
									dispatch={dispatch}
									user={currentUser}
								/>
							}
						/>
					) : (
						<>
							<Route
								path="/"
								element={<LandingPage state={state} dispatch={dispatch} />}
							/>
							<Route path="/sign-in" element={<SignIn />} />
							<Route path="/sign-up" element={<SignUp />} />
						</>
					)}
				</Routes>
			</SafeAreaView>
		</NativeRouter>
	);
};

export default Home;
