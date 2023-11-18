/* eslint-disable no-console */
import type { user } from "./types/userType";
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

interface UserBasicInfo {
	user: user;
	zipcode: string;
	homeOwnership: string;
	car: {
		make: string;
		model: string;
		year: string;
		fuelType: string;
		carBatterySize: string;
	};
	milesDriven: string;
	milesDrivenUnit: string;
	commute: boolean;
	transportation: string;
	daysCommute: string;
	hasCar: boolean;
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

	static async addBasicInfo(data: UserBasicInfo) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info", {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				const error = new Error(`${response.status}(${response.statusText})`);
				throw error;
			}
			const responseData = await response.json();
			return responseData;
		} catch (err) {
			return err;
		}
	}
}

export default FetchData;
