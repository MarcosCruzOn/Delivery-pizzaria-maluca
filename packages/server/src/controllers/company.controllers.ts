import { Request, Response } from 'express'
import {
	buscarEmpresaPorId,
	atualizarDadosEmpresa,
	atualizarLogotipoEmpresa,
	buscarDadosPublicosEmpresa,
	buscarPagamentosAtivos,
	criarHorarioNoBanco,
	listarHorariosDoBanco,
} from '../services/company.services.js'

// ==========================================
// CONTROLLERS DA EMPRESA
// ==========================================

export async function getCompanyController(req: Request, res: Response): Promise<Response | void> {
	try {
		const { idempresa } = req.params
		const empresa = await buscarEmpresaPorId(Number(idempresa))

		if (!empresa) {
			return res.status(404).json({ erro: 'Empresa não encontrada!' })
		}

		return res.json(empresa)
	} catch (erro) {
		console.error('Erro ao buscar empresa:', erro)
		return res.status(500).json({ erro: 'Erro interno ao buscar dados da empresa.' })
	}
}

export async function updateCompanyController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idempresa } = req.params
		const dados = req.body

		if (!dados.nome || !dados.cep || !dados.endereco) {
			return res.status(400).json({ erro: 'Nome, CEP e Endereço são obrigatórios!' })
		}

		await atualizarDadosEmpresa(Number(idempresa), dados)

		return res.json({ mensagem: 'Dados da empresa atualizados com sucesso! 🏢' })
	} catch (erro) {
		console.error('Erro ao atualizar empresa:', erro)
		return res.status(500).json({ erro: 'Erro interno ao atualizar a empresa.' })
	}
}

export async function updateCompanyLogoController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const { idempresa } = req.params
		const { logotipo } = req.body

		if (!logotipo) {
			return res.status(400).json({ erro: 'Envie o nome da imagem do logotipo!' })
		}

		await atualizarLogotipoEmpresa(Number(idempresa), logotipo)

		return res.json({ mensagem: 'Logotipo atualizado com sucesso! 🖼️' })
	} catch (erro) {
		console.error('Erro ao atualizar logotipo:', erro)
		return res.status(500).json({ erro: 'Erro interno ao atualizar logotipo.' })
	}
}

export async function getPublicCompanyController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const empresa = await buscarDadosPublicosEmpresa()

		if (!empresa) {
			return res.status(404).json({ erro: 'Empresa não cadastrada.' })
		}

		const pagamentos = await buscarPagamentosAtivos()
		empresa.pagamentos = pagamentos

		return res.json(empresa)
	} catch (erro) {
		console.error(erro)
		return res.status(500).json({ erro: 'Erro ao buscar dados públicos da empresa.' })
	}
}

// ==========================================
// CONTROLLERS DOS HORÁRIOS
// ==========================================

export async function createHorarioController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const dados = req.body

		if (
			dados.diainicio === undefined ||
			dados.diafim === undefined ||
			!dados.iniciohorarioum ||
			!dados.fimhorarioum
		) {
			return res
				.status(400)
				.json({ erro: 'Preencha os dias da semana e os horários do primeiro turno!' })
		}

		dados.iniciohorariodois = dados.iniciohorariodois || ''
		dados.fimhorariodois = dados.fimhorariodois || ''

		await criarHorarioNoBanco(dados)

		return res.status(201).json({ mensagem: 'Horário de funcionamento salvo com sucesso! ⏰' })
	} catch (erro) {
		console.error('Erro ao salvar horário:', erro)
		return res.status(500).json({ erro: 'Erro interno ao salvar os horários.' })
	}
}

export async function listHorariosController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const horarios = await listarHorariosDoBanco()
		return res.json(horarios)
	} catch (erro) {
		console.error('Erro ao listar horários:', erro)
		return res.status(500).json({ erro: 'Erro interno ao listar os horários.' })
	}
}
