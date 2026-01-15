import {
  getOwnedGames,
  getPlayerSummaries,
} from "../steam.apiv2/steam.api.user";

export const playerSummaryQuery = (steamid: string) => ({
  queryKey: ["playerSummary", steamid],
  queryFn: () => getPlayerSummaries(steamid),
  staleTime: 60 * 60 * 1000,
  meta: { persist: false },
});
export const ownedGamesQuery = (steamid: string) => ({
  queryKey: ["ownedGames", steamid],
  queryFn: () => getOwnedGames(steamid),
  staleTime: 60 * 60 * 1000,
  meta: { persist: false },
});
