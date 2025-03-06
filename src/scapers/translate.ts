import axios from "axios";

export default async function translate(text: string, to: string) {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.append("client", "gtx");
  url.searchParams.append("sl", "auto");
  url.searchParams.append("dt", "t");
  url.searchParams.append("tl", to);
  url.searchParams.append("q", text);

  const response = await axios.get(url.toString());
  const result = [response.data[0]].map(([[a]]) => a).join(" ") || "";
  return result;
}
