import { Router } from 'express'
import {
	addCartItem,
	deleteCartItem,
	getCartHandler,
	updateCartItem,
} from '../controllers/carts.controllers.js'

export const cartRoutes = Router()
cartRoutes.get('/', getCartHandler)
cartRoutes.post('/items', addCartItem)
cartRoutes.patch('/items/:id', updateCartItem)
cartRoutes.delete('/items/:id', deleteCartItem)
