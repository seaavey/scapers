import axios from "axios";
import * as cheerio from "cheerio";

export const populer = async (): Promise<Populer> => {
  const response = await axios.get("https://anilist.co");
  const $ = cheerio.load(response.data);

  const trending = $(".landing-section.trending .results .media-card")
    .map((i, el) => {
      return {
        i,
        title: $(el).find(".title").text().trim(),
        link: "https://anilist.co" + $(el).find("a.cover").attr("href"),
        image: $(el).find("img.image").attr("src"),
      };
    })
    .get();

  const upcoming = $(".landing-section.nextSeason .results .media-card")
    .map((i, el) => {
      return {
        i,
        title: $(el).find(".title").text().trim(),
        link: "https://anilist.co" + $(el).find("a.cover").attr("href"),
        image: $(el).find("img.image").attr("src"),
      } as {
        i: number;
        title: string;
        link: string;
        image: string;
      };
    })
    .get();

  const top = $(".landing-section.top .results .media-card")
    .map((i, el) => {
      return {
        i,
        title: $(el).find(".title").text().trim(),
        link: "https://anilist.co" + $(el).find("a.cover").attr("href"),
        image: $(el).find("img.image").attr("src"),
      };
    })
    .get();

  const populer = $(".landing-section.season .results .media-card")
    .map((i, el) => {
      return {
        i,
        title: $(el).find(".title").text().trim(),
        link: "https://anilist.co" + $(el).find("a.cover").attr("href"),
        image: $(el).find("img.image").attr("src"),
      };
    })
    .get();

  return { trending, upcoming, top, populer } as Populer;
};

export const search = async (query: string) => {
  const response = await axios.get(
    `https://anilist.co/search/anime?query=${encodeURIComponent(query)}`
  );

  const $ = cheerio.load(response.data);

  const results = [] as {
    title: string;
    image: string | undefined;
    link: string | undefined;
  }[];

  $(".media-card").each((index, el) => {
    const title = $(el).find(".title").text().trim();
    const image = $(el).find(".image").attr("src");
    const link = $(el).find(".cover").attr("href");

    results.push({
      title,
      image,
      link,
    });
  });
};

export interface Populer {
  trending: PopulerDefault[];
  upcoming: PopulerDefault[];
  top: PopulerDefault[];
  populer: PopulerDefault[];
}

export interface PopulerDefault {
  i: number;
  title: string;
  link: string;
  image: string;
}
