import {Router} from "express";
import { CompanyController } from "../controllers/company.controller.js";
import AsyncHandler from "express-async-handler";
import { celebrate, Segments} from "celebrate";
import { newCompanySchema, updateCompanySchema } from "../models/company.model.js";

export const companyRoutes = Router();

//O get exibe uma informação ou dado para o usuário.
companyRoutes.get("/companies", AsyncHandler(CompanyController.getAll));
//o get id exibe uma informação ou dado com o id repassado pelo ususario
companyRoutes.get("/copmanies/:id", AsyncHandler(CompanyController.getById));
//O post recebe um novo dado para ser inserido.
companyRoutes.post("/companies", celebrate({[Segments.BODY]: newCompanySchema}),AsyncHandler(CompanyController.create));
//O put é usado para atualizar dados da api
companyRoutes.put("/companies/:id", celebrate({[Segments.BODY]: updateCompanySchema}), AsyncHandler(CompanyController.update));
//o delete exclui um dado, de acordo com o idetificador repassado

//o patch atualiza os dados de forma parcial, como neste api, pode-se atualizar apenas o nome, e não idade.
//sem implementação nesta API