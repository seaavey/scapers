import { Tiktok } from "./scapers/ttdl";
import { anoboy } from "./scapers/anoboy";
import { aio } from "./scapers/aio";
import { Populer, populer, search } from "./scapers/AniList";
import { GithubUser, getGitHubUser, DownloadRepo } from "./scapers/github";

const TiktokDL: TiktokDL = {
  getGitHubUser,
  DownloadRepo,
};

const AniList: AniList = {
  populer,
  search,
};

export { AniList, TiktokDL, anoboy, aio, Tiktok };

interface TiktokDL {
  getGitHubUser: (username: string) => Promise<GithubUser>;
  DownloadRepo: (url: string) => Promise<string>;
}

interface AniList {
  populer: () => Promise<Populer>;
  search: (query: string) => Promise<any>;
}
