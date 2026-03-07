import { Router } from 'express'
import { getCategorias, getProdutos } from '../controllers/menu.controllers.js'

const router = Router()

router.get('/categorias', getCategorias)
router.get('/produtos', getProdutos)

export default router
