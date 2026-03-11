import {
	createCategoryQuery,
	getCategoriesQuery,
	deleteCategoryQuery,
} from '../database/queries/categories.queries.js'

export async function createCategoryService(data: any) {
	const { nome, icone, ordem } = data

	if (!nome || !icone) {
		throw new Error('Nome e ícone são obrigatórios')
	}

	return createCategoryQuery(nome, icone, ordem || 0)
}

export async function deleteCategoryService(id: number) {
	if (!id) {
		throw new Error('ID inválido')
	}

	return deleteCategoryQuery(id)
}

export async function listCategoriesService() {
	return getCategoriesQuery()
}
