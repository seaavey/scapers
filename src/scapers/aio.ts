/**
 * Fetches TikTok video data using the AnyDownloader API.
 *
 * @param url - The TikTok video URL to process.
 * @returns A Promise that resolves to a `TikTok` object containing video details or `undefined` if the request fails.
 *
 * This function sends a POST request to the AnyDownloader API with the provided TikTok URL.
 * It includes necessary headers and body parameters for the request.
 * Throws an error if the API response is invalid or if the request fails.
 */
import axios from "axios"
import { TikTok } from "../Types"

const aio = async (url: string): Promise<TikTok | undefined> => {
  try {
    const response = await axios.post(
      "https://anydownloader.com/wp-json/aio-dl/video-data/",
      new URLSearchParams({
        url
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://anydownloader.com/",
          Token: "5b64d1dc13a4b859f02bcf9e572b66ea8e419f4b296488b7f32407f386571a0d"
        }
      }
    )
    const data = response.data
    return data as TikTok
  } catch (error) {
    console.error("Error fetching TikTok data:", error)
  }
}

export default aio
