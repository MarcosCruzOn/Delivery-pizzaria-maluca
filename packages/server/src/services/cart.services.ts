import type { CartItem } from '../types/cart.js'
import { AppError } from '../errors/AppError.js'
import { getMenuItemById } from './menu.services.js'

let cart: CartItem[] = []

export function getCart(): CartItem[] {
	return cart
}

export function addToCart(productId: number, quantity: number): CartItem {
	const product = getMenuItemById(productId)
	if (!product) throw new AppError('Produto não encontrado', 404)

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
	if (!item) throw new AppError('Item do carrinho não encontrado', 404)

	item.quantity = quantity
	return item
}

export function removeCartItem(id: number): void {
	const before = cart.length
	cart = cart.filter((ci) => ci.id !== id)
	if (cart.length === before)
		throw new AppError('Item do carrinho não encontrado', 404)
}

export function clearCart(): void {
	cart = []
}
