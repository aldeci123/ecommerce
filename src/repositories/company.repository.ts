import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company, companyCoverter } from "../models/company.model.js";

export class CompanyRepository {

    private collection: CollectionReference <Company>;

    constructor(){
        this.collection = getFirestore().collection("companies").withConverter(companyCoverter);
    }

    async getAll(): Promise<Company []>{
        const snapshot = await this.collection.get();

        const companies = await snapshot.docs.map(doc => doc.data())

        return companies;
    }

    async getById(idCompany: string): Promise<Company | null> {
        const doc = await this.collection.doc(idCompany).get();

        return doc.data()?? null;
    }

    async create(company: Company): Promise<void>{
        await this.collection.add(company);
    }

    async update(company: Company): Promise<void>{
        await this.collection.doc(company.id!).set(company)
            
    }

}