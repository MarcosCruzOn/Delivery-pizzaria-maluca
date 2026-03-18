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

export async function updateCompanyAddressQuery(data: any) {
	const { cep, endereco, numero, bairro, cidade, estado } = data

	const [result]: any = await db.execute(
		`
		UPDATE empresa
		SET
			cep = ?,
			endereco = ?,
			numero = ?,
			bairro = ?,
			cidade = ?,
			estado = ?
		WHERE ativo = 1
	`,
		[cep, endereco, numero, bairro, cidade, estado]
	)

	return result
}

export async function updateCompanyLogoQuery(path: string) {
	const [result] = await db.execute(
		`UPDATE empresa SET logotipo = ? WHERE ativo = 1`,
		[path]
	)

	return result
}
