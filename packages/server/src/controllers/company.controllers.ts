import { Request, Response } from 'express'
import {
	buscarEmpresaPorId,
	atualizarDadosEmpresa,
	atualizarLogotipoEmpresa,
} from '../services/company.services.js'

// Controller para buscar os dados e preencher a tela
export async function getCompanyController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idempresa } = req.params
		const empresa = await buscarEmpresaPorId(Number(idempresa))

		if (!empresa) {
			return res.status(404).json({ erro: 'Empresa não encontrada!' })
		}

		return res.json(empresa)
	} catch (erro) {
		console.error('Erro ao buscar empresa:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao buscar dados da empresa.' })
	}
}

// Controller para salvar as alterações do formulário
export async function updateCompanyController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idempresa } = req.params
		const dados = req.body

		// Validação básica
		if (!dados.nome || !dados.cep || !dados.endereco) {
			return res
				.status(400)
				.json({ erro: 'Nome, CEP e Endereço são obrigatórios!' })
		}

		await atualizarDadosEmpresa(Number(idempresa), dados)

		return res.json({
			mensagem: 'Dados da empresa atualizados com sucesso! 🏢',
		})
	} catch (erro) {
		console.error('Erro ao atualizar empresa:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao atualizar a empresa.' })
	}
}

// Controller para salvar a nova Logotipo
export async function updateCompanyLogoController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idempresa } = req.params
		const { logotipo } = req.body

		if (!logotipo) {
			return res
				.status(400)
				.json({ erro: 'Envie o nome da imagem do logotipo!' })
		}

		await atualizarLogotipoEmpresa(Number(idempresa), logotipo)

		return res.json({ mensagem: 'Logotipo atualizado com sucesso! 🖼️' })
	} catch (erro) {
		console.error('Erro ao atualizar logotipo:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao atualizar logotipo.' })
	}
}
