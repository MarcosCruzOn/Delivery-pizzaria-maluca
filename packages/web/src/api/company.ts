const API_URL = 'http://localhost:3333'

export async function getCompany() {
	const response = await fetch(`${API_URL}/company`)

	if (!response.ok) {
		throw new Error('Erro ao buscar dados da loja')
	}

	return response.json()
}
