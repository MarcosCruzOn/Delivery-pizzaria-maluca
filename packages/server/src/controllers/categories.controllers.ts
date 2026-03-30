import { Request, Response } from 'express'
import {
	criarCategoriaNoBanco,
	listarCategoriasDoBanco,
	deletarCategoriaNoBanco,
} from '../services/categories.services.js'

// Controller para o POST (Criar)
export async function createCategoryController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		// Pegamos os dados que você enviou no corpo (body) do arquivo .http
		const { nome, icone, ordem } = req.body

		// Uma validação simples para ver se o admin não esqueceu de preencher nada
		if (!nome || !icone || ordem === undefined) {
			return res
				.status(400)
				.json({ erro: 'Preencha nome, icone e ordem da categoria!' })
		}

		await criarCategoriaNoBanco(nome, icone, ordem)

		return res
			.status(201)
			.json({ mensagem: 'Categoria criada com sucesso! 🍕' })
	} catch (erro) {
		console.error('Erro ao criar categoria:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao criar a categoria.' })
	}
}

// Controller para o GET (Listar)
export async function listCategoriesController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const categorias = await listarCategoriasDoBanco()

		// Devolvemos a lista de categorias em formato JSON
		return res.json(categorias)
	} catch (erro) {
		console.error('Erro ao listar categorias:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao listar as categorias.' })
	}
}

export async function deleteCategoryController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { id } = req.params

		await deletarCategoriaNoBanco(Number(id))

		return res.json({
			mensagem: 'Categoria e produtos apagados com sucesso! 🗑️',
		})
	} catch (erro: any) {
		console.error('Erro ao deletar categoria:', erro)
		// Se bater na regra do pedido fechado, avisamos elegantemente
		return res.status(500).json({
			erro: 'Não foi possível apagar. Provavelmente existem pedidos já finalizados com produtos desta categoria!',
		})
	}
}
