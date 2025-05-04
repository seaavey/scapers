export type Fitlers = "coklat" | "hitam" | "nerd" | "piggy" | "carbon" | "botak"
export type Styless = "default" | "realistic" | "anime" | "ghibli" | "cartoon" | "3d" | "fantasy" | "chibi" | "superhero" | "cyberpunk" | "disney" | "pokemon" | "dnd art" | "furry art" | "villain" | "pixel art" | "sailor moon" | "npc"
export type Aspects = "1:1" | "2:3" | "3:2" | "9:16"

export interface AIFluxFastResponse {
  ok: boolean
  data: {
    imageUrl: string
  }
}
/**
 * Interface representing the structure of TikTok video data returned by the API.
 */
export interface TikTok {
  /**
   * The original TikTok video URL.
   */
  url: string

  /**
   * The title or caption of the TikTok video.
   */
  title: string

  /**
   * The URL of the video's thumbnail image.
   */
  thumbnail: string

  /**
   * The duration of the video in seconds, or null if unavailable.
   */
  duration: null | number

  /**
   * The source platform of the video (always "tiktok").
   */
  source: "tiktok"

  /**
   * An array of media options available for the video.
   */
  medias: {
    /**
     * The direct download URL for the media.
     */
    url: string

    /**
     * The quality of the media (e.g., HD Watermark, HD No Watermark, 128kbps).
     */
    quality: "HD Watermark" | "HD No Watermark" | "128kbps"

    /**
     * The file extension of the media (e.g., mp4, mp3).
     */
    extension: "mp4" | "mp3"

    /**
     * The size of the media file in bytes.
     */
    size: number

    /**
     * The formatted size of the media file (e.g., "5.2 MB").
     */
    formattedSize: string

    /**
     * Indicates whether the media contains video.
     */
    videoAvailable: boolean

    /**
     * Indicates whether the media contains audio.
     */
    audioAvailable: boolean

    /**
     * Indicates whether the media is chunked.
     */
    chunked: boolean

    /**
     * Indicates whether the media is cached.
     */
    cached: boolean
  }[]

  /**
   * Session ID for the request, or null if unavailable.
   */
  sid: null | string
}

/**
 * Interface representing the structure of the popular anime data.
 */
export interface Populer {
  /**
   * Trending anime data.
   */
  trending: PopulerDefault[]

  /**
   * Upcoming anime data.
   */
  upcoming: PopulerDefault[]

  /**
   * Top-rated anime data.
   */
  top: PopulerDefault[]

  /**
   * Seasonal anime data.
   */
  populer: PopulerDefault[]
}

/**
 * Interface representing the structure of individual anime entries.
 */
export interface PopulerDefault {
  /**
   * Index of the anime in the list.
   */
  i: number

  /**
   * Title of the anime.
   */
  title: string

  /**
   * Link to the anime's details page.
   */
  link: string

  /**
   * URL of the anime's thumbnail image.
   */
  image: string
}

export interface UpdateAnimexin {
  title: string
  url: string | undefined
  image: string | undefined
  episode: string | undefined
  type: string | undefined
}

export interface DownloadLink {
  url?: string
}

export interface SubtitleSection {
  subtitleType: string
  links: DownloadLink[]
}

export interface EpisodeData {
  title: string
  episodeTitle: string
  image?: string
  rating: string
  status: string
  network: string
  studio: string
  released: string
  duration: string
  country: string
  type: string
  episodes: string
  fansub: string
  genres: string[]
  description: string
  downloadLinks: SubtitleSection[]
}

export interface ISearch {
  title: string
  url: string | undefined
  image: string | undefined
  status: string | undefined
  subtitle: string | undefined
  type: string | undefined
}

/**
 * Interface representing an anime result from the Anoboy website.
 */
export interface IAnoboy {
  /**
   * The title of the anime.
   */
  title: string

  /**
   * The type of the anime (e.g., TV, Movie, OVA).
   */
  type: string

  /**
   * The URL of the anime's thumbnail image.
   */
  thumb: string | undefined

  /**
   * The URL linking to the anime's details page.
   */
  url: string | undefined
}

export interface SearchResponse {
  title: string
  url: string
  id: string
  author: {
    mid: string
    avatar: string
    nickname: string
    identity: {
      role: number
      icon: string | ""
    }
  }
  thumbnail: string
  view: string
  duration: string
}

