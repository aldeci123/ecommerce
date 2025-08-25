import {Express, NextFunction, Request, Response} from "express"
import swaggerUi from "swagger-ui-express"
import swaggerFile from "./../docs/swagger-output.json" with {type:"json"};

export const swaggerDocs = (app: Express) =>{


    //redireciona para a /docs/ caso o usuario digite apenas /docs
    app.use((req:Request, res: Response, next: NextFunction) =>{
        if(req.path === '/docs') {
            return res.redirect ('/api/docs/')
        }
        next()
    })
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
}