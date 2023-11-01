/* eslint-disable no-console */
const baseURL = "http://localhost:3000";

interface IFormInput {
	userName: string;
	password: string;
	email: string;
}

interface ILoginInput {
	userName: string;
	password: string;
}

class FetchData {
	static async get(url: string) {
		try {
			const response = await fetch(baseURL + url);
			if (!response.ok) {
				throw new Error("No data received");
			}
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			return error;
		}
	}

	static async login(loginData: ILoginInput) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-sessions/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: loginData.userName,
					password: loginData.password,
				}),
			});
			if (!response.ok) {
				if (response.status === 401) {
					return "Invalid password";
				} else if (response.status === 404) {
					return "That User Name does not exist, please sign up.";
				} else {
					throw new Error("Failed to login");
				}
			}
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			return error;
		}
	}

	static async makeNewUser(data: IFormInput) {
		try {
			const response = await fetch(baseURL + "/api/v1/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: data.userName,
					password: data.password,
					email: data.email,
				}),
			});
			if (!response.ok) {
				if (response.status === 409) {
					return "An account already has this email";
				} else if (response.status === 410) {
					return "Username already exists";
				} else {
					throw new Error("Failed to create user");
				}
			}
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			return error;
		}
	}
}

export default FetchData;
