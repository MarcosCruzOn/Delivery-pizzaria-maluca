import { Router } from 'express'
import { getMenu, getMenuItem } from '../controllers/menu.controllers.js'

export const menuRoutes = Router()
menuRoutes.get('/', getMenu)
menuRoutes.get('/:id', getMenuItem)
