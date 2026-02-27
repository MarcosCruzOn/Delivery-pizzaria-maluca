import type { Request, Response } from 'express'
import { getMenuItemById, listMenu } from '../services/menu.services.js'

export function getMenu(_req: Request, res: Response) {
	res.json(listMenu())
}

export function getMenuItem(req: Request, res: Response) {
	const id = Number(req.params.id)
	const item = getMenuItemById(id)

	if (!item) return res.status(404).json({ error: 'Produto não encontrado' })
	res.json(item)
}
