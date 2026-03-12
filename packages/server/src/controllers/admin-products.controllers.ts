import { Request, Response } from 'express'
import { createProductService } from '../services/admin-products.services.js'

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
