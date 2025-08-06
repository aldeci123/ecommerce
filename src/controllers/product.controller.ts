import {Request, Response} from "express"
import { Product } from "../models/product.model.js"
import { ProductService} from "../services/product.service.js"

export class ProductController {

        static async getAll(req:Request, res:Response,){
            const product = await new ProductService().getAll();
            res.send(product);
        }
        static async getById (req:Request, res:Response,){
            let productId = req.params.id
            const product = await new ProductService().getById(productId);
            res.send(product);
        }
        
        static async search(req: Request, res:Response){
            const categoriaId = req.query.categoriaId as string;
            const search = await new ProductService().search(categoriaId)
            res.send (search)

        }
        static async create(req: Request, res: Response,) {
            let product: any = req.body;
            await new ProductService().create(product);
            res.status(201).send({ message: "Produto inserido com sucesso"});
    
        }
    
        static async update(req: Request, res: Response,) {
            let productId = req.params.id;
            let product: Product = req.body;
    
            await new ProductService().update(productId, product)
    
            res.send({
                    message: "Produto alterado com sucesso!"
            });
                    
        }

        static async delete(req: Request, res: Response) {
            let productId = req.params.id
            await new ProductService().delete(productId);
        
            res.status(204).end();
        }
}