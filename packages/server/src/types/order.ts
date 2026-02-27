import type { CartItem } from './cart.js'

export type OrderStatus = 'preparo' | 'saiu_para_entrega' | 'entregue'

export type Order = {
	id: number
	items: CartItem[]
	status: OrderStatus
	createdAt: string
}
