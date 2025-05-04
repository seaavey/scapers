import axios from "axios"
import * as cheerio from "cheerio"
import { IAnoboy } from "../Types"

/**
 * Fetches anime search results from the Anoboy website based on a query.
 *
 * @param query - The search term to look for anime titles.
 * @returns A Promise that resolves to an array of `Anoboy` objects or `undefined` if no results are found.
 *
 * This function uses `axios` to fetch the search page and `cheerio` to parse the HTML content.
 * It extracts anime details such as title, type, thumbnail URL, and link from the search results.
 * If an error occurs during the request, it rejects the promise with an error message.
 */
const anoboy = async (query: string): Promise<IAnoboy[] | undefined> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get("https://anoboy.li/?s=" + encodeURIComponent(query))
      .then(async ({ data }) => {
        let $ = cheerio.load(data)
        let array = [] as IAnoboy[]
        $(".bsx").each((a: Number, i: any) => {
          array.push({
            title: $(i).find("a > .tt").text().replace($(i).find("a > .tt > h2").text(), "").trim(),
            type: $(i).find(".limit > .typez").text(),
            thumb: $(i).find(".limit > img").attr("src"),
            url: $(i).find("a").attr("href")
          })
        })
        resolve(array)
      })
      .catch(err => {
        reject({
          error: err,
          message: "An error occurred while fetching the data"
        })
      })
  })
}

export default anoboy
