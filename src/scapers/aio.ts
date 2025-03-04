/**
 * Fetches TikTok video data using the AnyDownloader API.
 *
 * @param url - The TikTok video URL to process.
 * @returns A Promise that resolves to a `TikTok` object containing video details or `undefined` if the request fails.
 *
 * This function sends a POST request to the AnyDownloader API with the provided TikTok URL.
 * It includes necessary headers and body parameters for the request.
 * Throws an error if the API response is invalid or if the request fails.
 */
import axios from "axios";

export const aio = async (url: string): Promise<TikTok | undefined> => {
  try {
    const response = await axios.post(
      "https://anydownloader.com/wp-json/aio-dl/video-data/",
      new URLSearchParams({
        url,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://anydownloader.com/",
          Token:
            "5b64d1dc13a4b859f02bcf9e572b66ea8e419f4b296488b7f32407f386571a0d",
        },
      }
    );
    const data = response.data;
    return data as TikTok;
  } catch (error) {
    console.error("Error fetching TikTok data:", error);
  }
};

/**
 * Interface representing the structure of TikTok video data returned by the API.
 */
interface TikTok {
  /**
   * The original TikTok video URL.
   */
  url: string;

  /**
   * The title or caption of the TikTok video.
   */
  title: string;

  /**
   * The URL of the video's thumbnail image.
   */
  thumbnail: string;

  /**
   * The duration of the video in seconds, or null if unavailable.
   */
  duration: null | number;

  /**
   * The source platform of the video (always "tiktok").
   */
  source: "tiktok";

  /**
   * An array of media options available for the video.
   */
  medias: {
    /**
     * The direct download URL for the media.
     */
    url: string;

    /**
     * The quality of the media (e.g., HD Watermark, HD No Watermark, 128kbps).
     */
    quality: "HD Watermark" | "HD No Watermark" | "128kbps";

    /**
     * The file extension of the media (e.g., mp4, mp3).
     */
    extension: "mp4" | "mp3";

    /**
     * The size of the media file in bytes.
     */
    size: number;

    /**
     * The formatted size of the media file (e.g., "5.2 MB").
     */
    formattedSize: string;

    /**
     * Indicates whether the media contains video.
     */
    videoAvailable: boolean;

    /**
     * Indicates whether the media contains audio.
     */
    audioAvailable: boolean;

    /**
     * Indicates whether the media is chunked.
     */
    chunked: boolean;

    /**
     * Indicates whether the media is cached.
     */
    cached: boolean;
  }[];

  /**
   * Session ID for the request, or null if unavailable.
   */
  sid: null | string;
}
