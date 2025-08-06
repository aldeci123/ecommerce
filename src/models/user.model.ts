import { Joi } from "celebrate";
import { DocumentData, FirestoreDataConverter } from "firebase-admin/firestore";

export class User  {
    id: string;
    nome: string;
    email: string;
    password?: string;

    constructor(user : User | any ){
        this.id = user.id;
        this.nome = user.nome;
        this.email = user.email;
        this.password = user.password;
    }
};

export const newUserSchema = Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
})

export const updateUserSchema = Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6)
})

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export const authRecoverySchema = Joi.object().keys({
    email: Joi.string().email().required(),
})

export const userConverter: FirestoreDataConverter <User> ={
    toFirestore: (user: User): DocumentData => {
        return {
            nome: user.nome,
            email: user.email,
        }
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): User => {
        return new User({
            id: snapshot.id,...snapshot.data()
        })
    }
}