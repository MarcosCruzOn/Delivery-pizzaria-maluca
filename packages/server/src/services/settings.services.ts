import pool from '../database/connection.js'

// --- LÓGICA DE PAGAMENTOS ---
export async function criarPagamentoNoBanco(nome: string) {
	const [resultado] = await pool.query(
		'INSERT INTO pagamentos (nome) VALUES (?)',
		[nome]
	)
	return resultado
}

export async function listarPagamentosDoBanco() {
	const [linhas] = await pool.query(
		'SELECT * FROM pagamentos WHERE ATIVO = 1'
	)
	return linhas
}

// --- LÓGICA DE TIPOS DE ENTREGA ---
export async function criarTipoEntregaNoBanco(
	nome: string,
	tempominimo: number,
	tempomaximo: number
) {
	const [resultado] = await pool.query(
		'INSERT INTO tipoentrega (nome, tempominimo, tempomaximo) VALUES (?, ?, ?)',
		[nome, tempominimo, tempomaximo]
	)
	return resultado
}

export async function listarTiposEntregaDoBanco() {
	const [linhas] = await pool.query(
		'SELECT * FROM tipoentrega WHERE ATIVO = 1'
	)
	return linhas
}

// --- LÓGICA DE STATUS DO PEDIDO ---
export async function criarStatusPedidoNoBanco(descricao: string) {
	const [resultado] = await pool.query(
		'INSERT INTO pedidostatus (descricao) VALUES (?)',
		[descricao]
	)
	return resultado
}

export async function listarStatusPedidoDoBanco() {
	const [linhas] = await pool.query('SELECT * FROM pedidostatus')
	return linhas
}
