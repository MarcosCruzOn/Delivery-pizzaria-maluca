import pool from '../database/connection.js'

// Função para criar um novo produto no banco
export async function criarProdutoNoBanco(
	idcategoria: number,
	nome: string,
	descricao: string,
	valor: number,
	imagem: string,
	ordem: number
) {
	// O comando INSERT INTO agora inclui o idcategoria para fazer o vínculo
	const [resultado] = await pool.query(
		'INSERT INTO produtos (idcategoria, nome, descricao, valor,imagem, ordem) VALUES (?, ?, ?, ?, ?, ?)',
		[idcategoria, nome, descricao, valor, imagem, ordem]
	)

	return resultado
}

// Função para listar todos os produtos
export async function listarProdutosDoBanco() {
	// Aqui buscamos todos os produtos que estão ativos.
	// O "ORDER BY idcategoria, ordem ASC" organiza primeiro por categoria e depois pela ordem de exibição!
	const [linhas] = await pool.query(
		'SELECT * FROM produtos WHERE ATIVO = 1 ORDER BY idcategoria, ordem ASC'
	)
	return linhas
}

// Função para atualizar APENAS a imagem de um produto existente
export async function atualizarImagemDoProduto(idproduto: number, imagem: string) {
	// O comando UPDATE altera uma linha que já existe.
	// O "WHERE idproduto = ?" garante que não vamos colocar a foto da calabresa na coca-cola sem querer!
	const [resultado] = await pool.query('UPDATE produtos SET imagem = ? WHERE idproduto = ?', [
		imagem,
		idproduto,
	])

	return resultado
}

// Nova função para VINCULAR o Grupo de Opcionais (Caixa) à Pizza
export async function vincularOpcionalAoProduto(idproduto: number, idopcional: number) {
	// Inserimos na tabela ponte "produtoopcional" os dois IDs
	const [resultado] = await pool.query(
		'INSERT INTO produtoopcional (idproduto, idopcional) VALUES (?, ?)',
		[idproduto, idopcional]
	)
	return resultado
}

// Nova função para LISTAR quais grupos de opcionais uma pizza específica aceita
export async function listarOpcionaisDoProduto(idproduto: number) {
	// Aqui usamos um "INNER JOIN", que é uma mágica do SQL para juntar tabelas!
	// Ele vai na tabela ponte, acha os IDs, e já traz o Nome, Minimo e Maximo lá da tabela "opcional"
	const [linhas] = await pool.query(
		`
    SELECT o.idopcional, o.nome, o.tiposimples, o.minimo, o.maximo 
    FROM opcional o
    INNER JOIN produtoopcional po ON o.idopcional = po.idopcional
    WHERE po.idproduto = ?
  `,
		[idproduto]
	)

	return linhas
}

// ... (suas funções anteriores de criar e listar produtos)

// NOVO: Atualizar Produto
export async function atualizarProdutoNoBanco(idproduto: number, dados: any) {
	// 1. Atualiza os dados básicos na tabela 'produtos'
	let query =
		'UPDATE produtos SET idcategoria = ?, nome = ?, descricao = ?, valor = ?, imagem = ?'
	let params: any[] = [dados.idcategoria, dados.nome, dados.descricao, dados.valor, dados.imagem]

	// Se o usuário mandou uma imagem nova, a gente atualiza. Se não, deixa a velha lá!
	if (dados.imagem) {
		query += ', imagem = ?'
		params.push(dados.imagem)
	}

	query += ' WHERE idproduto = ?'
	params.push(idproduto)

	await pool.query(query, params)

	// 2. Atualiza os Opcionais na tabela 'produtoopcional'
	// Primeiro a gente "vassoura" os antigos para não duplicar
	await pool.query('DELETE FROM produtoopcional WHERE idproduto = ?', [idproduto])

	// Depois a gente insere os novos que vieram do array (se vieram)
	if (dados.opcionais && dados.opcionais.length > 0) {
		for (const idopcional of dados.opcionais) {
			await pool.query('INSERT INTO produtoopcional (idproduto, idopcional) VALUES (?, ?)', [
				idproduto,
				idopcional,
			])
		}
	}

	return true
}

// NOVO: Deletar Produto
export async function deletarProdutoNoBanco(idproduto: number) {
	// 1. Apaga os vínculos de opcionais na tabela 'produtoopcional' primeiro (Regra Cascata!)
	await pool.query('DELETE FROM produtoopcional WHERE idproduto = ?', [idproduto])

	// 2. Apaga o produto na tabela 'produtos'
	const [resultado] = await pool.query('DELETE FROM produtos WHERE idproduto = ?', [idproduto])

	return resultado
}

// Nova função para listar produtos APENAS de uma categoria específica
export async function listarProdutosPorCategoriaDoBanco(idcategoria: number) {
	const [linhas] = await pool.query(
		'SELECT * FROM produtos WHERE idcategoria = ? AND ATIVO = 1 ORDER BY ordem ASC',
		[idcategoria]
	)
	return linhas
}
