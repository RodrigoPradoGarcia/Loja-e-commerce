"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../models/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_api_repos_1 = __importDefault(require("../../repos/Authentication/user_api_repos"));
async function jwt_verify(req, res, next) {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            throw new error_1.ForbiddenError("é necessário enviar uma token de acesso para continuar");
        }
        const [tipo, token] = header.split(" ");
        if (tipo != 'Bearer' || !token) {
            throw new error_1.ForbiddenError("é necessário enviar uma token de acesso para continuar");
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        const uuid = payload.sub;
        if (typeof uuid !== "string" || !uuid) {
            throw new error_1.ForbiddenError("Token inválida!");
        }
        const user = await user_api_repos_1.default.getById(uuid);
        req.user = user;
        next();
    }
    catch (erro) {
        if (erro instanceof error_1.ForbiddenError) {
            next(erro);
        }
        else {
            next(new error_1.ForbiddenError("Acesso negado!"));
        }
    }
}
exports.default = jwt_verify;
