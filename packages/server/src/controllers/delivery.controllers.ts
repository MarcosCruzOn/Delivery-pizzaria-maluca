import { Request, Response } from 'express'
import {
	listarTiposEntregaNoBanco,
	atualizarTipoEntregaNoBanco,
} from '../services/delivery.services.js'

export async function listarTiposEntregaController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		return res.json(await listarTiposEntregaNoBanco())
	} catch (error) {
		return res.status(500).json({ erro: 'Erro ao listar tipos de entrega' })
	}
}

export async function atualizarTipoEntregaController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		await atualizarTipoEntregaNoBanco(Number(req.params.id), req.body)
		return res.json({ mensagem: 'Configuração atualizada com sucesso!' })
	} catch (error) {
		return res.status(500).json({ erro: 'Erro ao atualizar tipo de entrega' })
	}
}
