import {Request, Response} from "express"
import { Company } from "../models/company.model.js";
import { CompanyService } from "../services/company.service.js";


export class CompanyController{

    static async getAll(req:Request, res:Response,){
        const company = await new CompanyService().getAll();
        res.send(company);
    }
    static async getById (req:Request, res:Response,){
        let companyId = req.params.id
        const Company = await new CompanyService().getById(companyId);
        res.send(Company);
    }
    
    static async create(req: Request, res: Response,) {
        let company: any = req.body;
        await new CompanyService().create(company);
        res.status(201).send({ message: "empresa inserido com sucesso"});

    }

    static async update(req: Request, res: Response,) {
        let companyId = req.params.id;
        let company: Company = req.body;

        await new CompanyService().update(companyId, company)

        res.send({
                message: "Empresa alterado com sucesso!"
        });
                
    }
}