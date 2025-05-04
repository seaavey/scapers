/**
 * Siputzx API Client
 *
 * A simple and efficient interface to interact with the Siputzx API.
 *
 * Base URL:
 * - https://api.siputzx.my.id
 *
 * Features:
 * - Seamless integration with modern JavaScript/TypeScript projects
 * - Clean, modular, and extensible architecture
 *
 * @author
 * - Muhammad Adriansyah <https://github.com/seaavey>
 *
 * @license
 * MIT License
 *
 * Copyright (c) 2025
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 */

import { IAI, IAnichinDetail, IAnichinDownload, IAnichinEpisode, IAnichinLatest, IAnichinPopular, IAnichinSearch, IApkAn1, IApkAppstore, IApkHappymod, IAuratailDetail, IAuratailLatest, IAuratailPopular, IAuratailSearch, IDLAppleMusic, IDLCapcut, IDLDouyin, IDLFacebook, IDLGDrive, IDLInstagram, IDLMediaFire, IDLPinterest, IDLSnackVideo, IDLSoundCloud, IDLSpotify, IDLStickerLy, IDLTikTok, IDLTwitter, IKiryuuSearch, IKomikindoDetail, IKomikindoDownload, IKomikindoSearch, INewsAntara, INewsCnbcIND, INewsCnnIND, INewsJKT48, INewsLiputan6, IQuotes, ISamehadakuLatest, ISamehadakuRelease, ISamehadakuSearch, METHOD } from "../Types"

/**
 * Sends a request to the Siputzx API and returns JSON data.
 *
 * @template T - The expected response data type.
 * @template B - The request body type (optional, defaults to unknown).
 * @param endpoint - The API endpoint (e.g., "ai/llama33").
 * @param parameters - URL query parameters as an object (optional).
 * @param method - HTTP method (e.g., "GET", "POST").
 * @param body - Request body (optional).
 * @param retryCount - Number of retry attempts for failed requests (default: 3).
 * @param timeoutMs - Request timeout in milliseconds (default: 10000).
 * @returns A promise resolving to the response data of type T.
 * @throws Error if the request fails after all retries.
 */
export const request = async <T, B = unknown>(endpoint: string, parameters: Record<string, string> = {}, method: METHOD = "GET", body?: B, retryCount: number = 3, timeoutMs: number = 10000): Promise<T> => {
  const url = new URL(`https://api.siputzx.my.id/api/${endpoint}`)
  Object.entries(parameters).forEach(([key, value]) => url.searchParams.append(key, value))

  for (let attempt = 1; attempt <= retryCount; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal
      })

      clearTimeout(timeout)

      if (!response.ok) {
        if (response.status >= 500 && response.status < 600 && attempt < retryCount) {
          console.warn(`Retrying (${attempt}/${retryCount})...`)
          continue
        }

        const errorText = await response.text()
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`)
      }

      const data: T = await response.json()
      return data
    } catch (error: any) {
      clearTimeout(timeout)

      const isAbort = error.name === "AbortError"
      const isLastAttempt = attempt === retryCount

      if (isAbort) {
        console.warn(`Request timeout on attempt ${attempt}.`)
      } else {
        console.warn(`Request failed on attempt ${attempt}:`, error)
      }

      if (isLastAttempt) {
        console.error(`API request to ${endpoint} failed after ${retryCount} attempts.`)
        throw error
      }
    }
  }

  throw new Error(`API request to ${endpoint} failed after ${retryCount} attempts.`)
}

/**
 * Sends a request to the Siputzx API and returns binary data as a Buffer.
 *
 * @param endpoint - The API endpoint (e.g., "ai/dreamshaper").
 * @param parameters - URL query parameters as an object (optional).
 * @param method - HTTP method (e.g., "GET", "POST").
 * @param body - Request body as a Buffer (optional).
 * @param retryCount - Number of retry attempts for failed requests (default: 3).
 * @param timeoutMs - Request timeout in milliseconds (default: 10000).
 * @returns A promise resolving to the response data as a Buffer.
 * @throws Error if the request fails or the response is not binary.
 */
export const requestBuffer = async (endpoint: string, parameters: Record<string, string> = {}, method: METHOD = "GET", body?: Buffer, retryCount: number = 3, timeoutMs: number = 10000): Promise<Buffer> => {
  const url = new URL(`https://api.siputzx.my.id/api/${endpoint}`)
  Object.entries(parameters).forEach(([key, value]) => url.searchParams.append(key, value))

  for (let attempt = 1; attempt <= retryCount; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: { "Content-Type": "application/json" },
        body: body,
        signal: controller.signal
      })

      clearTimeout(timeout)

      if (!response.ok) {
        if (response.status >= 500 && response.status < 600 && attempt < retryCount) {
          console.warn(`Retrying (${attempt}/${retryCount})...`)
          continue
        }

        const errorText = await response.text()
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`)
      }

      const contentType = response.headers.get("Content-Type") || ""
      if (contentType.includes("application/octet-stream") || contentType.includes("image/")) {
        const buffer = await response.arrayBuffer()
        return Buffer.from(buffer)
      } else {
        throw new Error("Expected binary data but received non-binary response.")
      }
    } catch (error: any) {
      clearTimeout(timeout)

      const isAbort = error.name === "AbortError"
      const isLastAttempt = attempt === retryCount

      if (isAbort) {
        console.warn(`Request timeout on attempt gehehe.`)
      } else {
        console.warn(`Request failed on attempt ${attempt}:`, error)
      }

      if (isLastAttempt) {
        console.error(`API request to ${endpoint} failed after ${retryCount} attempts.`)
        throw error
      }
    }
  }

  throw new Error("Unknown error occurred in request retry logic.")
}
/**
 * AI-related API endpoints for interacting with various AI models provided by the Siputzx API.
 *
 * These functions allow querying different AI models for tasks such as text generation, image analysis,
 * image generation, and specialized queries (e.g., religious or cultural contexts). Each function uses
 * the `request` or `requestBuffer` helper to communicate with the Siputzx API at `https://api.siputzx.my.id`.
 */

/**
 * Queries the Llama33 AI model with a prompt and text input.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param text - The input text to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Llama33("Summarize this:", "Long article text...");
 * console.log(response); // Outputs AI-generated summary
 * ```
 */
export const AI_Llama33 = async (prompt: string, text: string): Promise<IAI> => {
  return await request<IAI>("ai/llama33", { prompt, text })
}

/**
 * Queries the Meta Llama 33-70B Instruct Turbo AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_META("Explain quantum physics in simple terms");
 * console.log(response); // Outputs simplified explanation
 * ```
 */
export const AI_META = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/meta-llama-33-70B-instruct-turbo", { content })
}

