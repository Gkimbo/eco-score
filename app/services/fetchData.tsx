/* eslint-disable no-console */
class FetchData {
  static async get(endpoint: string) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        const error = new Error(`${response.status}(${response.statusText})`);
        throw error;
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return `Error in fetch!! ${error}`;
    }
  }
}

export default FetchData;
