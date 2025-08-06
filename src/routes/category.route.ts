import { Router } from "express";
import AsyncHandler from "express-async-handler";
import { celebrate, Segments} from "celebrate";
import { CategoriesController } from "../controllers/category.controller.js";
import { newCategorySchema, updateCategorySchema } from "../models/category.model.js";


export const categoryRoutes = Router();

//O get exibe uma informação ou dado para o usuário.
categoryRoutes.get("/categories", AsyncHandler(CategoriesController.getAll));
//o get id exibe uma informação ou dado com o id repassado pelo ususario
categoryRoutes.get("/categories/:id", AsyncHandler(CategoriesController.getById));
//O post recebe um novo dado para ser inserido.
categoryRoutes.post("/categories", celebrate({[Segments.BODY]: newCategorySchema}),AsyncHandler(CategoriesController.create));
//O put é usado para atualizar dados da api
categoryRoutes.put("/categories/:id", celebrate({[Segments.BODY]: updateCategorySchema}), AsyncHandler(CategoriesController.update));
//o delete exclui um dado, de acordo com o idetificador repassado
categoryRoutes.delete("/categories/:id", AsyncHandler(CategoriesController.delete));