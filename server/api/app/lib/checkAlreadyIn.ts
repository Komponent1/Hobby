import * as model from '../model';

const checkAlreadyIn = async (key: string, param: any[]) => {
  let data: any = null;
  try {
    data = await model[key].get(...param);
  } catch(err) {
    if (err.code !== 0) {
      console.log('ERROR LOG(DB)', err);
      throw ({
        code: 500,
        msg: 'DB server error'
      });
    }
  };

  if (data) throw ({
    code: 401,
    msg: 'Already data in'
  });
};

export default checkAlreadyIn;
