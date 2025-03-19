import { Router } from "express"
import { productsRouter } from "./products-route"
import {tablesRouter} from "./tables-route"

const routes = Router()

routes.use("/products", productsRouter)
routes.use("/tables", tablesRouter)

export {routes}