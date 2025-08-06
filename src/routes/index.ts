import express from 'express'
import { userRoutes } from './user.route.js'
import { authRoutes } from './auth.route.js';
import { companyRoutes } from './company.route.js';
import { productRoutes } from './product.route.js';
import { categoryRoutes } from './category.route.js';
import { paymentMethodRoutes } from './payment-methods.route.js';
import { orderRoutes } from './order.route.js';


//gerenciador de todas as rotas da API

export const router = (app: express.Express)=>{
    app.use(express.json({limit: '5mb'})); //formato que a api irá usar na comunicação
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(companyRoutes);
    app.use(productRoutes);
    app.use(categoryRoutes);
    app.use(paymentMethodRoutes);
    app.use(orderRoutes);
}