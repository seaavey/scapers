import { Aspects, Styless } from "../Types"

export default async function (prompts: string, style: Styless = "default", number: number = 1, negative: string = "", aspect: Aspects = "1:1") {
  const res = await fetch("https://aicharalab.com/api/character/character-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
      Referer: "https://aicharalab.com/ghibli-ai-generator"
    },
    body: JSON.stringify({
      prompts,
      negative,
      image_style: style,
      style_transfer: 0,
      aspect_ratio: aspect,
      number
    })
  })

  const json = (await res.json()) as {
    status: number
    msg: string
    data: {
      task_id: string
      remain: number
      limit: number
    }
  }

  while (true) {
    const res = await fetch(`https://aicharalab.com/api/dash/task-status?task_id=${json.data.task_id}&project_name=characte`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
        Referer: "https://aicharalab.com/ghibli-ai-generator"
      }
    })

    const data = (await res.json()) as {
      status: number
      data: any
    }

    if (data.status === 100000) {
      return data.data.result[0]
    }

    await new Promise(resolve => setTimeout(resolve, 2000))
  }
}
