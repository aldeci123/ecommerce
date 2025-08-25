import { Router } from "express";
import asyncHandler from "express-async-handler";
import { PaymentMethodController } from "../controllers/payment-method.controller.js";
import { celebrate,Segments } from "celebrate";
import { newPaymentMethodSchema, updatePaymentMethodSchema } from "../models/payment-method.model.js";

export const paymentMethodRoutes = Router();

paymentMethodRoutes.get("/payment-methods", asyncHandler(PaymentMethodController.getAll));
paymentMethodRoutes.get("/payment-methods/:id", asyncHandler(PaymentMethodController.getById))
paymentMethodRoutes.post("/payment-methods", celebrate({[Segments.BODY]: newPaymentMethodSchema}), asyncHandler(PaymentMethodController.create))
paymentMethodRoutes.put("/payment-methods/:id", celebrate({[Segments.BODY]: updatePaymentMethodSchema}), asyncHandler(PaymentMethodController.update))
paymentMethodRoutes.delete("/payment-methods/:id", asyncHandler(PaymentMethodController.delete))