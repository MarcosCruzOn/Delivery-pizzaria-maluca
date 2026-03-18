import { Router } from 'express'
import {
	createHorario,
	listHorario,
	deleteHorario,
} from '../controllers/admin-horario.controllers.js'

const router = Router()

router.post('/company/horario', createHorario)
router.get('/company/horario', listHorario)
router.delete('/company/horario/:id', deleteHorario)

export default router
