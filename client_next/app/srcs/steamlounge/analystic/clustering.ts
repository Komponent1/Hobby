import { GameAnalysticData, GameData } from '../dto/game';

export const makeTagDimention = (gameDatas: GameData[]) => {
  const tagSet = new Set<string>();
  gameDatas.forEach((gameData) => {
    gameData.tags.forEach((tag) => {
      tagSet.add(tag);
    });
  });
  const tagList = Array.from(tagSet);
  return tagList;
};

export const makeTagVector = (gameDatas: GameData[]) => {
  const tagList = makeTagDimention(gameDatas);
  const gameDataWithTagVector: GameAnalysticData[] = gameDatas.map((gameData) => {
    const vector = Array(tagList.length).fill(0);
    gameData.tags.forEach((tag) => {
      const idx = tagList.indexOf(tag);
      vector[idx] = 1;
    });
    return {
      ...gameData,
      tagVector: vector,
    };
  });
  return gameDataWithTagVector;
};
