import axios from "axios"
import * as cheerio from "cheerio"
import { IJadwalSholat } from "../Types"

/**
 * Fetches the prayer schedule (Jadwal Sholat) for a given region (daerah) from the Tirto website.
 *
 * @param {string} daerah - The name of the region (city or area) to retrieve the prayer schedule for.
 * @returns {Promise<jadwalSholat[] | { status: number, message: string }>} A promise that resolves to:
 * - An array of prayer times (`jadwalSholat[]`) if successful.
 * - An error object with `status` and `message` if the region is not found or if there is a server error.
 *
 * Each prayer schedule includes the following properties:
 * - `time` (string): The time of day for the prayer.
 * - `subuh` (string): Time for Subuh (Fajr) prayer.
 * - `duha` (string): Time for Duha prayer.
 * - `dzuhur` (string): Time for Dzuhur prayer.
 * - `ashar` (string): Time for Asar prayer.
 * - `maghrib` (string): Time for Maghrib prayer.
 * - `isya` (string): Time for Isya prayer.
 *
 * The function sends an HTTP GET request to "https://jadwal-sholat.tirto.id/kota" with the provided region (daerah),
 * replaces spaces in the region name with hyphens, and uses Cheerio to parse the response and extract the prayer times.
 *
 * In case of an error, the function will return an error object with a status code and message.
 */

const jawdalSholat = async daerah => {
  try {
    daerah = daerah.replace(/\s/g, "-")
    const res = await axios.get("https://jadwal-sholat.tirto.id/kota" + daerah)
    if (res.status !== 200) {
      return {
        status: res.status,
        message: "Daerah Tidak Ditemukan"
      }
    }
    const $ = cheerio.load(res.data)
    const result = [] as IJadwalSholat[]
    const table = $("table")
    table.find("tr.table-content-sholat").each((_i, el) => {
      result.push({
        time: $(el).find("td:nth-child(1)").text(),
        subuh: $(el).find("td:nth-child(2)").text(),
        duha: $(el).find("td:nth-child(3)").text(),
        dzuhur: $(el).find("td:nth-child(4)").text(),
        ashar: $(el).find("td:nth-child(5)").text(),
        maghrib: $(el).find("td:nth-child(6)").text(),
        isya: $(el).find("td:nth-child(7)").text()
      })
    })
    return result
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error"
    }
  }
}

export default jawdalSholat
