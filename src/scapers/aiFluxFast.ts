import axios from "axios"
import { AIFluxFastResponse } from "../Types"

export default async function aiFluxFast(prompt: string): Promise<AIFluxFastResponse | null> {
  try {
    const { data } = await axios.post<AIFluxFastResponse>(
      "https://fluxai.pro/api/tools/fast",
      {
        prompt
      },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; FluxAI-Client/1.0)",
          Accept: "application/json"
        }
      }
    )
    return data as AIFluxFastResponse
  } catch (error) {
    console.error("Error in aiFluxFast:", error)
    return null
  }
}
