import { Router } from 'express'
import { createProduct } from '../controllers/admin-products.controllers.js'
import { listProducts } from '../controllers/admin-products.controllers.js'
import { deleteProduct } from '../controllers/admin-products.controllers.js'

const router = Router()

router.post('/', createProduct)
router.get('/', listProducts)
router.delete('/:id', deleteProduct)
export default router
