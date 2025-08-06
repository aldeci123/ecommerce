import { PaymentMethod } from "../models/payment-method.model.js";
import { PaymentMethodService } from "../services/payment-method.service.js";
import {Request, Response} from "express"

export class PaymentMethodController{
    paymentMethodService : PaymentMethodService;

    constructor(){
        this.paymentMethodService = new PaymentMethodService();
    }
    static async getAll(req: Request, res:Response){
        res.send(await new PaymentMethodService().getAll())
    }

    static async getById(req: Request, res: Response){
        let paymentMethodId = req.params.id;
        res.send(await new PaymentMethodService().getById(paymentMethodId));
    }

    static async create(req: Request, res: Response){
        let paymentMethodBody = req.body;
        await new PaymentMethodService().create(paymentMethodBody);
        res.status(201).send({
            message: "A forma de pagamento foi criada!"})
    }

    static async update(req: Request, res: Response){
        let id = req.params.id;
        let paymentMethodBody = req.body as PaymentMethod;

        await new PaymentMethodService().update(id, paymentMethodBody)

        res.send({
            message:"A forma de pagamento foi alterada com sucesso"
        });
    }

    static async delete(req: Request, res: Response){
        let id = req.params.id;
        await new PaymentMethodService().delete(id)
        res.status(204).send({
            message: "item removido com sucesso"
        }).end();
    }

}