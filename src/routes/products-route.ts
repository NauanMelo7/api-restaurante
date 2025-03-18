import { Router } from "express"
import {ProductsController} from "../controller/products-controller"

const productsRouter = Router()
const productsController = new ProductsController

productsRouter.get("/", productsController.index)
productsRouter.post("/", productsController.create)
productsRouter.put("/:id", productsController.updade)
productsRouter.delete("/:id", productsController.delete)

export {productsRouter}