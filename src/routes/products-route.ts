import { Router } from "express"
import {ProductsController} from "../controller/products-controller"

const productsRouter = Router()
const productsController = new ProductsController

productsRouter.get("/", productsController.index, (request, response) => {
    console.log(`Requisição recebida em rota: ${request.url}`);
})

export {productsRouter}