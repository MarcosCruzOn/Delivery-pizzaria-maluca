import { Request, Response } from 'express'
import { listarTaxasNoBanco, salvarTaxaAtivaNoBanco } from '../services/taxas.services.js'

export async function listarTaxasController(req: Request, res: Response): Promise<Response | void> {
	try {
		const taxas = await listarTaxasNoBanco()
		return res.json(taxas)
	} catch (error) {
		return res.status(500).json({ erro: 'Erro ao listar taxas' })
	}
}

export async function atualizarTaxaController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { id } = req.params
		const { valor } = req.body // Pega o valor novo (ex: 15.00)

		await salvarTaxaAtivaNoBanco(Number(id), Number(valor) || 0)
		return res.json({ mensagem: 'Taxa de entrega atualizada com sucesso!' })
	} catch (error) {
		return res.status(500).json({ erro: 'Erro ao atualizar a taxa de entrega' })
	}
}
