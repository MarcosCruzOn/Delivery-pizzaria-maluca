import { createProductQuery } from '../database/queries/products.queries.js'
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
