import pool from '../database/connection.js'

// Função para criar a "Caixa" (o Grupo de Opcionais)
export async function criarOpcionalNoBanco(
	nome: string,
	tiposimples: number,
	minimo: number,
	maximo: number
) {
	const [resultado] = await pool.query(
		'INSERT INTO opcional (nome, tiposimples, minimo, maximo) VALUES (?, ?, ?, ?)',
		[nome, tiposimples, minimo, maximo]
	)
	return resultado
}

// Função para listar todas as "Caixas" criadas
export async function listarOpcionaisDoBanco() {
	const [linhas] = await pool.query('SELECT * FROM opcional')
	return linhas
}

// Função para criar um ITEM dentro de um Opcional (Ex: Catupiry dentro de Bordas)
export async function criarItemDoOpcionalNoBanco(
	idopcional: number,
	nome: string,
	valor: number
) {
	// A tabela opcionalitem pede o idopcional (a qual caixa ele pertence), o nome e o valor
	const [resultado] = await pool.query(
		'INSERT INTO opcionalitem (idopcional, nome, valor) VALUES (?, ?, ?)',
		[idopcional, nome, valor]
	)
	return resultado
}

// Função para listar os itens de UMA caixa específica
export async function listarItensDoOpcional(idopcional: number) {
	const [linhas] = await pool.query(
		'SELECT * FROM opcionalitem WHERE idopcional = ?',
		[idopcional]
	)
	return linhas
}
