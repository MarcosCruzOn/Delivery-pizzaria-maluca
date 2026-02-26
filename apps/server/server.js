const fastify = require('fastify')({ logger: true })
const recursiveReaddir = require('recursive-readdir')
const path = require('path')

const config = require('./src/config/config').get('dev')
const { CLIENT_DIR } = require('./src/config/paths')

// CORS
fastify.register(require('@fastify/cors'), { origin: '*' })

// Static (client)
fastify.register(require('@fastify/static'), {
	root: CLIENT_DIR,
	prefix: '/',
	index: ['index.html'], // ajuste se necessário
})

// Autoload rotas
const routesDir = path.resolve(__dirname, 'routes')
recursiveReaddir(routesDir, ['!*.js'], (err, files) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	files.forEach((file) => require(file)(fastify))
})

// 404
fastify.setNotFoundHandler((request, reply) => {
	reply.code(404).send({ Erro: 'Página não encontrada :/' })
})

module.exports = { fastify, config }
