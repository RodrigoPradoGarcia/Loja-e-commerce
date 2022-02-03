import products_model from "../../models/API/products.model";
import { DatabaseError,NoError } from "../../models/error";
import conexao from '../../repos/API/DB _app';

import {Request,Response,NextFunction} from 'express';
import exibirArray from "../../middlewares/API/exibirResult.middleware";

class products_repos
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
                conexao.query(`select * from product limit ?,?`,[itemsPerPage*page-itemsPerPage,itemsPerPage],(err:any,result:any,fields:any)=>{
                    if(err)
                    {
                        console.log(err.message);
                        next(new DatabaseError("não foi possível realizar a query"));
                    }
                    else
                    {
                        conexao.query("select count(uuid) from product",(err:any,count:any)=>{
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
            next(new DatabaseError("não foi possível obter a lista de produtos"));
        }
    }

    async getSpecific(uuid:string,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query(`select * from product where uuid=?`,[uuid],(err:any,result:any,fields:any)=>{
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
            next(new DatabaseError("não foi possível obter o produto"));
        }
    }

    
    async post(product:products_model,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query("insert into product (uuid,name,category,price,image,description) values (uuid(),?,?,?,?,?)",[product.name,product.category,product.price,product.image,product.description],(err:any,result:any,fields:any)=>{
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

    
    async put(uuid:string,corpo:products_model,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query("select * from product where uuid=?",[uuid],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Ocorreu um erro insesperado"));
                }
                if(result.length===0)
                {
                    next(new DatabaseError("produto não encontrado"));
                }
                else
                {
                    conexao.query("update product set name=?,category=?,price=?,image=?,description=? where uuid=?",[corpo.name,corpo.category,corpo.price,corpo.image,corpo.description,uuid],(err:any)=>{
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
            conexao.query("select * from product where uuid=?",[uuid],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Ocorreu um erro inesperado"));
                }
                if(result.length===0)
                {
                    next(new DatabaseError("produto não encontrado"));
                }
                conexao.query("delete from product where uuid=?",[uuid],(err:any)=>{
                    if(err)
                    {
                        console.log(err.message);
                       next(new DatabaseError("Não foi possível excluir"));
                    }
                    else
                    {
                        next(new NoError("produto excluído com sucesso!"));
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

export default new products_repos();