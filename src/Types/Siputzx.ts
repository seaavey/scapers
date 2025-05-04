/**
 * Generic API response structure.
 */
export interface IAI {
  /** Indicates the success or failure of the API request. */
  status: boolean
  /** The main data payload of the response. */
  data: string
  /** Optional error message if the request fails. */
  error?: string
}

/**
 * Detailed information about an anime from Anichin.
 */
export interface IAnichinDetail {
  /** The title of the anime. */
  title: string
  /** URL of the anime's thumbnail image. */
  thumbnail: string
  /** Rating of the anime. */
  rating: string
  /** Number of followers or subscribers. */
  followers: string
  /** Synopsis or description of the anime. */
  synopsis: string
  /** Alternative titles for the anime. */
  alternativeTitles: string
  /** Current airing status (e.g., Ongoing, Completed). */
  status: string
  /** Network or platform airing the anime. */
  network: string
  /** Studio responsible for the anime production. */
  studio: string
  /** Release date or year of the anime. */
  released: string
  /** Duration of each episode. */
  duration: string
  /** Season of release (e.g., Spring, Fall). */
  season: string
  /** Country of origin. */
  country: string
  /** Type of anime (e.g., Donghua, Movie). */
  type: string
  /** Total number of episodes. */
  episodes: string
  /** List of genres associated with the anime. */
  genres: string[]
  /** Indicates if the request was successful. */
  isSuccess: boolean
}

/**
 * Download links for an anime episode from Anichin.
 */
export interface IAnichinDownload {
  /** Indicates the success of the download link request. */
  status: boolean
  /** Array of download options with resolution and links. */
  data: {
    /** Resolution of the download (e.g., 720p, 1080p). */
    resolution: string
    /** Array of download links with hosting information. */
    links: {
      /** Name of the hosting service. */
      host: string
      /** URL to the download. */
      link: string
    }[]
  }[]
}

/**
 * List of episodes for an anime from Anichin.
 */
export interface IAnichinEpisode {
  /** Indicates the success of the episode list request. */
  status: boolean
  /** Array of episode details. */
  data: {
    /** Episode number. */
    episodeNumber: string
    /** Title of the episode. */
    title: string
    /** Subtitle status (e.g., Subbed, Dubbed). */
    subStatus: string
    /** Release date of the episode. */
    releaseDate: string
    /** URL to the episode. */
    link: string
  }[]
}

/**
 * Latest anime releases from Anichin.
 */
export interface IAnichinLatest {
  /** Indicates the success of the latest anime request. */
  status: boolean
  /** Array of latest anime releases. */
  data: {
    /** Title of the anime. */
    title: string
    /** URL to the anime page. */
    url: string
    /** Latest episode number. */
    episode: string
    /** URL of the anime's thumbnail. */
    thumbnail: string
    /** Type of anime (e.g., Donghua, Movie). */
    type: Type
  }[]
}

/**
 * Popular anime from Anichin.
 */
export interface IAnichinPopular {
  /** Indicates the success of the popular anime request. */
  status: boolean
  /** Array of popular anime. */
  data: {
    /** Title of the anime. */
    title: string
    /** Latest episode number. */
    episode: string
    /** Type of anime (e.g., Donghua, Movie). */
    type: Type
    /** URL to the anime page. */
    link: string
    /** URL of the anime's image. */
    image: string
  }[]
}

/**
 * Search results for anime from Anichin.
 */
export interface IAnichinSearch {
  /** Indicates the success of the search request. */
  status: boolean
  /** Array of search results. */
  data: {
    /** Title of the anime. */
    title: string
    /** Type of anime (e.g., Donghua, Movie). */
    type: Type
    /** Current airing status (e.g., Ongoing, Completed). */
    status: Status
    /** URL to the anime page. */
    link: string
    /** URL of the anime's image. */
    image: string
  }[]
}

/**
 * Detailed information about an anime from Auratail.
 */
