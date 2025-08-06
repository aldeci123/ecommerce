import {Router} from "express";
import { UsersController } from "../controllers/user.controller.js";
import AsyncHandler from "express-async-handler";
import { celebrate, Segments} from "celebrate";
import { newUserSchema, updateUserSchema } from "../models/user.model.js";

export const userRoutes = Router();

//O get exibe uma informação ou dado para o usuário.
userRoutes.get("/users", AsyncHandler(UsersController.getAll));
//o get id exibe uma informação ou dado com o id repassado pelo ususario
userRoutes.get("/users/:id", AsyncHandler(UsersController.getById));
//O post recebe um novo dado para ser inserido.
userRoutes.post("/users", celebrate({[Segments.BODY]: newUserSchema}),AsyncHandler(UsersController.create));
//O put é usado para atualizar dados da api
userRoutes.put("/users/:id", celebrate({[Segments.BODY]: updateUserSchema}), AsyncHandler(UsersController.update));
//o delete exclui um dado, de acordo com o idetificador repassado
userRoutes.delete("/users/:id", AsyncHandler(UsersController.delete));

//o patch atualiza os dados de forma parcial, como neste api, pode-se atualizar apenas o nome, e não idade.
//sem implementação nesta API