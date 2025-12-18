import React, { useState, useEffect, useContext } from "react";
import { Text, Pressable, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigate } from "react-router-native";

import FetchData from "../../../services/fetchData";
import formStyles from "../../../services/styles/FormStyle";
import { AuthContext } from "../../../services/AuthContext";

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
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const validateForm = () => {
		const validationErrors: string[] = [];
		if (userName.length === 0) {
			validationErrors.push("Please type in your User Name");
		}
		if (password.length === 0) {
			validationErrors.push("Please type your password");
		}
		setErrors(validationErrors);
		return validationErrors.length === 0;
	};

	const onSubmit = async () => {
		const isValid = validateForm();

		if (isValid) {
			const loginData = {
				userName: userName,
				password: password,
			};

			const response = await FetchData.login(loginData);

			if (response.error) {
				setErrors([response.error]);
			} else if (response.user && response.token) {
				dispatch({ type: "CURRENT_USER", payload: response.token });
				login(response.token);
				setRedirect(true);
			} else {
				setErrors(["Something went wrong. Please try again."]);
			}
		}
	};

	useEffect(() => {
		if (redirect) {
			navigate("/");
		}
	}, [redirect]);

	return (
		<View style={formStyles.container}>
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
				mode="flat"
				value={userName}
				onChangeText={setUserName}
				placeholder="User Name"
				label="User Name"
				style={formStyles.input}
				autoCapitalize="none"
			/>
			<TextInput
				mode="flat"
				secureTextEntry={!showPassword}
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
				label="Password"
				right={
					<TextInput.Icon
						icon={showPassword ? "eye-off" : "eye"}
						onPress={() => setShowPassword(!showPassword)}
					/>
				}
				style={formStyles.input}
			/>
			<Pressable
				onPress={onSubmit}
				style={({ pressed }) => [
					formStyles.button,
					pressed && formStyles.buttonPressed
				]}
			>
				<Text style={formStyles.buttonText}>Sign In</Text>
			</Pressable>
		</View>
	);
};

export default SignInForm;
