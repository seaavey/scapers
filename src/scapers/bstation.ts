import axios from "axios"
import * as cheerio from "cheerio"
import { DownloadResponse, SearchResponse } from "../Types"

export const search_bstation = async (query: string, page: number = 1): Promise<SearchResponse | undefined> => {
  try {
    const { data } = await axios.get("https://api.bilibili.tv/intl/gateway/web/v2/search_v2", {
      params: {
        s_locale: "id_ID",
        platform: "web",
        keyword: query,
        highlight: 1,
        pn: page,
        ps: 20
      }
    })

    return data.modules[0].items.map(item => ({
      title: item.title,
      url: "https://bilibili.tv/video/" + item.aid,
      id: item.aid,
      author: item.author,
      thumbnail: item.cover,
      view: item.view,
      duration: item.duration
    })) as SearchResponse
  } catch (error) {
    console.error("Error fetching info:", error)
    return undefined
  }
}

export const download_bstation = async (url: string, quality: string = "480P"): Promise<DownloadResponse | undefined> => {
  try {
    let aid = /\/video\/(\d+)/.exec(url)?.[1]

    if (!aid) return undefined

    const { data } = await axios.get(url).then(res => res.data)

    const $ = cheerio.load(data) as any

    const title = $('meta[property="og:title"]').attr("content").split("|")[0].trim()
    const locate = $('meta[property="og:locale"]').attr("content")
    const description = $('meta[property="og:description"]').attr("content")
    const type = $('meta[property="og:video:type"]').attr("content")
    const cover = $('meta[property="og:image"]').attr("content")
    const like = $(".interactive__btn.interactive__like .interactive__text").text()
    const views = $(".bstar-meta__tips-left .bstar-meta-text").first().text()

    const response = await axios
      .get("https://api.bilibili.tv/intl/gateway/web/playurl", {
        params: {
          s_locale: "id_ID",
          platform: "web",
          aid: aid,
          qn: "64",
          type: "0",
          device: "wap",
          tf: "0",
          spm_id: "bstar-web.ugc-video-detail.0.0",
          from_spm_id: "bstar-web.homepage.trending.all",
          fnval: "16",
          fnver: "0"
        }
      })
      .then(res => res.data)

    const video = response.data.playurl.video.map(item => {
      return {
        quality: item.stream_info.desc_words,
        codecs: item.video_resource.codecs,
        size: item.video_resource.size,
        mime: item.video_resource.mime_type,
        url: item.video_resource.url || item.video_resource.backup_url[0]
      } as {
        quality: string
        codecs: string
        size: string
        mime: string
        url: string
      }
    })

    const audio = response.data.playurl.audio_resource.map(item => {
      return {
        size: item.size,
        url: item.url || item.backup_url[0]
      } as {
        size: string
        url: string
      }
    })

    const v = video.filter(v => v.quality == quality)[0]

    if (!v) return undefined

    return {
      title,
      locate,
      description,
      type,
      cover,
      like,
      views,
      video: v || video[0],
      audio: audio[0]
    } as DownloadResponse
  } catch (error) {
    console.error("Error fetching info:", error)
    return undefined
  }
}
