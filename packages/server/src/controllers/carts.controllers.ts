import type { Request, Response } from 'express'
import {
	addToCart,
	getCart,
	removeCartItem,
	updateCartItemQuantity,
} from '../services/cart.services.js'

export function getCartHandler(_req: Request, res: Response) {
	res.json(getCart())
}

export function addCartItem(req: Request, res: Response) {
	const { productId, quantity } = req.body as {
		productId?: number
		quantity?: number
	}

	if (!productId || !Number.isFinite(productId)) {
		return res.status(400).json({ error: 'productId é obrigatório' })
	}

	const q = Number(quantity ?? 1)
	if (!Number.isFinite(q) || q <= 0) {
		return res.status(400).json({ error: 'quantity deve ser > 0' })
	}

	try {
		const item = addToCart(productId, q)
		// se já existia, foi update (200). se não existia, foi create (201).
		// Aqui vamos decidir pelo retorno simples:
		return res.status(201).json(item)
	} catch (e: any) {
		const status = e?.statusCode ?? 500
		return res.status(status).json({ error: e?.message ?? 'Erro interno' })
	}
}

export function updateCartItem(req: Request, res: Response) {
	const id = Number(req.params.id)
	const { quantity } = req.body as { quantity?: number }

	const q = Number(quantity)
	if (!Number.isFinite(q) || q <= 0) {
		return res.status(400).json({ error: 'quantity deve ser > 0' })
	}

	try {
		const item = updateCartItemQuantity(id, q)
		res.json(item)
	} catch (e: any) {
		const status = e?.statusCode ?? 500
		res.status(status).json({ error: e?.message ?? 'Erro interno' })
	}
}

export function deleteCartItem(req: Request, res: Response) {
	const id = Number(req.params.id)

	try {
		removeCartItem(id)
		res.status(204).send()
	} catch (e: any) {
		const status = e?.statusCode ?? 500
		res.status(status).json({ error: e?.message ?? 'Erro interno' })
	}
}
