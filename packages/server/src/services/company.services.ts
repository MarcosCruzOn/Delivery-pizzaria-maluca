import pool from '../database/connection.js'

// ==========================================
// MÓDULO EMPRESA
// ==========================================

export async function buscarEmpresaPorId(idempresa: number) {
	const [linhas]: any = await pool.query(
		`SELECT idempresa, nome, email, sobre, logotipo, cep, endereco, numero, bairro, complemento, cidade, estado 
     FROM empresa WHERE idempresa = ?`,
		[idempresa]
	)
	return linhas[0]
}

export async function atualizarDadosEmpresa(idempresa: number, dados: any) {
	const [resultado] = await pool.query(
		`UPDATE empresa SET 
      nome = ?, sobre = ?, cep = ?, endereco = ?, numero = ?, 
      bairro = ?, complemento = ?, cidade = ?, estado = ? 
     WHERE idempresa = ?`,
		[
			dados.nome,
			dados.sobre,
			dados.cep,
			dados.endereco,
			dados.numero,
			dados.bairro,
			dados.complemento,
			dados.cidade,
			dados.estado,
			idempresa,
		]
	)
	return resultado
}

export async function atualizarLogotipoEmpresa(idempresa: number, nomeDaImagem: string) {
	const [resultado] = await pool.query('UPDATE empresa SET logotipo = ? WHERE idempresa = ?', [
		nomeDaImagem,
		idempresa,
	])
	return resultado
}

export async function buscarDadosPublicosEmpresa() {
	const [linhas]: any = await pool.query(
		'SELECT nome, sobre, logotipo, cep, endereco, numero, bairro, complemento, cidade, estado FROM empresa LIMIT 1'
	)
	return linhas[0]
}

export async function buscarPagamentosAtivos() {
	const [linhas]: any = await pool.query(
		'SELECT idpagamentos, nome FROM pagamentos WHERE ATIVO = 1'
	)
	return linhas
}

// ==========================================
// MÓDULO HORÁRIOS (Agora moram aqui!)
// ==========================================

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

export async function listarHorariosDoBanco() {
	const [linhas] = await pool.query('SELECT * FROM horario')
	return linhas
}
