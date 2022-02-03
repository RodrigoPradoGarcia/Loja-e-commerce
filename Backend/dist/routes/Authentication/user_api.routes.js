"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//libs
const express_1 = require("express");
const user_api_repos_1 = __importDefault(require("../../repos/Authentication/user_api_repos"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
//erros
const error_1 = require("../../models/error");
const user_api_repos_2 = __importDefault(require("../../repos/Authentication/user_api_repos"));
//middlewares
const jwt_verify_middleware_1 = __importDefault(require("../../middlewares/Authentication/jwt_verify.middleware"));
const user_api_route = (0, express_1.Router)();
user_api_route.get('/authentication/users', jwt_verify_middleware_1.default, async (req, res, next) => {
    try {
        const users = await user_api_repos_1.default.getAllUsers();
        res.status(http_status_codes_1.StatusCodes.OK).send(users);
    }
    catch (erro) {
        next(erro);
    }
});
//e45274d0-85f1-4aa6-a489-e587c466f3ad admin
//b49e5b77-1db2-472b-8e97-316c53550fcb notAdmin
user_api_route.get('/authentication/users/:uuid', jwt_verify_middleware_1.default, async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        const user = await user_api_repos_1.default.getById(uuid);
        res.status(http_status_codes_1.StatusCodes.OK).send(user);
    }
    catch (erro) {
        next(erro);
    }
});
user_api_route.post('/authentication/users', async (req, res, next) => {
    try {
        const corpo = req.body;
        if (typeof corpo.password === undefined) {
            throw new error_1.DatabaseError("senha não foi fornecida");
        }
        const uuid = await user_api_repos_1.default.post(corpo);
        res.status(http_status_codes_1.StatusCodes.OK).send(uuid);
    }
    catch (erro) {
        next(erro);
    }
});
user_api_route.post('/authentication/token', async (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            throw new error_1.ForbiddenError("Cabeçalho não enviado");
        }
        const [tipo, base64] = header === null || header === void 0 ? void 0 : header.split(" ");
        if (tipo !== 'Basic' || !base64) {
            throw new error_1.ForbiddenError("Autenticação inválida");
        }
        const [username, password] = Buffer.from(base64, "base64").toString("utf-8").split(":");
        const user = await user_api_repos_2.default.getByUsernameAndPassword(username, password);
        if (!user) {
            throw new error_1.ForbiddenError("Autenticação inválida");
        }
        const token = jsonwebtoken_1.default.sign({ username: user.username }, process.env.SECRET, { subject: user.uuid, expiresIn: 3000 });
        res.status(http_status_codes_1.StatusCodes.OK).send(token);
    }
    catch (erro) {
        next(erro);
    }
});
user_api_route.post('/authentication/token/validate', jwt_verify_middleware_1.default, async (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.OK).send("Token válida!");
});
user_api_route.put('/authentication/users/:uuid', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        const uuid = req.params.uuid;
        const userASerAlerado = await user_api_repos_2.default.getById(uuid);
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de administrador para realizar essa operação");
        }
        if (userASerAlerado.admin_privileges === true && !req.user.master_privileges && userASerAlerado.uuid !== req.user.uuid) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de mestre para realizar essa operação");
        }
        const corpo = req.body;
        if (!corpo) {
            throw new error_1.ForbiddenError("Corpo não definido");
        }
        await user_api_repos_2.default.put(uuid, corpo);
        res.status(http_status_codes_1.StatusCodes.OK).send("Atualizado com sucesso!");
    }
    catch (erro) {
        next(erro);
    }
});
user_api_route.delete('/authentication/users/:uuid', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a, _b, _c;
    try {
        const userASerApagado = await user_api_repos_2.default.getById(req.params.uuid);
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin_privileges) === false && req.params.uuid !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.uuid)) {
            throw new error_1.ForbiddenError("Você precisa de permissão de administrador para realizar essa operação");
        }
        if (userASerApagado.admin_privileges === true && ((_c = req.user) === null || _c === void 0 ? void 0 : _c.master_privileges) === false) {
            throw new error_1.ForbiddenError("Você precisa de permissão de mestre para realizar essa operação");
        }
        const uuid = req.params.uuid;
        await user_api_repos_2.default.delete(uuid);
        res.status(http_status_codes_1.StatusCodes.OK).send("Apagado com sucesso!");
    }
    catch (erro) {
        next(erro);
    }
});
user_api_route.put('/authentication/privileges/:uuid', jwt_verify_middleware_1.default, async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        const user = req.user;
        const userASerAlterado = await user_api_repos_2.default.getById(uuid);
        const corpo = req.body;
        if ((user === null || user === void 0 ? void 0 : user.admin_privileges) === false) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de administrador para realizar essa operação");
        }
        if ((user === null || user === void 0 ? void 0 : user.master_privileges) === false && (userASerAlterado.admin_privileges === true || userASerAlterado.master_privileges === true)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de mestre para realizar essa operação");
        }
        await user_api_repos_2.default.privilege_read_write(uuid, corpo);
        res.status(http_status_codes_1.StatusCodes.OK).send("Privilégios alterados com sucesso!");
    }
    catch (erro) {
        next(erro);
    }
});
user_api_route.put('/authentication/privileges/admin/:uuid', jwt_verify_middleware_1.default, async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        const user = req.user;
        const corpo = req.body;
        if ((user === null || user === void 0 ? void 0 : user.master_privileges) === false) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de mestre para realizar essa operação");
        }
        await user_api_repos_2.default.privilege_admim(uuid, corpo);
        res.status(http_status_codes_1.StatusCodes.OK).send("Privilégios alterados com sucesso!");
    }
    catch (erro) {
        next(erro);
    }
});
exports.default = user_api_route;
