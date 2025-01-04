/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { CrawlingData, GameData } from '../dto/steam.dto.game';
import { TagParsingException } from '../steam.api/steam.exception';
import { OwnedGames } from '../dto/steam.dto.api';
import {
  getAppName, getAppPhoto, getCategories, getGameHtmlDOM, getTags,
} from './steam.util.crawling';

export type RawGameCategory = {
  appid: string;
  name: string;
  categories: string[];
}[];
export const makeGameSet = (gamesList: OwnedGames[]) => {
  const gameSet: OwnedGames[][] = [];
  const len = gamesList.length;

  if (len === 0) return gameSet;

  let i = 0;
  while (i * 10 < len) {
    gameSet.push(gamesList.slice(i * 10, (i + 1) * 10));
    i += 1;
  }

  return gameSet;
};
export const crawlingDataFromAppid = async (
  game: OwnedGames,
): Promise<CrawlingData | undefined> => {
  try {
    const { appid, playtime_forever: playtime } = game;
    const dom = await getGameHtmlDOM(appid);
    const categories = getCategories(dom);
    const tags = getTags(categories);
    const name = getAppName(dom) as string;
    const photoUrl = getAppPhoto(appid) as string;
    return {
      appid, categories, tags, name, photoUrl, playtime,
    };
  } catch (err) {
    if (err instanceof TagParsingException) {
      console.log('TagParsingException: ', game.appid);
      return undefined;
    }
    console.log('Other Exception: ', game.appid, (err as any).name);
    return undefined;
  }
};
export const dataFetch = async (gameSet: OwnedGames[]) => {
  const gameinfos: GameData[] = [];
  const gameDataFromApi = await Promise.all(
    gameSet.map((game) => fetch(`/steam_api/appdetails?appids=${game.appid}`).then((res) => res.json())),
  );
  const gameDataWithTags = (await Promise.all(
    gameSet.map((game) => crawlingDataFromAppid(game)),
  )).filter((game) => game !== undefined);
  gameDataFromApi.forEach((game) => {
    const appid = Object.keys(game)[0];
    if (game[appid].success) {
      const crawlingInfo = gameDataWithTags
        .find((gameData) => (gameData as CrawlingData).appid === Number(appid));
      gameinfos.push({
        personal_data: gameSet.find((gameData) => gameData.appid === Number(appid)) as OwnedGames,
        system_data: game[appid].data,
        crawling_data: crawlingInfo,
      });
    }
  });

  return gameinfos;
};
export const getGameData = async (games: OwnedGames[]): Promise<GameData[]> => {
  /** 10개씩 분리 -> load 배분 */
  const dataSet = makeGameSet(games);

  const gameinfos = [];

  for (const gameSet of dataSet) {
    const gameData = await dataFetch(gameSet);
    gameinfos.push(...gameData);
  }

  return gameinfos;
};
export const makeVectorSet = (gameinfos: RawGameCategory) => {
  const categories = new Set<string>();
  gameinfos.forEach((game) => {
    game.categories.forEach((category) => {
      categories.add(category);
    });
  });
  const vectorSet: any[] = [];
  gameinfos.forEach((game) => {
    const vector = Array.from(categories)
      .map((category) => (game.categories.includes(category) ? 1 : 0));
    vectorSet.push(vector);
  });
  return vectorSet;
};
