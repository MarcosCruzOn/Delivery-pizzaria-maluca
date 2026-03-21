import {
	createProductQuery,
	listProductsQuery,
	deleteProductQuery,
	updateProductQuery,
} from '../database/queries/products.queries.js'

import { CreateProductDTO } from '../types/menu.js'
import { db } from '../database/connection.js' // 👈 IMPORTANTE

export async function createProductService(data: CreateProductDTO) {
	// validações (mantém isso sempre 👍)
	if (!data.nome) {
		throw new Error('Nome do produto é obrigatório')
	}

	if (!data.idcategoria) {
		throw new Error('Categoria obrigatória')
	}

	if (!data.valor) {
		throw new Error('Valor obrigatório')
	}

	// separa opcionais do produto
	const { opcionais, ...productData } = data

	// cria produto
	const result: any = await createProductQuery(productData)

	// 👇 IMPORTANTE: garantir que pegamos o insertId correto
	const produtoId = result?.insertId || result?.[0]?.insertId

	if (!produtoId) {
		console.error('Erro: insertId não encontrado', result)
		throw new Error('Erro ao criar produto')
	}

	// salva opcionais
	if (opcionais && opcionais.length > 0) {
		for (const opcionalId of opcionais) {
			await db.query(
				'INSERT INTO produtoopcional (idproduto, idopcional) VALUES (?, ?)',
				[produtoId, opcionalId]
			)
		}
	}
	console.log('OPCIONAIS RECEBIDOS:', opcionais)
	console.log('RESULT DO INSERT:', result)

	return result
}

export async function listProductsService(categoryId?: number) {
	return listProductsQuery(categoryId)
}

export async function deleteProductService(id: number) {
	if (!id) {
		throw new Error('Produto inválido')
	}

	return deleteProductQuery(id)
}

export async function updateProductService(id: number, data: any) {
	if (!id) {
		throw new Error('Produto inválido')
	}

	return updateProductQuery(id, data)
}
