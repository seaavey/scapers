import axios from "axios"
import * as cheerio from "cheerio"
import { DownloadLink, EpisodeData, ISearch, UpdateAnimexin } from "../Types"

/**
 * Fetches the latest anime updates from the AnimeXin website.
 *
 * @returns {Promise<Update[]>} A promise that resolves to an array of anime updates.
 *
 * Each anime update includes the following properties:
 * - `title` (string): The title of the anime.
 * - `url` (string | undefined): The URL of the anime page.
 * - `image` (string | undefined): The URL of the anime's thumbnail image.
 * - `episode` (string): The latest episode number or identifier.
 * - `type` (string): The type of anime (e.g., TV, OVA, Movie).
 *
 * The function uses Axios to fetch the HTML content from "https://animexin.dev/"
 * and Cheerio to parse the HTML structure, extracting the relevant anime update details.
 */
export const Update = async () => {
  const { data } = await axios.get("https://animexin.dev/")
  const $ = cheerio.load(data)
  const animeList = [] as UpdateAnimexin[]

  $(".listupd .bsx").each((index, element) => {
    const title = $(element).find('h2[itemprop="headline"]').text()
    const url = $(element).find('a[itemprop="url"]').attr("href")
    const image = $(element).find('img[itemprop="image"]').attr("src")
    const episode = $(element).find(".eggepisode").text()
    const type = $(element).find(".eggtype").text()

    animeList.push({
      title,
      url,
      image,
      episode,
      type
    })
  })

  return animeList
}

/**
 * Fetches detailed information about an anime episode from a given URL.
 *
 * @param {string} url - The URL of the anime episode page to fetch details from.
 * @returns {Promise<string>} A promise that resolves to a stringified JSON object containing detailed anime episode information.
 *
 * The returned object includes the following properties:
 * - `title` (string): The title of the anime series.
 * - `episodeTitle` (string): The title of the episode.
 * - `image` (string | undefined): The URL of the episode's thumbnail image.
 * - `rating` (string): The rating of the episode.
 * - `status` (string): The current status of the anime.
 * - `network` (string): The network that aired the anime.
 * - `studio` (string): The studio that produced the anime.
 * - `released` (string): The release date of the episode.
 * - `duration` (string): The duration of the episode.
 * - `country` (string): The country of origin of the anime.
 * - `type` (string): The type of the anime (e.g., TV, OVA, Movie).
 * - `episodes` (string): The number of episodes available.
 * - `fansub` (string): The fansub group responsible for subtitling the episode.
 * - `genres` (string[]): An array of genres the anime belongs to.
 * - `description` (string): A description of the episode.
 * - `downloadLinks` (DownloadLink[]): An array of download links categorized by subtitle type.
 *
 * The function uses Axios to fetch the HTML content from the provided URL and Cheerio to parse the HTML structure. It extracts key episode details including the title, rating, network, studio, and download links, and returns these details in a structured format.
 */

export const Detail = async (url: string): Promise<string> => {
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  const getText = (selector: string): string => $(selector).text().trim()
  const getAttribute = (selector: string, attr: string): string | undefined => $(selector).attr(attr)
  const extractInfo = (label: string): string =>
    $('.spe span:contains("' + label + ':")')
      .text()
      .replace(`${label}: `, "")

  const episodeData: EpisodeData = {
    title: getText('h2[itemprop="partOfSeries"]'),
    episodeTitle: getText('h2[itemprop="headline"]'),
    image: getAttribute('.thumb img[itemprop="image"]', "src"),
    rating: getText(".rating strong"),
    status: extractInfo("Status"),
    network: getText('.spe span:contains("Network:") a'),
    studio: getText('.spe span:contains("Studio:") a'),
    released: extractInfo("Released"),
    duration: extractInfo("Duration"),
    country: getText('.spe span:contains("Country:") a'),
    type: extractInfo("Type"),
    episodes: extractInfo("Episodes"),
    fansub: extractInfo("Fansub"),
    genres: $(".genxed a")
      .map((_, el) => $(el).text())
      .get(),
    description: getText(".desc.mindes"),
    downloadLinks: []
  }

  $(".mctnx .soraddlx").each((_, element) => {
    const subtitleType = $(element).find(".sorattlx h3").text().trim()
    const links: DownloadLink[] = $(element)
      .find(".soraurlx a")
      .map((_, el) => ({ url: $(el).attr("href") }))
      .get()

    episodeData.downloadLinks.push({ subtitleType, links })
  })

  return JSON.stringify(episodeData, null, 2)
}

/**
 * Searches for anime based on a query string from the AnimeXin website.
 *
 * @param {string} query - The search query string (e.g., anime title).
 * @returns {Promise<string>} A promise that resolves to a stringified JSON array containing search results.
 *
 * Each search result includes the following properties:
 * - `title` (string): The title of the anime.
 * - `url` (string | undefined): The URL of the anime's page.
 * - `image` (string | undefined): The URL of the anime's thumbnail image.
 * - `status` (string): The current status of the anime (e.g., airing, completed).
 * - `subtitle` (string): The subtitle language for the anime.
 * - `type` (string): The type of anime (e.g., TV, OVA, Movie).
 *
 * The function uses Axios to fetch the HTML content from "https://animexin.dev/?s=" with the query string,
 * and Cheerio to parse the HTML structure, extracting the relevant search result details.
 */

export const Search = async (query: string): Promise<string> => {
  const { data } = await axios.get("https://animexin.dev/?s=" + query)
  const $ = cheerio.load(data)

  const animeList = [] as ISearch[]

  $(".listupd article.bs").each((index, element) => {
    const title = $(element).find('h2[itemprop="headline"]').text()
    const url = $(element).find('a[itemprop="url"]').attr("href")
    const image = $(element).find('img[itemprop="image"]').attr("src")
    const status = $(element).find(".epx").text()
    const subtitle = $(element).find(".sb").text()
    const type = $(element).find(".typez").text()

    animeList.push({
      title,
      url,
      image,
      status,
      subtitle,
      type
    })
  })

  return JSON.stringify(animeList, null, 2)
}
