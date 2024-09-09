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

export const consineSimilarity = (vector1: number[], vector2: number[]) => {
  const dotProduct = vector1.reduce((acc, curr, idx) => acc + curr * vector2[idx], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((acc, curr) => acc + curr ** 2, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((acc, curr) => acc + curr ** 2, 0));
  return dotProduct / (magnitude1 * magnitude2);
};