export interface IAuratailDetail {
  /** Indicates the success of the detail request. */
  status: boolean
  /** Anime details. */
  data: {
    /** Title of the anime. */
    title: string
    /** URL of the anime's image. */
    image: string
    /** Current airing status (e.g., Ongoing, Completed). */
    status: string
    /** Studio responsible for production. */
    studio: string
    /** Total number of episodes. */
    episodes: string
    /** Duration of each episode. */
    duration: string
    /** Type of anime (e.g., Donghua, Movie). */
    type: string
    /** Release year of the anime. */
    releaseYear: string
    /** Producers of the anime. */
    producers: string
    /** Genres associated with the anime. */
    genres: string
    /** Synopsis or description of the anime. */
    synopsis: string
  }
}

/**
 * Latest anime releases from Auratail.
 */
export interface IAuratailLatest {
  /** Indicates the success of the latest anime request. */
  status: boolean
  /** Array of latest anime releases. */
  data: {
    /** Title of the anime. */
    title: string
    /** URL to the anime page. */
    url: string
    /** Latest episode number. */
    episode: string
    /** URL of the anime's thumbnail. */
    thumbnail: string
    /** Type of anime (e.g., Donghua, Movie). */
    type: string
  }[]
}

/**
 * Popular anime from Auratail.
 */
export interface IAuratailPopular {
  /** Indicates the success of the popular anime request. */
  status: boolean
  /** Array of popular anime. */
  data: {
    /** Title of the anime. */
    title: string
    /** URL to the anime page. */
    link: string
  }[]
}

/**
 * Search results for anime from Auratail.
 */
export interface IAuratailSearch {
  /** Indicates the success of the search request. */
  status: boolean
  /** Array of search results. */
  data: {
    /** Title of the anime. */
    title: string
    /** URL to the anime page. */
    link: string
    /** Current airing status (e.g., Ongoing, Completed). */
    status: Status
  }[]
}

/**
 * Search results for manga from Kiryuu.
 */
export interface IKiryuuSearch {
  /** Indicates the success of the search request. */
  status: boolean
  /** Array of manga search results. */
  data: {
    /** Title of the manga. */
    title: string
    /** Alternative title of the manga. */
    altTitle: string
    /** Description or synopsis of the manga. */
    description: string
    /** URL of the manga's image. */
    image: string
    /** Rating of the manga. */
    rating: string
    /** Current status (e.g., Ongoing, Completed). */
    status: string
    /** Release year or date of the manga. */
    released: string
    /** Author of the manga. */
    author: string
    /** Artist of the manga. */
    artist: string
    /** User or entity that posted the manga. */
    postedBy: string
    /** Number of views. */
    views: string
    /** Genres associated with the manga. */
    genres: string
    /** Optional download link for the manga. */
    downloadLink?: string
  }[]
}

/**
 * Detailed information about a manga from Komikindo.
 */
export interface IKomikindoDetail {
  /** Indicates the success of the detail request. */
  status: boolean
  /** Manga details. */
  data: {
    /** Title of the manga. */
    title: string
    /** Alternative title of the manga. */
    altTitle: string
    /** Current status (e.g., Ongoing, Completed). */
    status: string
    /** Author of the manga. */
    author: string
    /** List of genres. */
    genre: string[]
    /** Description or synopsis of the manga. */
    description: string
    /** URL of the manga's image. */
    imageUrl: string
    /** Array of chapters with their URLs. */
    chapters: { chapter: string; url: string }[]
  }
}

/**
 * Download links for a manga from Komikindo.
 */
export interface IKomikindoDownload {
  /** Indicates the success of the download request. */
  status: boolean
  /** Array of download URLs. */
  data: string[]
}

/**
 * Search results for manga from Komikindo.
 */
export interface IKomikindoSearch {
  /** Indicates the success of the search request. */
  status: boolean
  /** Array of manga search results. */
  data: {
    /** Title of the manga. */
    title: string
    /** URL to the manga page. */
    href: string
    /** URL of the manga's image. */
    image: string
    /** Type of manga. */
    type: string
    /** Rating of the manga. */
    rating: string
  }[]
}

/**
 * Anime release schedule from Samehadaku.
 */
export interface ISamehadakuRelease {
  /** Indicates the success of the release schedule request. */
  status: boolean
  /** Object mapping dates to arrays of release details. */
  data: Record<
    string,
    {
      /** Unique identifier for the release. */
      id: number
      /** Slug for the release. */
      slug: string
      /** Release date. */
      date: string
      /** Author or poster of the release. */
      author: string
      /** Type of content. */
      type: string
      /** Title of the anime. */
      title: string
      /** URL to the release page. */
      url: string
      /** Content or description of the release. */
      content: string
      /** Optional URL of the featured image. */
      featured_img_src?: string
      /** Genres of the anime. */
      genre: string
      /** Score or rating. */
      east_score: string
      /** Type of release (e.g., TV, Movie). */
      east_type: string
      /** Schedule of the release. */
      east_schedule: string
      /** Time of the release. */
      east_time: string
    }[]
  >
}

