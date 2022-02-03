import cart_item_model from "../../models/API/cart_item_model.model";
import { DatabaseError,NoError } from "../../models/error";
import conexao from '../../repos/API/DB _app';

import {Request,Response,NextFunction} from 'express';
import exibirArray from "../../middlewares/API/exibirResult.middleware";

class cart_item_repos
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
                conexao.query(`select * from cart_item limit ?,?`,[itemsPerPage*page-itemsPerPage,itemsPerPage],(err:any,result:any,fields:any)=>{
                    if(err)
                    {
                        console.log(err.message);
                        next(new DatabaseError("não foi possível realizar a query"));
                    }
                    else
                    {
                        conexao.query("select count(user_uuid) from cart_item",(err:any,count:any)=>{
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
            next(new DatabaseError("não foi possível obter a lista de cart_item"));
        }
    }

    async getSpecific(uuid_user:string,uuid_product:string,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query(`select * from cart_item where user_uuid=? and product_uuid=?`,[uuid_user,uuid_product],(err:any,result:any,fields:any)=>{
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
            next(new DatabaseError("não foi possível obter a cart_item"));
        }
    }

    async getAllItemsFromUser(uuid:string,page:number,itemsPerPage:number,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query("select * from user_client where uuid=?",[uuid],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Ocorreu um erro inesperado"));
                }
                else
                {
                    if(result.length===0)
                    {
                        next(new DatabaseError("usuário não encontrado"));
                    }
                    else
                    {
                        conexao.query("select * from cart_item where user_uuid=?",[uuid],(err:any,result:any,fields:any)=>{
                            if(err)
                            {
                                console.log(err.message);
                                next(new DatabaseError("Ocorreu um erro inesperado"));
                            }
                            else
                            {
                                conexao.query("select count(user_uuid) from cart_item where user_uuid=?",[uuid],(err:any,count:any)=>{
                                    if(err)
                                    {
                                        console.log(err.message);
                                        next(new DatabaseError("Ocorreu um erro inesperado"));
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
            });
        }
        catch(erro)
        {
            next(new DatabaseError("não foi possível obter os itens do carrinho"));
        }
    }
    
    async post(cart_item:cart_item_model,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            console.log(cart_item);
            conexao.query("insert into cart_item (user_uuid,product_uuid,amount) values (?,?,?)",[cart_item.user_uuid,cart_item.product_uuid,1],(err:any,result:any,fields:any)=>{
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

    
    async put(uuid_user:string,uuid_product:string,corpo:cart_item_model,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query("select * from cart_item where user_uuid=? and product_uuid=?",[uuid_user,uuid_product],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Ocorreu um erro insesperado"));
                }
                if(result.length===0)
                {
                    next(new DatabaseError("cart_item não encontrada"));
                }
                else
                {
                    conexao.query("update cart_item set amount=? where user_uuid=? and product_uuid=?",[corpo.amount,uuid_user,uuid_product],(err:any)=>{
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
            conexao.query("select * from cart_item where user_uuid=? and product_uuid=?",[uuid_user,uuid_product],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Ocorreu um erro inesperado"));
                }
                if(result.length===0)
                {
                    next(new DatabaseError("cart_item não encontrada"));
                }
                conexao.query("delete from cart_item where user_uuid=? and product_uuid=?",[uuid_user,uuid_product],(err:any)=>{
                    if(err)
                    {
                        console.log(err.message);
                        next(new DatabaseError("Não foi possível excluir"));
                    }
                    else
                    {
                        next(new NoError("cart_item excluída com sucesso!"));
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

export default new cart_item_repos();