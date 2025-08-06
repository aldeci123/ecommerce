import {Request, Response} from "express"
import { User } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";


export class UsersController{

    static async getAll(req:Request, res:Response){
        const users = await new UserService().getAll();
        res.send(users);
    }
    static async getById (req:Request, res:Response){
        let userId = req.params.id
        const users = await new UserService().getById(userId);
        res.send(users);
    }
    
    static async create(req: Request, res: Response) {
        let user: any = req.body;
        await new UserService().create(user);
        res.status(201).send({ message: "usuário inserido com sucesso"});

    }

    static async update(req: Request, res: Response) {
        let userId = req.params.id;
        let user: User = req.body;

        await new UserService().update(user, userId)

        res.send({
                message: "Usuário alterado com sucesso!"
        });
                
    }

    static async delete(req: Request, res: Response) {
        let userId = req.params.id
        await new UserService().delete(userId);

        res.status(204).end();
}
}