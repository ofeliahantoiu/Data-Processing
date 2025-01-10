import pgPromise from 'pg-promise' ;
import { IDatabase, IMain } from 'pg-promise';
import * as dotenv from 'dotenv';

dotenv.config();

const pgp: IMain = pgPromise({});
const dbConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
};
const db: IDatabase<any> = pgp(dbConfig);

export {db, pgp};