const API_URL = 'http://localhost:3333'

export async function createOpcional(data: any) {
	const response = await fetch(`${API_URL}/admin/opcionais`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error('Erro ao criar opcional')
	}

	return response.json()
}

export async function getOpcionais() {
	const response = await fetch(`${API_URL}/admin/opcionais`)

	if (!response.ok) {
		throw new Error('Erro ao buscar opcionais')
	}

	return response.json()
}

export async function getOpcionalItens(id: number) {
	const response = await fetch(`${API_URL}/admin/opcionais/${id}/itens`)

	if (!response.ok) {
		throw new Error('Erro ao buscar itens do opcional')
	}

	return response.json()
}