/**
 * Queries the Nous Hermes AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_NousHermes("Write a poem about the sea");
 * console.log(response); // Outputs AI-generated poem
 * ```
 */
export const AI_NousHermes = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/nous-hermes", { content })
}

/**
 * Queries the Joko AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Joko("Tell me a joke");
 * console.log(response); // Outputs AI-generated joke
 * ```
 */
export const AI_Joko = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/joko", { content })
}

/**
 * Queries the Aoyo AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Aoyo("Describe a futuristic city");
 * console.log(response); // Outputs AI-generated description
 * ```
 */
export const AI_Aoyo = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/aoyo", { content })
}

/**
 * Queries the Bard AI model with an image URL and a query for image-based analysis.
 *
 * @param imageUrl - The URL of the image to analyze.
 * @param query - The query or instruction related to the image.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_BardIMG("https://example.com/image.jpg", "Describe this image");
 * console.log(response); // Outputs AI-generated description
 * ```
 */
export const AI_BardIMG = async (imageUrl: string, query: string): Promise<IAI> => {
  return await request<IAI>("ai/bard-img", { imageUrl, query })
}

/**
 * Queries the Bard AI model with a text query.
 *
 * @param query - The text query for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Bard("What is the capital of France?");
 * console.log(response); // Outputs AI-generated answer
 * ```
 */
export const AI_Bard = async (query: string): Promise<IAI> => {
  return await request<IAI>("ai/bard-thinking", { query })
}

/**
 * Queries the Bible AI model with a question, typically for religious or biblical insights.
 *
 * @param question - The question related to biblical topics.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Bible("What is the meaning of John 3:16?");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_Bible = async (question: string): Promise<IAI> => {
  return await request<IAI>("ai/bible", { question })
}

/**
 * Queries the Copilot AI model with text input.
 *
 * @param text - The input text for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Copilot("Help me debug this code...");
 * console.log(response); // Outputs AI-generated debugging advice
 * ```
 */
export const AI_Copilot = async (text: string): Promise<IAI> => {
  return await request<IAI>("ai/copilot", { text })
}

/**
 * Queries the Blackbox Pro AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_BlackboxPro("Generate a business plan outline");
 * console.log(response); // Outputs AI-generated outline
 * ```
 */
export const AI_BlackboxPro = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/blackboxai-pro", { content })
}

/**
 * Queries the Blackbox AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Blackbox("Explain machine learning basics");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_Blackbox = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/blackboxai", { content })
}

/**
 * Queries the Claude Sonnet 3.7 AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_ClaudeSonnet("Write a short story");
 * console.log(response); // Outputs AI-generated story
 * ```
 */
export const AI_ClaudeSonnet = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/claude-sonnet-37", { content })
}

/**
 * Queries the DBRX Instruct AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_DBRX("What are the benefits of meditation?");
 * console.log(response); // Outputs AI-generated benefits
 * ```
 */
export const AI_DBRX = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/dbrx-instruct", { content })
}

/**
 * Queries the DeepSeek LLM 67B Chat AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_DeepSeek("Explain blockchain technology");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_DeepSeek = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/deepseek-llm-67b-chat", { content })
}

/**
 * Queries the DeepSeek AI model with a custom prompt and message.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param message - The input message to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_DeepSeekCustom("Act as a teacher", "Explain calculus");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_DeepSeekCustom = async (prompt: string, message: string): Promise<IAI> => {
  return await request<IAI>("ai/deepseek", { prompt, message })
}

/**
 * Queries the DeepSeek R1 AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_DeepSeekR1("What is artificial intelligence?");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_DeepSeekR1 = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/deepseek-r1", { content })
}

/**
 * Generates an image using the DreamShaper AI model with a prompt.
 *
 * @param prompt - The description of the image to generate.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await AI_DreamShaper("A futuristic city at night");
 * // Save or process the image buffer
 * ```
 */
export const AI_DreamShaper = async (prompt: string): Promise<Buffer> => {
  return await requestBuffer("ai/dreamshaper", { prompt })
}

/**
 * Queries the DuckAI model with a query.
 *
 * @param query - The text query for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_DuckAI("What is the weather like today?");
 * console.log(response); // Outputs AI-generated weather info
 * ```
 */
export const AI_DuckAI = async (query: string): Promise<IAI> => {
  return await request<IAI>("ai/duckai", { query })
}

/**
 * Queries the ESIA AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_ESIA("Write a marketing slogan");
 * console.log(response); // Outputs AI-generated slogan
 * ```
 */
export const AI_ESIA = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/esia", { content })
}

/**
 * Performs face swapping using source and target images.
 *
 * @param source - The URL of the source image (face to swap).
 * @param target - The URL of the target image (body or scene).
 * @returns A promise resolving to the swapped image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await AI_FaceSwap("https://example.com/face.jpg", "https://example.com/body.jpg");
 * // Save or process the image buffer
 * ```
 */
export const AI_FaceSwap = async (source: string, target: string): Promise<Buffer> => {
  return await requestBuffer("ai/faceswap", { source, target })
}

/**
 * Queries the Felo AI model with a query.
 *
 * @param query - The text query for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Felo("What is the history of coffee?");
 * console.log(response); // Outputs AI-generated history
 * ```
 */
export const AI_Felo = async (query: string): Promise<IAI> => {
  return await request<IAI>("ai/felo", { query })
}

/**
 * Queries the FlatAI model with a prompt, returning either a Buffer or IAI response.
 *
 * @param prompt - The input prompt for the AI model.
 * @returns A promise resolving to either a `Buffer` (for images) or `IAI` (for text).
 * @example
 * ```typescript
 * const response = await AI_FlatAI("Generate a logo for a tech company");
 * if (response instanceof Buffer) {
 *   // Handle image buffer
 * } else {
 *   console.log(response); // Handle text response
 * }
 * ```
 */
export const AI_FlatAI = async (prompt: string): Promise<Buffer | IAI> => {
  return await requestBuffer("ai/flatai", { prompt })
}

/**
 * Generates an image using the Flux AI model with a prompt.
 *
 * @param prompt - The description of the image to generate.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await AI_Flux("A serene mountain landscape");
 * // Save or process the image buffer
 * ```
 */
export const AI_Flux = async (prompt: string): Promise<Buffer> => {
  return await requestBuffer("ai/flux", { prompt })
}

/**
 * Queries the Gandalf AI model with a prompt.
 *
 * @param prompt - The input prompt for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Gandalf("Write a fantasy story intro");
 * console.log(response); // Outputs AI-generated story intro
 * ```
 */
export const AI_Gandalf = async (prompt: string): Promise<IAI> => {
  return await request<IAI>("ai/gandalf", { prompt })
}

