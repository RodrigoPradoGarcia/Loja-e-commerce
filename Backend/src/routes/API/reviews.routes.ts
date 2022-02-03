//libs
import {Request,Response,NextFunction,Router} from 'express';

//middllwares
import jwt_verify from '../../middlewares/Authentication/jwt_verify.middleware';

//erros
import { DatabaseError,ForbiddenError } from '../../models/error';

//repos
import reviews_repos from '../../repos/API/reviewsRepos.repos';

//models
import reviews_model from '../../models/API/reviews.model';

const reviews_route = Router();

reviews_route.get('/reviews',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
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

        await reviews_repos.getAll(pageN,itemsPerPageN,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});


reviews_route.get("/reviews/:uuid_user/:uuid_product",jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.read_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const uuid_user = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        await reviews_repos.getSpecific(uuid_user,uuid_product,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});


reviews_route.post('/reviews',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const corpo:reviews_model = req.body;
        await reviews_repos.post(corpo,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});


reviews_route.put('/reviews/:uuid_user/:uuid_product',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid_user:string = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        const corpo:reviews_model = req.body;
        await reviews_repos.put(uuid_user,uuid_product,corpo,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

reviews_route.delete('/reviews/:uuid_user/:uuid_product',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {   
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid_user = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        await reviews_repos.delete(uuid_user,uuid_product,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

export default reviews_route;