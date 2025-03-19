import {Router} from "express"
import {TablesSessionController} from "@/controller/tables-sessions-controller"

const routerTablesSession = Router()
const tablesSession = new TablesSessionController

routerTablesSession.post("/", tablesSession.create)
routerTablesSession.get("/", tablesSession.index)
routerTablesSession.patch("/:id", tablesSession.update)

export {routerTablesSession}