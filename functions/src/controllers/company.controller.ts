import {Request, Response} from "express"
import { Company } from "../models/company.model.js";
import { CompanyService } from "../services/company.service.js";


export class CompanyController{

    static async getAll(req:Request, res:Response,){
        // #swagger.tags = ['Company']
        // #swagger.summary = 'Listar companhias cadastradas'
        // #swagger.description = 'Rota espécifica que lista todas as companhias cadastradas'
        const company = await new CompanyService().getAll();
        res.send(company);
    }
    static async getById (req:Request, res:Response,){
        // #swagger.tags = ['Company']
        // #swagger.summary = 'Listar companhia'
        // #swagger.description = 'Rota específica para exibir uma companhia cadastrada, específicada pelo ID'
        // #swagger.parameters['id'] = { description: 'ID da companhia' }
        const companyId = req.params.id
        const Company = await new CompanyService().getById(companyId);
        res.send(Company);
    }
    
    static async create(req: Request, res: Response,) {
        // #swagger.tags = ['Company']
        // #swagger.summary = 'Cadastrar companhia'
        // #swagger.description = 'Rota específica para cadastro de novas companhias no sistema'
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addCompany"
                    }  
                }
            }
        } 
        */
        const company: any = req.body;
        await new CompanyService().create(company);
        res.status(201).send({ message: "empresa inserido com sucesso"});

    }

    static async update(req: Request, res: Response,) {
        // #swagger.tags = ['Company']
        // #swagger.summary = 'Atualizar companhia'
        // #swagger.description = 'Rota específica para atualizar uma companhia, específicada pelo parãmetro ID'
        // #swagger.parameters['id'] = { description: 'ID da companhia' }
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updateCompany"
                    }  
                }
            }
            } 
        */
        const companyId = req.params.id;
        const company: Company = req.body;

        await new CompanyService().update(companyId, company)

        res.send({
                message: "Empresa alterado com sucesso!"
        });
                
    }
}