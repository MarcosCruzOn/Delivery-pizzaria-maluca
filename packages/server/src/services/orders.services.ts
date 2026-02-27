import type { Order } from '../types/order.js'
import { clearCart, getCart } from './cart.services.js'

let orders: Order[] = []
let orderId = 1

export function createOrderFromCart(): Order {
	const cart = getCart()
	if (cart.length === 0) {
		const err = new Error('Carrinho vazio')
		// @ts-ignore
		err.statusCode = 400
		throw err
	}

	const order: Order = {
		id: orderId++,
		items: cart,
		status: 'preparo',
		createdAt: new Date().toISOString(),
	}

	orders.push(order)
	clearCart()
	return order
}

export function getOrderById(id: number): Order | undefined {
	return orders.find((o) => o.id === id)
}
