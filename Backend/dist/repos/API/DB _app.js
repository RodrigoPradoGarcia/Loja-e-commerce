"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
require("dotenv/config");
const conexao = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
exports.default = conexao;
