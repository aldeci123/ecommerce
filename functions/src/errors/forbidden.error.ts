import { ErrorBase } from "./base.error.js";

export class ForbiddenError extends ErrorBase{

    constructor(message:string = "Não autorizado"){
        super(403, message);
    }
}