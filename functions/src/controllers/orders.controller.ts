import { Request, Response } from "express";
import { Order, queryParamsOrder } from "../models/order.model.js";
import { OrderService } from "../services/order.service.js";


export class OrdersController {

    static async create(req: Request, res: Response){
        // #swagger.tags = ['Orders'] 
        // #swagger.summary = 'Cadastro de pedido'
        // #swagger.description = 'Rota Específica para cadastro de um pedido do usuário'
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addOrder"
                    }  
                }
            }
        } 
    */
        
        const order = new Order(req.body);

        await new OrderService().create(order)

        res.status(201).send({
            message: "pedido criado com sucesso"
        })
    }

    static async search(req: Request, res: Response){
        // #swagger.tags = ['Orders']
        // #swagger.summary = 'Pesquisar pedido usando filtro'
        // #swagger.description = 'Rota Específica para buscar um determinado pedido pelo query parâmetro repassado de: Empresa, data ou status'
        /* #swagger.parameters['$ref'] = [
                '#components/parameters/orderEmpresaId',
                '#components/parameters/orderDataInicio',
                '#components/parameters/orderDataFim',
                '#components/parameters/orderStatus'
                ]
            */

        const ordersQueryP = await new OrderService().search(req.query as queryParamsOrder);
        res.send(ordersQueryP)
    }

    static async getItems(req: Request, res: Response){
        // #swagger.tags = ['Orders']
        // #swagger.summary = 'Exibir itens de compra'
        // #swagger.description = 'Rota Específica para exibição dos itens comprados de um determinado pedido, busaco pelo parâmetro ID'
        // #swagger.parameters['id'] = { description: 'ID da compra' }
        const items = await new OrderService().getItems(req.params.id);
        res.send(items);
    }

    static async getById(req: Request, res: Response){
        // #swagger.tags = ['Orders']
        // #swagger.summary = ' Exibir compra'
        // #swagger.description = 'Rota Específica para exibir informações de uma compra realizada'
        // #swagger.parameters['id'] = { description: 'ID da compra' }
        res.send(await new OrderService().getById(req.params.id))
    }

    static async chageStatus(req: Request, res: Response){
        // #swagger.tags = ['Orders']
        // #swagger.summary = 'Alterar status de compra'
        // #swagger.description = 'Rota Específica para alteração do status de uma determinada compra específicada pelo parâmetro ID'
        // #swagger.parameters['id'] = { description: 'ID da compra' }
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updateStatus
                    }  
                }
            }
            } 
        */
        const pedidoId = req.params.id;
        const status = req.body.status;

        await new OrderService().chageStatus(pedidoId, status)
        res.status(204).end();
    }

}