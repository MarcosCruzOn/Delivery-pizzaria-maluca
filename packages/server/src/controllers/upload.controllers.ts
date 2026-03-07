import type { Request, Response } from 'express'

export async function uploadImage(req: Request, res: Response) {
	if (!req.file) {
		return res.status(400).json({ error: 'Nenhum arquivo enviado' })
	}

	const imageUrl = `/uploads/${req.file.filename}`

	return res.status(201).json({
		message: 'Imagem enviada com sucesso',
		imageUrl,
	})
}