/**
 * Latest anime releases from Samehadaku.
 */
export interface ISamehadakuLatest {
  /** Indicates the success of the latest anime request. */
  status: boolean
  /** Latest anime release details. */
  data: {
    /** Total number of anime releases. */
    total: number
    /** Array of anime details. */
    anime: {
      /** Title of the anime. */
      title: string
      /** URL of the anime's thumbnail. */
      thumbnail: string
      /** User or entity that posted the anime. */
      postedBy: string
      /** Latest episode number. */
      episode: string
      /** Release date or time. */
      release: string
      /** URL to the anime page. */
      link: string
    }[]
  }
}

/**
 * Search results for anime from Samehadaku.
 */
export interface ISamehadakuSearch {
  /** Indicates the success of the search request. */
  status: boolean
  /** Array of anime search results. */
  data: {
    /** Title of the anime. */
    title: string
    /** Unique identifier for the anime. */
    id: string
    /** URL of the anime's thumbnail. */
    thumbnail: string
    /** Description or synopsis of the anime. */
    description: string
    /** List of genres. */
    genre: string[]
    /** List of types (e.g., TV, Movie). */
    type: string[]
    /** Rating or score. */
    star: string
    /** Number of views. */
    views: string
    /** URL to the anime page. */
    link: string
  }[]
}

/**
 * Anime quotes.
 */
export interface IQuotes {
  /** Indicates the success of the quotes request. */
  status: boolean
  /** Array of quote details. */
  data: {
    /** URL to the quote page. */
    link: string
    /** URL of the character's image. */
    gambar: string
    /** Name of the character. */
    karakter: string
    /** Title of the anime. */
    anime: string
    /** Episode number or identifier. */
    episode: string
    /** Date or time the quote was uploaded. */
    up_at: string
    /** The quote text. */
    quotes: string
  }[]
}

/**
 * APK information from AN1.
 */
export interface IApkAn1 {
  /** Indicates the success of the APK request. */
  status: boolean
  /** Array of APK details. */
  data: {
    /** Title of the APK. */
    title: string
    /** URL to the APK page. */
    link: string
    /** Developer of the APK. */
    developer: string
    /** URL of the APK's image. */
    image: string
    /** Rating information. */
    rating: {
      /** Numerical rating value. */
      value: number
      /** Percentage of positive ratings. */
      percentage: number
    }
    /** Type of APK (e.g., Mod, Original). */
    type: TypeAn1
  }[]
}

/**
 * APK information from Appstore.
 */
export interface IApkAppstore {
  /** Indicates the success of the APK request. */
  status: boolean
  /** Array of APK details. */
  data: {
    /** URL of the APK's image. */
    imageURL: string
    /** Title of the APK. */
    title: string
    /** Navigation links for the APK. */
    navLinks: {
      /** URL of the link. */
      link: string
      /** Label or name of the link. */
      label: string
    }[]
    /** Description of the APK. */
    description: string
  }[]
}

/**
 * APK information from Happymod.
 */
export interface IApkHappymod {
  /** Indicates the success of the APK request. */
  status: boolean
  /** APK details. */
  data: {
    /** Title of the APK. */
    title: string
    /** URL to the APK page. */
    link: string
    /** URL of the APK's image. */
    image: string
    /** Version of the APK. */
    version: string
    /** Features of the modded APK. */
    modFeatures: string
    /** Rating information. */
    rating: { value: number; percentage: number }
  }
}

/**
 * News articles from Antara.
 */
export interface INewsAntara {
  /** Indicates the success of the news request. */
  status: boolean
  /** Array of news articles. */
  data: {
    /** Title of the article. */
    title: string
    /** URL to the article. */
    link: string
    /** URL of the article's image. */
    image: string
    /** Category of the article. */
    category: string
    /** Type of article. */
    type: string
  }[]
}

