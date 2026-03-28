import { Router } from 'express'
import {
	getCompanyController,
	updateCompanyController,
	updateCompanyLogoController,
} from '../controllers/company.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const companyRoutes = Router()
companyRoutes.get(
	'/admin/company/:idempresa',
	verificarToken,
	getCompanyController
)
companyRoutes.put(
	'/admin/company/:idempresa',
	verificarToken,
	updateCompanyController
)
companyRoutes.patch(
	'/admin/company/:idempresa/logo',
	verificarToken,
	updateCompanyLogoController
)

export default companyRoutes
