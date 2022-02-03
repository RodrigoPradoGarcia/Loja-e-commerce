const mysql = require('mysql');
import 'dotenv/config';

//erros
import { DatabaseError } from "../../models/error";

const conexao = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

export default conexao;