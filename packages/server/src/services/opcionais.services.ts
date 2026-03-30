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

// ==========================================
// GRUPOS (Opcional)
// ==========================================
export async function atualizarOpcionalNoBanco(idopcional: number, dados: any) {
	const [resultado] = await pool.query(
		'UPDATE opcional SET nome = ?, minimo = ?, maximo = ? WHERE idopcional = ?',
		[dados.nome, dados.minimo, dados.maximo, idopcional]
	)
	return resultado
}

export async function deletarOpcionalNoBanco(idopcional: number) {
	// 1. Cascata: Remove das pizzas que usavam esse grupo
	await pool.query('DELETE FROM produtoopcional WHERE idopcional = ?', [
		idopcional,
	])
	// 2. Cascata: Remove todos os itens (ex: Catupiry, Cheddar) que estavam dentro do grupo
	await pool.query('DELETE FROM opcionalitem WHERE idopcional = ?', [
		idopcional,
	])
	// 3. Remove o grupo em si
	const [resultado] = await pool.query(
		'DELETE FROM opcional WHERE idopcional = ?',
		[idopcional]
	)
	return resultado
}

// ==========================================
// ITENS (OpcionalItem)
// ==========================================
export async function atualizarItemOpcionalNoBanco(
	idopcionalitem: number,
	dados: any
) {
	const [resultado] = await pool.query(
		'UPDATE opcionalitem SET nome = ?, valor = ? WHERE idopcionalitem = ?',
		[dados.nome, dados.valor, idopcionalitem]
	)
	return resultado
}

export async function deletarItemOpcionalNoBanco(idopcionalitem: number) {
	// 1. Cascata de segurança (se já estivesse em algum pedido antigo, limpamos para não bugar a nota)
	await pool.query(
		'DELETE FROM pedidoitemopcional WHERE idopcionalitem = ?',
		[idopcionalitem]
	)
	// 2. Apaga o item
	const [resultado] = await pool.query(
		'DELETE FROM opcionalitem WHERE idopcionalitem = ?',
		[idopcionalitem]
	)
	return resultado
}
