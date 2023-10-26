/* eslint-disable no-console */

class FetchData {
	static async get(url: string) {
		try {
			const response = await fetch("http://localhost:3000" + url);
			if (!response.ok) {
				const error = new Error("No data received");
				throw error;
			}
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			return error;
		}
	}
}

export default FetchData;
