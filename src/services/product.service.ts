import { NotFoundError } from "../errors/not-found.error.js";
import { Product } from "../models/product.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { isStorageUrlValid } from "../utils/validation-utils.js";
import { UploadFileService } from "./upload-file.service.js";



export class ProductService {

    private productRepository: ProductRepository;
    private categoryRepository: CategoryRepository;
    private uploadFile: UploadFileService;

    constructor(){
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
        this.uploadFile = new UploadFileService("images/products/");
    }

    async getAll(): Promise<Product []> {
        return this.productRepository.getAll();
    }

    async search(categoriaId: string) : Promise<Product[]> {
        return this.productRepository.search(categoriaId)
    }
    
    async getById(productId: string): Promise<Product>{
        const product = await this.productRepository.getById(productId);

        if(!product){
            throw new NotFoundError ("Categoria não encontrada")
        } 
            return product;
        
    }

    async create(product: Product): Promise<void>{

        const categoria = await this.categoryById(product.categoria.id);
        product.categoria = categoria;
        
        if (product.imagem) {
            product.imagem = await this.uploadFile.upload(product.imagem);
        }

        await this.productRepository.create(product);

    }

    async update(productId: string, product: Product): Promise<void> {
        const product_ = await this.getById(productId)
        const categoria = await this.categoryRepository.getById(product.categoria.id)
        
        if (!categoria){
            throw new Error("Categoria não existe")
        }
        
        product.categoria = categoria;

        if (product.imagem && !isStorageUrlValid(product.imagem)){
            product.imagem = await this.uploadFile.upload(product.imagem)
        }
        
        product_.nome = product.nome
        product_.descricao = product.descricao;
        product_.imagem = product.imagem;
        product_.preco= product.preco;
        product_.categoria = categoria;
        product_.ativa = product.ativa;

        await this.productRepository.update(product_);
    }

    async delete(productId: string): Promise<void>{
        return await this.productRepository.delete(productId)
    }   
    private async categoryById(id:string){
        const categoria = await this.categoryRepository.getById(id)

        if(!categoria){
            throw new NotFoundError("categoria não encontrada!")
        }
        
        return categoria
    } 
}