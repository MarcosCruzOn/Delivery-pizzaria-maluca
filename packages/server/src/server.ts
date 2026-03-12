import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'

import { testDatabaseConnection } from './database/testConnection.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { router } from './routes/index.js'
import { fileURLToPath } from 'url'

const app = express()

app.use(express.json())
app.use(cors())

app.use(router)

app.use(errorHandler)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadsPath = path.resolve(__dirname, '../uploads')

app.use('/uploads', express.static(uploadsPath))

// app.use('/uploads', express.static(path.resolve('packages/server/uploads')))

testDatabaseConnection()

const port = Number(process.env.PORT) || 3333

app.listen(port, () => {
	console.log(`API rodando em http://localhost:${port}`)
})
