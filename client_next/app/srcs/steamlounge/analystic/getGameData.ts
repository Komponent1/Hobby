/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { GameAnalysticData, GameData } from '../dto/game';
import { TagParsingException } from '../steam.api/steam.exception';
import { consineSimilarity } from './clustering';
import { OwnedGames } from '../dto/steam.api..dto';

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
    console.log('Other Exception: ', game.appid, err.name);
  }
};
export const getGameData = async (games: OwnedGames[]) => {
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
  const elements: any[] = gameinfos.map((game) => ({
    data: {
      id: game.name,
      label: game.name,
      photoUrl: game.photoUrl,
    },
  }));
  const gameNames = gameinfos.map((game) => game.name);

  for (let i = 0; i < gameNames.length; i += 1) {
    for (let j = i + 1; j < gameNames.length; j += 1) {
      const game1 = gameNames[i];
      const game2 = gameNames[j];
      const similarity = consineSimilarity(gameinfos[i].tagVector, gameinfos[j].tagVector);
      if (similarity > 0.55) {
        elements.push({
          data: {
            id: `${game1}-${game2}`,
            source: game1,
            target: game2,
            weight: similarity * 5,
          },
        });
      }
    }
  }

  return elements;
};
