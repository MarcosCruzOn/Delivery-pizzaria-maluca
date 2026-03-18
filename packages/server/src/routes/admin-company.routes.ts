import { Router } from 'express'
import {
	getCompany,
	updateCompanyAbout,
	updateCompanyAddress,
} from '../controllers/admin-company.controllers.js'

const router = Router()

router.get('/company', getCompany)
router.put('/company/about', updateCompanyAbout)
router.put('/company/address', updateCompanyAddress)

export default router
