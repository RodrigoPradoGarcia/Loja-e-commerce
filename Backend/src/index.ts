//libs
import express, { urlencoded } from 'express';
import cors from 'cors';

//rotas
import user_api_route from './routes/Authentication/user_api.routes';
import user_client_route from './routes/API/user_client.routes';
import products_route from './routes/API/products.routes';
import reviews_routes from './routes/API/reviews.routes';
import cart_item_route from './routes/API/cart_item_route.routes';
import script_route from './routes/API/script_route.routes';
import upload_route from './routes/upload/upload.routes';

//error
import errorHandler from './middlewares/error/errorHandler.middleware';

//banco de dados
import conexao from './repos/API/DB _app';

//erros
import {DatabaseError} from './models/error';

conexao.connect((err:any)=>{
    if(err)
    {
        throw new DatabaseError("Não foi possível conectar ao MySQL");
    }
    
    const app = express();

    app.use(express.json());
    app.use(urlencoded({extended:true}));
    app.use(cors());

    app.use(upload_route);
    app.use(user_api_route);
    app.use(user_client_route);
    app.use(products_route);
    app.use(reviews_routes);
    app.use(cart_item_route);
    app.use(script_route);

    app.use(errorHandler);

    app.listen(5000,()=>{
        console.log("Servidor rodando...");
    });    
});
