import { Router } from 'express'
import { getAbout } from '../controllers/about.controllers.js'

export const aboutRoutes = Router()
aboutRoutes.get('/', getAbout)
