import * as jwt from 'jsonwebtoken';

const devHashKey: { secret: string, option: jwt.SignOptions } = {
  secret: 'Secret',
  option: {
    algorithm: 'HS256',
    expiresIn: '30m',
  }
};

export default devHashKey;
