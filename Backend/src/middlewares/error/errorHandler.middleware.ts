//libs
import {Request,Response,NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';

//erros
import { DatabaseError,ForbiddenError } from '../../models/error';
import NoError from '../../models/error/NoError.error';

function errorHandler<erro extends Error>(err:erro,req:Request,res:Response,next:NextFunction)
{
    if(err instanceof DatabaseError)
    {
        res.status(StatusCodes.BAD_REQUEST).send(err.message);
    }
    else if(err instanceof ForbiddenError)
    {
        res.status(StatusCodes.FORBIDDEN).send(err.message);
    }
    else if(err instanceof NoError)
    {
        res.status(StatusCodes.OK).send(err.message);
    }
    else
    {
        res.status(StatusCodes.BAD_REQUEST).send(err.message);
    }  
}

export default errorHandler;