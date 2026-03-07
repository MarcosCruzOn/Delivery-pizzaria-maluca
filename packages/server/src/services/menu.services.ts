import { db } from '../database/connection.js'

export async function listCategorias() {
	const [rows] = await db.query('SELECT * FROM categorias')
	return rows
}

export async function listProdutos() {
	const [rows] = await db.query('SELECT * FROM produtos')
	return rows
}
