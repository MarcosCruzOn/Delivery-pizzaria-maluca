import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { buscarEmpresaPorEmail } from '../services/auth.services.js'

export async function loginController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		// 1. Pega o email e a senha que vieram no "corpo" da requisição
		const { email, senha } = req.body

		if (!email || !senha) {
			return res
				.status(400)
				.json({ erro: 'Por favor, envie o email e a senha!' })
		}

		// 2. Manda o "cozinheiro" (Service) buscar a empresa no banco
		const empresa = await buscarEmpresaPorEmail(email)

		if (!empresa) {
			return res.status(401).json({ erro: 'Email ou senha incorretos!' })
		}

		// 3. Compara a senha digitada com a senha que está no banco de dados (Versão Simples)
		// const senhaValida = await bcrypt.compare(senha, empresa.senha); <- Comente ou apague esta linha

		const senhaValida = senha === empresa.senha // <- Adicione esta linha!

		if (!senhaValida) {
			return res.status(401).json({ erro: 'Email ou senha incorretos!' })
		}

		// 4. Cria o "crachá" (Token JWT)
		const token = jwt.sign(
			{ id: empresa.idempresa, nome: empresa.nome }, // Dados que vão dentro do crachá
			process.env.JWT_SECRET as string, // A assinatura secreta do .env
			{ expiresIn: '1d' } // O crachá expira em 1 dia
		)

		// 5. Devolve a resposta com sucesso, enviando o token e os dados do usuário (menos a senha!)
		return res.json({
			mensagem: 'Login realizado com sucesso!',
			token: token,
			usuario: {
				id: empresa.idempresa,
				nome: empresa.nome,
				email: empresa.email,
			},
		})
	} catch (erro) {
		console.error('Erro no login:', erro)
		return res
			.status(500)
			.json({ erro: 'Ops! Ocorreu um erro interno no servidor.' })
	}
}
