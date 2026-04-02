const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function getReports(inicio: string, fim: string) {
	const res = await fetch(`/api/admin/reports?inicio=${inicio}&fim=${fim}`, {
		headers: getAuthHeaders(),
	})
	if (!res.ok) throw new Error('Erro ao buscar relatórios')
	return res.json()
}
