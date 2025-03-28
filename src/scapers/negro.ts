import axios from "axios"

const filters = ["need", "coklat", "hitam"]

export interface NegroResponse {
  status: string
  processedImageUrl: string
}

export default async function negro(buffer: Buffer, filter: string) {
  if (!buffer) return undefined
  if (!filters.includes(filter)) return undefined

  const { data } = await axios.post<NegroResponse>("https://negro.consulting/api/process-image", {
    imageData: buffer.toString("base64"),
    filter
  })

  if (data.status !== "success") return undefined

  const x = await axios.get(data.processedImageUrl, { responseType: "arraybuffer" })
  return Buffer.from(x.data)
}
