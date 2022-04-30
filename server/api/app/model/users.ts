import db from './connect';

export const get = async (email?: string): Promise<any|null> => {
  if (!email || email === '') {
    return await db.any('SELECT * FROM Users');
  } else {
    return await db.one('SELECT * FROM Users WHERE email = $1', [email]);
  }
}
export const post = async (email: string, password: string, salt: string) => {
  return await db.none(`INSERT INTO Users(email, password, salt) VALUES($1, $2, $3)`, [email, password, salt]);
};

export default {
  get, post
}
