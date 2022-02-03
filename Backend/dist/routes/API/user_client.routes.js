"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//libs
const express_1 = require("express");
//repos
const user_client_repos_1 = __importDefault(require("../../repos/API/user_client.repos"));
//middllwares
const jwt_verify_middleware_1 = __importDefault(require("../../middlewares/Authentication/jwt_verify.middleware"));
//erros
const error_1 = require("../../models/error");
const user_client_route = (0, express_1.Router)();
user_client_route.get('/users', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.read_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const { page, itemsPerPage } = req.query;
        if (typeof page !== 'string' || typeof itemsPerPage !== 'string') {
            throw new error_1.DatabaseError("número da página e items por página não informados");
        }
        const pageN = Number.parseInt(page);
        const itemsPerPageN = Number.parseInt(itemsPerPage);
        await user_client_repos_1.default.getAll(pageN, itemsPerPageN, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
user_client_route.get("/users/:uuid", jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.read_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const uuid = req.params.uuid;
        await user_client_repos_1.default.getSpecific(uuid, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
user_client_route.post('/users', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const corpo = req.body;
        await user_client_repos_1.default.post(corpo, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
user_client_route.put('/users/:uuid', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        console.log(req.body);
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid = req.params.uuid;
        const corpo = req.body;
        await user_client_repos_1.default.put(uuid, corpo, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
user_client_route.delete('/users/:uuid', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid = req.params.uuid;
        await user_client_repos_1.default.delete(uuid, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
exports.default = user_client_route;
