import { ERROR } from ".";

type tAuthorization = (user: string, author: string) => void
const authorization: tAuthorization = (user, author) => {
  if (author !== user) {
    ERROR.authError(`user: ${user} !== author: ${author}`);
  }
};

export default authorization;
