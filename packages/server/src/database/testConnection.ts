import { db } from './connection.js'

export async function testDatabaseConnection() {
	try {
		const connection = await db.getConnection()
		console.log('✅ Banco de dados conectado com sucesso.')
		connection.release()
	} catch (error) {
		console.error('❌ Erro ao conectar no banco de dados:', error)
	}
}
