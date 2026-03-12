import { Router } from 'express'
import { createProduct } from '../controllers/admin-products.controllers.js'

const router = Router()

router.post('/', createProduct)

export default router
