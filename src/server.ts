import express from "express"
import { routes } from "./routes/index"
import { errorHandling } from "./middleware/error-handling"
import cors from "cors";// ✅ Importe o CORS

const PORT = 3333
const app = express()
app.use(cors());

app.use(express.json())
app.use(routes)
app.use(errorHandling)
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))