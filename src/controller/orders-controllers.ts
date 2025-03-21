import { AppError } from "@/utils/app-error"
import {Request, Response, NextFunction} from "express"
import {knex} from "@/database/knex"

class OrdersController {
    async create(request: Request, response: Response, next: NextFunction){
        try {

            const body = request.body

            if(typeof body.table_session_id !== "number" || isNaN(body.table_session_id)){
                throw new AppError("Is not a number")
            }
            if(typeof body.product_id !== "number" || isNaN(body.product_id)){
                throw new AppError("Is not a number")
            }
            if(typeof body.quantity !== "number" || isNaN(body.quantity)){
                throw new AppError("Is not a number")
            }

            const {table_session_id, product_id, quantity} = request.body

            const session = await knex<tableSessionReposity>("tables_sessions").where({id: table_session_id}).first()

            if(!session){
                throw new AppError("Session is not found")
            }
            if(session.closed_at){
                throw new AppError("This table is already closed")
            }
            
            const product = await knex<ProductsRepository>("product")
            .where({id: product_id})
            .first()
            console.log("Tipo de product_id:", typeof product_id, "Valor:", product_id);
            
            if(!product){
                throw new AppError("product is not found")
            }

            await knex<OrderRepository>("orders").insert({
                product_id, 
                table_session_id,
                quantity,
                price: product.price,
            })

            return response.status(201).json()

        } catch(error){
            next(error)
        }
    }
    async index(request: Request, response: Response, next: NextFunction){
        try {

            const {table_session_id} = request.params

            const order = await knex("orders")
            .select("orders.id", 
                "orders.table_session_id", 
                "orders.product_id", 
                "product.name",
                "orders.price",
                "orders.quantity",
                knex.raw("(orders.price * orders.quantity) AS total"),
                "orders.created_at",
                "orders.update_at"
            )
            .join("product", "product.id", "orders.product_id" )
            .where({table_session_id})
            .orderBy("orders.created_at", "desc")

            if(order.length === 0){
                throw new AppError("This table is not found")
            }

            return response.json(order)
            
        } catch(error) {
            next(error)
        }
    }
    async show(request: Request, response: Response, next: NextFunction){
        try{

            const {table_session_id} = request.params

            const totalOrders = await knex("orders")
            .select(knex.raw("COALESCE(SUM(orders.quantity), 0) Quantity"),
                knex.raw("COALESCE(SUM(orders.quantity * orders.price), 0) Total")
            )
            .where({table_session_id})
            .first()
            
            

            response.json(totalOrders)

        } catch(error){
            next(error)
        }
    }
}

export{OrdersController}