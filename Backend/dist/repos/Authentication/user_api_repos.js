"use strict";
//libs
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//erros
const error_1 = require("../../models/error");
//banco
const aut_db_1 = __importDefault(require("./aut_db"));
class userAPIRepos {
    async getAllUsers() {
        try {
            const { rows } = await aut_db_1.default.query("select uuid,username,read_privileges,write_privileges,admin_privileges,master_privileges from application_user");
            return rows;
        }
        catch (erro) {
            throw new error_1.DatabaseError("Não foi possível ler do banco de dados");
        }
    }
    async getById(uuid) {
        try {
            const result = await aut_db_1.default.query("select uuid,username,read_privileges,write_privileges,admin_privileges,master_privileges from application_user where uuid=$1", [uuid]);
            if (result.rowCount === 0) {
                throw new error_1.DatabaseError("usuário não encontrado");
            }
            const { rows: [user] } = result;
            return user;
        }
        catch (erro) {
            throw new error_1.DatabaseError("ocorreu um erro ao objet o usuário");
        }
    }
    async post(json) {
        try {
            const uuid = await aut_db_1.default.query("insert into application_user (username,password,read_privileges,write_privileges,admin_privileges,master_privileges) values ($1,crypt($2,$3),$4,$5,$6,$7) returning uuid", [json.username, json.password, process.env.SECRET, true, false, false, false]);
            return uuid.rows[0];
        }
        catch (erro) {
            console.log(erro.message);
            throw new error_1.DatabaseError("não foi possível cadastrar o usuário");
        }
    }
    async getByUsernameAndPassword(username, password) {
        try {
            const { rows: [user] } = await aut_db_1.default.query("select uuid,username,read_privileges,write_privileges,admin_privileges,master_privileges from application_user where username=$1 and password=crypt($2,$3)", [username, password, process.env.SECRET]);
            return user;
        }
        catch (erro) {
            throw new error_1.DatabaseError("usuário não encontrado");
        }
    }
    async put(uuid, obj) {
        try {
            const result = await aut_db_1.default.query("update application_user set username=$1,password=crypt($2,$3),read_privileges=$4,write_privileges=$5 where uuid=$6", [obj.username, obj.password, process.env.SECRET, obj.read_privileges, obj.write_privileges, uuid]);
            if (result.rowCount === 0) {
                throw new error_1.DatabaseError("Usuário não existe");
            }
        }
        catch (erro) {
            console.log(erro);
            throw new error_1.DatabaseError("Não foi possível alterar esse usuário");
        }
    }
    async delete(uuid) {
        try {
            const result = await aut_db_1.default.query("delete from application_user where uuid=$1", [uuid]);
            if (result.rowCount === 0) {
                throw new error_1.DatabaseError("o usuário não existe");
            }
        }
        catch (erro) {
            throw new error_1.DatabaseError("não foi possível deletar");
        }
    }
    async privilege_read_write(uuid, user) {
        try {
            await aut_db_1.default.query("update application_user set read_privileges=$1,write_privileges=$2 where uuid=$3", [user.read_privileges, user.write_privileges, uuid]);
        }
        catch (erro) {
            throw new error_1.DatabaseError("Ocorreu um erro ao alterar o privilégio");
        }
    }
    async privilege_admim(uuid, user) {
        try {
            await aut_db_1.default.query("update application_user set admin_privileges=$1 where uuid=$2", [user.admin_privileges, uuid]);
        }
        catch (erro) {
            throw new error_1.DatabaseError("Ocorreu um erro ao alterar o privilégio");
        }
    }
}
exports.default = new userAPIRepos();
