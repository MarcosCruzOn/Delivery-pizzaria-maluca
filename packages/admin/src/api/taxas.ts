const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function getTaxas() {
	const res = await fetch('/api/admin/taxas', { headers: getAuthHeaders() })
	if (!res.ok) throw new Error('Erro ao buscar taxas de entrega')
	return res.json()
}

export async function updateTaxa(id: number, valor: number) {
	const res = await fetch(`/api/admin/taxas/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
		body: JSON.stringify({ valor }),
	})
	if (!res.ok) throw new Error('Erro ao atualizar taxa')
	return res.json()
}
