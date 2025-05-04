import axios from "axios"
import { DownloadResponseYT, InfoResponseYT } from "../Types"

export const getInfo = async (url: string): Promise<InfoResponseYT | undefined> => {
  try {
    const { task_id } = await axios.post<{ task_id: string }>(`https://api.grabtheclip.com/submit-info`, { url }).then(res => res.data)
    while (true) {
      const response = await axios.get<InfoResponseYT>(`https://api.grabtheclip.com/get-info/${task_id}`).then(res => res.data)

      if (response.status === "Success") {
        return response as InfoResponseYT
      } else if (response.status === "Failed") {
        console.error(response.result?.error)
        return undefined
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  } catch (error) {
    console.error("Error fetching info:", error)
    return undefined
  }
}

export const Download_YT = async (url: string, type: string = "audio"): Promise<DownloadResponseYT | undefined> => {
  try {
    let payload = {
      height: type === "audio" ? 0 : 360,
      media_type: type,
      url
    } as {
      height: number
      media_type: string
      url: string
    }
    const { task_id } = await axios.post<{ task_id: string }>(`https://api.grabtheclip.com/submit-download`, payload).then(res => res.data)

    while (true) {
      const response = await axios.get<DownloadResponseYT>(`https://api.grabtheclip.com/get-download/${task_id}`).then(res => res.data)

      if (response.status === "Success") {
        return response as DownloadResponseYT
      } else if (response.status === "Failed") {
        console.error(response.result?.error)
        return undefined
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  } catch (error) {
    console.error("Error fetching info:", error)
    return undefined
  }
}
