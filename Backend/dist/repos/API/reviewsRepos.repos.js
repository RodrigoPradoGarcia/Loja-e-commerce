"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../models/error");
const DB__app_1 = __importDefault(require("../../repos/API/DB _app"));
const exibirResult_middleware_1 = __importDefault(require("../../middlewares/API/exibirResult.middleware"));
class reviews_repos {
    async getAll(page, itemsPerPage, req, res, next) {
        try {
            if (page <= 0 || itemsPerPage <= 0) {
                next(new error_1.DatabaseError("número da página inválido!"));
            }
            else {
                DB__app_1.default.query(`select * from review limit ?,?`, [itemsPerPage * page - itemsPerPage, itemsPerPage], (err, result, fields) => {
                    if (err) {
                        console.log(err.message);
                        next(new error_1.DatabaseError("não foi possível realizar a query"));
                    }
                    else {
                        DB__app_1.default.query("select count(user_uuid) from review", (err, count) => {
                            if (err) {
                                console.log(err.message);
                                next(new error_1.DatabaseError("erro inesperado"));
                            }
                            else {
                                (0, exibirResult_middleware_1.default)({ rows: result, currentPage: page, lastPage: Math.ceil(count[0]['count(user_uuid)'] / itemsPerPage) }, req, res, next);
                            }
                        });
                    }
                });
            }
        }
        catch (erro) {
            console.log(erro.message);
            next(new error_1.DatabaseError("não foi possível obter a lista de reviews"));
        }
    }
    async getSpecific(uuid_user, uuid_product, req, res, next) {
        try {
            DB__app_1.default.query(`select * from review where user_uuid=? and product_uuid=?`, [uuid_user, uuid_product], (err, result, fields) => {
                if (err) {
                    console.log(err.message);
                    next(new error_1.DatabaseError("não foi possível realizar a query"));
                }
                (0, exibirResult_middleware_1.default)(result, req, res, next);
            });
        }
        catch (erro) {
            console.log(erro.message);
            next(new error_1.DatabaseError("não foi possível obter a review"));
        }
    }
    async post(review, req, res, next) {
        try {
            DB__app_1.default.query("insert into review (user_uuid,product_uuid,stars,comment) values (?,?,?,?)", [review.user_uuid, review.product_uuid, review.stars, review.comment], (err, result, fields) => {
                if (err) {
                    console.log(err.message);
                    next(new error_1.DatabaseError("não foi possível inserir no banco"));
                }
                else {
                    next(new error_1.NoError("Cadastro Realizado com sucesso!"));
                }
            });
        }
        catch (erro) {
            console.log(erro.message);
            next(new error_1.DatabaseError("não foi possível realizar o cadastro"));
        }
    }
    async put(uuid_user, uuid_product, corpo, req, res, next) {
        try {
            DB__app_1.default.query("select * from review where user_uuid=? and product_uuid=?", [uuid_user, uuid_product], (err, result, fields) => {
                if (err) {
                    console.log(err.message);
                    next(new error_1.DatabaseError("Ocorreu um erro insesperado"));
                }
                if (result.length === 0) {
                    next(new error_1.DatabaseError("review não encontrada"));
                }
                else {
                    DB__app_1.default.query("update review set stars=?,comment=? where user_uuid=? and product_uuid=?", [corpo.stars, corpo.comment, uuid_user, uuid_product], (err) => {
                        if (err) {
                            console.log(err.message);
                            next(new error_1.DatabaseError("Não foi possível realizar a alteração"));
                        }
                        else {
                            next(new error_1.NoError("Dados alterados com sucesso!"));
                        }
                    });
                }
            });
        }
        catch (erro) {
            console.log(erro.message);
            next(new error_1.DatabaseError("Não foi possível realizar a alteração"));
        }
    }
    async delete(uuid_user, uuid_product, req, res, next) {
        try {
            DB__app_1.default.query("select * from review where user_uuid=? and product_uuid=?", [uuid_user, uuid_product], (err, result, fields) => {
                if (err) {
                    console.log(err.message);
                    next(new error_1.DatabaseError("Ocorreu um erro inesperado"));
                }
                if (result.length === 0) {
                    next(new error_1.DatabaseError("review não encontrada"));
                }
                DB__app_1.default.query("delete from review where user_uuid=? and product_uuid=?", [uuid_user, uuid_product], (err) => {
                    if (err) {
                        console.log(err.message);
                        next(new error_1.DatabaseError("Não foi possível excluir"));
                    }
                    else {
                        next(new error_1.NoError("review excluída com sucesso!"));
                    }
                });
            });
        }
        catch (erro) {
            console.log(erro.message);
            next(new error_1.DatabaseError("Não foi possível deletar"));
        }
    }
}
exports.default = new reviews_repos();
