import {Joi} from "celebrate"
import { Category } from "./category.model.js";
import { FirestoreDataConverter } from "firebase-admin/firestore";

export class Product {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
    categoria: Category;
    ativa: boolean

    constructor(product : Product | any){
        this.id = product.id;
        this.nome = product.nome;
        this.descricao = product.descricao;
        this.preco = product.preco;
        this.imagem = product.imagem;
        this.categoria = new Category(product.categoria);
        this.ativa = product.ativa ?? true
    }
}

export const newProductSchema = Joi.object().keys({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().allow(null).default(null),
    preco: Joi.number().positive().required(),
    imagem: Joi.string().base64().allow(null).default(null),
    categoria: Joi.object().keys({
        id: Joi.string().required()
    }).required(),
    ativa: Joi.boolean().only().allow(true).default(true)

})

export const updateProductSchema = Joi.object().keys({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().allow(null).default(null),
    preco: Joi.number().positive().required(),
    imagem: Joi.alternatives().try(
        Joi.string().base64(),
        Joi.string().uri(),
    ).allow(null).default(null),
    categoria: Joi.object().keys({
        id: Joi.string().required()
    }).required(),
    ativa: Joi.boolean().required()

})

export const searchQuerySchema = Joi.object().keys({
    categoriaId: Joi.string().required()
})

export const productConverter: FirestoreDataConverter <Product> = {
    toFirestore: (produto: Product): FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData> => {
        return {
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            imagem: produto.imagem,
            categoria: {
                id: produto.categoria.id,
                descricao: produto.categoria.descricao,
                ativa: produto.categoria.ativa
            },
            ativa: produto.ativa
        }
    },
    fromFirestore:(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Product =>  {
        return new Product({
            id: snapshot.id,...snapshot.data()
        })
    }
}