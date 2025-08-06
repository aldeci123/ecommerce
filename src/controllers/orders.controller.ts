import { Request, Response } from "express";
import { Order, queryParamsOrder } from "../models/order.model.js";
import { OrderService } from "../services/order.service.js";


export class OrdersController {

    static async create(req: Request, res: Response){

        let order = new Order(req.body);

        await new OrderService().create(order)

        res.status(201).send({
            message: "pedido criado com sucesso"
        })
    }

    static async search(req: Request, res: Response){
        const ordersQueryP = await new OrderService().search(req.query as queryParamsOrder);
        res.send(ordersQueryP)
    }

    static async getItems(req: Request, res: Response){
        const items = await new OrderService().getItems(req.params.id);
        res.send(items);
    }

    static async getById(req: Request, res: Response){
        res.send(await new OrderService().getById(req.params.id))
    }

    static async chageStatus(req: Request, res: Response){
        const pedidoId = req.params.id;
        const status = req.body.status;

        await new OrderService().chageStatus(pedidoId, status)
        res.status(204).end();
    }

}