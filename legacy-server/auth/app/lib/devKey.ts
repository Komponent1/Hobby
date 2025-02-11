import * as jwt from 'jsonwebtoken';

const devHashKey: { secret: string, option: jwt.SignOptions } = {
  secret: 'Secret',
  option: {
    algorithm: 'HS256',
    expiresIn: '24h',
  }
};

export default devHashKey;
