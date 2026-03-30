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
      (idpedidostatus, idtipoentrega, idpagamentos, total, nomecliente, telefonecliente, endereço, numero, bairro) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
			]
		)

		// Pegamos o ID do pedido que acabou de ser criado!
		const idPedidoGerado = resultadoPedido.insertId

		// 4. Salva os Itens do Pedido (As Pizzas)
		// O site vai mandar um array (lista) de itens, então usamos um FOR para salvar um por um
		for (const item of dadosDoPedido.itens) {
			const [resultadoItem]: any = await conexao.query(
				`INSERT INTO pedidoitem (idpedido, idproduto, quantidade, observacao) VALUES (?, ?, ?, ?)`,
				[
					idPedidoGerado,
					item.idproduto,
					item.quantidade,
					item.observacao,
				]
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
export async function atualizarStatusDoPedido(
	idpedido: number,
	idpedidostatus: number
) {
	// O comando UPDATE vai alterar apenas a coluna idpedidostatus daquele pedido específico
	const [resultado] = await pool.query(
		'UPDATE pedido SET idpedidostatus = ? WHERE idpedido = ?',
		[idpedidostatus, idpedido]
	)

	return resultado
}
