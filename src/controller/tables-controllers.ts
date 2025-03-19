import {Request, Response, NextFunction} from "express"
import {knex} from "@/database/knex"
import {z} from "zod"
import { AppError } from "@/utils/app-error"

class TablesController {
    async index(request: Request, response: Response, next: NextFunction){
        try {
            const tables = await knex("tables").select()

            response.json(tables)
            
        } catch(error) {
            next(error)
        }
    }
    async create(request: Request, response: Response, next: NextFunction){

        const bodySchema = z.object({
            table_number: z.number().nonnegative()
        })

        const {table_number} = bodySchema.parse(request.body)

        await knex<TableRepository>("tables").insert({table_number})
        response.json()
        
    }
    async delete(request: Request, response: Response, next: NextFunction){
        try {
            const id = request.params.id
            if(!id || isNaN(Number(id))){
                return response.status(400).json({error: "Invalid ID format"})
            }

            const tables = await knex("tables").select().where("id", "=", id).first()

            await knex("tables").delete().where("id", "=", id)

            response.json()

        } catch(error){
            next(error)
        }
    }
}
export{TablesController}