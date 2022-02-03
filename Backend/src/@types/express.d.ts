import user_api_model from "../models/Authentication/user_api.model";

declare module 'express-serve-static-core'
{
    interface Request
    {
        user?:user_api_model;
    }
}