import user_client_model from "../../models/API/user_client.model";
import { DatabaseError,NoError } from "../../models/error";
import conexao from '../../repos/API/DB _app';

import {Request,Response,NextFunction} from 'express';
import exibirArray from "../../middlewares/API/exibirResult.middleware";
import { nextTick } from "process";

class user_client_repos
{
    async getAll(page:number,itemsPerPage:number,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            if(page<=0 || itemsPerPage<=0)
            {
                next(new DatabaseError("número da página inválido!"));
            }
            else
            {
                conexao.query(`select * from user_client limit ?,?`,[itemsPerPage*page-itemsPerPage,itemsPerPage],(err:any,result:any,fields:any)=>{
                    if(err)
                    {
                        console.log(err.message);
                        next(new DatabaseError("não foi possível realizar a query"));
                    }
                    else
                    {
                        conexao.query("select count(uuid) from user_client",(err:any,count:any)=>{
                            if(err)
                            {
                                console.log(err.message);
                                next(new DatabaseError("erro inesperado"));
                            }
                            else
                            {
                                exibirArray({rows:result,currentPage:page,lastPage:Math.ceil(count[0]['count(uuid)']/itemsPerPage)},req,res,next);
                            }
                        });
                    }
                });
            }
        }
        catch(erro:any)
        {
            console.log(erro.message);
            throw new DatabaseError("não foi possível obter a lista de usuários");
        }
    }

    async getSpecific(uuid:string,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query(`select * from user_client where uuid=?`,[uuid],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("não foi possível realizar a query"));
                }
                exibirArray(result,req,res,next);
            });
        }
        catch(erro:any)
        {
            console.log(erro.message);
            next(new DatabaseError("não foi possível obter o usuário"));
        }
    }

    async post(user:user_client_model,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query("insert into user_client (uuid,username,password,profile_photo) values (uuid(),?,?,?)",[user.username,user.password,user.profile_photo],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Nome de usuário já existe"));
                }
                else
                {
                    next(new NoError("Cadastro realizado com sucesso!"));
                }
            });

        }
        catch(erro:any)
        {
            console.log(erro.message);
            throw new DatabaseError("não foi possível realizar o cadastro");
        }
    }

    async put(uuid:string,corpo:user_client_model,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query("select * from user_client where uuid=?",[uuid],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Ocorreu um erro insesperado"));
                }
                if(result.length===0)
                {
                    next(new DatabaseError("usuario não encontrado"));
                }
                else
                {
                    conexao.query("update user_client set username=?,password=?,profile_photo=? where uuid=?",[corpo.username,corpo.password,corpo.profile_photo,uuid],(err:any)=>{
                        if(err)
                        {
                            console.log(err.message);
                            next(new DatabaseError("Não foi possível realizar a alteração"));
                        }
                        else
                        {
                            next(new NoError("Dados alterados com sucesso!"));
                        }
                    });
                }
            });
        }
        catch(erro:any)
        {
            console.log(erro.message);
            next(new DatabaseError("Não foi possível realizar a alteração"));
        }
    }

    async delete(uuid:string,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {   
            conexao.query("select * from user_client where uuid=?",[uuid],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Ocorreu um erro inesperado"));
                }
                if(result.length===0)
                {
                    next(new DatabaseError("usuário não encontrado"));
                }
                conexao.query("delete from user_client where uuid=?",[uuid],(err:any)=>{
                    if(err)
                    {
                        console.log(err.message);
                        next(new DatabaseError("Não foi possível excluir"));
                    }
                    else
                    {
                        next(new NoError("usuário excluído com sucesso!"));
                    }
                });
            });
        }
        catch(erro:any)
        {
            console.log(erro.message);
            next(new DatabaseError("Não foi possível deletar"));
        }
    }
}

export default new user_client_repos();