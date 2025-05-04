/**
 * Utility functions for interacting with GitHub's API.
 */

import { GithubUser } from "../Types"
import { Func } from "../utils"

/**
 * Fetches a GitHub user's profile data.
 *
 * @param username - The GitHub username to fetch data for.
 * @returns A Promise that resolves to a `GithubUser` object or `undefined` if the request fails.
 */
export const getGitHubUser = async (username: string): Promise<GithubUser> => {
  const res = await Func.fetchJSON(`https://api.github.com/users/${username}`)
  return res as GithubUser
}

/**
 * Generates a download URL for a GitHub repository's zipball.
 *
 * @param url - The GitHub repository URL (e.g., https://github.com/owner/repo).
 * @returns A Promise that resolves to the zipball download URL.
 *
 * Throws an error if the provided URL does not match the expected format.
 */
export const DownloadRepo = async (url: string): Promise<string> => {
  const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/
  const match = url.match(regex) as RegExpMatchArray
  const user = match[1]
  const repo = match[2]

  return `https://api.github.com/repos/${user}/${repo}/zipball` as string
}

/**
 * Interface representing a GitHub user's profile data.
 */
