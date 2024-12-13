import {makeGameSet} from '../analystic/getGameData';
import { GameData } from '../dto/game';
import { OwnedGames } from '../dto/steam.api..dto';
import { TagParsingException } from '../steam.api/steam.exception';
import {
  getAppName, getAppPhoto, getCategories, getGameHtmlDOM, getTags,
} from './steam.util.crawling';

export const splitDataSet = (gamesList: OwnedGames[]) => {
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

const crawlingDataFromAppid = async (game: OwnedGames): Promise<GameData | undefined> => {
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
    return undefined;
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
