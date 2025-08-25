import {Request, Response} from "express"
import { Product } from "../models/product.model.js"
import { ProductService} from "../services/product.service.js"

export class ProductController {

        static async getAll(req:Request, res:Response,){
            // #swagger.tags = ['Products']
            // #swagger.summary = 'Listar produtos cadastrados'
            // #swagger.description = 'Rota específica para listar todos os produtos que estão cadastrados'
            const product = await new ProductService().getAll();
            res.send(product);
        }
        static async getById (req:Request, res:Response,){
            // #swagger.tags = ['Products']
            // #swagger.summary = 'Listar produto'
            // #swagger.description = 'Rota específica para listar determinado produto, de acordo com o parâmetro id repassado do mesmo.'
            // #swagger.parameters['id'] = { description: 'ID do produto' }
            const productId = req.params.id
            const product = await new ProductService().getById(productId);
            res.send(product);
        }
        
        static async search(req: Request, res:Response){
            // #swagger.tags = ['Products']
            // #swagger.summary = 'Pesquisar produto'
            // #swagger.description = 'Rota que lista um determinado produto especificado pelo query parâmetro id'
            const categoriaId = req.query.categoriaId as string;
            const search = await new ProductService().search(categoriaId)
            res.send (search)

        }
        static async create(req: Request, res: Response,) {
            // #swagger.tags = ['Products']
            // #swagger.summary = 'Cadastrar produto'
            // #swagger.description = 'Cadastra um novo produto a ser vendido'
            /*#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addProduct"
                    }  
                }
                }
            } 
            */
            const product: any = req.body;
            await new ProductService().create(product);
            res.status(201).send({ message: "Produto inserido com sucesso"});
    
        }
    
        static async update(req: Request, res: Response,) {
            // #swagger.tags = ['Products']
            // #swagger.summary = 'Atualizar produto'
            // #swagger.description = 'Atualiza um novo produto, especificado pelo parâmetro ID repassado'
            // #swagger.parameters['id'] = { description: 'ID do produto' }
            /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updateProduct"
                    }  
                }
            }
            } 
        */
            const productId = req.params.id;
            const product: Product = req.body;
    
            await new ProductService().update(productId, product)
    
            res.send({
                    message: "Produto alterado com sucesso!"
            });
                    
        }

        static async delete(req: Request, res: Response) {
            // #swagger.tags = ['Products']
            // #swagger.summary = 'Deletar Produto'
            // #swagger.description = 'Deleta um produto do banco de dados de acordo com o parâmetro ID repassado'
            // #swagger.parameters['id'] = { description: 'ID do produto' }
            const productId = req.params.id
            await new ProductService().delete(productId);
        
            res.status(204).end();
        }
}