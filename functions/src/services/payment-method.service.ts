import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethod } from "../models/payment-method.model.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";

export class PaymentMethodService{
    paymentMethodRepository: PaymentMethodRepository;

    constructor(){
        this.paymentMethodRepository = new PaymentMethodRepository();
    }

    async getAll(): Promise<PaymentMethod []>{
        return await this.paymentMethodRepository.getAll();
    }

    async getById(id: string): Promise<PaymentMethod>{
        const paymentVerify = await this.paymentMethodRepository.getById(id);

        if (!paymentVerify){
            throw new NotFoundError("metodo de pagamento não existe!");
        }

        return paymentVerify;
    }

    async create(pMethod: PaymentMethod): Promise<void>{
        await this.paymentMethodRepository.create(pMethod);
    }

    async update (id: string, pMethod: PaymentMethod): Promise <void>{
        const paymentMethodVerify = await this.getById(id)

        paymentMethodVerify.descricao = pMethod.descricao;
        paymentMethodVerify.ativa = pMethod.ativa;

        this.paymentMethodRepository.update(paymentMethodVerify);

    }

    async delete (id: string){
        await this.paymentMethodRepository.delete(id);
    }
}