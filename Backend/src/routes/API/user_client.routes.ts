//libs
import {Request,Response,NextFunction,Router} from 'express';
import {StatusCodes} from 'http-status-codes';

//repos
import user_clientRepos from '../../repos/API/user_client.repos';

//models
import user_client_model from '../../models/API/user_client.model';

//middllwares
import jwt_verify from '../../middlewares/Authentication/jwt_verify.middleware';

//erros
import { DatabaseError,ForbiddenError } from '../../models/error';


const user_client_route = Router();

user_client_route.get('/users',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.read_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const {page,itemsPerPage} = req.query;

        if(typeof page!=='string' || typeof itemsPerPage!=='string')
        {
            throw new DatabaseError("número da página e items por página não informados");
        }

        const pageN = Number.parseInt(page);
        const itemsPerPageN = Number.parseInt(itemsPerPage);

        await user_clientRepos.getAll(pageN,itemsPerPageN,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

user_client_route.get("/users/:uuid",jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.read_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const uuid = req.params.uuid;
        await user_clientRepos.getSpecific(uuid,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

user_client_route.post('/users',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const corpo:user_client_model = req.body;
        await user_clientRepos.post(corpo,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

user_client_route.put('/users/:uuid',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        console.log(req.body);
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid:string = req.params.uuid;
        const corpo:user_client_model = req.body;
        await user_clientRepos.put(uuid,corpo,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

user_client_route.delete('/users/:uuid',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {   
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid = req.params.uuid;
        await user_clientRepos.delete(uuid,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

export default user_client_route;