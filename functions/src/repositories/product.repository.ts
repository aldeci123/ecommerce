import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Product, productConverter } from "../models/product.model.js";

export class ProductRepository {

    private collection: CollectionReference <Product>;

    constructor(){
        this.collection = getFirestore().collection("products").withConverter(productConverter);
    }

    async getAll(): Promise<Product []>{

        const snapshot = await this.collection.get();
        
        return snapshot.docs.map(doc => doc.data())
    }

    async search(contegoriaId: string) : Promise <Product []> {
        const snapshot = await this.collection.where("categoria.id", "==", contegoriaId).get()

        return snapshot.docs.map(doc => doc.data())
    }

    async getById(idProduct: string): Promise<Product | null> {

        const doc = await this.collection.doc(idProduct).get();

           return doc.data()?? null;
    }

    async create(product: Product): Promise<void>{
        await this.collection.add(product);
    }

    async update(product: Product): Promise<void>{
            await this.collection.doc(product.id!).set(product)
                
    }
    
    async delete (productId: string): Promise<void> {
            await this.collection.doc(productId).delete();
    }

    async getCountByCategoria(categoriaId: string): Promise<number>{
        const countSnapshot = await this.collection
            .where("categoria.id", "==", categoriaId)
            .count()
            .get();
        return countSnapshot.data().count;
        
    }
}