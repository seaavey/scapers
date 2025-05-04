/**
 * Fetches popular and trending anime data from the Anilist website.
 */

import axios from "axios"
import * as cheerio from "cheerio"
import { Populer } from "../Types"

/**
 * Fetches trending, upcoming, top, and seasonal anime data from the Anilist homepage.
 *
 * @returns A Promise that resolves to a `Populer` object containing arrays of anime data for each category.
 *
 * This function uses `axios` to fetch the Anilist homepage and `cheerio` to parse the HTML content.
 * It extracts anime details such as title, link, and image URL for trending, upcoming, top, and seasonal anime.
 */
export const populer = async (): Promise<Populer> => {
  const response = await axios.get("https://anilist.co")
  const $ = cheerio.load(response.data)

  // Extract trending anime
  const trending = $(".landing-section.trending .results .media-card")
    .map((i, el) => ({
      i,
      title: $(el).find(".title").text().trim(),
      link: "https://anilist.co" + $(el).find("a.cover").attr("href"),
      image: $(el).find("img.image").attr("src")
    }))
    .get()

  // Extract upcoming anime
  const upcoming = $(".landing-section.nextSeason .results .media-card")
    .map((i, el) => ({
      i,
      title: $(el).find(".title").text().trim(),
      link: "https://anilist.co" + $(el).find("a.cover").attr("href"),
      image: $(el).find("img.image").attr("src")
    }))
    .get()

  // Extract top anime
  const top = $(".landing-section.top .results .media-card")
    .map((i, el) => ({
      i,
      title: $(el).find(".title").text().trim(),
      link: "https://anilist.co" + $(el).find("a.cover").attr("href"),
      image: $(el).find("img.image").attr("src")
    }))
    .get()

  // Extract seasonal anime
  const populer = $(".landing-section.season .results .media-card")
    .map((i, el) => ({
      i,
      title: $(el).find(".title").text().trim(),
      link: "https://anilist.co" + $(el).find("a.cover").attr("href"),
      image: $(el).find("img.image").attr("src")
    }))
    .get()

  return { trending, upcoming, top, populer } as Populer
}

/**
 * Searches for anime on Anilist based on a query.
 *
 * @param query - The search term to look for anime titles.
 * @returns A Promise that resolves to an array of search results containing anime details.
 *
 * This function uses `axios` to fetch the search page and `cheerio` to parse the HTML content.
 * It extracts anime details such as title, image URL, and link from the search results.
 */
export const search = async (query: string) => {
  const response = await axios.get(`https://anilist.co/search/anime?query=${encodeURIComponent(query)}`)

  const $ = cheerio.load(response.data)

  const results = [] as {
    title: string
    image: string | undefined
    link: string | undefined
  }[]

  $(".media-card").each((index, el) => {
    const title = $(el).find(".title").text().trim()
    const image = $(el).find(".image").attr("src")
    const link = $(el).find(".cover").attr("href")

    results.push({
      title,
      image,
      link
    })
  })

  return results
}
