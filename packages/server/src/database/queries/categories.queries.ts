import { db } from '../connection.js'

export async function createCategoryQuery(
	nome: string,
	icone: string,
	ordem: number
) {
	const [result] = await db.execute(
		`INSERT INTO categorias (nome, icone, ordem)
     VALUES (?, ?, ?)`,
		[nome, icone, ordem]
	)

	return result
}

export async function deleteCategoryQuery(idcategoria: number) {
	const [result] = await db.execute(
		`DELETE FROM categorias WHERE idcategoria = ?`,
		[idcategoria]
	)

	return result
}

export async function getCategoriesQuery() {
	const [rows] = await db.execute(
		`SELECT idcategoria, nome, icone, ordem
     FROM categorias
     WHERE ATIVO = 1
     ORDER BY ordem`
	)

	return rows
}
