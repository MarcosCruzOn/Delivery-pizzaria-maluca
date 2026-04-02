import { Router } from 'express'
import { getReportsController } from '../controllers/reports.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const reportsRoutes = Router()

// Rota de relatórios com as datas dinâmicas
reportsRoutes.get('/admin/reports', verificarToken, getReportsController)

export default reportsRoutes
