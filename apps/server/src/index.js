require('module-alias/register')

const { fastify, config } = require('../server')

async function start() {
	await fastify.listen({
		port: config.port,
		host: '0.0.0.0',
	})

	console.log(
		`AMBIENTE: ${config.ambiente} URL: ${config.url} PORTA: ${config.port}`
	)
}

start()
