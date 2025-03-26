import axios from "axios"

export interface InfoResponse {
  task_id: string
  status: "Pending" | "Success" | "Failed"
  result?: {
    error?: string
    title: string
    duration: number
    thumbnail: string
    videos: {
      label: string
      height: number
      width: number
    }[]
  }
}

export interface DownloadResponse {
  task_id: string
  status: "Pending" | "Success" | "Failed" | string
  result?: {
    error?: string
    url: string
  }
}

export const getInfo = async (url: string): Promise<InfoResponse | undefined> => {
  try {
    const { task_id } = await axios.post<{ task_id: string }>(`https://api.grabtheclip.com/submit-info`, { url }).then(res => res.data)
    while (true) {
      const response = await axios.get<InfoResponse>(`https://api.grabtheclip.com/get-info/${task_id}`).then(res => res.data)

      if (response.status === "Success") {
        return response as InfoResponse
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

export const Download = async (url: string, type: string = "audio"): Promise<DownloadResponse | undefined> => {
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
      const response = await axios.get<DownloadResponse>(`https://api.grabtheclip.com/get-download/${task_id}`).then(res => res.data)

      if (response.status === "Success") {
        return response as DownloadResponse
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
