"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
function exibirArray(array, req, res, next) {
    try {
        res.status(http_status_codes_1.StatusCodes.OK).send(array);
    }
    catch (erro) {
        next(erro);
    }
}
exports.default = exibirArray;
