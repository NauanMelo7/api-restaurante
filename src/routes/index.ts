import { Router } from "express"
import { productsRouter } from "./products-route"
import {tablesRouter} from "./tables-route"
import {routerTablesSession} from "./tables-sessions"
import {ordersRouter} from "./orders-routes"

const routes = Router()

routes.use("/products", productsRouter)
routes.use("/tables", tablesRouter)
routes.use("/tables-session", routerTablesSession)
routes.use("/orders", ordersRouter)

export {routes}