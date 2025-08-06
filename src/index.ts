import express from "express";
import { initializeApp as initializeAdminApp} from 'firebase-admin/app'; //servivos do firebase
import {initializeApp as initializeFireBaseApp} from 'firebase/app' //auth
import { router } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware.js";
//import { auth } from "./middlewares/auth.middleware";

//inicializar os serviços do firebase web
initializeFireBaseApp({
    apiKey: process.env.API_KEY
}); 
//inicializar os serviços do firebase sdk
initializeAdminApp(); 

const app = express();

//inciando os processos do autenticador de login
//auth(app); 

// iniciando as rotas
router(app); 

//caso o usuário erre o endereço de acesso
pageNotFoundHandler(app) 
// inicializando o gerenciador de erros
errorHandler(app) 

app.listen(3000, () => {
    console.log("Ola mundo!");
});