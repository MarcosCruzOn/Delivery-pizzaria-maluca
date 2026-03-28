import pool from './connection.js'

async function testarBancoDeDados() {
	try {
		// Tenta pegar uma conexão do Pool para testar
		const connection = await pool.getConnection()
		console.log(
			'✅ Sucesso! O servidor conectou ao banco de dados "pizzaria" perfeitamente!'
		)

		// Libera a conexão de volta para o Pool
		connection.release()

		// Encerra o processo do teste
		process.exit(0)
	} catch (error) {
		console.error(
			'❌ Ops! Erro ao conectar no banco de dados. Verifique sua senha e o .env.'
		)
		console.error(error)
		process.exit(1)
	}
}

testarBancoDeDados()
