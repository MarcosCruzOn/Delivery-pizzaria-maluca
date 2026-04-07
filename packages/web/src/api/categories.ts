const API_URL = 'http://localhost:3333'

export async function getCategories() {
	// Adicionando o /api para ver se a porta se abre!
	const response = await fetch(`${API_URL}/api/categories`)

	if (!response.ok) {
		throw new Error('Erro ao buscar categorias')
	}

	return response.json()
}
