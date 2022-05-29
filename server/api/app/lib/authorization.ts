type tAuthorization = (user: string, author: string) => void
const authorization: tAuthorization = (user, author) => {
  if (author !== user) {
    console.log('ERROR LOG(authorization)', `user: ${user} !== author: ${author}`);
    throw ({
      code: 500,
      msg: 'No matched author with blog owner'
    })
  }
};

export default authorization;
