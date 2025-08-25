import { PaymentMethod } from "../models/payment-method.model.js";
import { PaymentMethodService } from "../services/payment-method.service.js";
import {Request, Response} from "express"

export class PaymentMethodController{
    paymentMethodService : PaymentMethodService;

    constructor(){
        this.paymentMethodService = new PaymentMethodService();
    }
    static async getAll(req: Request, res:Response){
        // #swagger.tags = ['Payment-Methods']
        // #swagger.summary = 'Listar métodos de pagamentos cadastrados'
        //#swagger.description = 'Rota específica para exibir todos os métodos de pagamentos cadastrados'
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addPayment"
                    }  
                }
            }
        } 
        */
        res.send(await new PaymentMethodService().getAll())
    }

    static async getById(req: Request, res: Response){
        // #swagger.tags = ['Payment-Methods']
        // #swagger.summary = 'Listar método de pagamento'
        // #swagger.description = 'Rota destinada para listar um determinado método de pagamento de acordo com o parâmetro ID repassado'
        // #swagger.parameters['id'] = { description: 'ID do método de pagamento' }

        const paymentMethodId = req.params.id;
        res.send(await new PaymentMethodService().getById(paymentMethodId));
    }

    static async create(req: Request, res: Response){
        // #swagger.tags = ['Payment-Methods']
        // #swagger.summary = 'Cadastro de um novo método de pagamento'
        // #swagger.description = ' Rota específica para cadastrar um novo método de pagamento que será aceito pela api'
        const paymentMethodBody = req.body;
        await new PaymentMethodService().create(paymentMethodBody);
        res.status(201).send({
            message: "A forma de pagamento foi criada!"})
    }

    static async update(req: Request, res: Response){
        // #swagger.tags = ['Payment-Methods']
        // #swagger.summary = 'Atualizar método de pagamento'
        // #swagger.description = 'Rota específica para alteração de um método de pagamento específico, de acordo com o parâmetro id repassado'
        // #swagger.parameters['id'] = { description: 'ID do método de pagamento' }
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updatePayment"
                    }  
                }
            }
            } 
        */
        const id = req.params.id;
        const paymentMethodBody = req.body as PaymentMethod;

        await new PaymentMethodService().update(id, paymentMethodBody)

        res.send({
            message:"A forma de pagamento foi alterada com sucesso"
        });
    }

    static async delete(req: Request, res: Response){
        // #swagger.tags = ['Payment-Methods']
        // #swagger.summary = 'Deletar método de pagamento'
        // #swagger.description = 'Rota específica para deletar determinado método de pagamento'
        // #swagger.parameters['id'] = { description: 'ID do método de pagamento' }
        const id = req.params.id;
        await new PaymentMethodService().delete(id)
        res.status(204).send({
            message: "item removido com sucesso"
        }).end();
    }

}