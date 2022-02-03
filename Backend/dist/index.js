"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//libs
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
//rotas
const user_api_routes_1 = __importDefault(require("./routes/Authentication/user_api.routes"));
const user_client_routes_1 = __importDefault(require("./routes/API/user_client.routes"));
const products_routes_1 = __importDefault(require("./routes/API/products.routes"));
const reviews_routes_1 = __importDefault(require("./routes/API/reviews.routes"));
const cart_item_route_routes_1 = __importDefault(require("./routes/API/cart_item_route.routes"));
const script_route_routes_1 = __importDefault(require("./routes/API/script_route.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload/upload.routes"));
//error
const errorHandler_middleware_1 = __importDefault(require("./middlewares/error/errorHandler.middleware"));
//banco de dados
const DB__app_1 = __importDefault(require("./repos/API/DB _app"));
//erros
const error_1 = require("./models/error");
DB__app_1.default.connect((err) => {
    if (err) {
        throw new error_1.DatabaseError("Não foi possível conectar ao MySQL");
    }
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, express_1.urlencoded)({ extended: true }));
    app.use((0, cors_1.default)());
    app.use(upload_routes_1.default);
    app.use(user_api_routes_1.default);
    app.use(user_client_routes_1.default);
    app.use(products_routes_1.default);
    app.use(reviews_routes_1.default);
    app.use(cart_item_route_routes_1.default);
    app.use(script_route_routes_1.default);
    app.use(errorHandler_middleware_1.default);
    app.listen(5000, () => {
        console.log("Servidor rodando...");
    });
});
