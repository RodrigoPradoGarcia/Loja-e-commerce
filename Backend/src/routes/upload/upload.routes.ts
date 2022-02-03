//libs
import {Request,Response,NextFunction,Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import formidable from 'formidable';
const fs = require("fs");
const http = require('http');

import cors from 'cors';

//erros
import {DatabaseError, NoError} from '../../models/error';

//repos
import user_clientRepos from '../../repos/API/user_client.repos';

const upload_route = Router();

function getFileExtension(filepath:string)
{
    function strrpos(str:String,char:string)
    {
        let pos = 0;
        for(let i=0;i<str.length;i++)
        {
            if(str.charAt(i)===char)
            {
                pos = i;
            }
        }
        return pos;
    }

    return filepath.slice(strrpos(filepath,"."));
}

function validarSenha(senha:string,req:Request,res:Response,next:NextFunction)
{
    if(typeof senha === 'undefined')
    {
        next(new DatabaseError("Senha não pode estar vazia"));
        return;
    }
    else if(senha.match(/[a-z]/) && senha.match(/[A-Z]/) && senha.match(/[0-9]/) && senha.match(/[^a-zA-Z0-9]/) && senha.length>=10)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function validarUsername(user:string,req:Request,res:Response,next:NextFunction)
{
    if(typeof user === 'undefined')
    {
        next(new DatabaseError("Nome de usuário não pode estar vazio"));
        return;
    }
    else if(user.length>5)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//middlewares
import jwt_verify from '../../middlewares/Authentication/jwt_verify.middleware';

//errors
import {ForbiddenError} from '../../models/error';
import user_client_model from '../../models/API/user_client.model';
import { fileURLToPath } from 'url';
import { nextTick } from 'process';
import { escapeLeadingUnderscores } from 'typescript';

//mysql
import conexao from '../../repos/API/DB _app';

import 'dotenv/config';

upload_route.post('/upload/form',async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        const meuFormulario = new formidable.IncomingForm();
        meuFormulario.parse(req,(err:any,fields:any,files:any)=>{
            if(err)
            {
                next(new DatabaseError("Não foi possível enviar os dados"));
            }
            fs.readFile(process.env.PASTA+"Frontend\\public\\uploads\\cont.txt",(err:any,data:string)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Não foi possível ler do arquivo"));
                }
                const username = fields.usernameForm;
                if(!validarUsername(username,req,res,next))
                {
                    next(new DatabaseError("Nome de usuário deve conter pelo menos 5 caracteres"));
                }
                const password = fields.passwordForm;
                if(!validarSenha(password,req,res,next))
                {
                    next(new DatabaseError("A senha deve conter letras maiúsculas,letras minúsculas,números e caracteres especiais"));
                }
                else
                {
                    const confirmSenha = fields.passwordConfirm;
                    if(confirmSenha!==password)
                    {
                        next(new DatabaseError("As senhas não conferem"));
                    }
                    else
                    {
                        const profile_photo_old_path = files.profile_photo.filepath;
                        const profile_photo_new_path = process.env.PASTA+"Frontend\\public\\uploads\\"+data+getFileExtension(files.profile_photo.originalFilename);
                        fs.rename(profile_photo_old_path,profile_photo_new_path,async (erro:any)=>{
                            if(erro)
                            {
                                next(new DatabaseError("Não foi possível fazer o upload da foto"));
                            }
                            else
                            {
                                fs.writeFile(process.env.PASTA+"Frontend\\public\\uploads\\cont.txt",String(Number(data)+1),async(err:any)=>{
                                    if(err)
                                    {
                                        next(new DatabaseError("Não foi possível gravar no arquivo"));
                                    }
                                });
                                await user_clientRepos.post({username:username,password:password,profile_photo:".\\uploads\\"+data+getFileExtension(files.profile_photo.originalFilename)},req,res,next);               
                            }
                        });
                    }
                }
            });
        });
    }
    catch(erro)
    {
        next(erro);
    }
});


upload_route.delete('/photo',jwt_verify,async(req:Request,res:Response,next:NextFunction)=>{
    try
    {   
        res.setHeader('Access-Control-Allow-Origin','*');
        const form = new formidable.IncomingForm();
        if(!req.user?.write_privileges)
        {
            next(new DatabaseError("Você precisa de privilégios de escrita para realizar essa operação"));
        }
        const path = req.body.path;

        fs.unlink(process.env.PASTA+"Frontend\\public\\"+path,(err:any)=>{
            if(err)
            {
                next(new DatabaseError("Não foi possível apagar a foto"));
            }
            else
            {
                next(new NoError("Foto apagada com sucesso!"));
            }
        });

        res.sendStatus(StatusCodes.OK).send("ok");
    }
    catch(erro)
    {
        next(erro);
    }
});

upload_route.post('/photo',cors(),jwt_verify,async(req:Request,res:Response,next:NextFunction)=>{
    try
    {   
        if(!req.user?.write_privileges)
        {
            next(new DatabaseError("Você precisa de privilégios de escrita para realizar essa operação"));
        }
        
        const form = new formidable.IncomingForm();

        form.parse(req,(err:any,fields:any,files:any)=>{
            if(err)
            {
                next(new DatabaseError("Foto não enviada"));
            }
            else
            {
                fs.readFile(process.env.PASTA+"Frontend\\public\\uploads\\cont.txt",(err:any,data:any)=>{
                    if(err)
                    {
                        next(new DatabaseError("Não foi possível ler do arquivo"));
                    }
                    else
                    {
                        const profile_photo_old_path = files.profile_photo.filepath; 
                        const profile_photo_new_path = process.env.PASTA+"Frontend\\public\\uploads\\"+data+getFileExtension(files.profile_photo.originalFilename);
                        fs.rename(profile_photo_old_path,profile_photo_new_path,async (erro:any)=>{
                            if(erro)
                            {
                                next(new DatabaseError("Não foi possível fazer o upload da foto"));
                            }
                            fs.writeFile(process.env.PASTA+"Frontend\\public\\uploads\\cont.txt",String(Number(data)+1),async(err:any)=>{
                                if(err)
                                {
                                    next(new DatabaseError("Não foi possível gravar no arquivo"));
                                }
                                else
                                {
                                    next(new NoError(`${".\\uploads\\"+data+getFileExtension(files.profile_photo.originalFilename)}`)); 
                                }
                            });
                        });
                    }
                });
            }
        });
    }
    catch(erro)
    {
        next(erro);
    }
});

export default upload_route;
