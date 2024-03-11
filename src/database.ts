import dotenv from 'dotenv'
import { Pool } from 'pg';

dotenv.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV } = process.env;

let Client: Pool = new Pool();
console.log(ENV)
if (ENV === 'dev') {
    console.log(POSTGRES_DB)
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}

if (ENV === 'test') {
    console.log(POSTGRES_TEST_DB)
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}

export default Client;
