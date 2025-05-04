// import { Tiktok } from "@seaavey/scapers";
import { Tiktok } from "./lib"

;(async () => {
  const { data } = await Tiktok.download("https://www.tiktok.com/@alfi1nnn/video/7458199548071120136?is_from_webapp=1&sender_device=pc")

  const title = data.title
  const video = data.play
  const audio = data.music

  console.log({ title, video, audio })
})()
