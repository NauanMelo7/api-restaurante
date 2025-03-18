import {Request, Response, NextFunction} from "express"
import { AppError } from "@/utils/app-error"
import {z} from "zod"
import { knex } from "@/database/knex"


class ProductsController{
    async index(request: Request, response: Response, next: NextFunction)
    {
        try { 
            const {name} = request.query

            const products = await knex<ProductsRepository>("product")
            .select("*")
            .whereLike("name", `%${name ?? ""}%`)
            .orderBy("name")
        
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
    async updade(request: Request, response: Response, next: NextFunction){
        try{
            //recuperando o id
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {message: "ID deve ser um número"})
            .parse(request.params.id)

            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0)
            })

            const {name, price} = bodySchema.parse(request.body)

            const product = await knex<ProductsRepository>("product")
            .select()
            .where("id", "=", id)
            .first()

            if(!product){
                throw new AppError("Product it not found")
            }

            await knex<ProductsRepository>("product")
            .update({name, price, update_at: knex.fn.now()})
            .where("id", "=", id)
            
            return response.json()

        }catch(error) {
            next(error)
        }
    }
    async delete(request: Request, response: Response, next: NextFunction){
        try {
        const id = 
            z.string()
            .transform((value) => Number(value))
            .refine((value) => (!isNaN(value)), {message: "this is it's not a number"})
            .parse(request.params.id)

        const product = await knex<ProductsRepository>("product")
            .select()
            .where("id", "=", id)
            .first()
            
            if(!product){
                throw new AppError("Product is not found")
            }

        await knex<ProductsRepository>("product").delete().where("id", "=", id)

        return response.json()
            
        } catch(error){
            next(error)

        }

    }
}

export{ProductsController}