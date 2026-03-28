import { Request, Response } from 'express'
import {
	criarPedidoCompletoNoBanco,
	listarPedidosDoBanco,
	atualizarStatusDoPedido,
} from '../services/orders.services.js'

export async function createOrderController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const dadosDoPedido = req.body

		// Uma validação básica para garantir que o cliente mandou o carrinho com itens
		if (!dadosDoPedido.itens || dadosDoPedido.itens.length === 0) {
			return res
				.status(400)
				.json({ erro: 'O pedido não pode estar vazio!' })
		}

		if (!dadosDoPedido.nomecliente || !dadosDoPedido.telefonecliente) {
			return res
				.status(400)
				.json({ erro: 'Nome e telefone do cliente são obrigatórios!' })
		}

		const idNovoPedido = await criarPedidoCompletoNoBanco(dadosDoPedido)

		return res.status(201).json({
			mensagem: 'Pedido realizado com sucesso! 🛵',
			idpedido: idNovoPedido,
		})
	} catch (erro) {
		console.error('Erro crítico ao criar pedido:', erro)
		return res.status(500).json({
			erro: 'Erro interno ao processar o seu pedido. Tente novamente.',
		})
	}
}

// Controller para listar os pedidos
export async function listOrdersController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const pedidos = await listarPedidosDoBanco()
		return res.json(pedidos)
	} catch (erro) {
		console.error('Erro ao listar pedidos:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao listar os pedidos.' })
	}
}

// Controller para mudar o status do pedido
export async function updateOrderStatusController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		// Pegamos o ID do pedido que está na URL (ex: /admin/orders/5/status)
		const { idpedido } = req.params

		// Pegamos o novo status que o admin quer colocar
		const { idpedidostatus } = req.body

		if (!idpedido || !idpedidostatus) {
			return res
				.status(400)
				.json({
					erro: 'Envie o id do pedido na URL e o novo idpedidostatus no corpo!',
				})
		}

		await atualizarStatusDoPedido(Number(idpedido), Number(idpedidostatus))

		return res.json({
			mensagem: 'Status do pedido atualizado com sucesso! 🔄',
		})
	} catch (erro) {
		console.error('Erro ao atualizar status do pedido:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao atualizar o status.' })
	}
}
