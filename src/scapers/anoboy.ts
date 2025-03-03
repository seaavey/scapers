import axios from "axios";
import * as cheerio from "cheerio";

export const anoboy = async (query: string): Promise<Anoboy[] | undefined> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get("https://anoboy.li/?s=" + encodeURIComponent(query))
      .then(async ({ data }) => {
        let $ = cheerio.load(data);
        let array = [] as Anoboy[];
        $(".bsx").each((a: Number, i: any) => {
          array.push({
            title: $(i)
              .find("a > .tt")
              .text()
              .replace($(i).find("a > .tt > h2").text(), "")
              .trim(),
            type: $(i).find(".limit > .typez").text(),
            thumb: $(i).find(".limit > img").attr("src"),
            url: $(i).find("a").attr("href"),
          });
        });
        resolve(array);
      })
      .catch((err) => {
        reject({
          error: err,
          message: "An error occurred while fetching the data",
        });
      });
  });
};

export interface Anoboy {
  title: string;
  type: string;
  thumb: string | undefined;
  url: string | undefined;
}
