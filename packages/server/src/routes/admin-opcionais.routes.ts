import { Router } from 'express'
import {
	listOpcionais,
	listOpcionalItens,
	createOpcional,
	createOpcionalItem,
} from '../controllers/admin-opcionais.controllers.js'

const router = Router()

router.get('/opcionais', listOpcionais)
router.get('/opcionais/:id/itens', listOpcionalItens)
router.post('/opcionais/itens', createOpcionalItem)

export default router
