import axios from "axios"
import * as cheerio from "cheerio"
import { PinterestDown } from "../Types"

export const search_pin = async (query: string) => {
  return "devolement"
}

export const download_pin = async (url: string): Promise<PinterestDown | undefined> => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
    })

    const $ = cheerio.load(data)

    const tag = $('script[data-test-id="video-snippet"]')

    let result = JSON.parse(tag.text())

    return {
      title: result.name,
      media: result.contentUrl,
      creator: result.creator.name
    } as PinterestDown
  } catch (error) {
    console.log(error)
    return undefined
  }
}