/**
 * News articles from CNBC Indonesia.
 */
export interface INewsCnbcIND {
  /** Indicates the success of the news request. */
  status: boolean
  /** Array of news articles. */
  data: {
    /** Title of the article. */
    title: string
    /** URL to the article. */
    link: string
    /** URL of the article's image. */
    image: string
    /** Category of the article. */
    category: string
    /** Label or tag for the article. */
    label: string
    /** Publication date. */
    date: string
    /** Type of article. */
    type: string
  }[]
}

/**
 * News articles from CNN Indonesia.
 */
export interface INewsCnnIND {
  /** Indicates the success of the news request. */
  status: boolean
  /** Array of news articles. */
  data: {
    /** Title of the article. */
    title: string
    /** URL of the article's thumbnail image. */
    image_thumbnail: string
    /** URL of the article's full image. */
    image_full: string
    /** Publication time. */
    time: string
    /** URL to the article. */
    link: string
    /** Slug for the article. */
    slug: string
    /** Content or summary of the article. */
    content: string
  }[]
}

/**
 * News articles from JKT48.
 */
export interface INewsJKT48 {
  /** Indicates the success of the news request. */
  status: boolean
  /** Array of news articles. */
  data: {
    /** Title of the article. */
    title: string
    /** URL to the article. */
    link: string
    /** Publication date. */
    date: string
    /** URL of the article's icon. */
    icon: string
  }[]
}

/**
 * News articles from Liputan6.
 */
export interface INewsLiputan6 {
  /** Indicates the success of the news request. */
  status: boolean
  /** Array of news articles. */
  data: {
    /** Title of the article. */
    title: string
    /** URL to the article. */
    link: string
    /** URL of the article's thumbnail image. */
    image_thumbnail: string
    /** Publication time. */
    time: string
  }
}

/**
 * Response structure for Instagram media download data.
 */
export interface IDLInstagram {
  /** Indicates the success or failure of the Instagram download request. */
  status: boolean
  /** Array of Instagram media details. */
  data: {
    /** URL of the media's thumbnail image. */
    thumbnail: string
    /** URL to download the media (e.g., video or image). */
    url: string
  }[]
}
/**
 * Response structure for Twitter (X) download data.
 */
export interface IDLTwitter {
  /** Indicates the success or failure of the Twitter download request. */
  status: boolean
  /** Details of the Twitter media content. */
  data: {
    /** URL of the media's thumbnail or image. */
    imgUrl: string
    /** URL to download the media (e.g., video or image). */
    downloadLink: string
    /** Title of the video or media content. */
    videoTitle: string
    /** Description or caption of the media content. */
    videoDescription: string
  }
  /** Optional error message if the request fails. */
  error?: string
}

/**
 * Response structure for Apple Music download data.
 */
export interface IDLAppleMusic {
  /** Indicates the success or failure of the Apple Music download request. */
  status: boolean
  /** Details of the Apple Music content. */
  data: {
    /** Title of the music track or page. */
    pageTitle: string
    /** URL to download the MP3 file. */
    mp3DownloadLink: string
  }
}

/**
 * Response structure for Capcut media download data.
 */
export interface IDLCapcut {
  /** Indicates the success or failure of the Capcut download request. */
  status: boolean
  /** Details of the Capcut media content. */
  data: {
    /** Schema context for the media (e.g., JSON-LD context URL). */
    "@context": string
    /** Schema type for the media (e.g., VideoObject). */
    "@type": string
    /** Name or title of the media. */
    name: string
    /** Description of the media content. */
    description: string
    /** Array of URLs for thumbnail images. */
    thumbnailUrl: string[]
    /** Date the media was uploaded. */
    uploadDate: string
    /** URL to download or access the media content. */
    contentUrl: string
    /** Metadata for the media content. */
    meta: {
      /** Title of the media. */
      title: string
      /** Short description of the media. */
      desc: string
      /** Number of likes received. */
      like: number
      /** Number of plays or views. */
      play: number
      /** Duration of the media in seconds. */
      duration: number
      /** Number of times the media has been used (e.g., in templates). */
      usage: number
      /** Unix timestamp of when the media was created. */
      createTime: number
      /** URL of the cover image. */
      coverUrl: string
      /** Aspect ratio of the video (e.g., 16:9). */
      videoRatio: string
      /** Information about the media's author. */
      author: {
        /** Name of the author. */
        name: string
        /** URL of the author's avatar image. */
        avatarUrl: string
        /** Description or bio of the author. */
        description: string
        /** URL to the author's profile. */
        profileUrl: string
        /** Secure user ID of the author. */
        secUid: string
      }
    }
  }
}

