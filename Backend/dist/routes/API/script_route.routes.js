"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//libs
const express_1 = require("express");
//repos
const script_repos_repos_1 = __importDefault(require("../../repos/API/script_repos.repos"));
const error_1 = require("../../models/error");
//middlewares
const jwt_verify_middleware_1 = __importDefault(require("../../middlewares/Authentication/jwt_verify.middleware"));
//erros
const error_2 = require("../../models/error");
const script_route = (0, express_1.Router)();
script_route.post('/script', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin_privileges)) {
            throw new error_2.ForbiddenError("Você precisad e provilégios de administrador para realizar essa operação");
        }
        const { page, itemsPerPage } = req.query;
        if (typeof page !== 'string' || typeof itemsPerPage !== 'string') {
            throw new error_1.DatabaseError("número de páginas e items por página não foram informados");
        }
        const corpo = req.body;
        console.log(corpo);
        if (!corpo.paramsScript1 || !corpo.paramsScript2) {
            throw new error_1.DatabaseError("parâmetros não informados");
        }
        await script_repos_repos_1.default.runScript(corpo.script, corpo.paramsScript1, corpo.script2, corpo.paramsScript2, Number(page), Number(itemsPerPage), req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
exports.default = script_route;
