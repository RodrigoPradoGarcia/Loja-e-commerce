"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../models/error");
const DB__app_1 = __importDefault(require("../../repos/API/DB _app"));
const exibirResult_middleware_1 = __importDefault(require("../../middlewares/API/exibirResult.middleware"));
class products_repos {
    async getAll(page, itemsPerPage, req, res, next) {
        try {
            if (page <= 0 || itemsPerPage <= 0) {
                next(new error_1.DatabaseError("número da página inválido!"));
            }
            else {
                DB__app_1.default.query(`select * from product limit ?,?`, [itemsPerPage * page - itemsPerPage, itemsPerPage], (err, result, fields) => {
                    if (err) {
                        console.log(err.message);
                        next(new error_1.DatabaseError("não foi possível realizar a query"));
                    }
                    else {
                        DB__app_1.default.query("select count(uuid) from product", (err, count) => {
                            if (err) {
                                console.log(err.message);
                                next(new error_1.DatabaseError("erro inesperado"));
                            }
                            else {
                                (0, exibirResult_middleware_1.default)({ rows: result, currentPage: page, lastPage: Math.ceil(count[0]['count(uuid)'] / itemsPerPage) }, req, res, next);
                            }
                        });
                    }
                });
            }
        }
        catch (erro) {
            console.log(erro.message);
            next(new error_1.DatabaseError("não foi possível obter a lista de produtos"));
        }
    }
    async getSpecific(uuid, req, res, next) {
        try {
            DB__app_1.default.query(`select * from product where uuid=?`, [uuid], (err, result, fields) => {
                if (err) {
                    console.log(err.message);
                    next(new error_1.DatabaseError("não foi possível realizar a query"));
                }
                (0, exibirResult_middleware_1.default)(result, req, res, next);
            });
        }
        catch (erro) {
            console.log(erro.message);
            next(new error_1.DatabaseError("não foi possível obter o produto"));
        }
    }
    async post(product, req, res, next) {
        try {
            DB__app_1.default.query("insert into product (uuid,name,category,price,image,description) values (uuid(),?,?,?,?,?)", [product.name, product.category, product.price, product.image, product.description], (err, result, fields) => {
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
    async put(uuid, corpo, req, res, next) {
        try {
            DB__app_1.default.query("select * from product where uuid=?", [uuid], (err, result, fields) => {
                if (err) {
                    console.log(err.message);
                    next(new error_1.DatabaseError("Ocorreu um erro insesperado"));
                }
                if (result.length === 0) {
                    next(new error_1.DatabaseError("produto não encontrado"));
                }
                else {
                    DB__app_1.default.query("update product set name=?,category=?,price=?,image=?,description=? where uuid=?", [corpo.name, corpo.category, corpo.price, corpo.image, corpo.description, uuid], (err) => {
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
    async delete(uuid, req, res, next) {
        try {
            DB__app_1.default.query("select * from product where uuid=?", [uuid], (err, result, fields) => {
                if (err) {
                    console.log(err.message);
                    next(new error_1.DatabaseError("Ocorreu um erro inesperado"));
                }
                if (result.length === 0) {
                    next(new error_1.DatabaseError("produto não encontrado"));
                }
                DB__app_1.default.query("delete from product where uuid=?", [uuid], (err) => {
                    if (err) {
                        console.log(err.message);
                        next(new error_1.DatabaseError("Não foi possível excluir"));
                    }
                    else {
                        next(new error_1.NoError("produto excluído com sucesso!"));
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
exports.default = new products_repos();
