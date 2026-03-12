import { db } from '../connection.js'
import { CreateProductDTO } from '../../types/menu.js'

export async function createProductQuery(data: CreateProductDTO) {
	const { idcategoria, nome, descricao, valor, imagem } = data

	const [result] = await db.execute(
		`INSERT INTO produtos 
		(idcategoria, nome, descricao, valor, imagem, ordem, ATIVO)
		VALUES (?, ?, ?, ?, ?, 0, 1)`,
		[idcategoria, nome, descricao || null, valor, imagem || null]
	)

	return result
}

export async function listProductsQuery() {
	const [rows] = await db.execute(`
		SELECT 
			idproduto,
			idcategoria,
			nome,
			descricao,
			valor,
			imagem
		FROM produtos
		WHERE ATIVO = 1
		ORDER BY ordem
	`)

	return rows
}

export async function deleteProductQuery(id: number) {
	const [result] = await db.execute(
		`
		UPDATE produtos
		SET ATIVO = 0
		WHERE idproduto = ?
	`,
		[id]
	)

	return result
}
