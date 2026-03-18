import { Request, Response } from 'express'
import {
	getCompanyService,
	updateCompanyAboutService,
} from '../services/admin-company.services.js'
import { updateCompanyAddressService } from '../services/admin-company.services.js'

export async function getCompany(req: Request, res: Response) {
	try {
		const data = await getCompanyService()
		return res.json(data)
	} catch {
		return res.status(500).json({ error: 'Erro ao buscar empresa' })
	}
}

export async function updateCompanyAbout(req: Request, res: Response) {
	try {
		await updateCompanyAboutService(req.body)
		console.log(req.body)
		return res.json({ message: 'Atualizado com sucesso' })
	} catch (e: any) {
		return res.status(400).json({ error: e.message })
	}
}

export async function updateCompanyAddress(req: Request, res: Response) {
	try {
		await updateCompanyAddressService(req.body)

		return res.json({ message: 'Endereço atualizado com sucesso' })
	} catch (e: any) {
		return res.status(400).json({ error: e.message })
	}
}
