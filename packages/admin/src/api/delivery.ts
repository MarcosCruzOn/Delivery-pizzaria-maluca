const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function getDeliveryTypes() {
	const res = await fetch('/api/admin/delivery-types', { headers: getAuthHeaders() })
	if (!res.ok) throw new Error('Erro ao buscar configurações')
	return res.json()
}

export async function updateDeliveryType(id: number, data: any) {
	const res = await fetch(`/api/admin/delivery-types/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
		body: JSON.stringify(data),
	})
	if (!res.ok) throw new Error('Erro ao atualizar configuração')
	return res.json()
}
