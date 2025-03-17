import {Request, Response, NextFunction} from "express"
import { AppError } from "@/utils/app-error"

class ProductsController{
    async index(request: Request, response: Response, next: NextFunction){
    console.log(`Requisição recebida em controller: ${request.url}`);

        try {
            return response.json({message: "Ok"})
        } catch(error){
            next(error)
        }
    }
    
}

export{ProductsController}