/**
 * Response structure for Douyin media download data.
 */
export interface IDLDouyin {
  /** Indicates the success or failure of the Douyin download request. */
  status: boolean
  /** Details of the Douyin media content. */
  data: {
    /** Title or caption of the media. */
    title: string
    /** URL of the media's thumbnail image. */
    thumbnail: string
    /** Array of download options for the media. */
    downloads: {
      /** Quality of the download (e.g., 720p, 1080p). */
      quality: string
      /** URL to download the media. */
      url: string
    }[]
  }
}

/**
 * Response structure for Facebook media download data.
 */
export interface IDLFacebook {
  /** Indicates the success or failure of the Facebook download request. */
  status: boolean
  /** Array of download options for the Facebook media content. */
  data: {
    /** URL to download the media. */
    url: string
    /** Resolution of the media (e.g., 720p, 1080p). */
    resolution: string
    /** Format availability of the media (e.g., Yes or No). */
    format: Formats
  }[]
}

/**
 * Response structure for Google Drive media download data.
 */
export interface IDLGDrive {
  /** Indicates the success or failure of the Google Drive download request. */
  status: boolean
  /** Details of the Google Drive file. */
  data: {
    /** Name or title of the file. */
    name: string
    /** URL to download the file. */
    download: string
    /** URL to view or access the file on Google Drive. */
    link: string
  }
}

/**
 * Response structure for MediaFire file download data.
 */
export interface IDLMediaFire {
  /** Indicates the success or failure of the MediaFire download request. */
  status: boolean
  /** Details of the MediaFire file. */
  data: {
    /** Name of the file. */
    fileName: string
    /** URL to download the file. */
    downloadLink: string
    /** Size of the file (e.g., "5 MB"). */
    fileSize: string
    /** Description of the file. */
    description: string
    /** Date the file was uploaded. */
    uploadDate: string
    /** Type of the file (e.g., document, video). */
    fileType: string
    /** Compatibility information for the file. */
    compatibility: string
    /** Metadata for the file's webpage. */
    meta: {
      /** Viewport settings for responsive design. */
      viewport: string
      /** Keywords for SEO. */
      keywords: string
      /** Meta description for the webpage. */
      description: string
      /** Instructions for search engine crawlers. */
      robots: string
      /** Instructions for Googlebot. */
      googlebot: string
      /** Instructions for Yahoo Slurp crawler. */
      slurp: string
      /** Google Translate customization ID. */
      "google-translate-customization": string
      /** Application ID for the webpage. */
      app_id: string
      /** Type of content (e.g., website, article). */
      type: string
      /** Name of the site hosting the file. */
      site_name: string
      /** Locale of the webpage (e.g., en_US). */
      locale: string
      /** URL of the webpage. */
      url: string
      /** Title of the webpage. */
      title: string
      /** URL of the preview image for the file. */
      image: string
      /** Type of Twitter card for social sharing. */
      card: string
      /** Twitter handle of the site. */
      site: string
    }
    /** MIME type of the file (e.g., application/pdf). */
    mimeType: string
    /** File extension (e.g., .pdf, .mp4). */
    fileExtension: string
  }
}

/**
 * Response structure for Pinterest media download data.
 */
export interface IDLPinterest {
  /** Indicates the success or failure of the Pinterest download request. */
  status: boolean
  /** Details of the Pinterest media content. */
  data: {
    /** Unique identifier of the Pinterest pin. */
    id: string
    /** Date and time when the pin was created. */
    created_at: string
    /** URL to download or access the media (e.g., image or video). */
    url: string
  }
}

/**
 * Response structure for SoundCloud audio download data.
 */
export interface IDLSoundCloud {
  /** Indicates the success or failure of the SoundCloud download request. */
  status: boolean
  /** Title of the audio track. */
  title: string
  /** URL to download or access the audio track. */
  url: string
  /** URL of the track's thumbnail image. */
  thumbnail: string
  /** Duration of the track in seconds. */
  duration: number
  /** Username or display name of the track's uploader. */
  user: string
  /** Description of the audio track. */
  description: string
}

