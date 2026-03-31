import { Request, Response } from 'express'
import {
	listarPagamentosNoBanco,
	togglePagamentoNoBanco,
} from '../services/pagamentos.services.js'

export async function listarPagamentosController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const pagamentos = await listarPagamentosNoBanco()
		return res.json(pagamentos)
	} catch (error) {
		return res.status(500).json({ erro: 'Erro ao listar pagamentos' })
	}
}

export async function togglePagamentoController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { id } = req.params
		const { ativo } = req.body

		await togglePagamentoNoBanco(Number(id), ativo ? 1 : 0)
		return res.json({ mensagem: 'Status de pagamento atualizado!' })
	} catch (error) {
		return res.status(500).json({ erro: 'Erro ao atualizar pagamento' })
	}
}
