import { PaymentMethod, paymentMethodConverter } from "../models/payment-method.model.js";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";

export class PaymentMethodRepository{

    private collection : CollectionReference <PaymentMethod>;

    constructor(){
        this.collection = getFirestore().collection("payment-method").withConverter(paymentMethodConverter)
    }

    async getAll(): Promise<PaymentMethod[]>{
        
        const snapshot = await this.collection.get();
        
            const payment = snapshot.docs.map(doc => doc.data())
            
            return payment;
    }

    async getById(id: string): Promise<PaymentMethod | null>{

        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null

    }  

    async create(paymentMethod: PaymentMethod): Promise<void>{
        await this.collection.add(paymentMethod);
    }

    async update(paymentMethod: PaymentMethod) : Promise<void>{
        await this.collection.doc(paymentMethod.id!).set(paymentMethod)
    }

    async delete(id: string): Promise<void>{
        this.collection.doc(id).delete()
    }

}