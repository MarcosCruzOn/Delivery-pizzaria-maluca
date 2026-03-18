import { Request, Response } from 'express'
import {
	createHorarioService,
	listHorarioService,
	deleteHorarioService,
} from '../services/admin-horario.services.js'

export async function createHorario(req: Request, res: Response) {
	try {
		await createHorarioService(req.body)
		return res.json({ message: 'Horário criado com sucesso' })
	} catch (e: any) {
		return res.status(400).json({ error: e.message })
	}
}

export async function listHorario(req: Request, res: Response) {
	const data = await listHorarioService()
	return res.json(data)
}

export async function deleteHorario(req: Request, res: Response) {
	const id = Number(req.params.id)

	await deleteHorarioService(id)

	return res.json({ message: 'Removido com sucesso' })
}
