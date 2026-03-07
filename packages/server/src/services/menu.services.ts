import { db } from '../database/connection.js'
import { SQL_LIST_CATEGORIAS } from '../database/queries/categories.queries.js'
import { SQL_LIST_PRODUTOS } from '../database/queries/products.queries.js'
import type { Categoria, MenuCategoria, Produto } from '../types/menu.js'

export async function listCategorias(): Promise<Categoria[]> {
	const [rows] = await db.query(SQL_LIST_CATEGORIAS)
	return rows as Categoria[]
}

export async function listProdutos(): Promise<Produto[]> {
	const [rows] = await db.query(SQL_LIST_PRODUTOS)
	return rows as Produto[]
}

export async function listMenu(): Promise<MenuCategoria[]> {
	const categorias = await listCategorias()
	const produtos = await listProdutos()

	const menu: MenuCategoria[] = categorias.map((categoria) => {
		const produtosDaCategoria = produtos.filter(
			(produto) => produto.categoria_id === categoria.id
		)

		return {
			id: categoria.id,
			nome: categoria.nome,
			produtos: produtosDaCategoria,
		}
	})

	return menu
}
