import { Request, Response } from 'express'
import {
	listarTaxasNoBanco,
	salvarTaxaAtivaNoBanco,
	adicionarFaixaDistanciaNoBanco,
	removerFaixaDistanciaNoBanco,
} from '../services/taxas.services.js'

export async function listarTaxasController(req: Request, res: Response): Promise<Response | void> {
	try {
		return res.json(await listarTaxasNoBanco())
	} catch (error) {
		return res.status(500).json({ erro: 'Erro ao listar taxas' })
	}
}

export async function atualizarTaxaController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idTipo } = req.params // Agora recebemos o TIPO (1, 2 ou 3)
		await salvarTaxaAtivaNoBanco(Number(idTipo), Number(req.body.valor) || 0)
		return res.json({ mensagem: 'Modo de taxa atualizado!' })
	} catch (error) {
		return res.status(500).json({ erro: 'Erro ao atualizar a taxa' })
	}
}

export async function addFaixaController(req: Request, res: Response): Promise<Response | void> {
	try {
		await adicionarFaixaDistanciaNoBanco(Number(req.body.distancia), Number(req.body.valor))
		return res.json({ mensagem: 'Faixa adicionada!' })
	} catch (error) {
		return res.status(500).json({ erro: 'Erro ao adicionar faixa' })
	}
}

export async function removeFaixaController(req: Request, res: Response): Promise<Response | void> {
	try {
		await removerFaixaDistanciaNoBanco(Number(req.params.id))
		return res.json({ mensagem: 'Faixa removida!' })
	} catch (error) {
		return res.status(500).json({ erro: 'Erro ao remover faixa' })
	}
}
