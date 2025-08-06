import {Request, Response} from "express"
import { Category } from "../models/category.model.js";
import { CategoryService } from "../services/category.service.js";


export class CategoriesController{

    static async getAll(req:Request, res:Response){
        const categories = await new CategoryService().getAll();
        res.send(categories);
    }
    static async getById (req:Request, res:Response){
        let categoryId = req.params.id
        const categories = await new CategoryService().getById(categoryId);
        res.send(categories);
    }
    
    static async create(req: Request, res: Response) {
        let category: any = req.body;
        await new CategoryService().create(category);
        res.status(201).send({ message: "categoria inserida com sucesso"});

    }

    static async update(req: Request, res: Response) {
        let categoryId = req.params.id;
        let category: Category = req.body;

        await new CategoryService().update(category, categoryId)

        res.send({
                message: "Categoria alterada com sucesso!"
        });
                
    }

    static async delete(req: Request, res: Response) {
        let categoryId = req.params.id
        await new CategoryService().delete(categoryId);

        res.status(204).end();
    }
}