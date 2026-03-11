const API_URL = 'http://localhost:3333'

export async function getCategories() {
	const response = await fetch(`${API_URL}/admin/categories`)

	if (!response.ok) {
		throw new Error('Erro ao buscar categorias')
	}

	return response.json()
}

export async function createCategory(data: {
	nome: string
	icone: string
	ordem: number
}) {
	const response = await fetch(`${API_URL}/admin/categories`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error('Erro ao criar categoria')
	}

	return response.json()
}

export async function deleteCategory(id: number) {
	const response = await fetch(
		`http://localhost:3333/admin/categories/${id}`,
		{
			method: 'DELETE',
		}
	)

	if (!response.ok) {
		throw new Error('Erro ao deletar categoria')
	}

	return response.json()
}
