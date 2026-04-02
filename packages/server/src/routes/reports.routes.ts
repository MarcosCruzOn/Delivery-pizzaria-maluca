import { Router } from 'express'
import {
	getReportsController,
	getOrderHistoryController,
} from '../controllers/reports.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const reportsRoutes = Router()

// Rota de relatórios com as datas dinâmicas
reportsRoutes.get('/admin/reports', verificarToken, getReportsController)
reportsRoutes.get('/admin/reports/history', verificarToken, getOrderHistoryController)

export default reportsRoutes
