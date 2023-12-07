import type { user } from "./types/userType";
import { Car, Home } from "./types/carAndHomeType";
const baseURL = "http://localhost:3000";

interface UserBasicInfo {
	user: user;
	homeOwnership: string;
	milesDriven: string;
	milesDrivenUnit: string;
	commute: string;
	transportation: string;
	daysCommute: string;
	hasCar: string;
}

class DeleteData {
	static async deleteCar(id: number) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/car", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
				}),
			});
			if (!response.ok) {
				throw new Error("Failed to delete");
			}

			const responseData = await response.json();
			return true;
		} catch (error) {
			return error;
		}
	}

	static async deleteHome(id: number) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/home", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
				}),
			});
			if (!response.ok) {
				throw new Error("Failed to delete");
			}

			const responseData = await response.json();
			return true;
		} catch (error) {
			return error;
		}
	}

	static async updateUserInfo(data: UserBasicInfo) {
		try {
			const response = await fetch(baseURL + "/api/v1/user-info/basic", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data,
				}),
			});
			if (!response.ok) {
				throw new Error("Failed to delete");
			}

			const responseData = await response.json();
			return true;
		} catch (error) {
			return error;
		}
	}
}

export default DeleteData;