/**
 * Queries the Gemini Pro AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_GeminiPro("What are the latest AI trends?");
 * console.log(response); // Outputs AI-generated trends
 * ```
 */
export const AI_GeminiPro = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/gemini-pro", { content })
}

/**
 * Queries the Gemma AI model with a prompt and message.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param message - The input message to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Gemma("Act as a historian", "Tell me about the Roman Empire");
 * console.log(response); // Outputs AI-generated history
 * ```
 */
export const AI_Gemma = async (prompt: string, message: string): Promise<IAI> => {
  return await request<IAI>("ai/gemma", { prompt, message })
}

/**
 * Queries the Gita AI model with a query, typically for insights from the Bhagavad Gita.
 *
 * @param query - The question related to the Bhagavad Gita or spiritual topics.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Gita("What is the essence of karma yoga?");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_Gita = async (query: string): Promise<IAI> => {
  return await request<IAI>("ai/gita", { q: query })
}

/**
 * Queries the GPT-3 AI model with a prompt and content.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param content - The input content to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_GPT3("Generate a tweet", "About AI advancements");
 * console.log(response); // Outputs AI-generated tweet
 * ```
 */
export const AI_GPT3 = async (prompt: string, content: string): Promise<IAI> => {
  return await request<IAI>("ai/gpt3", { prompt, content })
}

/**
 * Queries the HikaChat AI model with a keyword.
 *
 * @param keyword - The keyword or topic for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_HikaChat("blockchain");
 * console.log(response); // Outputs AI-generated info on blockchain
 * ```
 */
export const AI_HikaChat = async (keyword: string): Promise<IAI> => {
  return await request<IAI>("ai/hikachat", { keyword })
}

/**
 * Queries the IAsk AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_IAsk("What is the theory of relativity?");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_IAsk = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/iask", { content })
}

/**
 * Converts an image to text using the ImageToText AI model.
 *
 * @param url - The URL of the image to convert to text.
 * @returns A promise resolving to the AI response data of type `IAI` containing the extracted text.
 * @example
 * ```typescript
 * const response = await AI_ImageToText("https://example.com/image.jpg");
 * console.log(response); // Outputs AI-extracted text from image
 * ```
 */
export const AI_ImageToText = async (url: string): Promise<IAI> => {
  return await request<IAI>("ai/image2text", { url })
}

/**
 * Queries the Dukun AI model with content, likely for culturally specific or mystical insights.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Dukun("What does my dream mean?");
 * console.log(response); // Outputs AI-generated interpretation
 * ```
 */
export const AI_Dukun = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/dukun", { content })
}

/**
 * Queries the Latukam AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Latukam("Provide a motivational quote");
 * console.log(response); // Outputs AI-generated quote
 * ```
 */
export const AI_Latukam = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/latukam", { content })
}

/**
 * Queries the Lepton AI model with text input.
 *
 * @param text - The input text for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Lepton("Summarize this article...");
 * console.log(response); // Outputs AI-generated summary
 * ```
 */
export const AI_Lepton = async (text: string): Promise<IAI> => {
  return await request<IAI>("ai/lepton", { text })
}

/**
 * Queries the Llama AI model with a custom prompt and message.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param message - The input message to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_LlamaCustom("Act as a chef", "Suggest a dinner recipe");
 * console.log(response); // Outputs AI-generated recipe
 * ```
 */
export const AI_LlamaCustom = async (prompt: string, message: string): Promise<IAI> => {
  return await request<IAI>("ai/llama", { prompt, message })
}

/**
 * Queries the LuminAI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_LuminAI("Generate a tagline for a startup");
 * console.log(response); // Outputs AI-generated tagline
 * ```
 */
export const AI_LuminAI = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/luminai", { content })
}

/**
 * Generates an image using the MagicStudio AI model with a prompt.
 *
 * @param prompt - The description of the image to generate.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await AI_MagicStudio("A magical forest with glowing trees");
 * // Save or process the image buffer
 * ```
 */
export const AI_MagicStudio = async (prompt: string): Promise<Buffer> => {
  return await requestBuffer("ai/magicstudio", { prompt })
}

/**
 * Queries the Meta AI model with a query.
 *
 * @param query - The text query for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_MetaAI("What is the future of AI?");
 * console.log(response); // Outputs AI-generated insights
 * ```
 */
export const AI_MetaAI = async (query: string): Promise<IAI> => {
  return await request<IAI>("ai/metaai", { query })
}

/**
 * Queries the Mistral 7B Instruct v0.2 AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Mistral7BInstruct("Write a technical report summary");
 * console.log(response); // Outputs AI-generated summary
 * ```
 */
export const AI_Mistral7BInstruct = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/mistral-7b-instruct-v0.2", { content })
}

/**
 * Queries the Mistral AI model with a prompt and message.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param message - The input message to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Mistral("Act as a scientist", "Explain gravity");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_Mistral = async (prompt: string, message: string): Promise<IAI> => {
  return await request<IAI>("ai/mistral", { prompt, message })
}

/**
 * Queries the Moshiai AI model with input content.
 *
 * @param input - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Moshiai("Generate a product description");
 * console.log(response); // Outputs AI-generated description
 * ```
 */
export const AI_Moshiai = async (input: string): Promise<IAI> => {
  return await request<IAI>("ai/moshiai", { input })
}

/**
 * Queries the MuslimAI model with a query, typically for Islamic-related insights.
 *
 * @param query - The question related to Islamic topics.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_MuslimAI("What are the five pillars of Islam?");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_MuslimAI = async (query: string): Promise<IAI> => {
  return await request<IAI>("ai/muslimai", { query })
}

/**
 * Queries the PowerBrainAI model with a query.
 *
 * @param query - The text query for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_PowerBrainAI("How to improve productivity?");
 * console.log(response); // Outputs AI-generated tips
 * ```
 */
export const AI_PowerBrainAI = async (query: string): Promise<IAI> => {
  return await request<IAI>("ai/powerbrainai", { query })
}

/**
 * Queries the Qwen 257B AI model with a prompt and text.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param text - The input text to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Qwen257B("Generate a blog post", "On AI ethics");
 * console.log(response); // Outputs AI-generated blog post
 * ```
 */
export const AI_Qwen257B = async (prompt: string, text: string): Promise<IAI> => {
  return await request<IAI>("ai/qwen257b", { prompt, text })
}

/**
 * Queries the QWQ 32B Preview AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_QWQ32BPreview("What is quantum computing?");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_QWQ32BPreview = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/qwq-32b-preview", { content })
}

/**
 * Generates an image using the Stability AI model with a prompt.
 *
 * @param prompt - The description of the image to generate.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await AI_StabilityAI("A cyberpunk cityscape");
 * // Save or process the image buffer
 * ```
 */
