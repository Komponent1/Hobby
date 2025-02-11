import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { ERROR } from '../lib';

const getList = () => {
  try {
    return fs.readdirSync('public');
  } catch (err) {
    ERROR.fileError(err);
  }
}
const getRandom = (fileList: string[], count: number) => {
  const images = [];
  let reduce = fileList;
  while(images.length < count) {
    if (reduce.length === 0) break;
    images.push(reduce.splice(Math.floor(Math.random() * reduce.length),1));
  }
  return images;
}

const getImages = (_: Request, res: Response, next: NextFunction) => {
  try {
    const fileList = getList();
    const images = getRandom(fileList, 6);

    return res.status(200).json({ images });
  } catch (err) {
    next(err);
  }
};

export default getImages;