export interface DownloadResponse {
  title: string
  locate: string
  description: string
  type: string
  cover: string
  like: string
  views: string
  video:
    | {
        quality: string
        codecs: string
        size: string
        mime: string
        url: string
      }
    | string
  audio: {
    size: string
    url: string
  }
}

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

export interface IDeepSeek {
  status: Number
  result: string
}

export interface GithubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  user_view_type: string
  site_admin: boolean
  name: string
  company: string | null
  blog: string
  location: string
  email: string | null
  hireable: boolean | null
  bio: string
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface IJadwalSholat {
  time: string
  subuh: string
  duha: string
  dzuhur: string
  ashar: string
  maghrib: string
  isya: string
}

export interface NegroResponse {
  status: string
  processedImageUrl: string
}

export interface PinterestDown {
  title: string
  media: string
  creator: string
}

export interface IAnimeQuote {
  character: string
  anime: string
  episode: string
  quote: string
  image?: string
  link: string
}

export interface SearchResult {
  title: string | undefined
  link: string | undefined
  thumbnail: string | undefined
  type: string[]
  status: string | undefined
}

export interface InfoResult {
  id: string | undefined
  title: string | undefined
  thumbnail: string | undefined
  synops: string
  info: {
    category: string | undefined
    value: string | undefined
    anchor?:
      | {
          value: string
          link: string | undefined
        }[]
      | null
  }[]
  ratings: number
  favorite: number
  genres: string[]
  chapter: {
    title: string | undefined
    link: string | undefined
    date: string
  }[]
}

export interface ReadResult {
  title: string
  novel: string[]
}

export interface InfoSpotify {
  id: string
  type: string
  name: string
  image: string
  artists: string
  duration_ms: number
  gid: number
}

export interface DownSpotify {
  erorr: boolean
  url: string
}

export interface TiktokSearch {
  code: number
  msg: string
  processed_time: number
  data: {
    video: {
      video_id: string
      region: string
      title: string
      cover: string
      ai_dynamic_cover: string
      origin_cover: string
      duration: number
      play: string
      wmplay: string
      size: number
      wm_size: number
      music: string
      music_info: {
        id: string
        title: string
        play: string
        cover: string
        author: string
        original: boolean
        duration: number
        album: string
      }
      play_count: number
      digg_count: number
      comment_count: number
      share_count: number
      download_count: number
      create_time: number
      anchors: null
      anchors_extras: string
      is_ad: boolean
      commerce_info: {
        auction_ad_invited: boolean
        with_comment_filter_words: boolean
        adv_promotable: boolean
        branded_content_type: number
      }
      commercial_video_info: string
      item_comment_settings: number
      mentioned_users: string
      author: {
        id: string
        unique_id: string
        nickname: string
        avatar: string
      }
      is_top: number
    }
    cursor: number
    has_more: boolean
  }
}

export interface TiktokDown {
  code: number
  msg: string
  processed_time: number
  data: {
    id: string
    region: string
    title: string
    cover: string
    ai_dynamic_cover: string
    origin_cover: string
    duration: number
    play: string
    wmplay: string
    size: number
    wm_size: number
    music: string
    music_info: {
      id: string
      title: string
      play: string
      cover: string
      author: string
      original: boolean
      duration: number
      album: string
    }
    play_count: number
    digg_count: number
    comment_count: number
    share_count: number
    download_count: number
    collect_count: number
    create_time: number
    anchors: any | null
    anchors_extras: string
    is_ad: boolean
    commerce_info: {
      adv_promotable: boolean
      auction_ad_invited: boolean
      branded_content_type: number
      with_comment_filter_words: boolean
    }
    commercial_video_info: string
    item_comment_settings: number
    mentioned_users: string
    author: {
      id: string
      unique_id: string
      nickname: string
      avatar: string
    }
    images: string[]
  }
}

export interface InfoResponseYT {
  task_id: string
  status: "Pending" | "Success" | "Failed"
  result?: {
    error?: string
    title: string
    duration: number
    thumbnail: string
    videos: {
      label: string
      height: number
      width: number
    }[]
  }
}

export interface DownloadResponseYT {
  task_id: string
  status: "Pending" | "Success" | "Failed" | string
  result?: {
    error?: string
    url: string
  }
}
