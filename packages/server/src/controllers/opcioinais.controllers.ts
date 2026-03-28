import { Request, Response } from 'express'
import {
	criarOpcionalNoBanco,
	listarOpcionaisDoBanco,
	criarItemDoOpcionalNoBanco,
	listarItensDoOpcional,
} from '../services/opcionais.services.js'

// Controller para Criar o Opcional
export async function createOpcionalController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { nome, tiposimples, minimo, maximo } = req.body

		// Validação básica: se faltar o nome, a gente barra.
		// (minimo, maximo e tiposimples podem ser 0, então validamos se eles não são "undefined")
		if (
			!nome ||
			tiposimples === undefined ||
			minimo === undefined ||
			maximo === undefined
		) {
			return res
				.status(400)
				.json({ erro: 'Preencha nome, tiposimples, minimo e maximo!' })
		}

		await criarOpcionalNoBanco(nome, tiposimples, minimo, maximo)

		return res
			.status(201)
			.json({ mensagem: 'Grupo de Opcionais criado com sucesso! 📦' })
	} catch (erro) {
		console.error('Erro ao criar opcional:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao criar o grupo de opcionais.' })
	}
}

// Controller para Listar os Opcionais
export async function listOpcionaisController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const opcionais = await listarOpcionaisDoBanco()
		return res.json(opcionais)
	} catch (erro) {
		console.error('Erro ao listar opcionais:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao listar os opcionais.' })
	}
}

// NOVO: Controller para criar um Item (Ex: Catupiry)
export async function createOpcionalItemController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		// Pegamos o ID da caixa (opcional) que vem na URL (ex: /admin/opcionais/1/itens)
		const { idopcional } = req.params

		// Pegamos o nome e o valor que vêm no corpo da requisição
		const { nome, valor } = req.body

		if (!idopcional || !nome || valor === undefined) {
			return res
				.status(400)
				.json({ erro: 'Preencha o nome e o valor do item!' })
		}

		await criarItemDoOpcionalNoBanco(Number(idopcional), nome, valor)

		return res
			.status(201)
			.json({ mensagem: 'Item adicionado ao grupo com sucesso! 🧀' })
	} catch (erro) {
		console.error('Erro ao criar item do opcional:', erro)
		return res.status(500).json({ erro: 'Erro interno ao criar o item.' })
	}
}

// NOVO: Controller para listar os Itens de um grupo
export async function listOpcionalItemsController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idopcional } = req.params
		const itens = await listarItensDoOpcional(Number(idopcional))
		return res.json(itens)
	} catch (erro) {
		console.error('Erro ao listar itens:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao listar os itens.' })
	}
}
