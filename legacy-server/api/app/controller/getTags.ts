import { Request, Response, NextFunction } from 'express';
import { ERROR } from '../lib';
import db from '../model/connect';


const dataFromDB = async (): Promise<any> => {
  try {
    const data = await db.many(
      "SELECT * FROM tag"
    );
    return data;
  } catch(err) {
    if (err.code === 0) return [];
    else ERROR.dbError(err);
  }
};
const getTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await dataFromDB();

    return res.status(200).json({ tags });
  } catch(err) {
    return next(err);
  }
}

export default getTags;
