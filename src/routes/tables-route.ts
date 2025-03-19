import {Router} from "express"
import {TablesController} from "@/controller/tables-controllers"

const tablesRouter = Router()
const tableController = new TablesController

tablesRouter.get("/", tableController.index)
tablesRouter.post("/", tableController.create)
tablesRouter.delete("/:id", tableController.delete)



export {tablesRouter}