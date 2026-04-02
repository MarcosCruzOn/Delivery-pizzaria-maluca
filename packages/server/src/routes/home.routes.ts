import { Router } from 'express'
import { getDashboardController } from '../controllers/home.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const dashboardRoutes = Router()

// Rota exclusiva para os números da tela inicial
dashboardRoutes.get('/admin/dashboard', verificarToken, getDashboardController)

export default dashboardRoutes
