import { Request, Response } from 'express'
import { obterResumoDashboardNoBanco } from '../services/home.services.ts.js'

export async function getDashboardController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const resumo = await obterResumoDashboardNoBanco()
		return res.json(resumo)
	} catch (error) {
		console.error('Erro ao buscar resumo do dashboard:', error)
		return res.status(500).json({ erro: 'Erro ao carregar dados do dashboard' })
	}
}
