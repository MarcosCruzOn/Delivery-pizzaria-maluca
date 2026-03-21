import { Router } from 'express'
import {
	listOpcionais,
	listOpcionalItens,
} from '../controllers/admin-opcionais.controllers.js'

const router = Router()

router.get('/opcionais', listOpcionais)
router.get('/opcionais/:id/itens', listOpcionalItens)

export default router
