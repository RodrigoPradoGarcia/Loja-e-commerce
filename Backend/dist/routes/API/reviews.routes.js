"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//libs
const express_1 = require("express");
//middllwares
const jwt_verify_middleware_1 = __importDefault(require("../../middlewares/Authentication/jwt_verify.middleware"));
//erros
const error_1 = require("../../models/error");
//repos
const reviewsRepos_repos_1 = __importDefault(require("../../repos/API/reviewsRepos.repos"));
const reviews_route = (0, express_1.Router)();
reviews_route.get('/reviews', jwt_verify_middleware_1.default, async (req, res, next) => {
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
        await reviewsRepos_repos_1.default.getAll(pageN, itemsPerPageN, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
reviews_route.get("/reviews/:uuid_user/:uuid_product", jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.read_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const uuid_user = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        await reviewsRepos_repos_1.default.getSpecific(uuid_user, uuid_product, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
reviews_route.post('/reviews', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const corpo = req.body;
        await reviewsRepos_repos_1.default.post(corpo, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
reviews_route.put('/reviews/:uuid_user/:uuid_product', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid_user = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        const corpo = req.body;
        await reviewsRepos_repos_1.default.put(uuid_user, uuid_product, corpo, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
reviews_route.delete('/reviews/:uuid_user/:uuid_product', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid_user = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        await reviewsRepos_repos_1.default.delete(uuid_user, uuid_product, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
exports.default = reviews_route;
