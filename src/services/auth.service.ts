import { FirebaseError } from "firebase/app";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error.js";
import { UnauthorizedError} from "../errors/unauthorized.error.js";
import { User } from "../models/user.model.js";
import { FirebaseAuthError, getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth";
import { getAuth as getFireBaseAuth, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

//AuthService é um serviço de login do firebase
export class AuthService {
    async create(user: User): Promise<UserRecord>{
        try{
            return await getAuth().createUser({
                email: user.email,
                password: user.password,
                displayName: user.nome,
            });
        } catch(err) {
            if (err instanceof FirebaseAuthError && err.code === "auth/email-already-exists"){
                throw new EmailAlreadyExistsError();
            } throw err;
        }
    }
    async update(id: string, user: User){
        const props: UpdateRequest = {
            displayName: user.nome,
            email: user.email
        }
        if (user.password){
            props.password = user.password;
        }
        await getAuth().updateUser(id, props);
    }

    //login com o authentication web
    async login(email: string, password: string): Promise<UserCredential>{
       
        try{    
            return await signInWithEmailAndPassword(getFireBaseAuth(), email, password)
        
        } catch(err) {
            if(err instanceof FirebaseError && err.code === "auth/invalid-credential"){
                throw new UnauthorizedError();
            }
            throw err
        }      
    }
    
    async delete(id: string){
        try {
           await getAuth().deleteUser(id)
        } catch (error) {
            
        }
    }

    async recovery (email: string) {
        await sendPasswordResetEmail(getFireBaseAuth(), email)
    }
    
}