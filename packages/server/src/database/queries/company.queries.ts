import { db } from '../connection.js'

export async function getCompanyQuery() {
	const [rows]: any = await db.execute(`
		SELECT * FROM empresa WHERE ativo = 1 LIMIT 1
	`)

	return rows[0]
}

export async function updateCompanyAboutQuery(nome: string, sobre: string) {
	const [result]: any = await db.execute(
		`
		UPDATE empresa
		SET nome = ?, sobre = ?
		WHERE ativo = 1
	`,
		[nome, sobre]
	)

	console.log('UPDATE result:', result)

	return result
}
