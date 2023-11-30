import type { user } from "./types/userType";
import { Car, Home } from "./types/carAndHomeType";
const baseURL = "http://localhost:3000";

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
}

export default DeleteData;
