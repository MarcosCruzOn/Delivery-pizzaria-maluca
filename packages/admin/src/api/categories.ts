const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function getCategories() {
	// Adicionamos o /api no começo! E como no backend deixamos a listagem pública, não precisa de token aqui
	const res = await fetch('/api/admin/categories')
	if (!res.ok) throw new Error('Erro ao buscar categorias')
	return res.json()
}

export async function createCategory(data: any) {
	const res = await fetch('/api/admin/categories', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(), // Mandando o crachá!
		},
		body: JSON.stringify(data),
	})
	if (!res.ok) throw new Error('Erro ao criar categoria')
	return res.json()
}

export async function deleteCategory(id: number) {
	// Atenção: Ainda não criamos essa rota no backend!
	const res = await fetch(`/api/admin/categories/${id}`, {
		method: 'DELETE',
		headers: getAuthHeaders(),
	})
	if (!res.ok) throw new Error('Erro ao deletar categoria')
	return res.json()
}
