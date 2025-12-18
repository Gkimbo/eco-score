import React, { useState, useEffect, useContext } from "react";
import { Text, Pressable, View } from "react-native";
import { useNavigate } from "react-router-native";
import { TextInput } from "react-native-paper";

import FetchData from "../../../services/fetchData";
import formStyles from "../../../services/styles/FormStyle";
import { AuthContext } from "../../../services/AuthContext";

interface IFormInput {
	userName: string;
	password: string;
	email: string;
}

export interface IAppProps {
	state: any;
	dispatch: any;
}

const SignUpForm: React.FunctionComponent<IAppProps> = ({
	state,
	dispatch,
}) => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const validate = () => {
		const validationErrors: string[] = [];

		if (userName.length < 4 || userName.length > 12) {
			validationErrors.push("Username must be between 4 and 12 characters.");
		}

		const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
		const lowercaseCount = (password.match(/[a-z]/g) || []).length;
		const specialCharCount = (
			password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []
		).length;

		if (
			password.length < 8 ||
			uppercaseCount < 2 ||
			lowercaseCount < 2 ||
			specialCharCount < 2
		) {
			validationErrors.push(
				"Password must be at least 8 characters long with 2 uppercase letters, 2 lowercase letters, and 2 special characters."
			);
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			validationErrors.push("Please enter a valid email address.");
		}

		setErrors(validationErrors);
		return validationErrors.length === 0;
	};

	const onSubmit = async () => {
		if (!validate()) {
			return;
		}

		const data: IFormInput = {
			userName,
			password,
			email,
		};

		const response = await FetchData.makeNewUser(data);

		if (response.error) {
			setErrors([response.error]);
		} else if (response.user && response.token) {
			dispatch({ type: "CURRENT_USER", payload: response.token });
			login(response.token);
			setRedirect(true);
		} else {
			setErrors(["Something went wrong. Please try again."]);
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
				placeholder="User Name"
				label="User Name"
				style={formStyles.input}
				value={userName}
				onChangeText={setUserName}
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
			<TextInput
				mode="flat"
				placeholder="Email"
				label="Email"
				style={formStyles.input}
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>

			<Pressable
				onPress={onSubmit}
				style={({ pressed }) => [
					formStyles.button,
					pressed && formStyles.buttonPressed
				]}
			>
				<Text style={formStyles.buttonText}>Create Account</Text>
			</Pressable>
		</View>
	);
};

export default SignUpForm;
