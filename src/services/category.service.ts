import { NotFoundError } from "../errors/not-found.error.js";
import { ValidationError } from "../errors/validation.error.js";
import { Category } from "../models/category.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";


export class CategoryService {

    private categoryRepository: CategoryRepository;
    private productRepository: ProductRepository;


    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.productRepository = new ProductRepository();
    }

    async getAll(): Promise<Category []> {
        return this.categoryRepository.getAll();
    }
    
    async getById(categoryId: string): Promise<Category>{
        const category = await this.categoryRepository.getById(categoryId);

        if(!category){
            throw new NotFoundError ("Categoria não encontrada")
        } 
            return category;
        
    }

    async create(category: Category): Promise<void>{
        await this.categoryRepository.create(category)
    }

    async update(category: Category, categoryId: string): Promise<void> {
        const categoryResult = await this.getById(categoryId)
        
        categoryResult.descricao = category.descricao;
        categoryResult.ativa = category.ativa;

        await this.categoryRepository.update(categoryResult);
    }

    async delete(categoryId: string): Promise<void>{

        if (await this.productRepository.getCountByCategoria(categoryId) > 0) {
            throw new ValidationError("Não é possível excluir uma categoria com produtos relacionados!");
        }

        return await this.categoryRepository.delete(categoryId)
    }
}