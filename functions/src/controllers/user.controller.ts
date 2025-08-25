import {Request, Response} from "express"
import { User } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";


export class UsersController{

    static async getAll(req:Request, res:Response){
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Listar todos os usuários'
        // #swagger.description = 'Rota usada para listar todos os usuários cadastrados na api'
        /**
        #swagger.responses[200] = {
                description: 'Lista de todos os usuários',
                content:{
                    "application/json":{
                        schema: {
                            type: 'array',
                            items:{
                                $ref:'#components/schemas/User'
                            }
                        }
                    }

                }
            }
        */
        const users = await new UserService().getAll();
        res.send(users);
    }
    static async getById (req:Request, res:Response){
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Listar usuário pelo ID'
        // #swagger.description = 'Rota usada para busca e exibição de um único usuário cadastrado, repassando o parâmetro ID do mesmo'
        // #swagger.parameters['id'] = { description: 'ID do usuário' }
        /**
          #swagger.responses[200] = {
                description: 'Dados do usuário',
                content:{
                    "application/json":{
                        schema: {
                            $ref:'#components/schemas/User'
                        }
                    }
                }
            }
        */
        const userId = req.params.id
        const users = await new UserService().getById(userId);
        res.send(users);
    }
    
    static async create(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Cadastro de usuário'
        // #swagger.description = 'Rota usada para cadastro de novos usuários, requisitando nome, email e senha.'
        /*#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/addUser',
                        $ref: '#/components/schemas/successResponse'
                    }  
                }
            }
        } 
        */
        const user: any = req.body;
        await new UserService().create(user);
        res.status(201).send({ message: "usuário inserido com sucesso"});

    }

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Atualizar usuário'
        // #swagger.description = 'Rota disponibilizada para atualizar o campo nome e/ou email de um usuário, especificado pelo ID repassado'
        // #swagger.parameters['id'] = { description: 'ID do usuário' }
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updateUser"
                    }  
                }
            }
            } 
        */
        const userId = req.params.id;
        const user: User = req.body;

        await new UserService().update(user, userId)

        res.send({
                message: "Usuário alterado com sucesso!"
        });        
    }

    static async delete(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Exclusão de usuário'
        // #swagger.description = 'Rota específica para exclusão do cadastro de um usuário identificado pelo ID repassado'
        // #swagger.parameters['id'] = {description: 'ID do usuário'}
        const userId = req.params.id
        await new UserService().delete(userId);

        res.status(204).end();
}
}