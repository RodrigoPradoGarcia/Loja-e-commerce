import {Pool} from 'pg';
import 'dotenv/config';

const AutBanco = new Pool({
    host:process.env.PG_HOST,
    user:process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    database:process.env.PG_DATABASE
});

export default AutBanco;