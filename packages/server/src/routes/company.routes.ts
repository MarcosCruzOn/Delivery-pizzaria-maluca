import { Router } from 'express'
import {
	getCompanyController,
	updateCompanyController,
	updateCompanyLogoController,
} from '../controllers/company.controllers.js'

import {
	createHorarioController,
	listHorariosController,
} from '../controllers/horario.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const companyRoutes = Router()
companyRoutes.get('/admin/company/:idempresa', verificarToken, getCompanyController)
companyRoutes.put('/admin/company/:idempresa', verificarToken, updateCompanyController)
companyRoutes.patch('/admin/company/:idempresa/logo', verificarToken, updateCompanyLogoController)

// Rotas de Horário de Funcionamento
companyRoutes.post('/admin/horarios', verificarToken, createHorarioController)
companyRoutes.get('/admin/horarios', verificarToken, listHorariosController)
companyRoutes.get('/horarios', listHorariosController) // Rota Pública

export default companyRoutes
