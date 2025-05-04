import axios from "axios"
import { Fitlers, NegroResponse } from "../Types"

export default async function negro(buffer: Buffer, filter: Fitlers) {
  if (!buffer) return undefined

  const { data } = await axios.post<NegroResponse>("https://negro.consulting/api/process-image", {
    imageData: buffer.toString("base64"),
    filter
  })

  if (data.status !== "success") return undefined

  return Buffer.from(data.processedImageUrl.split(",")[1], "base64")
}
