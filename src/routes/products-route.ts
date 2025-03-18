import { Router } from "express"
import {ProductsController} from "../controller/products-controller"

const productsRouter = Router()
const productsController = new ProductsController

productsRouter.get("/", productsController.index)
productsRouter.post("/", productsController.create)

export {productsRouter}