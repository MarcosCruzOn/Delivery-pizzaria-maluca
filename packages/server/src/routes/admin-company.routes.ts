import { Router } from 'express'
import {
	getCompany,
	updateCompanyAbout,
} from '../controllers/admin-company.controllers.js'

const router = Router()

router.get('/company', getCompany)
router.put('/company/about', updateCompanyAbout)

export default router
