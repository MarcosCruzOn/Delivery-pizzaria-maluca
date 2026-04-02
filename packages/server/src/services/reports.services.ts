import pool from '../database/connection.js'

export async function obterDadosRelatorio(dataInicio: string, dataFim: string) {
	// 1. Resumo Geral
	const queryResumo = `
		SELECT 
			COUNT(idpedido) as totalPedidos,
			COALESCE(SUM(total), 0) as faturamentoTotal
		FROM pedido
		WHERE DATE(datacadastro) BETWEEN ? AND ? 
		AND idpedidostatus != 6
	`
	const [resumoRows]: any = await pool.query(queryResumo, [dataInicio, dataFim])
	const resumo = resumoRows[0]

	// A CONVERSÃO SALVADORA: Transforma o BigInt/String do Banco em Número normal!
	const totalPedidos = Number(resumo.totalPedidos || 0)
	const faturamentoTotal = Number(resumo.faturamentoTotal || 0)

	// Calcula o Ticket Médio com segurança
	const ticketMedio = totalPedidos > 0 ? faturamentoTotal / totalPedidos : 0

	// 2. Dados para o Gráfico (Faturamento agrupado dia por dia)
	const queryGrafico = `
		SELECT 
			DATE_FORMAT(datacadastro, '%d/%m/%Y') as data_venda,
			SUM(total) as faturamento_dia
		FROM pedido
		WHERE DATE(datacadastro) BETWEEN ? AND ?
		AND idpedidostatus != 6
		GROUP BY DATE(datacadastro), DATE_FORMAT(datacadastro, '%d/%m/%Y')
		ORDER BY DATE(datacadastro) ASC
	`
	const [graficoRows]: any = await pool.query(queryGrafico, [dataInicio, dataFim])

	// Limpa os valores do gráfico também
	const graficoFormatado = graficoRows.map((linha: any) => ({
		data_venda: linha.data_venda,
		faturamento_dia: Number(linha.faturamento_dia || 0),
	}))

	// Devolvemos o pacote mastigado e à prova de bugs!
	return {
		totais: {
			pedidos: totalPedidos,
			faturamento: faturamentoTotal,
			ticketMedio: ticketMedio,
		},
		grafico: graficoFormatado,
	}
}

export async function obterHistoricoPedidos(dataInicio: string, dataFim: string) {
	const query = `
		SELECT 
			p.idpedido,
			p.nomecliente,
			te.nome AS tipo_entrega,
			pag.nome AS pagamento,
			p.datacadastro,
			ps.descricao AS status,
			p.total
		FROM pedido p
		INNER JOIN tipoentrega te ON p.idtipoentrega = te.idtipoentrega
		INNER JOIN pagamentos pag ON p.idpagamentos = pag.idpagamentos
		INNER JOIN pedidostatus ps ON p.idpedidostatus = ps.idpedidostatus
		WHERE DATE(p.datacadastro) BETWEEN ? AND ?
		ORDER BY p.datacadastro DESC
	`

	const [linhas] = await pool.query(query, [dataInicio, dataFim])
	return linhas
}
