import express, { Router } from 'express'
import { userRoutes } from './user.route.js'
import { authRoutes } from './auth.route.js';
import { companyRoutes } from './company.route.js';
import { productRoutes } from './product.route.js';
import { categoryRoutes } from './category.route.js';
import { paymentMethodRoutes } from './payment-methods.route.js';
import { orderRoutes } from './order.route.js';
import { allowAnonymousUser } from '../middlewares/allow-anonymous-user.middleware.js';


//gerenciador de todas as rotas da API

export const router = (app: express.Express)=>{
    app.use(express.json({limit: '5mb'})); //formato que a api irá usar na comunicação
    app.use(authRoutes);
    app.use(allowAnonymousUser);

    const authenticatedRoutes = Router();

    authenticatedRoutes.use(userRoutes);
    authenticatedRoutes.use(companyRoutes);
    authenticatedRoutes.use(productRoutes);
    authenticatedRoutes.use(categoryRoutes);
    authenticatedRoutes.use(paymentMethodRoutes);
    authenticatedRoutes.use(orderRoutes);

    app.use(
        // #swagger.security = [{"bearerAuth": [] }]
        authenticatedRoutes
    )
}