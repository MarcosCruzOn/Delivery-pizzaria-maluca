import express from 'express'
import cors from 'cors'

import { errorHandler } from './middlewares/errorHandler.js'
import { router } from './routes/index.js'

const app = express()

app.use(express.json())

app.use(router)
app.use(cors())

app.use(errorHandler)

app.listen(3333, () => {
	console.log('Server is running on port 3333')
})
