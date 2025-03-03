import axios from "axios";

export const aio = async (url: string): Promise<TikTok | undefined> => {
  try {
    const response = await axios.post(
      "https://anydownloader.com/wp-json/aio-dl/video-data/",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://anydownloader.com/",
          Token:
            "5b64d1dc13a4b859f02bcf9e572b66ea8e419f4b296488b7f32407f386571a0d",
        },
        body: new URLSearchParams({
          url,
        }),
      }
    );
    const data = response.data;
    return data as TikTok;
  } catch (error) {
    console.error(error);
  }
};

interface TikTok {
  url: string;
  title: string;
  thumbnail: string;
  duration: null | number;
  source: "tiktok";
  medias: {
    url: string;
    quality: "HD Watermark" | "HD No Watermark" | "128kbps";
    extension: "mp4" | "mp3";
    size: number;
    formattedSize: string;
    videoAvailable: boolean;
    audioAvailable: boolean;
    chunked: boolean;
    cached: boolean;
  }[];
  sid: null | string;
}
