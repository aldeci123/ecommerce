import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Category, categoryConverter } from "../models/category.model.js";

export class CategoryRepository {

    private collection: CollectionReference<Category>;

    constructor(){
        this.collection = getFirestore().collection("categories").withConverter(categoryConverter);
    }

    async getAll(): Promise<Category []>{
        const snapshot = await this.collection.get();

        const categories = await snapshot.docs.map(doc => doc.data());
        return categories;
    }

    async getById(idCategory: string): Promise<Category | null> {
        const doc = await this.collection.doc(idCategory).get();

            return doc.data()?? null
    }

    async create(category: Category): Promise<void>{
        await this.collection.add(category);
    }

    async update(category: Category): Promise<void>{
        await this.collection.doc(category.id).set(category);
            
    }

    async delete (categoryId: string): Promise<void> {
        await this.collection.doc(categoryId).delete();
    }

}