/**
 * Response structure for SnackVideo media download data.
 */
export interface IDLSnackVideo {
  /** Indicates the success or failure of the SnackVideo download request. */
  status: boolean
  /** Details of the SnackVideo media content. */
  data: {
    /** URL of the SnackVideo post. */
    url: string
    /** Title or caption of the video. */
    title: string
    /** Description of the video content. */
    description: string
    /** URL of the video's thumbnail image. */
    thumbnail: string
    /** Date the video was uploaded (e.g., YYYY-MM-DD). */
    uploadDate: string
    /** URL to download or access the video. */
    videoUrl: string
    /** Duration of the video (e.g., "2 minutes 36 seconds"). */
    duration: string
    /** Interaction metrics for the video. */
    interaction: {
      /** Number of views. */
      views: number
      /** Number of likes. */
      likes: number
      /** Number of shares. */
      shares: number
    }
    /** Information about the video's creator. */
    creator: {
      /** Name of the creator. */
      name: string
      /** URL to the creator's profile. */
      profileUrl: string
      /** Bio or description of the creator. */
      bio: string
    }
  }
}

/**
 * Response structure for Spotify music or album download data.
 */
export interface IDLSpotify {
  /** Indicates the success or failure of the Spotify download request. */
  status: boolean
  /** Details of the Spotify music or album content. */
  data: {
    /** Title of the track or album. */
    title: string
    /** Type of content (e.g., album, track). */
    type: string
    /** Artist or band name. */
    artis: string
    /** Duration of the track or album in milliseconds. */
    durasi: number
    /** URL of the cover image for the track or album. */
    image: string
    /** URL to download the MP3 file. */
    download: string
    /** Status code or identifier for the content (e.g., processing status). */
    status: number
  }
}

/**
 * Response structure for Sticker.ly sticker pack download data.
 */
export interface IDLStickerLy {
  /** Indicates the success or failure of the Sticker.ly download request. */
  status: boolean
  /** Details of the Sticker.ly sticker pack. */
  data: {
    /** URL of the sticker pack. */
    pack_url: string
    /** Total number of stickers in the pack. */
    total_stickers: number
    /** Array of URLs for individual stickers. */
    stickers: string[]
  }
}

/**
 * Response structure for TikTok media download data.
 */
export interface IDLTikTok {
  /** Indicates the success or failure of the TikTok download request. */
  success: boolean
  /** Details of the TikTok media content. */
  data: {
    /** Metadata for the TikTok post. */
    metadata: {
      /** Interaction statistics for the post. */
      stats: {
        /** Number of likes received. */
        likeCount: number
        /** Number of plays or views. */
        playCount: number
        /** Number of comments. */
        commentCount: number
        /** Number of shares. */
        shareCount: number
      }
      /** Title of the post (may be empty). */
      title: string
      /** Description of the post (may be empty). */
      description: string
      /** Array of hashtags associated with the post. */
      hashtags: string[]
      /** Country code where the post was created (e.g., ID for Indonesia). */
      locationCreated: string
      /** Array of suggested words related to the post. */
      suggestedWords: string[]
    }
    /** Download options for the post. */
    download: {
      /** Array of video download URLs (different qualities or sources). */
      video: string[]
      /** URL to download the audio track. */
      audio: string
    }
  }
  /** Unique identifier of the TikTok post. */
  postId: string
}
/**
 * Enum for media format availability.
 */
export enum Formats {
  /** Indicates the format is not available. */
  No = "no",
  /** Indicates the format is available. */
  Yes = "yes"
}
/**
 * Enum for anime types.
 */
export enum Type {
  /** Chinese anime. */
  Donghua = "Donghua",
  /** Anime movie. */
  Movie = "Movie"
}

/**
 * Enum for anime or manga status.
 */
export enum Status {
  /** Content has finished airing or publishing. */
  Completed = "Completed",
  /** Content is still airing or publishing. */
  Ongoing = "Ongoing"
}

/**
 * Enum for APK types.
 */
export enum TypeAn1 {
  /** Modified version of the app. */
  MOD = "Mod",
  /** Original version of the app. */
  Original = "Original"
}
