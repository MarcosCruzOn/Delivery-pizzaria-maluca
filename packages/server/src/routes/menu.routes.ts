import { Router } from 'express'
import {
	getCategorias,
	getMenu,
	getProdutos,
} from '../controllers/menu.controllers.js'

const router = Router()

router.get('/', getMenu)
router.get('/categorias', getCategorias)
router.get('/produtos', getProdutos)

export default router
