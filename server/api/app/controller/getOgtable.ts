import { Request, Response, NextFunction } from 'express';
import ogs from 'open-graph-scraper';
import { ERROR } from '../lib';

type Query = {
  url: string;
};
const parse = (req: Request<{}, {}, {}, Query>) => {
  try {
    const { url } = req.query;
    console.log(url);

    return url;
  } catch (err) {
    ERROR.paramError(err);
  }
}
const fetchOg = async (url: string) => {
  try {
    const { result } = await ogs({url});

    return result;
  } catch (err) {
    ERROR.unknnownError(err, 'unknown');
  }
}
const getOgTable = async (req: Request<{}, {}, {}, Query>, res: Response, next: NextFunction) => {
  try {
    const url = parse(req);
    const result = await fetchOg(url);

    return res.status(200).json({
      result,
    })
  } catch (err) {
    next(err);
  }
}

export default getOgTable;
