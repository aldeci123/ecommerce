import { NotFoundError } from "../errors/not-found.error.js";
import { User } from "../models/user.model.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "./auth.service.js";


export class UserService {

    private userRepository: UserRepository;
    private authService: AuthService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }

    async getAll(): Promise<User []> {
        return this.userRepository.getAll();
    }
    
    async getById(idUser: string): Promise<User>{
        const user = await this.userRepository.getById(idUser);

        if(!user){
            throw new NotFoundError ("Usuário não encontrado")
        } 
            return user;
        
    }

    async create(user: User): Promise<void>{
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid;
        return this.userRepository.update(user);
    }

    async update(user: User, userId: string): Promise<void> {
        const userResult = await this.getById(userId)

        userResult.nome = user.nome;
        userResult.email = user.email;


        await this.authService.update(userId, user)
        await this.userRepository.update(userResult);
    }

    async delete(userId: string): Promise<void>{
        await this.authService.delete(userId);
        return await this.userRepository.delete(userId)
    }
}