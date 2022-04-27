/* pg-promise import is typeerror in typescript... why? */
const pgp = require('pg-promise');

const { DB_ID, DB_PASSWORD, DB_HOST } = process.env;
const connection = {
  host: DB_HOST,
  port: 5432,
  database: 'test',
  user: DB_ID,
  password: DB_PASSWORD,
  max: 30
}
const db = pgp({})(connection);

export default db;
