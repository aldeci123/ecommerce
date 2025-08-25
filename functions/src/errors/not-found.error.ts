import { ErrorBase } from "./base.error.js";

export class NotFoundError extends ErrorBase{

    constructor (message: string = "não encontrado"){
        super(404,message)
    }
}