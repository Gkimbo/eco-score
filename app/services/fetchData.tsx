/* eslint-disable no-console */
const baseURL = 'http://localhost:3000';
class FetchData {
  static async get(endpoint: any) {
    try {
      const response = await fetch(baseURL + endpoint);
      console.log('inside');
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
