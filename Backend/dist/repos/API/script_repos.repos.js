"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//erros
const error_1 = require("../../models/error");
//banco
const DB__app_1 = __importDefault(require("./DB _app"));
//middlewares
const exibirResult_middleware_1 = __importDefault(require("../../middlewares/API/exibirResult.middleware"));
class script_repos {
    async runScript(script, paramsScript1, script2, paramsScript2, page, itemsPerPage, req, res, next) {
        try {
            DB__app_1.default.query(script + " limit ?,?", [...paramsScript1, itemsPerPage * page - itemsPerPage, itemsPerPage], (err, result, fields) => {
                if (err) {
                    console.log(err.message);
                    next(new error_1.DatabaseError("Não foi possível executar o script"));
                }
                else {
                    DB__app_1.default.query(script2, [...paramsScript2], (err, count) => {
                        if (err) {
                            console.log(err.message);
                            next(new error_1.DatabaseError("Não foi possível realizar a operação"));
                        }
                        else {
                            (0, exibirResult_middleware_1.default)({ rows: result, currentPage: page, lastPage: Math.ceil(count[0]['count(*)'] / itemsPerPage) }, req, res, next);
                        }
                    });
                }
            });
        }
        catch (erro) {
            console.log(erro.message);
            next(new error_1.DatabaseError("Não foi possível realizar esta operação"));
        }
    }
}
exports.default = new script_repos();
