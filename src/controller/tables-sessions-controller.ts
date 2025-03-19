import {Request, Response, NextFunction} from "express"
import {z} from "zod"
import {knex} from "@/database/knex"
import { AppError } from "@/utils/app-error"

class TablesSessionController {
    async create(request: Request, response: Response, next: NextFunction ){
        try{

            const {table_id} = request.body

            const session = await knex<tableSessionReposity>("tables_sessions")
            .where({table_id})
            .first()

            if(session && !session.closed_at){
                throw new AppError("this table is already open")
            }

            await knex<tableSessionReposity>("tables_sessions").insert({
                table_id,
                opened: knex.fn.now()
            })

            return response.status(201).json()
        } catch(error){
            next(error)
        }
    }
    async index(request: Request, response: Response, next: NextFunction){
        try{
            const sessions = await knex<TablesSessionController>("tables_sessions")
            .select("*")
            .orderBy("closed_at")

            response.json(sessions)
        } catch(error){
            next(error)
        }
        
    }
    async update(request: Request, response: Response, next: NextFunction){
        try {
            const id = request.params.id

        if(!id || isNaN(Number(id))){
            return response.status(400).json({error: "Invalid ID format"})
        }

        const session = await knex<tableSessionReposity>("tables_sessions")
        .select()
        .where({id})
        .first()

        if(!session){
            throw new AppError("Sessions table not found")
            
        }
        if(session.closed_at){
            throw new AppError("this sessions table is already closed")
        }

        await knex<tableSessionReposity>("tables_sessions")
        .update({
            closed_at: knex.fn.now(),
        })
        .where({id})


        return response.json()

        } catch(error){
            next(error)
        }
        
    }
}
export {TablesSessionController}