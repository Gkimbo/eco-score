import React, { useState, useEffect } from "react";
import {
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useNavigate } from "react-router-native";

import FetchData from "../../../services/fetchData";
import formStyles from "../../../services/styles/FormStyle";

interface IFormInput {
	userName: string;
	password: string;
	email: string;
}

const SignUpForm = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const navigate = useNavigate();
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
		if (
			response === "An account already has this email" ||
			response === "Username already exists"
		) {
			setErrors([response]);
		} else if (response.username) {
			setRedirect(true);
		}
	};

	useEffect(() => {
		if (redirect) {
			navigate("/");
		}
	}, [redirect]);

	return (
		<ScrollView contentContainerStyle={formStyles.container}>
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
				placeholder="User Name"
				style={formStyles.input}
				value={userName}
				onChangeText={setUserName}
			/>
			<TextInput
				placeholder="Password"
				style={formStyles.input}
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TextInput
				placeholder="Email"
				style={formStyles.input}
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
			/>

			<TouchableOpacity onPress={onSubmit}>
				<Text style={formStyles.button}>Register</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default SignUpForm;
