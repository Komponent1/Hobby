import {
  GetOwnedGamesException,
  GetPlayerSummariesException,
} from "./steam.exception";
import { OwnedGames, PlayerSummary } from "../../dto/steam.dto.api";
/**
 * 유저 정보 요약
 * @param steamids 스팀 계정 아이디
 * @returns
 */
export const getPlayerSummaries = async (
  steamid: string
): Promise<PlayerSummary> => {
  try {
    const res = await fetch(`/api/steam/player_summarries?steamid=${steamid}`);
    const result = await res.json();
    return result.players[0];
  } catch (err) {
    throw new GetPlayerSummariesException();
  }
};
/**
 * 소유 게임 정보
 * @param steamid 스팀 계정 아이디
 * @returns
 */
export const getOwnedGames = async (steamid: string): Promise<OwnedGames[]> => {
  try {
    const res = await fetch(`/api/steam/owned_steam_games?steamid=${steamid}`);
    const result = await res.json();
    return result.games;
  } catch (err) {
    throw new GetOwnedGamesException();
  }
};
