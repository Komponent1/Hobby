/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { GameData } from '../dto/game';
import { TagParsingException } from '../steam.api/steam.exception';
import { OwnedGames } from '../dto/steam.api..dto';
import {
  getAppName, getAppPhoto, getCategories, getGameHtmlDOM, getTags,
} from './steam.util.crawling';

/**
 * 유저 게임 가져오기 -> 게임 카테고리 추출 및 데이터 생성
 * @param steamid 스팀 계정 아이디
 */
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

export const crawlingDataFromAppid = async (game: OwnedGames): Promise<GameData | undefined> => {
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
export const getGameData = async (games: OwnedGames[]): Promise<GameData[]> => {
  /** 10개씩 분리 -> load 배분 */
  const dataSet = makeGameSet(games);

  const gameinfos = [];

  for (const gameSet of dataSet) {
    const gameDataWithTags = await Promise.all(
      gameSet.map((game) => crawlingDataFromAppid(game)),
    );
    const gameDataFromApi = await Promise.all(
      gameSet.map((game) => fetch(`/steam_api/appdetails?appids=${game.appid}`).then((res) => res.json())),
    );
    gameinfos.push(...gameDataWithTags.flat().filter((e) => e !== undefined));
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
