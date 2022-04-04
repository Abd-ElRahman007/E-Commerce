import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { db_host, db_user, db_password, db_name } = process.env;



const Client = new Pool({
    host: db_host,
    database: db_name,
    user: db_user,
    password: db_password,
    port:5432,
    ssl:true
});

export default Client;
