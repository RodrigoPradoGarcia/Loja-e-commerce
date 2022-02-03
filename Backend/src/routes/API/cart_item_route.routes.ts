//libs
import {Request,Response,NextFunction,Router} from 'express';

//erros
import { DatabaseError,ForbiddenError } from '../../models/error';

//middlewares
import jwt_verify from '../../middlewares/Authentication/jwt_verify.middleware';

//repos
import cart_item_repos from '../../repos/API/cart_item_repos.repos';

//models
import cart_item_model from '../../models/API/cart_item_model.model';

const cart_item_route = Router();

cart_item_route.get('/cart_items',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
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

        await cart_item_repos.getAll(pageN,itemsPerPageN,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});


cart_item_route.get("/cart_items/:uuid_user/:uuid_product",jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.read_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const uuid_user = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        await cart_item_repos.getSpecific(uuid_user,uuid_product,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

cart_item_route.get("/cart_items/:uuid",jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.read_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de leitura para realizar essa operação");
        }
        const uuid = req.params.uuid;
        const {page,itemsPerPage} = req.query;
        if(typeof page!=='string' || typeof itemsPerPage!=='string')
        {
            throw new DatabaseError("número da página e items por página não foram enviados");
        }
        await cart_item_repos.getAllItemsFromUser(uuid,Number(page),Number(itemsPerPage),req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});


cart_item_route.post('/cart_items',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const corpo:cart_item_model = req.body;
        await cart_item_repos.post(corpo,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});


cart_item_route.put('/cart_items/:uuid_user/:uuid_product',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid_user:string = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        const corpo:cart_item_model = req.body;
        if(corpo.amount<=0)
        {
            await cart_item_repos.delete(uuid_user,uuid_product,req,res,next);
        }
        else
        {
            await cart_item_repos.put(uuid_user,uuid_product,corpo,req,res,next);
        }
    }
    catch(erro)
    {
        next(erro);
    }
});

cart_item_route.delete('/cart_items/:uuid_user/:uuid_product',jwt_verify,async (req:Request,res:Response,next:NextFunction)=>{
    try
    {   
        if(!req.user?.write_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de escrita para realizar essa operação");
        }
        const uuid_user = req.params.uuid_user;
        const uuid_product = req.params.uuid_product;
        await cart_item_repos.delete(uuid_user,uuid_product,req,res,next);
    }
    catch(erro)
    {
        next(erro);
    }
});

export default cart_item_route;