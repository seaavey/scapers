import axios from "axios"
import { TiktokDown, TiktokSearch } from "../Types"

/**
 * Fetches TikTok video data using the TikWM API.
 *
 * @param url - The TikTok video URL to process.
 * @param hd - Optional. If true, requests the HD version of the video. Defaults to false.
 * @returns A Promise that resolves to a `TiktokResponse` object containing video details.
 *
 * This function sends a POST request to the TikWM API with the provided URL and optional HD flag.
 * It includes necessary headers for the request and validates the API response.
 * Throws an error if the API response is invalid or if the request fails.
 */
export const download = async (url: string, hd: boolean = false): Promise<TiktokDown> => {
  try {
    const params = new URLSearchParams()
    params.append("url", url)
    if (hd) params.append("hd", "1")

    const { data } = await axios.post<TiktokDown>("https://tikwm.com/api/", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Cookie: "current_language=en",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    })

    if (!data || typeof data.code !== "number") {
      throw new Error("Invalid API response")
    }

    return data
  } catch (error) {
    throw new Error(`Tiktok API Error: ${(error as Error).message}`)
  }
}

export const search = async (query: string): Promise<TiktokSearch> => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://tikwm.com/api/feed/search",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Cookie: "current_language=en",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      },
      data: `keywords=${encodeURIComponent(query)}&count=10&cursor=0&HD=1`
    })

    return response.data as TiktokSearch
  } catch (error) {
    throw new Error("Gagal mendapatkan hasil dari API TikTok: " + error.message)
  }
}
