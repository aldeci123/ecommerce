import { Joi } from "celebrate";
import { Address, orderAddressSchema } from "./address.model.js";
import { Company } from "./company.model.js";
import { Customer, customerSchema } from "./customer.model.js";
import { OrderItem, orderItemSchema } from "./order-item.model.js";
import { PaymentMethod } from "./payment-method.model.js";
import { FirestoreDataConverter, Timestamp, DocumentData, FieldValue } from "firebase-admin/firestore";


export class Order {
    id: string;
    empresa: Company;
    cliente: Customer;
    endereco: Address;
    cpfCnpjCupom: string;
    data : Date;
    isEntrega: boolean;
    formaPagamento: PaymentMethod;
    taxaEntrega: number;
    items?: OrderItem[];
    status: OrderStatus;
    observacoes : string;
    subtotal: number;
    total: number;

    constructor(data: any){
        this.id = data.id;
        this.empresa = new Company(data.empresa);
        this.cliente = data.cliente;
        this.endereco = data.endereco;
        this.cpfCnpjCupom = data.cpfCnpjCupom;
        this.data = data.data instanceof Timestamp? data.data.toDate() : data.data;
        this.isEntrega = data.isEntrega;
        this.formaPagamento = new PaymentMethod(data.formaPagamento);
        this.taxaEntrega = data.taxaEntrega;
        this.items = data.items?.map((item: any) => new OrderItem(item));
        this.status = data.status ?? OrderStatus.pendente;
        this.observacoes = data.observacoes ?? null
        this.subtotal = data.subtotal;
        this.total = data.total;

    }
    getSubtotal(): number {
        return this.items?.map(
            (item) => item.getTotal()
            ).reduce((total, next) =>total + next, 0) ?? 0;
    }
    getTotal(): number {
        return this.getSubtotal() + this.taxaEntrega;
    }
}

export enum OrderStatus {
    pendente = "pendente",
    aprovado = "aprovado",
    entrega = "entrega",
    concluido = "concluido",
    cancelado = "cancelado"
}

export const changeStatusOrderSchema = Joi.object().keys({
    status: Joi.string().only().allow(
        OrderStatus.aprovado, OrderStatus.entrega,
        OrderStatus.concluido, OrderStatus.cancelado
    ).required()
})

export const newOrderSchema = Joi.object().keys({
    empresa: Joi.object().keys({
        id: Joi.string().trim().required(),
    }).required(),
    cliente: customerSchema.required(),
    endereco: Joi.alternatives().conditional(
        "isEntrega",{
                    is: true, 
                    then:orderAddressSchema.required(), 
                    otherwise: Joi.object().only().allow(null).default(null)
                    }
    ),
    cpfCnpjCupom: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).default(null),
    isEntrega: Joi.boolean().required(),
    formaPagamento: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    taxaEntrega: Joi.number().min(0).required(),
    items: Joi.array().min(1).items(orderItemSchema).required(),
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente),
    observacoes: Joi.string().trim().allow(null).default(null)

})

export type queryParamsOrder = {
    empresaId?: string;
    dataInicio?: Date;
    dataFim?: Date;
    status?: OrderStatus;
}

export const searchOrderQuerySchema = Joi.object().keys({
    empresaId: Joi.string().trim(),
    dataInicio: Joi.date(),
    dataFim: Joi.date(),
    status: Joi.string().only().allow(...Object.values(OrderStatus))
})


export const orderConverter: FirestoreDataConverter <Order> = {
    toFirestore: (order : Order): DocumentData => {
        return{
            empresa: {
                id: order.empresa.id,
                logomarca: order.empresa.logomarca,
                cpfCnpj: order.empresa.cpfCnpj,
                razaoSocial: order.empresa.razaoSocial,
                nomeFantasia: order.empresa.nomeFantasia,
                telefone: order.empresa.telefone,
                endereco: order.empresa.endereco,
                localizacao: order.empresa.localizacao
            },
            cliente: {
                nome: order.cliente.nome,
                telefone: order.cliente.telefone
            },
            endereco: {
                cep: order.endereco.cep,
                uf: order.endereco.uf,
                cidade: order.endereco.cidade,
                numero: order.endereco.numero,
                complemento: order.endereco.complemento,
                logradouro: order.endereco.logradouro,
            },
            cpfCnpjCupom: order.cpfCnpjCupom,
            data: FieldValue.serverTimestamp(),
            isEntrega: order.isEntrega,
            formaPagamento:{
                id: order.formaPagamento.id,
                descricao: order.formaPagamento.descricao
            } ,
            taxaEntrega: order.taxaEntrega,
            status: order.status,
            observacoes: order.observacoes,
            subtotal: order.getSubtotal(),
            total: order.getTotal()
            
        } 
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): Order => {
        return new Order({
            id: snapshot.id, ...snapshot.data()
        })
    }
}