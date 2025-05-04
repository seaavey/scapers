import axios from "axios"
import FormData from "form-data"
import { IDeepSeek } from "../Types"

export default async function deepseekv1(question: string): Promise<IDeepSeek> {
  const form = new FormData()
  form.append("content", `User: ${question}`)
  form.append("model", "@hf/thebloke/deepseek-coder-6.7b-instruct-awq")

  const response = await axios.post("https://mind.hydrooo.web.id/v1/chat", form, {
    headers: {
      ...form.getHeaders()
    }
  })
  return response.data as IDeepSeek
}
