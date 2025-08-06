import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, orderConverter, OrderStatus, queryParamsOrder } from "../models/order.model.js";
import dayjs from "dayjs";
import { OrderItem, OrderItemConverter } from "../models/order-item.model.js";
import { NotFoundError } from "../errors/not-found.error.js";

export class OrderRepository {

    private collection: CollectionReference <Order>;

    constructor(){
        this.collection = getFirestore().collection('orders').withConverter(orderConverter);
    }

    async create(order: Order){

        const batch = getFirestore().batch();

        //cabeçalho do pedido
        const orderRef = this.collection.doc();

        batch.create(orderRef, order)

        // itens do pedido com subcoleção
        const itemRef = orderRef.collection("items").withConverter(OrderItemConverter);
        
        for (let item of order.items!){
            batch.create(itemRef.doc(), item)
        }

        await batch.commit()

        /*const orderRef = await this.collection.add(order)

        //criando uma subcoleção para os itens do pedido
        for (let item of order.items){
            await orderRef.collection("items").withConverter(OrderItemConverter).add(item);
        }*/
    }

    async search(queryP:queryParamsOrder): Promise <Order []>{

        //transformado o query de tipo Collection para tipo query
        let query: FirebaseFirestore.Query <Order> = this.collection;

        if (queryP.empresaId){
            query = query.where("empresa.id","==", queryP.empresaId);
        }

        if (queryP.status){
            query = query.where("status","==", queryP.status);
        }

        if (queryP.dataInicio){
            queryP.dataInicio = dayjs(queryP.dataInicio).add(1,"day").startOf("day").toDate();
            console.log(queryP.dataInicio)
            query = query.where("data", ">=", queryP.dataInicio);
        }

        if (queryP.dataFim){
            queryP.dataFim = dayjs(queryP.dataFim).add(1,"day").endOf("day").toDate();
            query = query.where("data", "<=", queryP.dataFim);
        }

        const snapshot = await query.get();

        return snapshot.docs.map(doc => doc.data())
    }
    async getItems(pedidoId: string): Promise<OrderItem[]>{
        const pedidoRef = this.collection.doc(pedidoId);

        const snapshot = await pedidoRef.collection("items").withConverter(OrderItemConverter).get();
        
        return snapshot.docs.map(doc => doc.data())
    }
    async getById(pedidoId: string): Promise <Order> {
        const order = (await this.collection.doc(pedidoId).get()).data();
        if (!order) {
            throw new NotFoundError("Pedido não encontrado")
        }

        order.items = await this.getItems(pedidoId);

        return order;
    }

    async chageStatus (pedidoId: string, status: OrderStatus) {
            await this.collection.withConverter(null).doc(pedidoId).set({
                status: status 
            }, {
                merge: true
            })
        }
}


