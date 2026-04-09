import pool from '../database/connection.js'

export async function criarPedidoCompletoNoBanco(dadosDoPedido: any) {
	// 1. Pedimos um "atendente" exclusivo do banco para fazer a transação
	const conexao = await pool.getConnection()

	try {
		// 2. Avisamos o banco: "Comece a transação! Não salve nada definitivamente até eu mandar."
		await conexao.beginTransaction()

		// 3. Salva a "Nota Fiscal" (Tabela pedido)
		// Vamos fixar idpedidostatus como 1 (Ex: "Pendente/Novo")
		const [resultadoPedido]: any = await conexao.query(
			`INSERT INTO pedido 
      (idpedidostatus, idtipoentrega, idpagamentos, total, nomecliente, telefonecliente, endereço, numero, bairro, cep, complemento, troco) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				1, // Status do pedido (Novo)
				dadosDoPedido.idtipoentrega,
				dadosDoPedido.idpagamentos,
				dadosDoPedido.total,
				dadosDoPedido.nomecliente,
				dadosDoPedido.telefonecliente,
				dadosDoPedido.endereco, // Sem cedilha no JSON do Vite
				dadosDoPedido.numero,
				dadosDoPedido.bairro,
				dadosDoPedido.cep || null, // 👈 Agora o banco salva o CEP!
				dadosDoPedido.complemento || null, // 👈 Agora o banco salva o Complemento!
				dadosDoPedido.troco || null,
			]
		)

		// Pegamos o ID do pedido que acabou de ser criado!
		const idPedidoGerado = resultadoPedido.insertId

		// 4. Salva os Itens do Pedido (As Pizzas)
		// O site vai mandar um array (lista) de itens, então usamos um FOR para salvar um por um
		for (const item of dadosDoPedido.itens) {
			const [resultadoItem]: any = await conexao.query(
				`INSERT INTO pedidoitem (idpedido, idproduto, quantidade, observacao) VALUES (?, ?, ?, ?)`,
				[idPedidoGerado, item.idproduto, item.quantidade, item.observacao]
			)

			const idItemGerado = resultadoItem.insertId

			// 5. Salva os Opcionais do Item (Bordas, Adicionais) - se o cliente tiver escolhido algum!
			if (item.opcionais && item.opcionais.length > 0) {
				for (const idOpcionalItem of item.opcionais) {
					await conexao.query(
						`INSERT INTO pedidoitemopcional (idpedidoitem, idopcionalitem) VALUES (?, ?)`,
						[idItemGerado, idOpcionalItem]
					)
				}
			}
		}

		// 6. Se chegou até aqui sem dar erro em nada, mandamos o banco salvar tudo de vez!
		await conexao.commit()

		return idPedidoGerado
	} catch (erro) {
		// 7. Se deu QUALQUER erro no meio do caminho, desfazemos tudo (Rollback)
		await conexao.rollback()
		throw erro // Repassamos o erro para o Controller ver
	} finally {
		// 8. Independente de dar certo ou errado, devolvemos o "atendente" pro banco
		conexao.release()
	}
}

// Função para listar os pedidos para o Admin
export async function listarPedidosDoBanco() {
	// Usamos o INNER JOIN para ligar a tabela pedido (p) com as tabelas de status (s), pagamento (pag) e entrega (te)
	// O "ORDER BY p.datacadastro DESC" garante que os pedidos mais novos fiquem no topo da lista!
	const query = `
    SELECT 
      p.idpedido, 
      p.nomecliente, 
      p.telefonecliente, 
      p.total, 
      p.datacadastro,
      s.descricao AS status,
      pag.nome AS pagamento,
      te.nome AS tipo_entrega
    FROM pedido p
    INNER JOIN pedidostatus s ON p.idpedidostatus = s.idpedidostatus
    INNER JOIN pagamentos pag ON p.idpagamentos = pag.idpagamentos
    INNER JOIN tipoentrega te ON p.idtipoentrega = te.idtipoentrega
    ORDER BY p.datacadastro DESC
  `

	const [linhas] = await pool.query(query)
	return linhas
}

// Função para atualizar o status do pedido
export async function atualizarStatusDoPedido(idpedido: number, idpedidostatus: number) {
	// O comando UPDATE vai alterar apenas a coluna idpedidostatus daquele pedido específico
	const [resultado] = await pool.query(
		'UPDATE pedido SET idpedidostatus = ? WHERE idpedido = ?',
		[idpedidostatus, idpedido]
	)

	return resultado
}

// Adicione esta função no final do seu orders.services.ts

export async function buscarDetalhesDoPedido(idpedido: number) {
	// 1. Busca a "Capa" do pedido (Endereço, totais, pagamento e O TIPO DA TAXA)
	const queryPedido = `
		SELECT 
			p.*, 
			te.nome AS tipo_entrega, 
			pag.nome AS pagamento,
            txtipo.nome AS taxa_nome,
            tx.valor AS taxa_valor
		FROM pedido p
		INNER JOIN tipoentrega te ON p.idtipoentrega = te.idtipoentrega
		INNER JOIN pagamentos pag ON p.idpagamentos = pag.idpagamentos
        LEFT JOIN taxaentrega tx ON p.idtaxaentrega = tx.idtaxaentrega
        LEFT JOIN taxaentregatipo txtipo ON tx.idtaxaentregatipo = txtipo.idtaxaentregatipo
		WHERE p.idpedido = ?
	`
	const [pedidoRows]: any = await pool.query(queryPedido, [idpedido])

	if (pedidoRows.length === 0) throw new Error('Pedido não encontrado')
	const pedido = pedidoRows[0]

	// 2. Busca os Itens do pedido (As Pizzas)
	const queryItens = `
		SELECT 
			pi.idpedidoitem, 
			pi.quantidade, 
			pi.observacao, 
			pr.nome AS produto_nome, 
			pr.valor AS produto_valor
		FROM pedidoitem pi
		INNER JOIN produtos pr ON pi.idproduto = pr.idproduto
		WHERE pi.idpedido = ?
	`
	const [itensRows]: any = await pool.query(queryItens, [idpedido])

	// 3. Busca os Opcionais de cada Item (As Bordas, Adicionais)
	for (let item of itensRows) {
		const queryOpcionais = `
			SELECT 
				oi.nome AS opcional_nome, 
				oi.valor AS opcional_valor
			FROM pedidoitemopcional pio
			INNER JOIN opcionalitem oi ON pio.idopcionalitem = oi.idopcionalitem
			WHERE pio.idpedidoitem = ?
		`
		const [opcionaisRows]: any = await pool.query(queryOpcionais, [item.idpedidoitem])

		// Colocamos os opcionais dentro do item!
		item.opcionais = opcionaisRows
	}

	// 4. Colocamos os itens dentro do pedido e devolvemos o pacote completo!
	pedido.itens = itensRows
	return pedido
}
