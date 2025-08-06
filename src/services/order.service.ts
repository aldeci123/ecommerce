import { Order, OrderStatus, queryParamsOrder } from "../models/order.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { OrderItem } from "../models/order-item.model.js";

export class OrderService {

    private orderRepository : OrderRepository;
    private companyRepository: CompanyRepository;
    private paymentMethodRepository: PaymentMethodRepository;
    private productRepository: ProductRepository;

    constructor(){
        this.orderRepository = new OrderRepository();
        this.companyRepository = new CompanyRepository();
        this.paymentMethodRepository = new PaymentMethodRepository();
        this.productRepository = new ProductRepository();
    }

    async create(order: Order){

        const company = await this.companyRepository.getById(order.empresa.id!)
        if (!company){
            throw new NotFoundError("Empresa não encontrada")
        }
        order.empresa = company;

        const paymentMethod = await this.paymentMethodRepository.getById(order.formaPagamento.id!) 

        if (!paymentMethod){
            throw new NotFoundError("Método de pagamento não encontrado")
        }
        order.formaPagamento = paymentMethod;

        for (let item of order.items!){
            const product = await this.productRepository.getById(item.produto.id)

            if (!product){
                throw new NotFoundError("Um ou mais produtos não encontrados")
            }

            item.produto = product
        }
        await this.orderRepository.create(order)
    }

    async search(query: queryParamsOrder): Promise <Order[]>{
        return this.orderRepository.search(query)
    }

    async getItems(pedidoId: string): Promise <OrderItem[]>{
        return this.orderRepository.getItems(pedidoId)

    }

    async getById(pedidoId: string): Promise <Order>{
        return this.orderRepository.getById(pedidoId)
    }

    /** para aplicação, é necessário aplicar as regra de negócios */
    async chageStatus (pedidoId: string, status: OrderStatus) {
        await this.orderRepository.chageStatus(pedidoId, status)
    }
}