/* eslint-disable no-console */
import { Car, Home } from "./types/carAndHomeFormType";
import type { user } from "./types/userType";
import { API_URL } from "./config";

const baseURL = API_URL;

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

interface Time {
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
					return { error: "Invalid password" };
				} else if (response.status === 404) {
					return { error: "User not found. Please sign up." };
				} else {
					return { error: "Login failed. Please try again." };
				}
			}
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			console.error("Login fetch error:", error);
			return { error: "Connection error. Is the server running?" };
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
					return { error: "An account already has this email" };
				} else if (response.status === 410) {
					return { error: "Username already exists" };
				} else {
					return { error: "Failed to create account. Please try again." };
				}
			}
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			console.error("Registration fetch error:", error);
			return { error: "Connection error. Is the server running?" };
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

	static async updateHomeInfo(data: { user: user; id: number; home: Home }) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/home", {
				method: "PATCH",
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

	static async dailyCheckIn(user: user) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/checkin", {
				method: "POST",
				body: JSON.stringify({ user: { token: user } }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const responseData = await response.json();
			return responseData;
		} catch (err) {
			return { error: "Failed to check in" };
		}
	}

	static async getAchievements(user: user) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/achievements", {
				headers: {
					Authorization: `Bearer ${user}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to get achievements");
			}
			const responseData = await response.json();
			return responseData;
		} catch (err) {
			return { achievements: [] };
		}
	}

	static async claimAchievement(user: user, achievementId: string, stars: number) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/achievement", {
				method: "POST",
				body: JSON.stringify({
					user: { token: user },
					achievementId,
					stars,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const responseData = await response.json();
			return responseData;
		} catch (err) {
			return { error: "Failed to claim achievement" };
		}
	}

	static async markTipRead(user: user, tipId: string, stars: number) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/tip-read", {
				method: "POST",
				body: JSON.stringify({
					user: { token: user },
					tipId,
					stars,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const responseData = await response.json();
			return responseData;
		} catch (err) {
			return { error: "Failed to mark tip as read" };
		}
	}

	static async getCommunityStats() {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/community-stats");
			if (!response.ok) {
				throw new Error("Failed to get community stats");
			}
			const responseData = await response.json();
			return responseData;
		} catch (err) {
			return { totalTreesPlanted: 0, usersContributing: 0, co2Offset: 0 };
		}
	}
}

export default FetchData;
