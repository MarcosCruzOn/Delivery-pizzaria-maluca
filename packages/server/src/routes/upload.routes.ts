import { Router } from 'express'
import { uploadMiddleware } from '../middlewares/upload.js'
import { verificarToken } from '../middlewares/auth.js'
import { uploadImage } from '../controllers/upload.controllers.js'

const uploadRoutes = Router()

// Olha como fica elegante! Passamos pelo segurança, pelo multer, e chamamos o seu controller.
uploadRoutes.post('/', verificarToken, uploadMiddleware.single('file'), uploadImage)

export default uploadRoutes
