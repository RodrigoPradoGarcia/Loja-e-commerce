"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
//erros
const error_1 = require("../../models/error");
const NoError_error_1 = __importDefault(require("../../models/error/NoError.error"));
function errorHandler(err, req, res, next) {
    if (err instanceof error_1.DatabaseError) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(err.message);
    }
    else if (err instanceof error_1.ForbiddenError) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN).send(err.message);
    }
    else if (err instanceof NoError_error_1.default) {
        res.status(http_status_codes_1.StatusCodes.OK).send(err.message);
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(err.message);
    }
}
exports.default = errorHandler;
