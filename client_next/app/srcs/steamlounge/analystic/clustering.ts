import tf from '@tensorflow/tfjs';
import { GameDataList } from '../dto/game';

export const makeTagDimention = (gameDatas: GameDataList) => {
  const tagSet = new Set<string>();
  gameDatas.forEach((gameData) => {
    gameData.tags.forEach((tag) => {
      tagSet.add(tag);
    });
  });
  const tagList = Array.from(tagSet);
  return tagList;
};

export const makeTagVector = (gameDatas: GameDataList) => {
  const tagList = makeTagDimention(gameDatas);
  const tagVector = gameDatas.map((gameData) => {
    const vector = Array(tagList.length).fill(0);
    gameData.tags.forEach((tag) => {
      const idx = tagList.indexOf(tag);
      vector[idx] = 1;
    });
    return vector;
  });
  return tagVector;
};

export const makeTensor = (vector: number[][]) => tf.tensor2d(vector);
