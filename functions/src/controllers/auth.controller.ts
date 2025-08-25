import {Request, Response} from "express";
import { AuthService } from "../services/auth.service.js";
 
export class AuthController {
    static async login (req: Request, res: Response){
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Autenticação de usuário'
        // #swagger.description = 'Rota utilizada para autenticação de administradores usando email e senha '
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/loginUser"
                    }  
                }
            }
            }
            #swagger.responses[200] = {
                description: 'Token do usuário identificado',
                content:{
                    "application/json":{
                        schema: {
                            type: 'object',
                            properties: {
                            'token':{type: 'string'}
                            }
                        }
                    }
                }
            }

        */
        const {email, password} = req.body;

        const userRecord = await new AuthService().login(email, password)
        const token = await userRecord.user.getIdToken(true);
        res.send({
            token: token
        })
    }
    static async recovery (req: Request, res: Response){
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Recuperação de senha'
        // #swagger.description = 'Rota usada para recuperação de acesso (senha) pelos usuários cadastrados através de seu e-mail cadastrado. Receba um e-mail para recuperação de sua senha'
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/recoveryUser"
                    }  
                }
            }
            } 
        */
        const {email} = req.body;
        await new AuthService().recovery(email);
        res.status(204).end();

    }
    
    static async signin (req: Request, res: Response){
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Autenticação anônima de usuários clientes'
        // #swagger.description = 'Rota específica para autenticação de usuários clientes para realização de pedidos sem a necessidade de um cadastro. '
        /**
        #swagger.responses[200] = {
                description: 'Token do usuário anônimo',
                content:{
                    "application/json":{
                        schema: {
                            type: 'object',
                            properties: {
                            'token':{type: 'string'}
                            }
                        }
                    }
                }
            }
        */
        const userRecord = await new AuthService().signin();
        const token = await userRecord.user.getIdToken(true)
        res.send ({
            token : token
        });
    }
}