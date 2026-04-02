const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function getHomeSummary() {
	// Busca os dados daquela rota que criamos no backend!
	const res = await fetch('/api/admin/dashboard', { headers: getAuthHeaders() })
	if (!res.ok) throw new Error('Erro ao buscar resumo da home')
	return res.json()
}
