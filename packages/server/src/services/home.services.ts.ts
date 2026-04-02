import pool from '../database/connection.js'

export async function obterResumoDashboardNoBanco() {
	// 1. Faturamento de Hoje (Soma o total dos pedidos que NÃO foram recusados hoje)
	// Status 6 = Recusado. A função CURDATE() pega só os pedidos de hoje!
	const [faturamentoHojeRows]: any = await pool.query(`
		SELECT COALESCE(SUM(total), 0) as totalFaturamento
		FROM pedido
		WHERE DATE(datacadastro) = CURDATE() AND idpedidostatus != 6 
	`)

	// 2. Total de Pedidos de Hoje
	const [pedidosHojeRows]: any = await pool.query(`
		SELECT COUNT(idpedido) as totalPedidos
		FROM pedido
		WHERE DATE(datacadastro) = CURDATE()
	`)

	// 3. Pedidos Pendentes (Status 1)
	const [pendentesRows]: any = await pool.query(`
		SELECT COUNT(idpedido) as totalPendentes
		FROM pedido
		WHERE idpedidostatus = 1
	`)

	// Devolvemos um pacotinho com todos os números mastigados!
	return {
		faturamentoHoje: faturamentoHojeRows[0].totalFaturamento,
		pedidosHoje: pedidosHojeRows[0].totalPedidos,
		pedidosPendentes: pendentesRows[0].totalPendentes,
	}
}
