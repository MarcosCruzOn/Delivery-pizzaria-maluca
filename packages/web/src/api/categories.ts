const API_URL = 'http://localhost:3333'

export async function getCategories() {
	const response = await fetch(`${API_URL}/admin/categories`)

	if (!response.ok) {
		throw new Error('Erro ao buscar categorias')
	}

	return response.json()
}
