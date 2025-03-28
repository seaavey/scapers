import axios from "axios"
import * as cheerio from "cheerio"
import { wrapper } from "axios-cookiejar-support"
import { CookieJar } from "tough-cookie"

const jar = new CookieJar()
const client = wrapper(axios.create({ jar }))

export default async function instagram(url: string) {
  const { data: token } = await client.get("https://kol.id/download-video/instagram")
  const $ = cheerio.load(token)

  const _token = $("input[name=_token]").val()

  const { data } = await client.post(
    "https://kol.id/download-video/instagram",
    {
      url,
      _token
    },
    {
      headers: {
        origin: "https://kol.id",
        referer: "https://kol.id/download-video/instagram",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
      }
    }
  )
  const $2 = cheerio.load(data.html)

  const result = [] as string[]

  $2(".dropdown-item").each((i, el) => {
    const link = $2(el).attr("href")
    if (link) result.push(link)
  })

  return result.length > 0 ? result : { title: $2("h2").text().trim(), url: $2("a").attr("href") || "" }
}
