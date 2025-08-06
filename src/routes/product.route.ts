import { celebrate, Segments } from "celebrate";
import AsyncHandler from "express-async-handler";
import { Router } from "express";
import { newProductSchema, searchQuerySchema, updateProductSchema } from "../models/product.model.js";
import { ProductController } from "../controllers/product.controller.js";



export const productRoutes = Router();

//O get exibe uma informação ou dado para o usuário.
productRoutes.get("/products", AsyncHandler(ProductController.getAll));

productRoutes.get("/products/search", celebrate({[Segments.QUERY]: searchQuerySchema }), AsyncHandler(ProductController.search));
//o get id exibe uma informação ou dado com o id repassado pelo ususario
productRoutes.get("/products/:id", AsyncHandler(ProductController.getById));
//O post recebe um novo dado para ser inserido.
productRoutes.post("/products", celebrate({[Segments.BODY]: newProductSchema}),AsyncHandler(ProductController.create));
//O put é usado para atualizar dados da api
productRoutes.put("/products/:id", celebrate({[Segments.BODY]: updateProductSchema}), AsyncHandler(ProductController.update));
//o delete exclui um dado, de acordo com o idetificador repassado
productRoutes.delete("/products/:id", AsyncHandler(ProductController.delete));