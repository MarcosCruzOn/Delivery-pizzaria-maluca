import type { Request, Response } from 'express'
import {
	createOrderFromCart,
	getOrderById,
} from '../services/orders.services.js'

export function createOrder(_req: Request, res: Response) {
	try {
		const order = createOrderFromCart()
		res.status(201).json(order)
	} catch (e: any) {
		const status = e?.statusCode ?? 500
		res.status(status).json({ error: e?.message ?? 'Erro interno' })
	}
}

export function getOrder(req: Request, res: Response) {
	const id = Number(req.params.id)
	const order = getOrderById(id)

	if (!order) return res.status(404).json({ error: 'Pedido não encontrado' })
	res.json(order)
}