export const AI_StabilityAI = async (prompt: string): Promise<Buffer> => {
  return await requestBuffer("ai/stabilityai", { prompt })
}

/**
 * Generates an image using the Stable Diffusion AI model with a prompt.
 *
 * @param prompt - The description of the image to generate.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await AI_StableDiffusion("A dragon flying over mountains");
 * // Save or process the image buffer
 * ```
 */
export const AI_StableDiffusion = async (prompt: string): Promise<Buffer> => {
  return await requestBuffer("ai/stable-diffusion", { prompt })
}

/**
 * Queries the TeachAnything AI model with content, likely for educational purposes.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_TeachAnything("Explain photosynthesis");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_TeachAnything = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/teachanything", { content })
}

/**
 * Queries the Uncovr AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Uncovr("What are the latest tech innovations?");
 * console.log(response); // Outputs AI-generated insights
 * ```
 */
export const AI_Uncovr = async (content: string): Promise<IAI> => {
  return await request<IAI>("ai/uncovr", { content })
}

/**
 * Queries the Venice AI model with a prompt.
 *
 * @param prompt - The input prompt for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Venice("Write a travel itinerary for Venice");
 * console.log(response); // Outputs AI-generated itinerary
 * ```
 */
export const AI_Venice = async (prompt: string): Promise<IAI> => {
  return await request<IAI>("ai/venice", { prompt })
}

/**
 * Queries the YanzGPT AI model with a query, prompt, and model type.
 *
 * @param query - The main question or query for the AI model.
 * @param prompt - The instruction or context for the AI model.
 * @param modelType - The specific model type to use.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_YanzGPT("What is AI?", "Explain in detail", "gpt-4");
 * console.log(response); // Outputs AI-generated explanation
 * ```
 */
export const AI_YanzGPT = async (query: string, prompt: string, modelType: string): Promise<IAI> => {
  return await request<IAI>("ai/yanzgpt", { query, prompt, modelType })
}

/**
 * Queries the Yousearch AI model with text input.
 *
 * @param text - The input text for the AI model to process.
 * @returns A promise resolving to the AI response data of type `IAI`.
 * @example
 * ```typescript
 * const response = await AI_Yousearch("Search for recent AI news");
 * console.log(response); // Outputs AI-generated search results
 * ```
 */
export const AI_Yousearch = async (text: string): Promise<IAI> => {
  return await request<IAI>("ai/yousearch", { text })
}

/**
 * Anime-related API endpoints for interacting with various anime and manga data sources provided by the Siputzx API.
 *
 * These functions allow querying anime and manga details, episodes, downloads, latest releases, popular titles, and search results
 * from platforms like Anichin, Auratail, Kiryuu, Komikindo, and Samehadaku. Each function uses the `request` helper to communicate
 * with the Siputzx API at `https://api.siputzx.my.id`.
 */

/**
 * Retrieves detailed information about an anime from the Anichin platform.
 *
 * @param url - The URL of the anime page on Anichin.
 * @returns A promise resolving to the anime details of type `IAnichinDetail`.
 * @example
 * ```typescript
 * const details = await ANIME_Anichin_Detail("https://anichin.example.com/anime-title");
 * console.log(details); // Outputs detailed anime information
 * ```
 */
export const ANIME_Anichin_Detail = async (url: string): Promise<IAnichinDetail> => {
  return await request<IAnichinDetail>("anime/anichin-detail", { url })
}

/**
 * Retrieves download links for an anime from the Anichin platform.
 *
 * @param url - The URL of the anime episode or page on Anichin.
 * @returns A promise resolving to the download information of type `IAnichinDownload`.
 * @example
 * ```typescript
 * const download = await ANIME_Anichin_Download("https://anichin.example.com/episode-1");
 * console.log(download); // Outputs download links for the episode
 * ```
 */
export const ANIME_Anichin_Download = async (url: string): Promise<IAnichinDownload> => {
  return await request<IAnichinDownload>("anime/anichin-download", { url })
}

/**
 * Retrieves episode information for an anime from the Anichin platform.
 *
 * @param url - The URL of the anime episode page on Anichin.
 * @returns A promise resolving to the episode details of type `IAnichinEpisode`.
 * @example
 * ```typescript
 * const episode = await ANIME_Anichin_Episode("https://anichin.example.com/episode-1");
 * console.log(episode); // Outputs episode-specific information
 * ```
 */
export const ANIME_Anichin_Episode = async (url: string): Promise<IAnichinEpisode> => {
  return await request<IAnichinEpisode>("anime/anichin-episode", { url })
}

/**
 * Retrieves the latest anime releases from the Anichin platform.
 *
 * @returns A promise resolving to the latest anime releases of type `IAnichinLatest`.
 * @example
 * ```typescript
 * const latest = await ANIME_Anichin_Latest();
 * console.log(latest); // Outputs a list of recently released anime
 * ```
 */
export const ANIME_Anichin_Latest = async (): Promise<IAnichinLatest> => {
  return await request<IAnichinLatest>("anime/latest")
}

/**
 * Retrieves popular anime titles from the Anichin platform.
 *
 * @returns A promise resolving to the popular anime titles of type `IAnichinPopular`.
 * @example
 * ```typescript
 * const popular = await ANIME_Anichin_Popular();
 * console.log(popular); // Outputs a list of trending anime
 * ```
 */
export const ANIME_Anichin_Popular = async (): Promise<IAnichinPopular> => {
  return await request<IAnichinPopular>("anime/anichin-popular")
}

/**
 * Searches for anime titles on the Anichin platform.
 *
 * @param query - The search query for finding anime titles.
 * @returns A promise resolving to the search results of type `IAnichinSearch`.
 * @example
 * ```typescript
 * const results = await ANIME_Anichin_Search("Attack on Titan");
 * console.log(results); // Outputs a list of matching anime titles
 * ```
 */
export const ANIME_Anichin_Search = async (query: string): Promise<IAnichinSearch> => {
  return await request<IAnichinSearch>("anime/anichin-search", { query })
}

/**
 * Retrieves detailed information about an anime or manga from the Auratail platform.
 *
 * @param url - The URL of the anime or manga page on Auratail.
 * @returns A promise resolving to the details of type `IAuratailDetail`.
 * @example
 * ```typescript
 * const details = await ANIME_Auratail_Detail("https://auratail.example.com/title");
 * console.log(details); // Outputs detailed anime/manga information
 * ```
 */
export const ANIME_Auratail_Detail = async (url: string): Promise<IAuratailDetail> => {
  return await request<IAuratailDetail>("anime/auratail-detail", { url })
}

