/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { GameData } from '../dto/game';
import {
  getAppName, getAppPhoto, getGameHtmlDOM, getTags,
} from '../steam.api/steam.crawler';
import { TagParsingException } from '../steam.api/steam.exception';

/**
 * 유저 게임 가져오기 -> 게임 카테고리 추출 및 데이터 생성
 * @param steamid 스팀 계정 아이디
 */
export type RawGameCategory = {
  appid: string;
  name: string;
  categories: string[];
}[];
export const makeGameSet = (gamesList: {appid: string}[]) => {
  const gameSet: string[][] = [];
  const len = gamesList.length;

  if (len === 0) return gameSet;

  let i = 0;
  while (i * 10 < len) {
    gameSet.push(gamesList.map((e) => e.appid).slice(i * 10, (i + 1) * 10));
    i += 1;
  }

  return gameSet;
};
export const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const crawlingDataFromAppid = async (appid: string): Promise<GameData | undefined> => {
  try {
    const dom = await getGameHtmlDOM(appid);
    const tags = getTags(dom);
    const name = getAppName(dom) as string;
    const photoUrl = getAppPhoto(dom) as string;
    return {
      appid, tags, name, photoUrl,
    };
  } catch (err) {
    if (err instanceof TagParsingException) {
      console.log('TagParsingException: ', appid);
      return undefined;
    }
    console.log('other err: ', appid, err.name);
  }
};
export const getGameData = async (games: any) => {
  const dataSet = makeGameSet(games);

  const gameinfos = [];

  for (const gameSet of dataSet) {
    const tagsSet = await Promise.all(
      gameSet.map((appid) => crawlingDataFromAppid(appid)),
    );
    gameinfos.push(...tagsSet.flat().filter((e) => e !== undefined));
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
