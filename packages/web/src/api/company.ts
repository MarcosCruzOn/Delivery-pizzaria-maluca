const API_URL = 'http://localhost:3333'

export async function getCompany() {
	const response = await fetch(`${API_URL}/api/company`) // 👈 Rota pública!

	if (!response.ok) {
		throw new Error('Erro ao buscar dados da empresa')
	}

	return response.json()
}

export async function getHorarios() {
	const response = await fetch(`${API_URL}/api/horarios`) // 👈 Já criamos essa rota pública antes!

	if (!response.ok) {
		throw new Error('Erro ao buscar horários')
	}

	return response.json()
}
