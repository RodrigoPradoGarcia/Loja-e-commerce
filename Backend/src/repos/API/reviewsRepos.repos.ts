import reviews_model from "../../models/API/reviews.model";
import { DatabaseError,NoError } from "../../models/error";
import conexao from '../../repos/API/DB _app';

import {Request,Response,NextFunction} from 'express';
import exibirArray from "../../middlewares/API/exibirResult.middleware";

class reviews_repos
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
                conexao.query(`select * from review limit ?,?`,[itemsPerPage*page-itemsPerPage,itemsPerPage],(err:any,result:any,fields:any)=>{
                    if(err)
                    {
                        console.log(err.message);
                        next(new DatabaseError("não foi possível realizar a query"));
                    }
                    else
                    {
                        conexao.query("select count(user_uuid) from review",(err:any,count:any)=>{
                            if(err)
                            {
                                console.log(err.message);
                                next(new DatabaseError("erro inesperado"));
                            }
                            else
                            {
                                exibirArray({rows:result,currentPage:page,lastPage:Math.ceil(count[0]['count(user_uuid)']/itemsPerPage)},req,res,next);
                            }
                        });
                    }
                });
            }
        }
        catch(erro:any)
        {
            console.log(erro.message);
            next(new DatabaseError("não foi possível obter a lista de reviews"));
        }
    }

    async getSpecific(uuid_user:string,uuid_product:string,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query(`select * from review where user_uuid=? and product_uuid=?`,[uuid_user,uuid_product],(err:any,result:any,fields:any)=>{
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
            next(new DatabaseError("não foi possível obter a review"));
        }
    }

    
    async post(review:reviews_model,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query("insert into review (user_uuid,product_uuid,stars,comment) values (?,?,?,?)",[review.user_uuid,review.product_uuid,review.stars,review.comment],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("não foi possível inserir no banco"));
                }
                else
                {
                    next(new NoError("Cadastro Realizado com sucesso!"));
                }
            });

        }
        catch(erro:any)
        {
            console.log(erro.message);
            next(new DatabaseError("não foi possível realizar o cadastro"));
        }
    }

    
    async put(uuid_user:string,uuid_product:string,corpo:reviews_model,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query("select * from review where user_uuid=? and product_uuid=?",[uuid_user,uuid_product],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Ocorreu um erro insesperado"));
                }
                if(result.length===0)
                {
                    next(new DatabaseError("review não encontrada"));
                }
                else
                {
                    conexao.query("update review set stars=?,comment=? where user_uuid=? and product_uuid=?",[corpo.stars,corpo.comment,uuid_user,uuid_product],(err:any)=>{
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

    async delete(uuid_user:string,uuid_product:string,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {   
            conexao.query("select * from review where user_uuid=? and product_uuid=?",[uuid_user,uuid_product],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Ocorreu um erro inesperado"));
                }
                if(result.length===0)
                {
                    next(new DatabaseError("review não encontrada"));
                }
                conexao.query("delete from review where user_uuid=? and product_uuid=?",[uuid_user,uuid_product],(err:any)=>{
                    if(err)
                    {
                        console.log(err.message);
                        next(new DatabaseError("Não foi possível excluir"));
                    }
                    else
                    {
                        next(new NoError("review excluída com sucesso!"));
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

export default new reviews_repos();