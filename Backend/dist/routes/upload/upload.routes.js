"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//libs
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const formidable_1 = __importDefault(require("formidable"));
const fs = require("fs");
const http = require('http');
const cors_1 = __importDefault(require("cors"));
//erros
const error_1 = require("../../models/error");
//repos
const user_client_repos_1 = __importDefault(require("../../repos/API/user_client.repos"));
const upload_route = (0, express_1.Router)();
function getFileExtension(filepath) {
    function strrpos(str, char) {
        let pos = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === char) {
                pos = i;
            }
        }
        return pos;
    }
    return filepath.slice(strrpos(filepath, "."));
}
function validarSenha(senha, req, res, next) {
    if (typeof senha === 'undefined') {
        next(new error_1.DatabaseError("Senha não pode estar vazia"));
        return;
    }
    else if (senha.match(/[a-z]/) && senha.match(/[A-Z]/) && senha.match(/[0-9]/) && senha.match(/[^a-zA-Z0-9]/) && senha.length >= 10) {
        return true;
    }
    else {
        return false;
    }
}
function validarUsername(user, req, res, next) {
    if (typeof user === 'undefined') {
        next(new error_1.DatabaseError("Nome de usuário não pode estar vazio"));
        return;
    }
    else if (user.length > 5) {
        return true;
    }
    else {
        return false;
    }
}
//middlewares
const jwt_verify_middleware_1 = __importDefault(require("../../middlewares/Authentication/jwt_verify.middleware"));
require("dotenv/config");
upload_route.post('/upload/form', async (req, res, next) => {
    try {
        const meuFormulario = new formidable_1.default.IncomingForm();
        meuFormulario.parse(req, (err, fields, files) => {
            if (err) {
                next(new error_1.DatabaseError("Não foi possível enviar os dados"));
            }
            fs.readFile(process.env.PASTA + "Frontend\\public\\uploads\\cont.txt", (err, data) => {
                if (err) {
                    console.log(err.message);
                    next(new error_1.DatabaseError("Não foi possível ler do arquivo"));
                }
                const username = fields.usernameForm;
                if (!validarUsername(username, req, res, next)) {
                    next(new error_1.DatabaseError("Nome de usuário deve conter pelo menos 5 caracteres"));
                }
                const password = fields.passwordForm;
                if (!validarSenha(password, req, res, next)) {
                    next(new error_1.DatabaseError("A senha deve conter letras maiúsculas,letras minúsculas,números e caracteres especiais"));
                }
                else {
                    const confirmSenha = fields.passwordConfirm;
                    if (confirmSenha !== password) {
                        next(new error_1.DatabaseError("As senhas não conferem"));
                    }
                    else {
                        const profile_photo_old_path = files.profile_photo.filepath;
                        const profile_photo_new_path = process.env.PASTA + "Frontend\\public\\uploads\\" + data + getFileExtension(files.profile_photo.originalFilename);
                        fs.rename(profile_photo_old_path, profile_photo_new_path, async (erro) => {
                            if (erro) {
                                next(new error_1.DatabaseError("Não foi possível fazer o upload da foto"));
                            }
                            else {
                                fs.writeFile(process.env.PASTA + "Frontend\\public\\uploads\\cont.txt", String(Number(data) + 1), async (err) => {
                                    if (err) {
                                        next(new error_1.DatabaseError("Não foi possível gravar no arquivo"));
                                    }
                                });
                                await user_client_repos_1.default.post({ username: username, password: password, profile_photo: ".\\uploads\\" + data + getFileExtension(files.profile_photo.originalFilename) }, req, res, next);
                            }
                        });
                    }
                }
            });
        });
    }
    catch (erro) {
        next(erro);
    }
});
upload_route.delete('/photo', jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const form = new formidable_1.default.IncomingForm();
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            next(new error_1.DatabaseError("Você precisa de privilégios de escrita para realizar essa operação"));
        }
        const path = req.body.path;
        fs.unlink(process.env.PASTA + "Frontend\\public\\" + path, (err) => {
            if (err) {
                next(new error_1.DatabaseError("Não foi possível apagar a foto"));
            }
            else {
                next(new error_1.NoError("Foto apagada com sucesso!"));
            }
        });
        res.sendStatus(http_status_codes_1.StatusCodes.OK).send("ok");
    }
    catch (erro) {
        next(erro);
    }
});
upload_route.post('/photo', (0, cors_1.default)(), jwt_verify_middleware_1.default, async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.write_privileges)) {
            next(new error_1.DatabaseError("Você precisa de privilégios de escrita para realizar essa operação"));
        }
        const form = new formidable_1.default.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                next(new error_1.DatabaseError("Foto não enviada"));
            }
            else {
                fs.readFile(process.env.PASTA + "Frontend\\public\\uploads\\cont.txt", (err, data) => {
                    if (err) {
                        next(new error_1.DatabaseError("Não foi possível ler do arquivo"));
                    }
                    else {
                        const profile_photo_old_path = files.profile_photo.filepath;
                        const profile_photo_new_path = process.env.PASTA + "Frontend\\public\\uploads\\" + data + getFileExtension(files.profile_photo.originalFilename);
                        fs.rename(profile_photo_old_path, profile_photo_new_path, async (erro) => {
                            if (erro) {
                                next(new error_1.DatabaseError("Não foi possível fazer o upload da foto"));
                            }
                            fs.writeFile(process.env.PASTA + "Frontend\\public\\uploads\\cont.txt", String(Number(data) + 1), async (err) => {
                                if (err) {
                                    next(new error_1.DatabaseError("Não foi possível gravar no arquivo"));
                                }
                                else {
                                    next(new error_1.NoError(`${".\\uploads\\" + data + getFileExtension(files.profile_photo.originalFilename)}`));
                                }
                            });
                        });
                    }
                });
            }
        });
    }
    catch (erro) {
        next(erro);
    }
});
exports.default = upload_route;
