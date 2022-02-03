//libs
import {Request,Response,NextFunction,Router} from 'express';

//repos
import script_repos from '../../repos/API/script_repos.repos';

//models
import script_model from '../../models/API/script_model.model';
import { DatabaseError } from '../../models/error';

//middlewares
import jwt_verify from '../../middlewares/Authentication/jwt_verify.middleware';

//erros
import {ForbiddenError} from '../../models/error';

const script_route = Router();

script_route.post('/script',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.admin_privileges)
        {
            throw new ForbiddenError("Você precisad e provilégios de administrador para realizar essa operação");
        }
        const {page,itemsPerPage} = req.query;
        if(typeof page!=='string' || typeof itemsPerPage!=='string')
        {
            throw new DatabaseError("número de páginas e items por página não foram informados");
        }
        const corpo:script_model = req.body;
        console.log(corpo);
        if(!corpo.paramsScript1 || !corpo.paramsScript2)
        {
            throw new DatabaseError("parâmetros não informados");
        }
        await script_repos.runScript(corpo.script,corpo.paramsScript1,corpo.script2,corpo.paramsScript2,Number(page),Number(itemsPerPage),req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

export default script_route;