/**
 * Retrieves the latest anime or manga releases from the Auratail platform.
 *
 * @returns A promise resolving to the latest releases of type `IAuratailLatest`.
 * @example
 * ```typescript
 * const latest = await ANIME_Auratail_Latest();
 * console.log(latest); // Outputs a list of recently released titles
 * ```
 */
export const ANIME_Auratail_Latest = async (): Promise<IAuratailLatest> => {
  return await request<IAuratailLatest>("anime/auratail-latest")
}

/**
 * Retrieves popular anime or manga titles from the Auratail platform.
 *
 * @returns A promise resolving to the popular titles of type `IAuratailPopular`.
 * @example
 * ```typescript
 * const popular = await ANIME_Auratail_Popular();
 * console.log(popular); // Outputs a list of trending titles
 * ```
 */
export const ANIME_Auratail_Popular = async (): Promise<IAuratailPopular> => {
  return await request<IAuratailPopular>("anime/auratail-popular")
}

/**
 * Searches for anime or manga titles on the Auratail platform.
 *
 * @param query - The search query for finding anime or manga titles.
 * @returns A promise resolving to the search results of type `IAuratailSearch`.
 * @example
 * ```typescript
 * const results = await ANIME_Auratail_Search("One Piece");
 * console.log(results); // Outputs a list of matching titles
 * ```
 */
export const ANIME_Auratail_Search = async (query: string): Promise<IAuratailSearch> => {
  return await request<IAuratailSearch>("anime/auratail-search", { query })
}

/**
 * Searches for anime or manga titles on the Kiryuu platform.
 *
 * @param query - The search query for finding anime or manga titles.
 * @returns A promise resolving to the search results of type `IKiryuuSearch`.
 * @example
 * ```typescript
 * const results = await ANIME_Kiryuu_Search("Naruto");
 * console.log(results); // Outputs a list of matching titles
 * ```
 */
export const ANIME_Kiryuu_Search = async (query: string): Promise<IKiryuuSearch> => {
  return await request<IKiryuuSearch>("anime/kiryuu", { query })
}

/**
 * Retrieves detailed information about a manga from the Komikindo platform.
 *
 * @param url - The URL of the manga page on Komikindo.
 * @returns A promise resolving to the manga details of type `IKomikindoDetail`.
 * @example
 * ```typescript
 * const details = await ANIME_Komikindo_Detail("https://komikindo.example.com/manga-title");
 * console.log(details); // Outputs detailed manga information
 * ```
 */
export const ANIME_Komikindo_Detail = async (url: string): Promise<IKomikindoDetail> => {
  return await request<IKomikindoDetail>("anime/komikindo-detail", { url })
}

/**
 * Retrieves download links for a manga chapter from the Komikindo platform.
 *
 * @param url - The URL of the manga chapter or page on Komikindo.
 * @returns A promise resolving to the download information of type `IKomikindoDownload`.
 * @example
 * ```typescript
 * const download = await ANIME_Komikindo_Download("https://komikindo.example.com/chapter-1");
 * console.log(download); // Outputs download links for the chapter
 * ```
 */
export const ANIME_Komikindo_Download = async (url: string): Promise<IKomikindoDownload> => {
  return await request<IKomikindoDownload>("anime/komikindo-download", { url })
}

/**
 * Searches for manga titles on the Komikindo platform.
 *
 * @param query - The search query for finding manga titles.
 * @returns A promise resolving to the search results of type `IKomikindoSearch`.
 * @example
 * ```typescript
 * const results = await ANIME_Komikindo_Search("Demon Slayer");
 * console.log(results); // Outputs a list of matching manga titles
 * ```
 */
export const ANIME_Komikindo_Search = async (query: string): Promise<IKomikindoSearch> => {
  return await request<IKomikindoSearch>("anime/komikindo-serach", { query })
}

/**
 * Retrieves the latest anime release schedule from the Samehadaku platform.
 *
 * @returns A promise resolving to the release schedule of type `ISamehadakuRelease`.
 * @example
 * ```typescript
 * const releases = await ANIME_Samehadaku_Release();
 * console.log(releases); // Outputs a list of upcoming or recent releases
 * ```
 */
export const ANIME_Samehadaku_Release = async (): Promise<ISamehadakuRelease> => {
  return await request<ISamehadakuRelease>("anime/samehadaku/release")
}

/**
 * Retrieves the latest anime episodes from the Samehadaku platform.
 *
 * @returns A promise resolving to the latest episodes of type `ISamehadakuLatest`.
 * @example
 * ```typescript
 * const latest = await ANIME_Samehadaku_Latest();
 * console.log(latest); // Outputs a list of recently released episodes
 * ```
 */
export const ANIME_Samehadaku_Latest = async (): Promise<ISamehadakuLatest> => {
  return await request<ISamehadakuLatest>("anime/samehadaku/latest")
}

/**
 * Searches for anime titles on the Samehadaku platform.
 *
 * @param query - The search query for finding anime titles.
 * @returns A promise resolving to the search results of type `ISamehadakuSearch`.
 * @example
 * ```typescript
 * const results = await ANIME_Samehadaku_Search("Jujutsu Kaisen");
 * console.log(results); // Outputs a list of matching anime titles
 * ```
 */
export const ANIME_Samehadaku_Search = async (query: string): Promise<ISamehadakuSearch> => {
  return await request<ISamehadakuSearch>("anime/samehadaku/search", { query })
}

/**
 * Miscellaneous API endpoints for interacting with anime quotes, APK searches, news, and canvas-based image generation
 * provided by the Siputzx API.
 *
 * These functions allow retrieving anime quotes, searching for APKs, fetching news from Indonesian sources, and generating
 * custom images for social media or community interactions (e.g., welcome/goodbye cards, profiles). Each function uses the
 * `request` or `requestBuffer` helper to communicate with the Siputzx API at `https://api.siputzx.my.id`.
 */

/**
 * Retrieves random anime quotes.
 *
 * @returns A promise resolving to anime quote data of type `IQuotes`.
 * @example
 * ```typescript
 * const quotes = await R_QuotesAnime();
 * console.log(quotes); // Outputs a random anime quote
 * ```
 */
export const R_QuotesAnime = async (): Promise<IQuotes> => {
  return await request<IQuotes>("r/quotesanime")
}

/**
 * Retrieves an image related to Blue Archive, likely from a specific source or community.
 *
 * @returns A promise resolving to the image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await R_BlueArchive();
 * // Save or process the image buffer
 * ```
 */
export const R_BlueArchive = async (): Promise<Buffer> => {
  return await requestBuffer("r/blue-archive")
}

