import axios, { AxiosDefaults } from "axios"
import * as cheerio from "cheerio"
import { DownSpotify, InfoSpotify } from "../Types"

/**
 * Downloads a Spotify track by fetching information and download URL for a given Spotify track URL.
 *
 * @param {string} url - The Spotify track URL from which to fetch the download link.
 * @returns {Promise<{ info: InfoSpotify, url: string }>} A promise that resolves to an object containing:
 * - `info` (InfoSpotify): An object containing details about the track (e.g., title, artist, image).
 * - `url` (string): The direct download link for the track.
 *
 * The function performs the following steps:
 * 1. Extracts the track ID from the given Spotify URL.
 * 2. Sends a GET request to `https://spowload.com/spotify/track-{id}` to fetch page data.
 * 3. Fetches additional track details from the FabDL API (https://api.fabdl.com/spotify/get).
 * 4. Extracts necessary cookies and CSRF token for making the download request.
 * 5. Sends a POST request to `https://spowload.com/convert` to retrieve the final download link for the track.
 *
 * In case of an error (e.g., track data not found), the function throws an error message.
 */

export const spotifydl = async (url: string) => {
  url = url.replace("intl-id/", "")
  const id = url.split("track/")[1].split("?")[0]
  const res = (await axios.get(`https://spowload.com/spotify/track-${id}`, {
    withCredentials: true
  })) as AxiosDefaults

  const info = (await axios.get(`https://api.fabdl.com/spotify/get?url=${url}`).then(res => res.data.result)) as InfoSpotify

  const cookies = res.headers["set-cookie"].map(cookie => cookie.split(";")[0]).join("; ") as string | undefined
  const csrf = cheerio.load(res.data)('meta[name="csrf-token"]').attr("content")

  const down: DownSpotify = await axios
    .post(
      "https://spowload.com/convert",
      { urls: `https://open.spotify.com/track/${id}`, cover: info.image },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrf,
          Cookie: cookies
        }
      }
    )
    .then(res => res.data)

  if (down.erorr) throw "Data Tidak Ditemukan"
  return {
    info,
    url: down.url
  } as {
    info: InfoSpotify
    url: string
  }
}
