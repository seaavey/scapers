/**
 * Utility functions for interacting with GitHub's API.
 */

import { fetchJSON } from "../utils/fetcher";

/**
 * Fetches a GitHub user's profile data.
 *
 * @param username - The GitHub username to fetch data for.
 * @returns A Promise that resolves to a `GithubUser` object or `undefined` if the request fails.
 */
export const getGitHubUser = async (username: string): Promise<GithubUser> => {
  const res = await fetchJSON(`https://api.github.com/users/${username}`);
  return res as GithubUser;
};

/**
 * Generates a download URL for a GitHub repository's zipball.
 *
 * @param url - The GitHub repository URL (e.g., https://github.com/owner/repo).
 * @returns A Promise that resolves to the zipball download URL.
 *
 * Throws an error if the provided URL does not match the expected format.
 */
export const DownloadRepo = async (url: string): Promise<string> => {
  const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/;
  const match = url.match(regex) as RegExpMatchArray;
  const user = match[1];
  const repo = match[2];

  return `https://api.github.com/repos/${user}/${repo}/zipball` as string;
};

/**
 * Interface representing a GitHub user's profile data.
 */
export interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
