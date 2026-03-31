import pool from '../database/connection.js'

export async function listarTiposEntregaNoBanco() {
	const [linhas] = await pool.query('SELECT * FROM tipoentrega')
	return linhas
}

export async function atualizarTipoEntregaNoBanco(id: number, dados: any) {
	const [resultado] = await pool.query(
		'UPDATE tipoentrega SET ATIVO = ?, tempominimo = ?, tempomaximo = ? WHERE idtipoentrega = ?',
		[dados.ativo, dados.tempominimo, dados.tempomaximo, id]
	)
	return resultado
}
