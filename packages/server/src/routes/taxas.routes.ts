import { Router } from 'express'
import {
	listarTaxasController,
	atualizarTaxaController,
	addFaixaController,
	removeFaixaController,
} from '../controllers/taxas.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const taxasRoutes = Router()

taxasRoutes.get('/admin/taxas', verificarToken, listarTaxasController)
// Agora a rota de ativar usa o /tipo/:idTipo
taxasRoutes.put('/admin/taxas/tipo/:idTipo', verificarToken, atualizarTaxaController)

// Rotas do mini-CRUD de distância
taxasRoutes.post('/admin/taxas/distancia', verificarToken, addFaixaController)
taxasRoutes.delete('/admin/taxas/distancia/:id', verificarToken, removeFaixaController)

export default taxasRoutes
