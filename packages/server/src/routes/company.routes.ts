import { Router } from 'express'
import {
	getCompanyController,
	updateCompanyController,
	updateCompanyLogoController,
	getPublicCompanyController,
	createHorarioController,
	listHorariosController,
} from '../controllers/company.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const companyRoutes = Router()

// ROTAS PROTEGIDAS DA EMPRESA (Admin)
companyRoutes.get('/admin/company/:idempresa', verificarToken, getCompanyController)
companyRoutes.put('/admin/company/:idempresa', verificarToken, updateCompanyController)
companyRoutes.patch('/admin/company/:idempresa/logo', verificarToken, updateCompanyLogoController)

// ROTAS PROTEGIDAS DE HORÁRIO (Admin)
companyRoutes.post('/admin/horarios', verificarToken, createHorarioController)
companyRoutes.get('/admin/horarios', verificarToken, listHorariosController)

// ==========================================
// ROTAS PÚBLICAS (Para o App do Cliente)
// ==========================================

// CORREÇÃO: Agora aponta para o PublicController correto!
companyRoutes.get('/company', getPublicCompanyController)
companyRoutes.get('/horarios', listHorariosController)

export default companyRoutes
