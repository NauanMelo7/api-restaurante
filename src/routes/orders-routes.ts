import {Router} from "express"
import {OrdersController} from "@/controller/orders-controllers"

const ordersRouter = Router()
const ordersController = new OrdersController

ordersRouter.post("/", ordersController.create)
ordersRouter.get("/tables-session/:table_session_id", ordersController.index)
ordersRouter.get("/table-session/:table_session_id/total", ordersController.show)


export {ordersRouter}