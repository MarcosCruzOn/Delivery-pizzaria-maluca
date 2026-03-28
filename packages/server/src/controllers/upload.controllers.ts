import { Request, Response } from 'express'

export const uploadImage = (req: Request, res: Response) => {
	// O Multer (nosso middleware) rodou antes dessa função.
	// Se deu tudo certo, ele guardou as informações do arquivo salvo dentro de "req.file".

	if (!req.file) {
		// Se não tiver arquivo, devolvemos um erro (Early Return)
		return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' })
	}

	// Se chegou aqui, o arquivo foi salvo com sucesso na pasta 'uploads'!
	// Vamos devolver o nome do arquivo para o frontend.
	return res.json({
		mensagem: 'Upload realizado com sucesso!',
		filename: req.file.filename,
		url: `/uploads/${req.file.filename}`,
	})
}
