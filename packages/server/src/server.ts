import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { testDatabaseConnection } from './database/testConnection.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { router } from './routes/index.js'

const app = express()

app.use(express.json())

app.use(router)
app.use(cors())
app.use(errorHandler)

testDatabaseConnection()

const port = Number(process.env.PORT) || 3333

app.listen(port, () => {
	console.log(`API rodando em http://localhost:${port}`)
})
