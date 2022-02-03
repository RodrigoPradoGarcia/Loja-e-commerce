//libs
import {Request,Response,NextFunction,Router} from 'express';

//middllwares
import jwt_verify from '../../middlewares/Authentication/jwt_verify.middleware';

//erros
import { DatabaseError,ForbiddenError } from '../../models/error';

//repos
import productsRepos from '../../repos/API/products.repos';

//models
import products_model from '../../models/API/products.model';

const products_route = Router();

products_route.get('/products',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
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

        await productsRepos.getAll(pageN,itemsPerPageN,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});


products_route.get("/products/:uuid",jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.read_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const uuid = req.params.uuid;
        await productsRepos.getSpecific(uuid,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});


products_route.post('/products',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const corpo:products_model = req.body;
        await productsRepos.post(corpo,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});


products_route.put('/products/:uuid',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid:string = req.params.uuid;
        const corpo:products_model = req.body;
        await productsRepos.put(uuid,corpo,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

products_route.delete('/products/:uuid',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {   
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid = req.params.uuid;
        await productsRepos.delete(uuid,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

export default products_route;