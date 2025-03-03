import { anoboy } from "./scapers/anoboy";
import { aio } from "./scapers/aio";
import { populer, search } from "./scapers/AniList"; // Pastikan search diimpor jika ada

interface AniList {
  populer: () => Promise<any>;
  search: (query: string) => Promise<any>;
}

const AniList: AniList = {
  populer,
  search,
};

export { AniList, anoboy, aio };
