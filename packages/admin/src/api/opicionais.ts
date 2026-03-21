const API_URL = 'http://localhost:3333'

export async function getOpcionais() {
	const response = await fetch(`${API_URL}/admin/opcionais`)

	if (!response.ok) {
		throw new Error('Erro ao buscar categorias')
	}

	return response.json()
}

export async function getOpcionalItens(id: number) {
	const response = await fetch(`${API_URL}/admin/opcionais/${id}/itens`)
	if (!response.ok) {
		throw new Error('Erro ao buscar categorias')
	}

	return response.json()
}
