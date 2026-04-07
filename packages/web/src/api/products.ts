const API_URL = 'http://localhost:3333'

export async function getProductsByCategory(categoryId: number) {
	// Chamando a nossa rota nova pública!
	const response = await fetch(`${API_URL}/api/products/category/${categoryId}`)

	if (!response.ok) {
		throw new Error('Erro ao buscar produtos da categoria')
	}

	return response.json()
}
