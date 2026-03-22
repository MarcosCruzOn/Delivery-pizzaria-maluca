import { Router } from 'express'
import {
	createProduct,
	listProducts,
	deleteProduct,
	updateProduct,
	getProductOpcionais,
} from '../controllers/admin-products.controllers.js'

const router = Router()

router.post('/', createProduct)
router.get('/', listProducts)
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)
router.get('/:id/opcionais', getProductOpcionais)

export default router
