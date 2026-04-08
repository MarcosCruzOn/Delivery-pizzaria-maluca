import { Request, Response } from 'express'
import {
	criarProdutoNoBanco,
	listarProdutosDoBanco,
	atualizarImagemDoProduto,
	vincularOpcionalAoProduto,
	listarOpcionaisDoProduto,
	atualizarProdutoNoBanco,
	deletarProdutoNoBanco,
	listarProdutosPorCategoriaDoBanco,
	buscarProdutoPorIdNoBanco,
} from '../services/products.services.js'

// Controller para o POST (Criar Produto)
export async function createProductController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idcategoria, nome, descricao, valor, imagem, ordem } = req.body

		// 👇 TRAVA DE SEGURANÇA DA IMAGEM 👇
		let imagemFormatada = imagem
		if (imagemFormatada && !imagemFormatada.startsWith('/uploads/')) {
			imagemFormatada = `/uploads/${imagemFormatada}`
		}

		// Validação: Verifica se os campos obrigatórios foram enviados
		if (
			!idcategoria ||
			!nome ||
			valor === undefined ||
			!imagemFormatada === undefined ||
			ordem === undefined
		) {
			return res.status(400).json({
				erro: 'Preencha categoria, nome, valor, imagem e ordem do produto!',
			})
		}

		await criarProdutoNoBanco(idcategoria, nome, descricao, valor, imagemFormatada, ordem)

		return res.status(201).json({ mensagem: 'Produto criado com sucesso! 🍕' })
	} catch (erro) {
		console.error('Erro ao criar produto:', erro)
		return res.status(500).json({ erro: 'Erro interno ao criar o produto.' })
	}
}

// Controller para o GET (Listar Produtos)
export async function listProductsController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const produtos = await listarProdutosDoBanco()
		return res.json(produtos)
	} catch (erro) {
		console.error('Erro ao listar produtos:', erro)
		return res.status(500).json({ erro: 'Erro interno ao listar os produtos.' })
	}
}

// Controller para vincular a imagem
export async function updateProductImageController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		// Pegamos o ID do produto que vem na URL (ex: /admin/products/5/imagem)
		const { idproduto } = req.params

		// Pegamos o nome da imagem que você vai enviar no corpo da requisição
		const { imagem } = req.body

		if (!idproduto || !imagem) {
			return res.status(400).json({
				erro: 'Por favor, envie o id do produto e o nome da imagem!',
			})
		}

		// Chama o cozinheiro (Service) para salvar no banco
		await atualizarImagemDoProduto(Number(idproduto), imagem)

		return res.json({
			mensagem: 'Imagem salva no produto com sucesso! 📸🍕',
		})
	} catch (erro) {
		console.error('Erro ao atualizar imagem do produto:', erro)
		return res.status(500).json({
			erro: 'Erro interno ao salvar a imagem no banco de dados.',
		})
	}
}

// Controller para vincular o Opcional ao Produto
export async function linkOpcionalController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		// Pegamos o ID do produto pela URL (ex: /admin/products/1/opcionais)
		const { idproduto } = req.params

		// Pegamos o ID do grupo (opcional) pelo corpo da requisição
		const { idopcional } = req.body

		if (!idproduto || !idopcional) {
			return res.status(400).json({
				erro: 'Envie o idproduto na URL e o idopcional no corpo!',
			})
		}

		await vincularOpcionalAoProduto(Number(idproduto), Number(idopcional))

		return res.status(201).json({
			mensagem: 'Grupo de Opcionais vinculado à Pizza com sucesso! 🍕+📦',
		})
	} catch (erro) {
		console.error('Erro ao vincular opcional:', erro)
		return res.status(500).json({ erro: 'Erro interno ao vincular o opcional.' })
	}
}

// Controller para listar os opcionais que a pizza tem
export async function listProductOpcionaisController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idproduto } = req.params
		const opcionais = await listarOpcionaisDoProduto(Number(idproduto))
		return res.json(opcionais)
	} catch (erro) {
		console.error('Erro ao listar opcionais do produto:', erro)
		return res.status(500).json({ erro: 'Erro interno ao listar os opcionais.' })
	}
}

export async function updateProductController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idproduto } = req.params
		const dados = req.body

		// 👇 TRAVA DE SEGURANÇA DA IMAGEM 👇
		if (dados.imagem && !dados.imagem.startsWith('/uploads/')) {
			dados.imagem = `/uploads/${dados.imagem}`
		}

		if (!dados.nome || !dados.valor || !dados.idcategoria) {
			return res.status(400).json({ erro: 'Nome, valor e categoria são obrigatórios!' })
		}

		await atualizarProdutoNoBanco(Number(idproduto), dados)
		return res.json({ mensagem: 'Produto atualizado com sucesso! 🍕' })
	} catch (erro) {
		console.error('Erro ao atualizar produto:', erro)
		return res.status(500).json({ erro: 'Erro interno ao atualizar o produto.' })
	}
}

export async function deleteProductController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idproduto } = req.params

		await deletarProdutoNoBanco(Number(idproduto))
		return res.json({ mensagem: 'Produto apagado com sucesso! 🗑️' })
	} catch (erro) {
		console.error('Erro ao deletar produto:', erro)
		return res.status(500).json({
			erro: 'Não foi possível apagar o produto. Talvez ele já esteja em um pedido finalizado!',
		})
	}
}

// Controller para o GET (Listar Produtos por Categoria - Rota Pública)
export async function listProductsByCategoryController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idcategoria } = req.params
		const produtos = await listarProdutosPorCategoriaDoBanco(Number(idcategoria))
		return res.json(produtos)
	} catch (erro) {
		console.error('Erro ao listar produtos por categoria:', erro)
		return res.status(500).json({ erro: 'Erro interno ao listar os produtos da categoria.' })
	}
}

// Controller para o GET (Detalhes de um Produto Específico - Rota Pública)
export async function getProductDetailsController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		// Pegamos o ID que vem na URL (ex: /products/5/details)
		const { idproduto } = req.params

		// Pede para o Service buscar a pizza no banco
		const produto = await buscarProdutoPorIdNoBanco(Number(idproduto))

		// Se a pizza não existir (ou estiver inativa), avisamos o cliente
		if (!produto) {
			return res.status(404).json({ erro: 'Produto não encontrado.' })
		}

		// (No futuro, é exatamente aqui que vamos buscar os Opcionais para anexar na pizza!)

		return res.json(produto)
	} catch (erro) {
		console.error('Erro ao buscar detalhes do produto:', erro)
		return res.status(500).json({ erro: 'Erro interno ao buscar os detalhes do produto.' })
	}
}
