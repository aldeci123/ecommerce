import express from "express";
import { initializeApp as initializeAdminApp} from 'firebase-admin/app'; //servivos do firebase
import {initializeApp as initializeFireBaseApp} from 'firebase/app' //auth
import { router } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware.js";
import { auth } from "./middlewares/auth.middleware.js";
import { onRequest } from "firebase-functions/v2/https";
import { swaggerDocs } from "./routes/swagger-docs.route.js";

//inicializar os serviços do firebase web
initializeAdminApp(); 
initializeFireBaseApp({
    apiKey: process.env.API_KEY
}); 
//inicializar os serviços do firebase sdk

const app = express();

swaggerDocs(app)

//inciando os processos do autenticador de login
auth(app); 

// iniciando as rotas
router(app); 
//caso o usuário erre o endereço de acesso
pageNotFoundHandler(app) 
// inicializando o gerenciador de erros
errorHandler(app) 

// usando o firebase functions pra subir o servidor com o onRequest
export const api =  onRequest(app)