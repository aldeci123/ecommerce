import express, { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { UserService } from "../services/user.service.js";
import { ForbiddenError } from "../errors/forbidden.error.js";
import { NotFoundError } from "../errors/not-found.error.js";


//autorização e token de autenticação
export const auth = (app: express.Express)=>{
    app.use(async (req: Request, res: Response, next: NextFunction) =>{
        
        //se for uma rota que não precise de autenticação
        if (isRouteUnAuthenticated(req)) {
            return next();
        }
        
        const token = req.headers.authorization?.split("Bearer ")[1];

        if (token){
            try {
                const decodedIdToken: DecodedIdToken = await getAuth().verifyIdToken(token,true)
                
                if (decodedIdToken.firebase.sign_in_provider === "anonymous"){
                    return next();
                }

                req.user = await new UserService().getById(decodedIdToken.uid);
                
                return next();

            } catch (error) {
                if (error instanceof NotFoundError) {
                    return next (new ForbiddenError());
                } else {
                    return next (new UnauthorizedError())
                }
            }
        }
        next(new UnauthorizedError())
    })

    const isRouteUnAuthenticated = (req: Request): boolean =>{
        if (req.method === "POST") {
            if (req.url.startsWith("/auth/login") || 
                req.url.startsWith("/auth/recovery") || 
                req.url.startsWith("/auth/signin")) {
                return true;
            }
        } 
        return false;
    }
}

