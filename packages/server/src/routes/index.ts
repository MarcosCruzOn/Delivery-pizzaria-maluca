import { Router } from 'express'

// Importa todas as rotas modulares
import authRoutes from './auth.routes.js'
import categoryRoutes from './categories.routes.js'
import productRoutes from './products.routes.js'
import opcionaisRoutes from './opcionais.routes.js'
import orderRoutes from './orders.routes.js'
import companyRoutes from './company.routes.js'
import settingsRoutes from './settings.routes.js'
import pagamentosRoutes from './pagamentos.routes.js'
import taxasRoutes from './taxas.routes.js'
// Se o seu upload.routes for exportado como default, use a linha abaixo:
// import uploadRoutes from './upload.routes.js';

const routes = Router()

// Conecta todas as rotas no sistema principal
routes.use(authRoutes)
routes.use(categoryRoutes)
routes.use(productRoutes)
routes.use(opcionaisRoutes)
routes.use(orderRoutes)
routes.use(companyRoutes)
routes.use(settingsRoutes)
routes.use(pagamentosRoutes)
routes.use(taxasRoutes)

export default routes
