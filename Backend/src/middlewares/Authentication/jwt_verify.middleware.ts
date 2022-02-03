import {Request,Response,NextFunction} from 'express';
import { ForbiddenError } from '../../models/error';
import jwt from 'jsonwebtoken';
import user_api_repos from '../../repos/Authentication/user_api_repos';

async function jwt_verify(req:Request,res:Response,next:NextFunction)
{
    try
    {
        const header = req.headers['authorization'];

        if(!header)
        {
            throw new ForbiddenError("é necessário enviar uma token de acesso para continuar");
        }

        const [tipo,token] = header.split(" ");

        if(tipo!='Bearer' || !token)
        {
            throw new ForbiddenError("é necessário enviar uma token de acesso para continuar");
        }

        const payload = jwt.verify(token,process.env.SECRET!);

        const uuid = payload.sub;

        if(typeof uuid!=="string" || !uuid)
        {
            throw new ForbiddenError("Token inválida!");
        }
        const user = await user_api_repos.getById(uuid);

        req.user = user;
        next();
    }
    catch(erro)
    {
        if(erro instanceof ForbiddenError)
        {
            next(erro);
        }
        else
        {
            next(new ForbiddenError("Acesso negado!"));
        }
    }
}

export default jwt_verify;