/* eslint-disable no-console */
import { Car, Home } from "./types/carAndHomeFormType";
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
	milesDriven: string;
	milesDrivenUnit: string;
	commute: string;
	transportation: string;
	daysCommute: string;
	hasCar: string;
}

interface UserCarInfo {
	user: user;
	car: Car;
}

interface UserHomeInfo {
	user: user;
	home: Home;
}

interface Tree {
	user: user;
}

interface Stars {
	user: user;
	rewards: number;
}

class FetchData {
	static async get(url: string, user: user) {
		try {
			const response = await fetch(baseURL + url, {
				headers: {
					Authorization: `Bearer ${user}`,
				},
			});
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
			const response = await fetch(baseURL + "/api/v1/user-info/basic", {
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
			console.log(responseData);
			return responseData;
		} catch (err) {
			return err;
		}
	}

	static async addTrees(tree: Tree) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/tree", {
				method: "post",
				body: JSON.stringify(tree),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				if (response.status === 401) {
					const responseData = await response.json();
					return responseData;
				}
				const error = new Error(`${response.status}(${response.statusText})`);
				throw error;
			}
			const responseData = await response.json();
			return responseData;
		} catch (err) {
			return err;
		}
	}

	static async addReward(stars: Stars) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/stars", {
				method: "post",
				body: JSON.stringify(stars),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				if (response.status === 401) {
					const responseData = await response.json();
					return responseData;
				}
				const error = new Error(`${response.status}(${response.statusText})`);
				throw error;
			}
			const responseData = await response.json();
			return responseData;
		} catch (err) {
			return err;
		}
	}

	static async addCarInfo(data: UserCarInfo) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/car", {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				if (response.status === 400) {
					const responseData = await response.json();
					return responseData;
				}
				const error = new Error(`${response.status}(${response.statusText})`);
				throw error;
			}
			const responseData = await response.json();
			return responseData;
		} catch (err) {
			return err;
		}
	}

	static async addHomeInfo(data: UserHomeInfo) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/home", {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				if (response.status === 400) {
					const responseData = await response.json();
					return responseData;
				}
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
