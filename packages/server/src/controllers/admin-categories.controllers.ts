import { Request, Response } from 'express'
import {
	createCategoryService,
	deleteCategoryService,
	listCategoriesService,
} from '../services/admin-categories.services.js'

export async function createCategory(req: Request, res: Response) {
	try {
		const result = await createCategoryService(req.body)

		res.status(201).json({
			success: true,
			data: result,
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: 'Erro ao criar categoria',
		})
	}
}

export async function deleteCategory(req: Request, res: Response) {
	try {
		const id = Number(req.params.id)

		await deleteCategoryService(id)

		res.json({
			success: true,
			message: 'Categoria removida',
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: 'Erro ao remover categoria',
		})
	}
}

export async function listCategories(req: Request, res: Response) {
	try {
		const categories = await listCategoriesService()

		res.json(categories)
	} catch (error) {
		res.status(500).json({
			message: 'Erro ao listar categorias',
		})
	}
}
