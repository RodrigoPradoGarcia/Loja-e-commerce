import {Request,Response,NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';

function exibirArray(array:any,req:Request,res:Response,next:NextFunction)
{
    try
    {
        res.status(StatusCodes.OK).send(array);
    }
    catch(erro)
    {
        next(erro);
    }
}

export default exibirArray;