import { Request, Response } from 'express'
import {
	criarHorarioNoBanco,
	listarHorariosDoBanco,
} from '../services/horario.services.js'

// Controller para salvar o horário
export async function createHorarioController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const dados = req.body

		// Validação básica: tem que ter pelo menos o primeiro turno preenchido!
		if (
			dados.diainicio === undefined ||
			dados.diafim === undefined ||
			!dados.iniciohorarioum ||
			!dados.fimhorarioum
		) {
			return res
				.status(400)
				.json({
					erro: 'Preencha os dias da semana e os horários do primeiro turno!',
				})
		}

		// Se a pizzaria não tiver segundo turno, preenchemos com vazio para o banco não reclamar
		dados.iniciohorariodois = dados.iniciohorariodois || ''
		dados.fimhorariodois = dados.fimhorariodois || ''

		await criarHorarioNoBanco(dados)

		return res
			.status(201)
			.json({
				mensagem: 'Horário de funcionamento salvo com sucesso! ⏰',
			})
	} catch (erro) {
		console.error('Erro ao salvar horário:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao salvar os horários.' })
	}
}

// Controller para listar os horários
export async function listHorariosController(
	req: Request,
	res: Response
): Promise<Response | void> {
	try {
		const horarios = await listarHorariosDoBanco()
		return res.json(horarios)
	} catch (erro) {
		console.error('Erro ao listar horários:', erro)
		return res
			.status(500)
			.json({ erro: 'Erro interno ao listar os horários.' })
	}
}
