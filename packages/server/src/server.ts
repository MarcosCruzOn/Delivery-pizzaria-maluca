import express from 'express'

const app = express()
const route = express.Router()

app.use(express.json())

route.get('/', (req, res) => {
	res.json({ message: 'hello world with Typescript' })
})

app.use(route)

app.listen(3333, () => {
	console.log('Server is running on port 3333')
})
