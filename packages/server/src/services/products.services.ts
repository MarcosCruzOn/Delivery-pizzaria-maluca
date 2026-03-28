import pool from '../database/connection.js'

// Função para criar um novo produto no banco
export async function criarProdutoNoBanco(
	idcategoria: number,
	nome: string,
	descricao: string,
	valor: number,
	ordem: number
) {
	// O comando INSERT INTO agora inclui o idcategoria para fazer o vínculo
	const [resultado] = await pool.query(
		'INSERT INTO produtos (idcategoria, nome, descricao, valor, ordem) VALUES (?, ?, ?, ?, ?)',
		[idcategoria, nome, descricao, valor, ordem]
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
export async function atualizarImagemDoProduto(
	idproduto: number,
	nomeDaImagem: string
) {
	// O comando UPDATE altera uma linha que já existe.
	// O "WHERE idproduto = ?" garante que não vamos colocar a foto da calabresa na coca-cola sem querer!
	const [resultado] = await pool.query(
		'UPDATE produtos SET imagem = ? WHERE idproduto = ?',
		[nomeDaImagem, idproduto]
	)

	return resultado
}

// Nova função para VINCULAR o Grupo de Opcionais (Caixa) à Pizza
export async function vincularOpcionalAoProduto(
	idproduto: number,
	idopcional: number
) {
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
