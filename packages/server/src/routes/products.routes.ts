import { Router } from 'express'
import {
	createProductController,
	listProductsController,
	updateProductImageController,
	linkOpcionalController,
	listProductOpcionaisController,
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
productRoutes.post(
	'/admin/products/:idproduto/opcionais',
	verificarToken,
	linkOpcionalController
)
productRoutes.get(
	'/admin/products/:idproduto/opcionais',
	listProductOpcionaisController
)

export default productRoutes