/**
 * Searches for APKs on the AN1 platform.
 *
 * @param search - The search query for finding APKs.
 * @returns A promise resolving to the search results of type `IApkAn1`.
 * @example
 * ```typescript
 * const results = await APK_An1("minecraft");
 * console.log(results); // Outputs a list of matching APKs from AN1
 * ```
 */
export const APK_An1 = async (search: string): Promise<IApkAn1> => {
  return await request<IApkAn1>("apk/an1", { search })
}

/**
 * Searches for apps on the Appstore platform.
 *
 * @param search - The search query for finding apps.
 * @returns A promise resolving to the search results of type `IApkAppstore`.
 * @example
 * ```typescript
 * const results = await APK_Appstore("whatsapp");
 * console.log(results); // Outputs a list of matching apps from Appstore
 * ```
 */
export const APK_Appstore = async (search: string): Promise<IApkAppstore> => {
  return await request<IApkAppstore>("apk/appstore", { search })
}

/**
 * Searches for APKs on the Happymod platform.
 *
 * @param search - The search query for finding APKs.
 * @returns A promise resolving to the search results of type `IApkHappymod`.
 * @example
 * ```typescript
 * const results = await APK_Happymod("among us");
 * console.log(results); // Outputs a list of matching APKs from Happymod
 * ```
 */
export const APK_Happymod = async (search: string): Promise<IApkHappymod> => {
  return await request<IApkHappymod>("apk/happymod", { search })
}

/**
 * Retrieves the latest news from Antara, an Indonesian news agency.
 *
 * @returns A promise resolving to the news data of type `INewsAntara`.
 * @example
 * ```typescript
 * const news = await News_Antara();
 * console.log(news); // Outputs recent news articles from Antara
 * ```
 */
export const News_Antara = async (): Promise<INewsAntara> => {
  return await request<INewsAntara>("berita/antara")
}

/**
 * Retrieves the latest news from CNBC Indonesia.
 *
 * @returns A promise resolving to the news data of type `INewsCnbcIND`.
 * @example
 * ```typescript
 * const news = await News_CnbcIND();
 * console.log(news); // Outputs recent news articles from CNBC Indonesia
 * ```
 */
export const News_CnbcIND = async (): Promise<INewsCnbcIND> => {
  return await request<INewsCnbcIND>("berita/cnbcindonesia")
}

/**
 * Retrieves the latest news from CNN Indonesia.
 *
 * @returns A promise resolving to the news data of type `INewsCnnIND`.
 * @example
 * ```typescript
 * const news = await News_CnnIND();
 * console.log(news); // Outputs recent news articles from CNN Indonesia
 * ```
 */
export const News_CnnIND = async (): Promise<INewsCnnIND> => {
  return await request<INewsCnnIND>("berita/cnnindonesia")
}

/**
 * Retrieves the latest news or updates related to JKT48, an Indonesian idol group.
 *
 * @returns A promise resolving to the news data of type `INewsJKT48`.
 * @example
 * ```typescript
 * const news = await News_JKT48();
 * console.log(news); // Outputs recent updates about JKT48
 * ```
 */
export const News_JKT48 = async (): Promise<INewsJKT48> => {
  return await request<INewsJKT48>("berita/jkt48")
}

/**
 * Retrieves the latest news from Liputan6, an Indonesian news portal.
 *
 * @returns A promise resolving to the news data of type `INewsLiputan6`.
 * @example
 * ```typescript
 * const news = await News_Liputan6();
 * console.log(news); // Outputs recent news articles from Liputan6
 * ```
 */
export const News_Liputan6 = async (): Promise<INewsLiputan6> => {
  return await request<INewsLiputan6>("berita/liputan6")
}

/**
 * Generates a custom image with a "gay" theme, likely for humorous or community purposes.
 *
 * @param nama - The name to include in the image.
 * @param avatar - The URL of the avatar image to include.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_Gay("John", "https://example.com/avatar.jpg");
 * // Save or process the image buffer
 * ```
 */
export const Canvas_Gay = async (nama: string, avatar: string): Promise<Buffer> => {
  return await requestBuffer("canvas/gay", { nama, avatar })
}

/**
 * Generates a custom image with an "XNXX" theme, likely for humorous or meme purposes.
 *
 * @param title - The title text to include in the image.
 * @param image - The URL of the image to include.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_XNXX("Funny Video", "https://example.com/image.jpg");
 * // Save or process the image buffer
 * ```
 */
export const Canvas_XNXX = async (title: string, image: string): Promise<Buffer> => {
  return await requestBuffer("canvas/xnxx", { title, image })
}

/**
 * Generates a goodbye image (version 1) for a user leaving a community or server.
 *
 * @param username - The username of the departing user.
 * @param guildName - The name of the community or server.
 * @param memberCount - The current member count of the community (number or string).
 * @param guildIcon - The URL of the community icon.
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_GoodByeV1("JohnDoe", "MyServer", 100, "https://example.com/icon.jpg", "https://example.com/avatar.jpg", "https://example.com/background.jpg");
 * // Save or process the image buffer
 * ```
 */
export const Canvas_GoodByeV1 = async (username: string, guildName: string, memberCount: number | string, guildIcon: string, avatar: string, background: string): Promise<Buffer> => {
  memberCount = typeof memberCount === "number" ? String(memberCount) : memberCount
  return await requestBuffer("canvas/goodbyev1", { username, guildName, memberCount, guildIcon, avatar, background })
}

/**
 * Generates a goodbye image (version 2) for a user leaving a community or server.
 *
 * @param username - The username of the departing user.
 * @param guildName - The name of the community or server.
 * @param memberCount - The current member count of the community (number or string).
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_GoodbyeV2("JohnDoe", "MyServer", 100, "https://example.com/avatar.jpg", "https://example.com/background.jpg");
 * // Save or process the image buffer
 * ```
 */
export const Canvas_GoodbyeV2 = async (username: string, guildName: string, memberCount: number | string, avatar: string, background: string): Promise<Buffer> => {
  memberCount = typeof memberCount === "number" ? String(memberCount) : memberCount
  return await requestBuffer("canvas/goodbyev2", { username, guildName, memberCount, avatar, background })
}

/**
 * Generates a goodbye image (version 3) for a user leaving a community or server.
 *
 * @param username - The username of the departing user.
 * @param avatar - The URL of the user's avatar.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_GoodbyeV3("JohnDoe", "https://example.com/avatar.jpg");
 * // Save or process the image buffer
 * ```
 */
export const Canvas_GoodbyeV3 = async (username: string, avatar: string): Promise<Buffer> => {
  return await requestBuffer("canvas/goodbyev3", { username, avatar })
}

/**
 * Generates a goodbye image (version 4) for a user leaving a community or server.
 *
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @param description - A custom description or message for the image.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_GoodbyeV4("https://example.com/avatar.jpg", "https://example.com/background.jpg", "We'll miss you!");
 * // Save or process the image buffer
 * ```
 */
