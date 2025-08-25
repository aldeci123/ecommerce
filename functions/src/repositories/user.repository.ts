import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User, userConverter } from "../models/user.model.js";

export class UserRepository {

    private collection: CollectionReference <User>;

    constructor(){
        this.collection = getFirestore().collection("users").withConverter(userConverter);
    }

    async getAll(): Promise<User []>{
        const snapshot = await this.collection.get();
        const users = await snapshot.docs.map(doc => doc.data())
        return users;
    }

    async getById(idUser: string): Promise<User | null> {
        const doc = await this.collection.doc(idUser).get();

        return doc.data()?? null
    }

    async create(user: User): Promise<void>{
        await this.collection.add(user);
    }

    async update(user: User): Promise<void>{
        await this.collection.doc(user.id).set(user)
            
    }

    async delete (userId: string): Promise<void> {
        await getFirestore().collection('users').doc(userId).delete();
    }
}