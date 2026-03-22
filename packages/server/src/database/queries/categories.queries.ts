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
	// 🔥 1. pegar produtos da categoria
	const [produtos]: any = await db.query(
		'SELECT idproduto FROM produtos WHERE idcategoria = ?',
		[idcategoria]
	)

	const produtoIds = produtos.map((p: any) => p.idproduto)

	// 🔥 2. deletar opcionais dos produtos
	if (produtoIds.length > 0) {
		await db.query(
			`DELETE FROM produtoopcional 
			 WHERE idproduto IN (${produtoIds.map(() => '?').join(',')})`,
			produtoIds
		)
	}

	// 🔥 3. deletar produtos
	await db.query('DELETE FROM produtos WHERE idcategoria = ?', [idcategoria])

	// 🔥 4. deletar categoria
	const [result] = await db.query(
		'DELETE FROM categorias WHERE idcategoria = ?',
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
