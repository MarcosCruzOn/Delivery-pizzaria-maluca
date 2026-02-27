import type { CartItem } from '../types/cart.js'
import { getMenuItemById } from './menu.services.js'

let cart: CartItem[] = []

export function getCart(): CartItem[] {
	return cart
}

export function addToCart(productId: number, quantity: number): CartItem {
	const product = getMenuItemById(productId)
	if (!product) {
		const err = new Error('Produto não encontrado')
		// @ts-ignore
		err.statusCode = 404
		throw err
	}

	const existing = cart.find((ci) => ci.productId === productId)
	if (existing) {
		existing.quantity += quantity
		return existing
	}

	const newItem: CartItem = {
		id: productId, // simplificação: id do item = productId
		productId,
		name: product.name,
		price: product.price,
		quantity,
	}

	cart.push(newItem)
	return newItem
}

export function updateCartItemQuantity(id: number, quantity: number): CartItem {
	const item = cart.find((ci) => ci.id === id)
	if (!item) {
		const err = new Error('Item do carrinho não encontrado')
		// @ts-ignore
		err.statusCode = 404
		throw err
	}

	item.quantity = quantity
	return item
}

export function removeCartItem(id: number): void {
	const before = cart.length
	cart = cart.filter((ci) => ci.id !== id)

	if (cart.length === before) {
		const err = new Error('Item do carrinho não encontrado')
		// @ts-ignore
		err.statusCode = 404
		throw err
	}
}

export function clearCart(): void {
	cart = []
}
