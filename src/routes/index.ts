import { Router } from "express"
import { productsRouter } from "./products-route"
import {tablesRouter} from "./tables-route"
import {routerTablesSession} from "./tables-sessions"

const routes = Router()

routes.use("/products", productsRouter)
routes.use("/tables", tablesRouter)
routes.use("/tables-session", routerTablesSession)

export {routes}