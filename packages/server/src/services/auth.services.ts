import pool from '../database/connection.js'

export async function buscarEmpresaPorEmail(email: string) {
	// Fazemos uma pergunta (query) ao banco de dados: "Me dê todos os dados da empresa onde o email seja igual ao digitado"
	const [linhas]: any = await pool.query(
		'SELECT * FROM empresa WHERE email = ?',
		[email]
	)

	// Como o banco sempre devolve uma lista (array), pegamos apenas o primeiro item [0]
	return linhas[0]
}
