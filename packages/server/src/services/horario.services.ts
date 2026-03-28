import pool from '../database/connection.js'

// Função para criar uma regra de horário
export async function criarHorarioNoBanco(dados: any) {
	const [resultado] = await pool.query(
		`INSERT INTO horario 
      (diainicio, diafim, iniciohorarioum, fimhorarioum, iniciohorariodois, fimhorariodois) 
     VALUES (?, ?, ?, ?, ?, ?)`,
		[
			dados.diainicio,
			dados.diafim,
			dados.iniciohorarioum,
			dados.fimhorarioum,
			dados.iniciohorariodois,
			dados.fimhorariodois,
		]
	)
	return resultado
}

// Função para listar todos os horários cadastrados
export async function listarHorariosDoBanco() {
	const [linhas] = await pool.query('SELECT * FROM horario')
	return linhas
}
