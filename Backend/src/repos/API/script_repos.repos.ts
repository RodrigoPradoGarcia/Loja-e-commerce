//libs
import {Request,Response,NextFunction} from 'express';

//models
import script_model from '../../models/API/script_model.model';

//erros
import {DatabaseError} from '../../models/error';

//banco
import conexao from './DB _app';

//middlewares
import exibirArray from '../../middlewares/API/exibirResult.middleware';

class script_repos
{
    async runScript(script:string,paramsScript1:any[],script2:string,paramsScript2:any[],page:number,itemsPerPage:number,req:Request,res:Response,next:NextFunction) : Promise<void>
    {
        try
        {
            conexao.query(script+" limit ?,?",[...paramsScript1,itemsPerPage*page-itemsPerPage,itemsPerPage],(err:any,result:any,fields:any)=>{
                if(err)
                {
                    console.log(err.message);
                    next(new DatabaseError("Não foi possível executar o script"));
                }
                else
                {
                    conexao.query(script2,[...paramsScript2],(err:any,count:any)=>{
                        if(err)
                        {
                            console.log(err.message);
                            next(new DatabaseError("Não foi possível realizar a operação"));
                        }
                        else
                        {
                            exibirArray({rows:result,currentPage:page,lastPage:Math.ceil(count[0]['count(*)']/itemsPerPage)},req,res,next);
                        }
                    });
                }
            });
        }
        catch(erro:any)
        {
            console.log(erro.message);
            next(new DatabaseError("Não foi possível realizar esta operação"));
        }
    }
}

export default new script_repos();