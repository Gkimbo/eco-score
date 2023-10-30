/* eslint-disable no-console */
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import FetchData from "../../../services/fetchData";
import formStyles from "../../../services/styles/FormStyle";

const SignInForm = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async () => {
		const loginData = {
			userName: userName,
			password: password,
		};

		const response = await FetchData.login(loginData);
		console.log(response);
	};

	return (
		<View>
			<TextInput
				value={userName}
				onChangeText={setUserName}
				placeholder="User Name"
				style={formStyles.input}
			/>
			<TextInput
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
				style={formStyles.input}
			/>
			<TouchableOpacity onPress={onSubmit}>
				<Text style={formStyles.button}>Sign In</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SignInForm;
