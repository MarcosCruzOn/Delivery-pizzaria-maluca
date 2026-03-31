import { Router } from 'express'
import { listarTaxasController, atualizarTaxaController } from '../controllers/taxas.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const taxasRoutes = Router()

taxasRoutes.get('/admin/taxas', verificarToken, listarTaxasController)
taxasRoutes.put('/admin/taxas/:id', verificarToken, atualizarTaxaController)

export default taxasRoutes
