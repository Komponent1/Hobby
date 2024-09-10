/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { GameAnalysticData, GameData } from '../dto/game';
import {
  getAppName, getAppPhoto, getCategories, getGameHtmlDOM, getTags,
} from './steam.crawler';
import { TagParsingException } from '../steam.api/steam.exception';
import { consineSimilarity } from './clustering';

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

export const crawlingDataFromAppid = async (appid: string): Promise<GameData | undefined> => {
  try {
    const dom = await getGameHtmlDOM(appid);
    const categories = getCategories(dom);
    const tags = getTags(categories);
    const name = getAppName(dom) as string;
    const photoUrl = getAppPhoto(dom) as string;
    return {
      appid, categories, tags, name, photoUrl,
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
  /** 10개씩 분리 -> load 배분 */
  const dataSet = makeGameSet(games);

  const gameinfos = [];

  for (const gameSet of dataSet) {
    const gameDataWithTags = await Promise.all(
      gameSet.map((appid) => crawlingDataFromAppid(appid)),
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
export const makeNode = (gameinfos: GameAnalysticData[]) => {
  const elements: any[] = gameinfos.map((game) => ({data: { id: game.name, label: game.name }}));
  const gameNames = gameinfos.map((game) => game.name);

  for (let i = 0; i < gameNames.length; i += 1) {
    for (let j = i + 1; j < gameNames.length; j += 1) {
      const game1 = gameNames[i];
      const game2 = gameNames[j];
      const similarity = consineSimilarity(gameinfos[i].tagVector, gameinfos[j].tagVector);
      if (similarity > 0.1) {
        elements.push({
          data: {
            id: `${game1}-${game2}`,
            source: game1,
            target: game2,
            weight: similarity,
          },
        });
      }
    }
  }

  return elements;
};
