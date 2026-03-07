import type { Request, Response } from 'express'
import {
	listCategorias,
	listMenu,
	listProdutos,
} from '../services/menu.services.js'

export async function getCategorias(_req: Request, res: Response) {
	const categorias = await listCategorias()
	res.json(categorias)
}

export async function getProdutos(_req: Request, res: Response) {
	const produtos = await listProdutos()
	res.json(produtos)
}

export async function getMenu(_req: Request, res: Response) {
	const menu = await listMenu()
	res.json(menu)
}
