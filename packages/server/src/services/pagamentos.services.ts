import pool from '../database/connection.js'

export async function listarPagamentosNoBanco() {
	const [linhas] = await pool.query('SELECT * FROM pagamentos')
	return linhas
}

export async function togglePagamentoNoBanco(id: number, ativo: number) {
	// Atualiza o ATIVO para 1 (ligado) ou 0 (desligado)
	const [resultado] = await pool.query(
		'UPDATE pagamentos SET ATIVO = ? WHERE idpagamentos = ?',
		[ativo, id]
	)
	return resultado
}
