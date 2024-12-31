import {
  BASE_URL, I_PLAYER_SERVICE, I_STEAM_USER, STORE_URL, VERSION_1, VERSION_2,
} from './steam.api.constant';
import { GetOwnedGamesException, GetPlayerSummariesException } from './steam.exception';
import { GetOwnedGamesResponse } from '../dto/steam.api..dto';
import {queryString} from '../../common/common.utils/url';
/**
 * 유저 정보 요약
 * @param steamids 스팀 계정 아이디
 * @returns
 */
export const getPlayerSummaries = async (steamids: string) => {
  try {
    const res = await fetch(queryString(
      `${BASE_URL}/${I_STEAM_USER}/GetPlayerSummaries/${VERSION_2}`,
      {
        key: process.env.STEAM_API_KEY as string,
        steamids,
      },
    ));
    const result = await res.json();
    return result.response;
  } catch (err) {
    throw new GetPlayerSummariesException();
  }
};
/**
 * 소유 게임 정보
 * @param steamid 스팀 계정 아이디
 * @returns
 */
export const getOwnedGames = async (steamid: string): Promise<GetOwnedGamesResponse> => {
  try {
    const res = await fetch(queryString(`${BASE_URL}/${I_PLAYER_SERVICE}/GetOwnedGames/${VERSION_1}`, {
      key: process.env.STEAM_API_KEY as string,
      steamid,
      format: 'json',
    }));
    const result = await res.json();
    return result.response;
  } catch (err) {
    throw new GetOwnedGamesException();
  }
};
export const getGameDetail = async (appid: string) => {
  const res = await fetch(`${STORE_URL}/appdetails?appids=${appid}`);
  const result = await res.json();
  return result;
};
