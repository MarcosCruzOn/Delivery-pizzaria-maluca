import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Esta é a função que vai agir como nosso "Segurança"
export function verificarToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// 1. Pegamos o cabeçalho "Authorization" que a requisição nos enviou
	const authHeader = req.headers.authorization

	// Se a pessoa não enviou nada, já barramos na hora
	if (!authHeader) {
		return res
			.status(401)
			.json({ erro: 'Acesso negado! Token não fornecido.' })
	}

	// O padrão da web é enviar o token assim: "Bearer eyJhbGciOiJIUz..."
	// Então nós dividimos o texto no espaço e pegamos só a segunda parte (o token em si)
	const partes = authHeader.split(' ')
	const token = partes[1]

	try {
		// 2. O segurança confere se a assinatura do crachá bate com a nossa chave secreta do .env
		jwt.verify(token, process.env.JWT_SECRET as string)

		// 3. Se não deu erro, o token é verdadeiro! O comando next() manda a requisição seguir em frente.
		return next()
	} catch (erro) {
		// Se o token for inventado ou tiver passado de 1 dia (expirado), ele cai aqui
		return res.status(401).json({ erro: 'Token inválido ou expirado!' })
	}
}
