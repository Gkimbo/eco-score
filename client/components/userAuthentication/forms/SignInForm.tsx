/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";

import FetchData from "../../../services/fetchData";
import formStyles from "../../../services/styles/FormStyle";

export interface IAppProps {
	state: any;
	dispatch: any;
}

const SignInForm: React.FunctionComponent<IAppProps> = ({
	state,
	dispatch,
}) => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const navigate = useNavigate();

	const validateForm = () => {
		const validationErrors: string[] = [];
		if (userName.length === 0) {
			validationErrors.push("Please type in your User Name");
		}
		if (password.length === 0) {
			validationErrors.push("Please type your password");
		}
		setErrors(validationErrors);
	};

	const onSubmit = async () => {
		validateForm();
		if (errors.length === 0) {
			const loginData = {
				userName: userName,
				password: password,
			};

			const response = await FetchData.login(loginData);
			if (response === "That User Name does not exist, please sign up.") {
				setErrors([response]);
			}
			if (response === "Invalid password") {
				setErrors([response]);
			}
			if (response.user) {
				console.log(response);
				dispatch({ type: "CURRENT_USER", payload: response.user });
				setRedirect(true);
			}
			console.log(response);
		}
	};

	useEffect(() => {
		if (redirect) {
			navigate("/");
		}
	}, [redirect]);

	return (
		<View>
			{errors.length > 0 && (
				<View style={formStyles.errorContainer}>
					{errors.map((error, index) => (
						<Text key={index} style={formStyles.errorText}>
							{error}
						</Text>
					))}
				</View>
			)}
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
