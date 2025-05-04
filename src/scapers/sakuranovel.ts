import axios from "axios"
import * as cheerio from "cheerio"
import { InfoResult, ReadResult, SearchResult } from "../Types"

const BASE_URL = "https://sakuranovel.id/"
const CF_URL = "https://kaviaann-cloudflare.hf.space/scrape"

const BASE_HEADERS: Record<string, string> = {
  accept: "*/*",
  "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,ms;q=0.6",
  "cache-control": "no-cache",
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  pragma: "no-cache",
  priority: "u=1, i",
  "sec-ch-ua": '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  origin: BASE_URL,
  referer: BASE_URL,
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
  "x-requested-with": "XMLHttpRequest"
}

export async function searchNovel(query: string): Promise<SearchResult[]> {
  try {
    const res = await axios.post(
      `${BASE_URL}wp-admin/admin-ajax.php`,
      {
        action: "data_fetch",
        keyword: query
      },
      {
        headers: BASE_HEADERS
      }
    )
    const $ = cheerio.load(res.data)
    return $(".searchbox")
      .map((_, el) => ({
        title: $(el).find("a").attr("title"),
        link: $(el).find("a").attr("href"),
        thumbnail: $(el).find("img").attr("src")?.split("?")[0],
        type: $(el)
          .find(".type")
          .map((_, el) => $(el).text().trim())
          .get(),
        status: $(el).find(".status").text()?.trim()
      }))
      .get()
  } catch (e: any) {
    throw new Error(`Error in search function: ${e}`)
  }
}

export async function getNovelInfo(url: string): Promise<InfoResult> {
  if (!/sakuranovel\..*?\/.*?\/.*?\//.test(url)) {
    throw new Error("Url is not valid, make sure to enter valid url from sakuranovel!")
  }

  try {
    const res = await axios.get(`${CF_URL}?url=${url}`)
    const $ = cheerio.load(res.data)
    const el = $(".series .container .series-flex")
    const kr = $(el).find(".series-flexleft")
    const kn = $(el).find(".series-flexright")

    return {
      id: kr.find("button.bookmark").attr("data-postid"),
      title: kr.find(".series-titlex h2").text()?.trim(),
      thumbnail: kr.find("img").attr("src"),
      synops: kn
        .find(".series-synops p")
        .map((_, el) => $(el).text().trim())
        .get()
        .join("\n"),
      info: kr
        .find(".series-infoz.block span")
        .map((_, el) => ({
          category: $(el).attr("class")?.split(" ")[0],
          value: $(el).text()?.trim()
        }))
        .get()
        .concat(
          kr
            .find("ul.series-infolist li")
            .map((_, el) => {
              const s = $(el).find("span")
              return {
                category: $(el).find("b").text().toLowerCase(),
                value: s.text(),
                anchor: !s.find("a").length
                  ? null
                  : $(el)
                      .find("a")
                      .map((_, el) => ({
                        value: $(el).text(),
                        link: $(el).attr("bref")
                      }))
                      .get()
              }
            })
            .get()
        ),
      ratings: +(kr.find('.series-infoz.score span[itemprop="ratingValue"]').text().trim() || "0"),
      favorite: +(kr.find("button.bookmark").attr("data-favoritecount") || "0"),
      genres: kn
        .find(".series-genres a")
        .map((_, el) => $(el).text().trim())
        .get(),
      chapter: kn
        .find("ul.series-chapterlists li")
        .map((_, el) => ({
          title: $(el).find("a").attr("title"),
          link: $(el).find("a").attr("href"),
          date: $(el).find("span.date").text()
        }))
        .get()
    }
  } catch (e: any) {
    throw new Error(`Error in info function: ${e}`)
  }
}

export async function readChapter(url: string): Promise<ReadResult> {
  if (!/sakuranovel\..*?\/.*?\//gi.test(url)) {
    throw new Error("Url is not valid, make sure to enter valid url from sakuranovel!")
  }

  try {
    const res = await axios.get(`${CF_URL}?url=${url}`)
    const $ = cheerio.load(res.data)
    const c = $("main .content")

    return {
      title: c.find("h2.title-chapter").text().trim(),
      novel: c
        .find(".content .asdasd p")
        .slice(0, c.find(".content .asdasd p").length - 1)
        .map((_, el) => $(el).text().trim())
        .get()
    }
  } catch (e: any) {
    throw new Error(`Error in read function: ${e}`)
  }
}