export const Canvas_GoodbyeV4 = async (avatar: string, background: string, description: string): Promise<Buffer> => {
  return await requestBuffer("canvas/goodbyev4", { avatar, background, description })
}

/**
 * Generates a profile card image for a user, typically for community or gaming platforms.
 *
 * @param backgroundURL - The URL of the background image.
 * @param avatarURL - The URL of the user's avatar.
 * @param rankName - The name of the user's rank or role.
 * @param rankId - The ID of the user's rank (number or string).
 * @param requireExp - The experience points required for the next rank (number or string).
 * @param level - The user's current level.
 * @param name - The user's name.
 * @param exp - The user's current experience points (number or string).
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_Profile(
 *   "https://example.com/background.jpg",
 *   "https://example.com/avatar.jpg",
 *   "Warrior",
 *   5,
 *   1000,
 *   "10",
 *   "JohnDoe",
 *   800
 * );
 * // Save or process the image buffer
 * ```
 */
export const Canvas_Profile = async (backgroundURL: string, avatarURL: string, rankName: string, rankId: number | string, requireExp: number | string, level: string, name: string, exp: number | string): Promise<Buffer> => {
  rankId = typeof rankId === "number" ? String(rankId) : rankId
  requireExp = typeof requireExp === "number" ? String(requireExp) : requireExp
  exp = typeof exp === "number" ? String(exp) : exp
  return await requestBuffer("canvas/profile", {
    backgroundURL,
    avatarURL,
    rankName,
    rankId,
    requireExp,
    level,
    name,
    exp
  })
}

/**
 * Generates a level-up image for a user advancing to a new level.
 *
 * @param backgroundURL - The URL of the background image.
 * @param avatarURL - The URL of the user's avatar.
 * @param fromLevel - The previous level of the user.
 * @param toLevel - The new level of the user.
 * @param name - The user's name.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_LevelUp(
 *   "https://example.com/background.jpg",
 *   "https://example.com/avatar.jpg",
 *   "9",
 *   "10",
 *   "JohnDoe"
 * );
 * // Save or process the image buffer
 * ```
 */
export const Canvas_LevelUp = async (backgroundURL: string, avatarURL: string, fromLevel: string, toLevel: string, name: string): Promise<Buffer> => {
  return await requestBuffer("canvas/level-up", { backgroundURL, avatarURL, fromLevel, toLevel, name })
}

/**
 * Generates a "ship" image, likely for pairing two users or characters with a compatibility percentage.
 *
 * @param avatar1 - The URL of the first user's or character's avatar.
 * @param avatar2 - The URL of the second user's or character's avatar.
 * @param background - The URL of the background image.
 * @param persen - The compatibility percentage (number or string).
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_Ship(
 *   "https://example.com/avatar1.jpg",
 *   "https://example.com/avatar2.jpg",
 *   "https://example.com/background.jpg",
 *   85
 * );
 * // Save or process the image buffer
 * ```
 */
export const Canvas_Ship = async (avatar1: string, avatar2: string, background: string, persen: number | string): Promise<Buffer> => {
  persen = typeof persen === "number" ? String(persen) : persen
  return await requestBuffer("canvas/ship", { avatar1, avatar2, background, persen })
}

/**
 * Generates a welcome image (version 1) for a user joining a community or server.
 *
 * @param username - The username of the joining user.
 * @param guildName - The name of the community or server.
 * @param memberCount - The current member count of the community (number or string).
 * @param guildIcon - The URL of the community icon.
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_WelcomeV1(
 *   "JohnDoe",
 *   "MyServer",
 *   100,
 *   "https://example.com/icon.jpg",
 *   "https://example.com/avatar.jpg",
 *   "https://example.com/background.jpg"
 * );
 * // Save or process the image buffer
 * ```
 */
export const Canvas_WelcomeV1 = async (username: string, guildName: string, memberCount: number | string, guildIcon: string, avatar: string, background: string): Promise<Buffer> => {
  memberCount = typeof memberCount === "number" ? String(memberCount) : memberCount
  return await requestBuffer("canvas/welcomev1", { username, guildName, memberCount, guildIcon, avatar, background })
}

/**
 * Generates a welcome image (version 2) for a user joining a community or server.
 *
 * @param username - The username of the joining user.
 * @param guildName - The name of the community or server.
 * @param memberCount - The current member count of the community (number or string).
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_WelcomeV2(
 *   "JohnDoe",
 *   "MyServer",
 *   100,
 *   "https://example.com/avatar.jpg",
 *   "https://example.com/background.jpg"
 * );
 * // Save or process the image buffer
 * ```
 */
export const Canvas_WelcomeV2 = async (username: string, guildName: string, memberCount: number | string, avatar: string, background: string): Promise<Buffer> => {
  memberCount = typeof memberCount === "number" ? String(memberCount) : memberCount
  return await requestBuffer("canvas/welcomev2", { username, guildName, memberCount, avatar, background })
}

/**
 * Generates a welcome image (version 3) for a user joining a community or server.
 *
 * @param username - The username of the joining user.
 * @param avatar - The URL of the user's avatar.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_WelcomeV3("JohnDoe", "https://example.com/avatar.jpg");
 * // Save or process the image buffer
 * ```
 */
export const Canvas_WelcomeV3 = async (username: string, avatar: string): Promise<Buffer> => {
  return await requestBuffer("canvas/welcomev3", { username, avatar })
}

/**
 * Generates a welcome image (version 4) for a user joining a community or server.
 *
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @param description - A custom description or message for the image.
 * @returns A promise resolving to the generated image as a `Buffer`.
 * @example
 * ```typescript
 * const image = await Canvas_WelcomeV4("https://example.com/avatar.jpg", "https://example.com/background.jpg", "Welcome to our community!");
 * // Save or process the image buffer
 * ```
 */
export const Canvas_WelcomeV4 = async (avatar: string, background: string, description: string): Promise<Buffer> => {
  return await requestBuffer("canvas/welcomev4", { avatar, background, description })
}

/**
 * Downloads media from an Instagram URL.
 *
 * @param url - The Instagram media URL to download.
 * @returns A promise resolving to the Instagram download data (`IDLInstagram`).
 * @example
 * ```typescript
 * const result = await DLInstagram("https://www.instagram.com/p/abc123/");
 * console.log(result.data); // Array of media details
 * ```
 */
export const DLInstagram = async (url: string): Promise<IDLInstagram> => {
  return await request<IDLInstagram>("d/igdl", { url })
}

