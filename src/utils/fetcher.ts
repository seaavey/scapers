import axios from "axios";

/**
 * Fetches JSON data from a given URL.
 *
 * @param url - The URL to fetch JSON data from.
 * @returns A Promise that resolves to the JSON data as a string.
 *
 * This function uses `axios` to send a GET request with JSON response type and appropriate headers.
 */
export const fetchJSON = async (url: string): Promise<any> => {
  const res = await axios.get(url, {
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return res.data;
};
