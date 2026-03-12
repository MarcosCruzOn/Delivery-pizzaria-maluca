import { Router } from 'express'
import {
	createProduct,
	listProducts,
	deleteProduct,
	updateProduct,
} from '../controllers/admin-products.controllers.js'

const router = Router()

router.post('/', createProduct)
router.get('/', listProducts)
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)

export default router
