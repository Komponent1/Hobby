import { Request, Response, NextFunction } from 'express';

type getCategoryQuery = { user: string }
const getCategory = (req: Request<{}, {}, {}, getCategoryQuery>, res: Response, next: NextFunction) => {
  const { user } = req.query;
};

export default getCategory;
