import axios from "axios"
import FormData from "form-data"
import * as cheerio from "cheerio"

export interface ICapCut {
  status: string
  message?: string
  data?: {
    thumbnail?: string
    title?: string
    video?: {
      url: string
      type: string
      quality: string
    }[]
    audio?: any
  }
}

async function getToken(): Promise<string[] | string> {
  const { data: html } = await axios.get("https://snapfrom.com/id/pengunduh-video-capcut/")
  const $ = cheerio.load(html)
  const token = $("#token").val()
  if (!token) throw new Error("Gagal mengambil token.")
  return token
}

export default async function downloadCapCut(url: string): Promise<ICapCut> {
  if (!url) throw new Error("Masukkan URL CapCut yang valid.")

  const token = await getToken()
  const formData = new FormData()
  formData.append("url", url)
  formData.append("token", token)

  const { data } = await axios.post<ICapCut>("https://snapfrom.com/wp-json/aio-dl/video-data/", formData, { headers: formData.getHeaders() })

  return data
}
