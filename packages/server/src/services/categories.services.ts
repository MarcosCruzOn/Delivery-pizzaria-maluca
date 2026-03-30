import pool from '../database/connection.js'

// Função para criar uma nova categoria no banco
export async function criarCategoriaNoBanco(
	nome: string,
	icone: string,
	ordem: number
) {
	// O comando INSERT INTO adiciona uma nova linha na tabela categorias
	// Os pontos de interrogação (?) são uma proteção contra ataques de hackers (SQL Injection)
	const [resultado] = await pool.query(
		'INSERT INTO categorias (nome, icone, ordem) VALUES (?, ?, ?)',
		[nome, icone, ordem]
	)

	return resultado
}

// Função para listar todas as categorias
export async function listarCategoriasDoBanco() {
	// O comando SELECT busca os dados. O "ORDER BY ordem ASC" garante que elas venham na ordem certa que você definiu
	const [linhas] = await pool.query(
		'SELECT * FROM categorias ORDER BY ordem ASC'
	)
	return linhas
}

export async function deletarCategoriaNoBanco(idcategoria: number) {
	// 1. Deletamos os vínculos dos opcionais (se houver) dos produtos que pertencem a essa categoria
	await pool.query(
		`DELETE FROM produtoopcional 
     WHERE idproduto IN (SELECT idproduto FROM produtos WHERE idcategoria = ?)`,
		[idcategoria]
	)

	// 2. Deletamos os produtos filhos dessa categoria
	await pool.query('DELETE FROM produtos WHERE idcategoria = ?', [
		idcategoria,
	])

	// 3. Finalmente, deletamos a categoria pai
	const [resultado] = await pool.query(
		'DELETE FROM categorias WHERE idcategoria = ?',
		[idcategoria]
	)

	return resultado
}
