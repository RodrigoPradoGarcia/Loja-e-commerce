"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoError = exports.ForbiddenError = exports.DatabaseError = void 0;
const DatabaseError_error_1 = __importDefault(require("./DatabaseError.error"));
exports.DatabaseError = DatabaseError_error_1.default;
const ForbiddenErorr_error_1 = __importDefault(require("./ForbiddenErorr.error"));
exports.ForbiddenError = ForbiddenErorr_error_1.default;
const NoError_error_1 = __importDefault(require("./NoError.error"));
exports.NoError = NoError_error_1.default;
