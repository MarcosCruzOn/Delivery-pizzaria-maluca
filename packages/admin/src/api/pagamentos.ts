const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function getPagamentos() {
	const res = await fetch('/api/admin/pagamentos', {
		headers: getAuthHeaders(),
	})
	if (!res.ok) throw new Error('Erro ao buscar pagamentos')
	return res.json()
}

export async function togglePagamento(id: number, ativo: boolean) {
	const res = await fetch(`/api/admin/pagamentos/${id}/toggle`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify({ ativo }),
	})
	if (!res.ok) throw new Error('Erro ao atualizar status do pagamento')
	return res.json()
}
