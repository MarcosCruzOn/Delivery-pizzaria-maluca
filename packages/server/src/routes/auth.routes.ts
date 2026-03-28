import { Router } from 'express'
import { loginController } from '../controllers/auth.controllers.js'

const authRoutes = Router()
authRoutes.post('/login', loginController)

export default authRoutes
