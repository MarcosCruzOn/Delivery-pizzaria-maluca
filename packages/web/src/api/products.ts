const API_URL = 'http://localhost:3333'

export async function getProductsByCategory(categoryId: number) {
	const response = await fetch(
		`${API_URL}/admin/products?categoryId=${categoryId}`
	)

	if (!response.ok) {
		throw new Error('Erro ao buscar produtos')
	}

	return response.json()
}
