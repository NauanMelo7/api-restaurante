import { Router } from "express"
import { productsRouter } from "./products-route"

const routes = Router()

routes.use("/products", productsRouter)

export {routes}