/**
 * Downloads media from a Twitter (X) URL.
 *
 * @param url - The Twitter media URL to download.
 * @returns A promise resolving to the Twitter download data (`IDLTwitter`).
 * @example
 * ```typescript
 * const result = await DLTwitter("https://x.com/user/status/123456");
 * console.log(result.data.downloadLink); // URL to download the media
 * ```
 */
export const DLTwitter = async (url: string): Promise<IDLTwitter> => {
  return await request<IDLTwitter>("d/twitter", { url })
}

/**
 * Downloads music from an Apple Music URL.
 *
 * @param url - The Apple Music URL to download.
 * @returns A promise resolving to the Apple Music download data (`IDLAppleMusic`).
 * @example
 * ```typescript
 * const result = await DLAppleMusic("https://music.apple.com/track/123456");
 * console.log(result.data.mp3DownloadLink); // URL to download the MP3
 * ```
 */
export const DLAppleMusic = async (url: string): Promise<IDLAppleMusic> => {
  return await request<IDLAppleMusic>("d/musicapple", { url })
}

/**
 * Downloads media from a Capcut URL.
 *
 * @param url - The Capcut media URL to download.
 * @returns A promise resolving to the Capcut download data (`IDLCapcut`).
 * @example
 * ```typescript
 * const result = await DLCapcut("https://www.capcut.com/template/123456");
 * console.log(result.data.contentUrl); // URL to download the media
 * ```
 */
export const DLCapcut = async (url: string): Promise<IDLCapcut> => {
  return await request<IDLCapcut>("d/capcut", { url })
}

/**
 * Downloads media from a Douyin URL.
 *
 * @param url - The Douyin media URL to download.
 * @returns A promise resolving to the Douyin download data (`IDLDouyin`).
 * @example
 * ```typescript
 * const result = await DLDouyin("https://www.douyin.com/video/123456");
 * console.log(result.data.downloads); // Array of download options
 * ```
 */
export const DLDouyin = async (url: string): Promise<IDLDouyin> => {
  return await request<IDLDouyin>("d/douyin", { url })
}

/**
 * Downloads media from a Facebook URL.
 *
 * @param url - The Facebook media URL to download.
 * @returns A promise resolving to the Facebook download data (`IDLFacebook`).
 * @example
 * ```typescript
 * const result = await DLFacebook("https://www.facebook.com/video/123456");
 * console.log(result.data); // Array of download options
 * ```
 */
export const DLFacebook = async (url: string): Promise<IDLFacebook> => {
  return await request<IDLFacebook>("d/facebook", { url })
}

/**
 * Downloads a file from a Google Drive URL.
 *
 * @param url - The Google Drive file URL to download.
 * @returns A promise resolving to the Google Drive download data (`IDLGDrive`).
 * @example
 * ```typescript
 * const result = await DLGDrive("https://drive.google.com/file/d/abc123");
 * console.log(result.data.download); // URL to download the file
 * ```
 */
export const DLGDrive = async (url: string): Promise<IDLGDrive> => {
  return await request<IDLGDrive>("d/gdrive", { url })
}

/**
 * Downloads a file from a MediaFire URL.
 *
 * @param url - The MediaFire file URL to download.
 * @returns A promise resolving to the MediaFire download data (`IDLMediaFire`).
 * @example
 * ```typescript
 * const result = await DLMediafire("https://www.mediafire.com/file/abc123");
 * console.log(result.data.downloadLink); // URL to download the file
 * ```
 */
export const DLMediafire = async (url: string): Promise<IDLMediaFire> => {
  return await request<IDLMediaFire>("d/mediafire", { url })
}

/**
 * Downloads media from a Pinterest URL.
 *
 * @param url - The Pinterest media URL to download.
 * @returns A promise resolving to the Pinterest download data (`IDLPinterest`).
 * @example
 * ```typescript
 * const result = await DLPinterest("https://www.pinterest.com/pin/123456");
 * console.log(result.data.url); // URL to download the media
 * ```
 */
export const DLPinterest = async (url: string): Promise<IDLPinterest> => {
  return await request<IDLPinterest>("d/pinterest", { url })
}

/**
 * Downloads audio from a SoundCloud URL.
 *
 * @param url - The SoundCloud track URL to download.
 * @returns A promise resolving to the SoundCloud download data (`IDLSoundCloud`).
 * @example
 * ```typescript
 * const result = await DLSoundcloud("https://soundcloud.com/user/track");
 * console.log(result.url); // URL to download the audio
 * ```
 */
export const DLSoundcloud = async (url: string): Promise<IDLSoundCloud> => {
  return await request<IDLSoundCloud>("d/soundcloud", { url })
}

/**
 * Downloads media from a SnackVideo URL.
 *
 * @param url - The SnackVideo media URL to download.
 * @returns A promise resolving to the SnackVideo download data (`IDLSnackVideo`).
 * @example
 * ```typescript
 * const result = await DLSnackvideo("https://www.snackvideo.com/video/123456");
 * console.log(result.data.videoUrl); // URL to download the video
 * ```
 */
export const DLSnackvideo = async (url: string): Promise<IDLSnackVideo> => {
  return await request<IDLSnackVideo>("d/snackvideo", { url })
}

/**
 * Downloads და
 * Downloads music from a Spotify URL.
 *
 * @param url - The Spotify track or album URL to download.
 * @returns A promise resolving to the Spotify download data (`IDLSpotify`).
 * @example
 * ```typescript
 * const result = await DLSpotify("https://open.spotify.com/track/123456");
 * console.log(result.data.download); // URL to download the MP3
 * ```
 */
export const DLSpotify = async (url: string): Promise<IDLSpotify> => {
  return await request<IDLSpotify>("d/spotify", { url })
}

/**
 * Downloads a sticker pack from a Sticker.ly URL.
 *
 * @param url - The Sticker.ly pack URL to download.
 * @returns A promise resolving to the Sticker.ly download data (`IDLStickerLy`).
 * @example
 * ```typescript
 * const result = await DLStickerLy("https://sticker.ly/s/123456");
 * console.log(result.data.stickers); // Array of sticker URLs
 * ```
 */
export const DLStickerLy = async (url: string): Promise<IDLStickerLy> => {
  return await request<IDLStickerLy>("d/stickerly", { url })
}

/**
 * Downloads media from a TikTok URL.
 *
 * @param url - The TikTok media URL to download.
 * @returns A promise resolving to the TikTok download data (`IDLTikTok`).
 * @example
 * ```typescript
 * const result = await DLTiktok("https://www.tiktok.com/@user/video/123456");
 * console.log(result.data.download.video); // Array of video download URLs
 * ```
 */
export const DLTiktok = async (url: string): Promise<IDLTikTok> => {
  return await request<IDLTikTok>("d/tiktok/v2", { url })
}
