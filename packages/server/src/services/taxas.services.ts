import pool from '../database/connection.js'

export async function listarTaxasNoBanco() {
	const [linhas] = await pool.query(`
		SELECT t.idtaxaentrega, t.idtaxaentregatipo, t.valor, t.distancia, t.ATIVO, tp.nome 
		FROM taxaentrega t
		INNER JOIN taxaentregatipo tp ON t.idtaxaentregatipo = tp.idtaxaentregatipo
        ORDER BY t.distancia ASC
	`)
	return linhas
}

export async function salvarTaxaAtivaNoBanco(idtaxaentregatipo: number, valorUnica: number = 0) {
	// 1. Desliga TODAS as taxas do banco
	await pool.query('UPDATE taxaentrega SET ATIVO = 0')

	// 2. Se for Taxa Única (2), atualizamos o valor dela e ligamos
	if (idtaxaentregatipo === 2) {
		await pool.query(
			'UPDATE taxaentrega SET ATIVO = 1, valor = ? WHERE idtaxaentregatipo = 2',
			[valorUnica]
		)
	} else {
		// Se for Sem Taxa (1) ou Distância (3), ligamos TODAS as linhas que pertencem a esse tipo
		await pool.query('UPDATE taxaentrega SET ATIVO = 1 WHERE idtaxaentregatipo = ?', [
			idtaxaentregatipo,
		])
	}
	return true
}

// CRUD DAS FAIXAS DE DISTÂNCIA
export async function adicionarFaixaDistanciaNoBanco(distancia: number, valor: number) {
	// Verifica se o modo distância está ativo agora, para a nova faixa já nascer com o status correto
	const [modoAtivoRows]: any = await pool.query(
		'SELECT ATIVO FROM taxaentrega WHERE idtaxaentregatipo = 3 LIMIT 1'
	)
	const ativo = modoAtivoRows.length > 0 ? modoAtivoRows[0].ATIVO : 0

	const [resultado] = await pool.query(
		'INSERT INTO taxaentrega (idtaxaentregatipo, valor, distancia, ATIVO) VALUES (3, ?, ?, ?)',
		[valor, distancia, ativo]
	)
	return resultado
}

export async function removerFaixaDistanciaNoBanco(idtaxaentrega: number) {
	const [resultado] = await pool.query(
		'DELETE FROM taxaentrega WHERE idtaxaentrega = ? AND idtaxaentregatipo = 3',
		[idtaxaentrega]
	)
	return resultado
}
