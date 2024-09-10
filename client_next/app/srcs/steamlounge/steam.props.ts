/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
import fs from 'fs';
import { getGameData } from './analystic/getGameData';
import { getOwnedGames } from './steam.api/steam.api.user';

const steamids: string[] = ['76561199008462834'];

export const saveJsonInCrawling = async (steamid: string, gameinfos: any) => {
  fs.writeFileSync(`${steamid}.json`, JSON.stringify(gameinfos, null, 2));
};
export const loadJsonGameData = async (steamid: string) => {
  const data = fs.readFileSync(`${steamid}.json`, 'utf8');
  return JSON.parse(data);
};

export async function getSteamLoungeProps() {
  try {
    if (steamids.find((e) => e === process.env.STEAM_ID)) {
      const gameinfos = await loadJsonGameData(process.env.STEAM_ID as string);
      return ({
        props: {
          gameinfos,
        },
      });
    }

    const games = await getOwnedGames(process.env.STEAM_ID as string);
    const gameinfos = await getGameData(games.response.games);

    saveJsonInCrawling(process.env.STEAM_ID as string, gameinfos);

    return ({
      props: {
        games: games.response,
        gameinfos,
      },
    });
  } catch (err) {
    return ({
      redirect: {
        destination: '/error',
        permanent: false,
      },
    });
  }
}
