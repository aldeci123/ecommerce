import {Router} from "express";
import { celebrate, Segments} from "celebrate";
import { changeStatusOrderSchema, newOrderSchema, searchOrderQuerySchema } from "../models/order.model.js";
import { OrdersController } from "../controllers/orders.controller.js";
import expressAsyncHandler from "express-async-handler";

export const orderRoutes = Router();

orderRoutes.post("/orders", celebrate({[Segments.BODY]: newOrderSchema}), expressAsyncHandler(OrdersController.create))

orderRoutes.get("/orders", celebrate({[Segments.QUERY]: searchOrderQuerySchema}), expressAsyncHandler(OrdersController.search))

orderRoutes.get("/orders/:id/items", expressAsyncHandler(OrdersController.getItems))

orderRoutes.get("/orders/:id", expressAsyncHandler(OrdersController.getById))

orderRoutes.post("/orders/:id/status", celebrate({[Segments.BODY]: changeStatusOrderSchema}), expressAsyncHandler(OrdersController.chageStatus))
