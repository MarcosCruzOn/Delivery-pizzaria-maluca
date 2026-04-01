const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function getOrders() {
	const res = await fetch('/api/admin/orders', { headers: getAuthHeaders() })
	if (!res.ok) throw new Error('Erro ao buscar pedidos')
	return res.json()
}

export async function updateOrderStatus(idpedido: number, idpedidostatus: number) {
	const res = await fetch(`/api/admin/orders/${idpedido}/status`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
		body: JSON.stringify({ idpedidostatus }),
	})
	if (!res.ok) throw new Error('Erro ao atualizar status do pedido')
	return res.json()
}
