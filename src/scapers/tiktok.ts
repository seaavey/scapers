import axios from "axios";

/**
 * Fetches TikTok video data using the TikWM API.
 *
 * @param url - The TikTok video URL to process.
 * @param hd - Optional. If true, requests the HD version of the video. Defaults to false.
 * @returns A Promise that resolves to a `TiktokResponse` object containing video details.
 *
 * This function sends a POST request to the TikWM API with the provided URL and optional HD flag.
 * It includes necessary headers for the request and validates the API response.
 * Throws an error if the API response is invalid or if the request fails.
 */
export const download = async (
  url: string,
  hd: boolean = false
): Promise<TiktokDown> => {
  try {
    const params = new URLSearchParams();
    params.append("url", url);
    if (hd) params.append("hd", "1");

    const { data } = await axios.post<TiktokDown>(
      "https://tikwm.com/api/",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Cookie: "current_language=en",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        },
      }
    );

    if (!data || typeof data.code !== "number") {
      throw new Error("Invalid API response");
    }

    return data;
  } catch (error) {
    throw new Error(`Tiktok API Error: ${(error as Error).message}`);
  }
};

export const search = async (query: string): Promise<TiktokSearch> => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://tikwm.com/api/feed/search",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Cookie: "current_language=en",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
      },
      data: `keywords=${encodeURIComponent(query)}&count=10&cursor=0&HD=1`,
    });

    return response.data as TiktokSearch;
  } catch (error) {
    throw new Error(
      "Gagal mendapatkan hasil dari API TikTok: " + error.message
    );
  }
};

export interface TiktokSearch {
  code: number;
  msg: string;
  processed_time: number;
  data: {
    video: {
      video_id: string;
      region: string;
      title: string;
      cover: string;
      ai_dynamic_cover: string;
      origin_cover: string;
      duration: number;
      play: string;
      wmplay: string;
      size: number;
      wm_size: number;
      music: string;
      music_info: {
        id: string;
        title: string;
        play: string;
        cover: string;
        author: string;
        original: boolean;
        duration: number;
        album: string;
      };
      play_count: number;
      digg_count: number;
      comment_count: number;
      share_count: number;
      download_count: number;
      create_time: number;
      anchors: null;
      anchors_extras: string;
      is_ad: boolean;
      commerce_info: {
        auction_ad_invited: boolean;
        with_comment_filter_words: boolean;
        adv_promotable: boolean;
        branded_content_type: number;
      };
      commercial_video_info: string;
      item_comment_settings: number;
      mentioned_users: string;
      author: {
        id: string;
        unique_id: string;
        nickname: string;
        avatar: string;
      };
      is_top: number;
    };
    cursor: number;
    has_more: boolean;
  };
}

export interface TiktokDown {
  code: number;
  msg: string;
  processed_time: number;
  data: {
    id: string;
    region: string;
    title: string;
    cover: string;
    ai_dynamic_cover: string;
    origin_cover: string;
    duration: number;
    play: string;
    wmplay: string;
    size: number;
    wm_size: number;
    music: string;
    music_info: {
      id: string;
      title: string;
      play: string;
      cover: string;
      author: string;
      original: boolean;
      duration: number;
      album: string;
    };
    play_count: number;
    digg_count: number;
    comment_count: number;
    share_count: number;
    download_count: number;
    collect_count: number;
    create_time: number;
    anchors: any | null;
    anchors_extras: string;
    is_ad: boolean;
    commerce_info: {
      adv_promotable: boolean;
      auction_ad_invited: boolean;
      branded_content_type: number;
      with_comment_filter_words: boolean;
    };
    commercial_video_info: string;
    item_comment_settings: number;
    mentioned_users: string;
    author: {
      id: string;
      unique_id: string;
      nickname: string;
      avatar: string;
    };
    images: string[];
  };
}
