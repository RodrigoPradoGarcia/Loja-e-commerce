//libs
import {Request,Response,NextFunction,Router} from 'express';
import userAPIRepos from '../../repos/Authentication/user_api_repos';
import {StatusCodes} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

//erros
import { DatabaseError, ForbiddenError } from '../../models/error';

//models
import user_api_model from '../../models/Authentication/user_api.model';
import user_api_repos from '../../repos/Authentication/user_api_repos';

//middlewares
import jwt_verify from '../../middlewares/Authentication/jwt_verify.middleware';

const user_api_route = Router();

user_api_route.get('/authentication/users',jwt_verify,async(req:Request,res:Response,next:NextFunction)=>{
    try
    {
        const users = await userAPIRepos.getAllUsers();
        res.status(StatusCodes.OK).send(users);
    }
    catch(erro)
    {
        next(erro);
    }
});

//e45274d0-85f1-4aa6-a489-e587c466f3ad admin
//b49e5b77-1db2-472b-8e97-316c53550fcb notAdmin

user_api_route.get('/authentication/users/:uuid',jwt_verify,async(req:Request,res:Response,next:NextFunction)=>{
    try
    {
        const uuid = req.params.uuid;
        const user = await userAPIRepos.getById(uuid);
        res.status(StatusCodes.OK).send(user);
    }
    catch(erro)
    {
        next(erro);
    }
});

user_api_route.post('/authentication/users',async(req:Request,res:Response,next:NextFunction)=>{
    try
    {
        const corpo: user_api_model = req.body;
        if(typeof corpo.password===undefined)
        {
            throw new DatabaseError("senha não foi fornecida");
        }
        const uuid = await userAPIRepos.post(corpo);
        res.status(StatusCodes.OK).send(uuid);
    }
    catch(erro)
    {
        next(erro);
    }
});

user_api_route.post('/authentication/token',async(req:Request,res:Response,next:NextFunction)=>{
    try
    {
        const header = req.headers['authorization'];

        if(!header)
        {
            throw new ForbiddenError("Cabeçalho não enviado");
        }
        const [tipo,base64] = header?.split(" ");

        if(tipo!=='Basic' || !base64)
        {
            throw new ForbiddenError("Autenticação inválida");
        }

        const [username,password] = Buffer.from(base64,"base64").toString("utf-8").split(":");

        const user = await user_api_repos.getByUsernameAndPassword(username,password);

        if(!user)
        {
            throw new ForbiddenError("Autenticação inválida");
        }

        const token = jwt.sign({username:user.username},process.env.SECRET!,{subject:user.uuid,expiresIn:3000});

        res.status(StatusCodes.OK).send(token);
    }
    catch(erro)
    {
        next(erro);
    }
});

user_api_route.post('/authentication/token/validate',jwt_verify,async(req:Request,res:Response,next:NextFunction)=>{
    res.status(StatusCodes.OK).send("Token válida!");
});

user_api_route.put('/authentication/users/:uuid',jwt_verify,async(req:Request,res:Response,next:NextFunction)=>{
    try
    {
        const uuid = req.params.uuid;

        const userASerAlerado = await user_api_repos.getById(uuid);

        if(!req.user?.admin_privileges)
        {
            throw new ForbiddenError("Você precisa de privilégios de administrador para realizar essa operação");
        }

        if(userASerAlerado.admin_privileges===true && !req.user.master_privileges && userASerAlerado.uuid !== req.user.uuid)
        {
            throw new ForbiddenError("Você precisa de privilégios de mestre para realizar essa operação");
        }

        const corpo:user_api_model = req.body;
        if(!corpo)
        {
            throw new ForbiddenError("Corpo não definido");
        }
        await user_api_repos.put(uuid,corpo);
        res.status(StatusCodes.OK).send("Atualizado com sucesso!");
    }
    catch(erro)
    {
        next(erro);
    }
});

user_api_route.delete('/authentication/users/:uuid',jwt_verify,async(req:Request,res:Response,next:NextFunction)=>{
    try
    {
        const userASerApagado = await user_api_repos.getById(req.params.uuid);
        if(req.user?.admin_privileges===false && req.params.uuid!==req.user?.uuid)
        {
            throw new ForbiddenError("Você precisa de permissão de administrador para realizar essa operação");
        }

        if(userASerApagado.admin_privileges===true && req.user?.master_privileges===false)
        {
            throw new ForbiddenError("Você precisa de permissão de mestre para realizar essa operação");
        }

        const uuid = req.params.uuid;
        await user_api_repos.delete(uuid);
        res.status(StatusCodes.OK).send("Apagado com sucesso!");
    }
    catch(erro)
    {
        next(erro);
    }
});

user_api_route.put('/authentication/privileges/:uuid',jwt_verify,async(req:Request,res:Response,next:NextFunction)=>{
    try
    {
        const uuid = req.params.uuid;
        const user = req.user;
        const userASerAlterado = await user_api_repos.getById(uuid);
        const corpo:user_api_model = req.body;
        if(user?.admin_privileges===false)
        {
            throw new ForbiddenError("Você precisa de privilégios de administrador para realizar essa operação");
        }
        if(user?.master_privileges===false && (userASerAlterado.admin_privileges===true || userASerAlterado.master_privileges===true))
        {
            throw new ForbiddenError("Você precisa de privilégios de mestre para realizar essa operação");
        }

        await user_api_repos.privilege_read_write(uuid,corpo);
        res.status(StatusCodes.OK).send("Privilégios alterados com sucesso!");
    }
    catch(erro)
    {
        next(erro);
    }
});


user_api_route.put('/authentication/privileges/admin/:uuid',jwt_verify,async(req:Request,res:Response,next:NextFunction)=>{
    try
    {
        const uuid = req.params.uuid;
        const user = req.user;
        const corpo:user_api_model = req.body;
        if(user?.master_privileges===false)
        {
            throw new ForbiddenError("Você precisa de privilégios de mestre para realizar essa operação");
        }
        await user_api_repos.privilege_admim(uuid,corpo);
        res.status(StatusCodes.OK).send("Privilégios alterados com sucesso!");
    }
    catch(erro)
    {
        next(erro);
    }
});

export default user_api_route;