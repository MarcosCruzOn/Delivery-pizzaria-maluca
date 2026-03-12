import {
	createProductQuery,
	listProductsQuery,
	deleteProductQuery,
	updateProductQuery,
} from '../database/queries/products.queries.js'

import { CreateProductDTO } from '../types/menu.js'

export async function createProductService(data: CreateProductDTO) {
	if (!data.nome) {
		throw new Error('Nome do produto é obrigatório')
	}

	if (!data.idcategoria) {
		throw new Error('Categoria obrigatória')
	}

	if (!data.valor) {
		throw new Error('Valor obrigatório')
	}

	return createProductQuery(data)
}

export async function listProductsService() {
	return listProductsQuery()
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
