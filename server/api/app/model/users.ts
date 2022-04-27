import db from './connect';

export const getUsers = async (email?: string) => {
  if (!email) {
    return await db.one('SELECT * FROM Users');
  } else {
    return await db.any('SELECT * FROM Users WHERE name = $1', [email]);
  }
}
export const addUsers = async (email: string, password: string, salt: string) => {
  return await db.none(`INSERT INTO Users(id, password, salt) VALUES(${email}, ${password}, ${salt})`);
};
