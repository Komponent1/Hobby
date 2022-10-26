import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { ERROR } from '../lib';

const parse = (req: Request) => {
  try {
    const banner = req.file;
    
    return banner;
  } catch (err) {
    ERROR.paramError(err);
  }
}
const uploadBanner = (banner: any) => {
  try {
    const filename = `public/${Date.now()}-${banner.originalname}`;
    fs.writeFileSync(filename, banner.buffer);

    return filename;
  } catch (err) {
    ERROR.fileError(err);
  }
}
const uploadImage = (req: Request, res: Response, next: NextFunction) => {
  try {
    const banner = parse(req);
    const filename = uploadBanner(banner);

    return res.status(200).json({ url: `${process.env.BASEURL}/${filename}` })
  } catch (err) {
    next(err);
  }
};

export default uploadImage;
