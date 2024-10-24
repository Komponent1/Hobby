export const generateVectorDimention = <T>(rawData: T[], key: string) => {
  const tagSet = new Set<string>();
  rawData.forEach((data) => {
    data[key].forEach((tag: string) => {
      tagSet.add(tag);
    });
  });
  const vectorList = Array.from(tagSet);
  return vectorList;
};
export const generateVector = <T>(rawData: T[], key: string) => {
  const vectorList = generateVectorDimention(rawData, key);
  const proessingData: (T & { vector: number[] })[] = rawData.map((data) => {
    const vector: number[] = Array(vectorList.length).fill(0);
    data[key].forEach((tag: string) => {
      const idx = vectorList.indexOf(tag);
      vector[idx] = 1;
    });
    return {
      ...data,
      vector,
    };
  });
  return proessingData;
};
export const consineSimilarity = (vector1: number[], vector2: number[]) => {
  const dotProduct = vector1.reduce((acc, curr, idx) => acc + curr * vector2[idx], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((acc, curr) => acc + curr ** 2, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((acc, curr) => acc + curr ** 2, 0));
  return dotProduct / (magnitude1 * magnitude2);
};
