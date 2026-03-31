import pool from '../database/connection.js'

export async function listarTaxasNoBanco() {
	// Puxamos a taxa e o nome dela usando um JOIN
	const [linhas] = await pool.query(`
		SELECT t.idtaxaentrega, t.idtaxaentregatipo, t.valor, t.ATIVO, tp.nome 
		FROM taxaentrega t
		INNER JOIN taxaentregatipo tp ON t.idtaxaentregatipo = tp.idtaxaentregatipo
	`)
	return linhas
}

export async function salvarTaxaAtivaNoBanco(idtaxaentrega: number, valor: number) {
	// 1. Desliga TODAS as taxas primeiro (Garante que só exista 1 ativa)
	await pool.query('UPDATE taxaentrega SET ATIVO = 0')

	// 2. Liga apenas a taxa escolhida e atualiza o preço dela
	const [resultado] = await pool.query(
		'UPDATE taxaentrega SET ATIVO = 1, valor = ? WHERE idtaxaentrega = ?',
		[valor, idtaxaentrega]
	)
	return resultado
}
