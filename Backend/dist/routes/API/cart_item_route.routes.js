"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//libs
const express_1 = require("express");
//erros
const error_1 = require("../../models/error");
//middlewares
const jwt_verify_middleware_1 = __importDefault(require("../../middlewares/Authentication/jwt_verify.middleware"));
//repos
const cart_item_repos_repos_1 = __importDefault(require("../../repos/API/cart_item_repos.repos"));
const cart_item_route = (0, express_1.Router)();
cart_item_route.get('/cart_items', jwt_verify_middleware_1.default, async (req, res, next) => {
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
        await cart_item_repos_repos_1.default.getAll(pageN, itemsPerPageN, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
cart_item_route.get("/cart_items/:uuid_user/:uuid_product", jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.read_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const uuid_user = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        await cart_item_repos_repos_1.default.getSpecific(uuid_user, uuid_product, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
cart_item_route.get("/cart_items/:uuid", jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.read_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const uuid = req.params.uuid;
        const { page, itemsPerPage } = req.query;
        if (typeof page !== 'string' || typeof itemsPerPage !== 'string') {
            throw new error_1.DatabaseError("número da página e items por página não foram enviados");
        }
        await cart_item_repos_repos_1.default.getAllItemsFromUser(uuid, Number(page), Number(itemsPerPage), req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
cart_item_route.post('/cart_items', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const corpo = req.body;
        await cart_item_repos_repos_1.default.post(corpo, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
cart_item_route.put('/cart_items/:uuid_user/:uuid_product', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid_user = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        const corpo = req.body;
        if (corpo.amount <= 0) {
            await cart_item_repos_repos_1.default.delete(uuid_user, uuid_product, req, res, next);
        }
        else {
            await cart_item_repos_repos_1.default.put(uuid_user, uuid_product, corpo, req, res, next);
        }
    }
    catch (erro) {
        next(erro);
    }
});
cart_item_route.delete('/cart_items/:uuid_user/:uuid_product', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            throw new error_1.ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid_user = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        await cart_item_repos_repos_1.default.delete(uuid_user, uuid_product, req, res, next);
    }
    catch (erro) {
        next(erro);
    }
});
exports.default = cart_item_route;
