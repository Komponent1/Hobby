import { GameAnalysticData, GameData, TagPercentage } from "../dto/steam.dto.game";

export const getTagCounter = (gameDatas: GameData[]) => {
  const tagCounter = new Map<string, number>();
  gameDatas.forEach((gameData) => {
    if (gameData.crawling_data) {
      gameData.crawling_data.tags.forEach((tag) => {
        if (tagCounter.has(tag)) {
          tagCounter.set(tag, tagCounter.get(tag) as number + 1);
        } else {
          tagCounter.set(tag, 1);
        }
      });
    }
  });

  return tagCounter;
};
export const analyzeTagPercent = (tagCounter: Map<string, number>): TagPercentage[] => {
  const percentage: TagPercentage[] = [];
  const total = Array.from(tagCounter.values()).reduce((acc, cur) => acc + cur, 0);
  tagCounter.forEach((count, tag) => {
    percentage.push({tag, count, percent: count / total});
  });
  percentage.sort((a, b) => b.percent - a.percent);

  return percentage;
};
export const getTagList = (tagCounter: Map<string, number>) => Array.from(tagCounter.keys());
export const makeTagVector = (gameDatas: GameData[]) => {
  const tagCounter = getTagCounter(gameDatas);
  const tagList = getTagList(tagCounter);
  const gameDataWithTagVector: GameAnalysticData[] = gameDatas.map((gameData) => {
    const vector = Array(tagList.length).fill(0);
    if (gameData.crawling_data) {
      gameData.crawling_data.tags.forEach((tag) => {
        const idx = tagList.indexOf(tag);
        vector[idx] = 1;
      });
    }
    return {
      ...gameData,
      tagVector: vector,
    };
  });
  return gameDataWithTagVector;
};
