import { Router } from 'express'
import {
	createProductController,
	listProductsController,
	updateProductImageController,
	linkOpcionalController,
	listProductOpcionaisController,
	updateProductController,
	deleteProductController,
} from '../controllers/products.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const productRoutes = Router()
productRoutes.post('/admin/products', verificarToken, createProductController)
productRoutes.get('/admin/products', listProductsController)
productRoutes.patch(
	'/admin/products/:idproduto/imagem',
	verificarToken,
	updateProductImageController
)
productRoutes.post('/admin/products/:idproduto/opcionais', verificarToken, linkOpcionalController)
productRoutes.get('/admin/products/:idproduto/opcionais', listProductOpcionaisController)

// NOVO: Atualizar e Deletar
productRoutes.put('/admin/products/:idproduto', verificarToken, updateProductController)
productRoutes.delete('/admin/products/:idproduto', verificarToken, deleteProductController)

export default productRoutes
