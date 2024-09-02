import axios from 'axios';
import {
  BASE_URL, I_PLAYER_SERVICE, I_STEAM_USER, VERSION_1, VERSION_2,
} from './steam.api.constant';
import { GetOwnedGamesException, GetPlayerSummariesException } from './steam.exception';
/**
 * 유저 정보 요약
 * @param steamids 스팀 계정 아이디
 * @returns
 */
export const getPlayerSummaries = async (steamids: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/${I_STEAM_USER}/GetPlayerSummaries/${VERSION_2}`,
      {
        params: {
          key: process.env.STEAM_API_KEY,
          steamids,
        },
      },
    );
    return res.data;
  } catch (err) {
    throw new GetPlayerSummariesException();
  }
};
/**
 * 소유 게임 정보
 * @param steamid 스팀 계정 아이디
 * @returns
 */
export const getOwnedGames = async (steamid: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/${I_PLAYER_SERVICE}/GetOwnedGames/${VERSION_1}`,
      {
        params: {
          key: process.env.STEAM_API_KEY,
          steamid,
          format: 'json',
        },
      },
    );
    return res.data;
  } catch (err) {
    throw new GetOwnedGamesException();
  }
};
