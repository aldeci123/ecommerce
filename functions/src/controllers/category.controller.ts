import {Request, Response} from "express"
import { Category } from "../models/category.model.js";
import { CategoryService } from "../services/category.service.js";


export class CategoriesController{

    static async getAll(req:Request, res:Response){
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Listas categorias cadastradas'
        // #swagger.description = 'Rota Específica para listar todas as categorias cadastradas no sistema '
        const categories = await new CategoryService().getAll();
        res.send(categories);
    }
    static async getById (req:Request, res:Response){
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Listar categoria pelo id'
        // #swagger.description = 'Rota Específica para exibição de uma única categoria cadastrada, de acordo com o parâmetro ID repassado'
        // #swagger.parameters['id'] = { description: 'ID da categoria' }
        const categoryId = req.params.id
        const categories = await new CategoryService().getById(categoryId);
        res.send(categories);
    }
    
    static async create(req: Request, res: Response) {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Cadastrar categoria'
        // #swagger.description = 'Rota Específica para cadastro de uma nova categoria no sistema'
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addCategory"
                    }  
                }
            }
            } 
        */
        const category: any = req.body;
        await new CategoryService().create(category);
        res.status(201).send({ message: "categoria inserida com sucesso"});

    }

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Atualizar categoria'
        // #swagger.description = 'Rota Específica para atualizar uma determinada categoria cadastrada no sistema, de acordo com o parâmetro ID'
        // #swagger.parameters['id'] = { description: 'ID da categoria' }
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updateCategory"
                    }  
                }
            }
            } 
        */
        const categoryId = req.params.id;
        const category: Category = req.body;

        await new CategoryService().update(category, categoryId)

        res.send({
                message: "Categoria alterada com sucesso!"
        });          
    }

    static async delete(req: Request, res: Response) {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Excluir categoria'
        // #swagger.description = 'Rota Específica para exclusão de uma categoria'
        // #swagger.parameters['id'] = { description: 'ID da categoria' }
        const categoryId = req.params.id
        await new CategoryService().delete(categoryId);

        res.status(204).end();
    }
}