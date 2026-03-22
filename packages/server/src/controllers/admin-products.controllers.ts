import { Request, Response } from 'express'
import {
	createProductService,
	listProductsService,
	deleteProductService,
	updateProductService,
	getProductOpcionaisService,
} from '../services/admin-products.services.js'

export async function createProduct(req: Request, res: Response) {
	try {
		const result = await createProductService(req.body)

		res.status(201).json({
			success: true,
			data: result,
		})
	} catch (error: any) {
		res.status(400).json({
			success: false,
			message: error.message,
		})
	}
}

export async function listProducts(req: Request, res: Response) {
	try {
		const categoryId =
			typeof req.query.categoryId === 'string'
				? Number(req.query.categoryId)
				: undefined

		const products = await listProductsService(categoryId) // 👈 PASSA

		return res.json(products)
	} catch {
		return res.status(500).json({
			error: 'Erro ao buscar produtos',
		})
	}
}

export async function deleteProduct(req: Request, res: Response) {
	try {
		const id = Number(req.params.id)

		await deleteProductService(id)

		return res.json({
			message: 'Produto removido com sucesso',
		})
	} catch {
		return res.status(500).json({
			error: 'Erro ao remover produto',
		})
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
		const id = Number(req.params.id)

		await updateProductService(id, req.body)

		return res.json({
			message: 'Produto atualizado com sucesso',
		})
	} catch {
		return res.status(500).json({
			error: 'Erro ao atualizar produto',
		})
	}
}

export async function getProductOpcionais(req: Request, res: Response) {
	try {
		const id = Number(req.params.id)

		const data = await getProductOpcionaisService(id)

		return res.json(data)
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			error: 'Erro ao buscar opcionais do produto',
		})
	}
}
