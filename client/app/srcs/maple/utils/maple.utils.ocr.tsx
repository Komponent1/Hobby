import { createWorker } from 'tesseract.js';

export const grayScaling = (raw: ImageData) => {
  const grayImage = new ImageData(raw.data.slice(), raw.width, raw.height);

  for (let i = 0; i < raw.data.length; i += 4) {
    const avg = (raw.data[i] + raw.data[i + 1] + raw.data[i + 2]) / 3;
    grayImage.data[i] = avg;
    grayImage.data[i + 1] = avg;
    grayImage.data[i + 2] = avg;
  }
  return grayImage;
};
export const getAllTextInImage = async (dataUrl: string) => {
  const worker = await createWorker('kor');
  const { data: {text} } = await worker.recognize(
    dataUrl,
  );

  worker.terminate();
  return text;
};
export const getSentencesWithWord = (text: string, word: string) => {
  const sentences: string[] = [];
  text.split('\n').forEach((line) => {
    if (line.includes(word)) {
      sentences.push(line);
    }
  });
  return sentences.reverse();
};
export const sentenceSimilarity = (sentence1: string, sentence2: string) => {
  if (sentence1 === undefined || sentence2 === undefined) return 1;
  const words1 = sentence1.split(' ');
  const words2 = sentence2.split(' ');

  const commonWords = words1.filter((word) => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
};
