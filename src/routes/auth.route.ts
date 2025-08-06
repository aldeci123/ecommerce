import { Router } from "express";
import AsyncHandler from "express-async-handler"
import { AuthController } from "../controllers/auth.controller.js";
import { celebrate, Segments } from "celebrate";
import { authLoginSchema, authRecoverySchema } from "../models/user.model.js";


export const authRoutes = Router();

//O get exibe uma informação ou dado para o usuário.
authRoutes.post("/auth/login", celebrate({[Segments.BODY]: authLoginSchema}),AsyncHandler(AuthController.login));
authRoutes.post("/auth/recovery", celebrate({[Segments.BODY]: authRecoverySchema}),AsyncHandler(AuthController.recovery));