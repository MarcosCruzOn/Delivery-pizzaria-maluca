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
		// validação simples ainda fica aqui
		return res.status(400).json({ error: 'productId é obrigatório' })
	}

	const q = Number(quantity ?? 1)
	if (!Number.isFinite(q) || q <= 0) {
		return res.status(400).json({ error: 'quantity deve ser > 0' })
	}

	const item = addToCart(productId, q)
	res.status(201).json(item)
}

export function updateCartItem(req: Request, res: Response) {
	const id = Number(req.params.id)
	const { quantity } = req.body as { quantity?: number }

	const q = Number(quantity)
	if (!Number.isFinite(q) || q <= 0) {
		return res.status(400).json({ error: 'quantity deve ser > 0' })
	}

	const item = updateCartItemQuantity(id, q)
	res.json(item)
}

export function deleteCartItem(req: Request, res: Response) {
	const id = Number(req.params.id)
	removeCartItem(id)
	res.status(204).send()
}
