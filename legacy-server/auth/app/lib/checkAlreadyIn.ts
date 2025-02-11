import { ERROR } from '.';
import * as model from '../model';

const checkAlreadyIn = async (key: string, param: any[]) => {
  let data: any = null;
  try {
    await model[key].get(...param);
  } catch(err) {
    if (err.code !== 0) {
      ERROR.dbError(err);
    }
  };

  if (data) ERROR.refError(`Already hav data in ${key}`);
};

export default checkAlreadyIn;
