import axios from "axios"
import * as cheerio from "cheerio"
import { IAnimeQuote } from "../Types"

export default async function randomAnimeQuote(): Promise<IAnimeQuote | null> {
  const { data } = await axios.get("https://otakotaku.com/quote/feed")
  const $ = cheerio.load(data)

  const quotes: IAnimeQuote[] = []

  $(".kotodama-list").each((_, el) => {
    const character = $(el).find(".char-name").text().trim()
    const anime = $(el).find(".anime-title").text().trim()
    const episode = $(el).find(".meta").text().trim()
    const quote = $(el).find(".quote").text().trim()
    const image = $(el).find(".char-img img").attr("data-src")
    const link = $(el).find("a.kuroi").attr("href")

    if (character && anime && quote && link) {
      quotes.push({
        character,
        anime,
        episode,
        quote,
        image,
        link: `https://otakotaku.com${link}`
      })
    }
  })

  return quotes.length > 0 ? quotes[Math.floor(Math.random() * quotes.length)] : null
}
