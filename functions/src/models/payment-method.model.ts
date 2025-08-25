import { Joi } from "celebrate"
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";


export class PaymentMethod {
    id: string;
    descricao: string;
    ativa: string

    constructor(payment: PaymentMethod | any){
        this.id = payment.id;
        this.descricao = payment.descricao;
        this.ativa = payment.ativa ?? true;
    }
}

export const newPaymentMethodSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativa: Joi.boolean().only().allow(true).default(true)

})
export const updatePaymentMethodSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativa: Joi.boolean().required()
})


export const paymentMethodConverter: FirestoreDataConverter <PaymentMethod> = {
    toFirestore: (paymentM: PaymentMethod): DocumentData => {
        return {
            descricao: paymentM.descricao,
            ativa: paymentM.ativa,
        }
    },
    fromFirestore:(snapshot: QueryDocumentSnapshot): PaymentMethod =>{
        return new PaymentMethod({
            id: snapshot.id, ...snapshot.data()
        })
    }
}