import {Request, Response, NextFunction} from "express"
import { AppError } from "@/utils/app-error"
import {z} from "zod"
import { knex } from "@/database/knex"


class ProductsController{
    async index(request: Request, response: Response, next: NextFunction)
    {
        try { 
            const products = await knex<ProductsRepository>("product").select("*")
        
            return response.json(products)
        } catch(error){
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction){
       try{
        const bodySchema = z.object({
            name: z.string({ required_error: "name is required"}).trim().min(3),
            price: z.number().gt(0)
        })
        const {name, price} = bodySchema.parse(request.body)

        await knex<ProductsRepository>("product").insert({name, price})

        return response.status(201).json("Cadastrado com sucesso!")

       } catch(error){
            next(error)
       } 
    }
    
}

export{ProductsController}