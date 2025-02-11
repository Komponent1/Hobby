const paramError = (err: any) => {
  console.log('ERROR LOG(PARAM)', err);
  throw ({
    code: 400,
    msg: 'No Correct Paramter'
  })
};
const dbError = (err: any) => {
  console.log('ERROR LOG(DB)', err);
  throw ({
    code: 500,
    msg: 'Error In Db'
  });
};
const authError = (err: any) => {
  console.log('ERROR LOG(AUTH)', err);
  throw ({
    code: 401,
    msg: 'No Authentication'
  })
};
const refError = (err: any) => {
  console.log('ERROR LOG(REF)', err);
  throw ({
    code: 412,
    msg: 'Already Data In'
  });
};
const logicError = (err: any) => {
  console.log('ERROR LOG(LOGIC)', err);
  throw ({
    code: 500,
    msg: 'Some logic wrong work'
  });
}

export default {
  paramError, dbError, authError, refError, logicError
};
