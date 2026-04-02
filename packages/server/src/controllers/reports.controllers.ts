import { Request, Response } from 'express'
import { obterDadosRelatorio } from '../services/reports.services.js'

export async function getReportsController(req: Request, res: Response): Promise<Response | void> {
	try {
		// O frontend vai mandar as datas pela URL: /admin/reports?inicio=2024-03-01&fim=2024-03-31
		const { inicio, fim } = req.query

		if (!inicio || !fim) {
			return res.status(400).json({ erro: 'Data de início e fim são obrigatórias.' })
		}

		const dados = await obterDadosRelatorio(String(inicio), String(fim))
		return res.json(dados)
	} catch (error) {
		console.error('Erro ao gerar relatório:', error)
		return res.status(500).json({ erro: 'Erro interno ao gerar o relatório.' })
	}
}
