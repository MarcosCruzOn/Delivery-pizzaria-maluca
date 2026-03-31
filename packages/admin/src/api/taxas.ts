const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function getTaxas() {
	const res = await fetch('/api/admin/taxas', { headers: getAuthHeaders() })
	if (!res.ok) throw new Error('Erro ao buscar taxas de entrega')
	return res.json()
}

export async function updateTaxa(idTipo: number, valor: number = 0) {
	// Mudamos a URL para /tipo/${idTipo}
	const res = await fetch(`/api/admin/taxas/tipo/${idTipo}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
		body: JSON.stringify({ valor }),
	})
	if (!res.ok) throw new Error('Erro ao atualizar modo de taxa')
	return res.json()
}

export async function addFaixaDistancia(distancia: number, valor: number) {
	const res = await fetch(`/api/admin/taxas/distancia`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
		body: JSON.stringify({ distancia, valor }),
	})
	if (!res.ok) throw new Error('Erro ao adicionar faixa')
	return res.json()
}

export async function removeFaixaDistancia(idFaixa: number) {
	const res = await fetch(`/api/admin/taxas/distancia/${idFaixa}`, {
		method: 'DELETE',
		headers: getAuthHeaders(),
	})
	if (!res.ok) throw new Error('Erro ao remover faixa')
	return res.json()
}
