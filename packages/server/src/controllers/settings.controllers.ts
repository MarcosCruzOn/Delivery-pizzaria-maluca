import { Request, Response } from 'express'
import {
	criarPagamentoNoBanco,
	listarPagamentosDoBanco,
	criarTipoEntregaNoBanco,
	listarTiposEntregaDoBanco,
	criarStatusPedidoNoBanco,
	listarStatusPedidoDoBanco,
} from '../services/settings.services.js'

// --- CONTROLLERS DE PAGAMENTO ---
export async function createPaymentController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { nome } = req.body
		if (!nome)
			return res
				.status(400)
				.json({ erro: 'O nome do pagamento é obrigatório!' })

		await criarPagamentoNoBanco(nome)
		return res
			.status(201)
			.json({ mensagem: 'Método de pagamento criado com sucesso! 💳' })
	} catch (erro) {
		return res
			.status(500)
			.json({ erro: 'Erro interno ao criar pagamento.' })
	}
}

export async function listPaymentsController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const pagamentos = await listarPagamentosDoBanco()
		return res.json(pagamentos)
	} catch (erro) {
		return res
			.status(500)
			.json({ erro: 'Erro interno ao listar pagamentos.' })
	}
}

// --- CONTROLLERS DE ENTREGA ---
export async function createDeliveryController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { nome, tempominimo, tempomaximo } = req.body
		if (!nome)
			return res
				.status(400)
				.json({ erro: 'O nome do tipo de entrega é obrigatório!' })

		await criarTipoEntregaNoBanco(nome, tempominimo || 0, tempomaximo || 0)
		return res
			.status(201)
			.json({ mensagem: 'Tipo de entrega criado com sucesso! 🛵' })
	} catch (erro) {
		return res
			.status(500)
			.json({ erro: 'Erro interno ao criar tipo de entrega.' })
	}
}

export async function listDeliveriesController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const entregas = await listarTiposEntregaDoBanco()
		return res.json(entregas)
	} catch (erro) {
		return res
			.status(500)
			.json({ erro: 'Erro interno ao listar tipos de entrega.' })
	}
}

// --- CONTROLLERS DE STATUS DO PEDIDO ---
export async function createOrderStatusController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { descricao } = req.body
		if (!descricao)
			return res
				.status(400)
				.json({ erro: 'A descrição do status é obrigatória!' })

		await criarStatusPedidoNoBanco(descricao)
		return res
			.status(201)
			.json({ mensagem: 'Status criado com sucesso! 📋' })
	} catch (erro) {
		return res.status(500).json({ erro: 'Erro interno ao criar status.' })
	}
}

export async function listOrderStatusController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const status = await listarStatusPedidoDoBanco()
		return res.json(status)
	} catch (erro) {
		return res.status(500).json({ erro: 'Erro interno ao listar status.' })
	}
}
