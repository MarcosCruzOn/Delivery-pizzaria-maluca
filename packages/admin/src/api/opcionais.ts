const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function getOpcionais() {
	const res = await fetch('/api/admin/opcionais')
	if (!res.ok) throw new Error('Erro ao buscar opcionais')
	return res.json()
}

export async function createOpcional(data: any) {
	const res = await fetch('/api/admin/opcionais', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify(data),
	})
	if (!res.ok) throw new Error('Erro ao criar opcional')
	return res.json()
}

export async function getOpcionalItens(idOpcional: number) {
	const res = await fetch(`/api/admin/opcionais/${idOpcional}/itens`)
	if (!res.ok) throw new Error('Erro ao buscar itens do opcional')
	return res.json()
}

export async function createOpcionalItem(data: any) {
	const res = await fetch(`/api/admin/opcionais/${data.idopcional}/itens`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify(data),
	})
	if (!res.ok) throw new Error('Erro ao criar item do opcional')
	return res.json()
}

// ... (mantenha o código que já existe aí) ...

export async function updateOpcional(id: number, data: any) {
	const res = await fetch(`/api/admin/opcionais/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
		body: JSON.stringify(data),
	})
	if (!res.ok) {
		const err = await res.json()
		throw new Error(err.erro || 'Erro ao atualizar grupo')
	}
	return res.json()
}

export async function deleteOpcional(id: number) {
	const res = await fetch(`/api/admin/opcionais/${id}`, {
		method: 'DELETE',
		headers: getAuthHeaders(),
	})
	if (!res.ok) {
		const err = await res.json()
		throw new Error(err.erro || 'Erro ao deletar grupo')
	}
	return res.json()
}

export async function updateOpcionalItem(idItem: number, data: any) {
	const res = await fetch(`/api/admin/opcionais/itens/${idItem}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
		body: JSON.stringify(data),
	})
	if (!res.ok) {
		const err = await res.json()
		throw new Error(err.erro || 'Erro ao atualizar item')
	}
	return res.json()
}

export async function deleteOpcionalItem(idItem: number) {
	const res = await fetch(`/api/admin/opcionais/itens/${idItem}`, {
		method: 'DELETE',
		headers: getAuthHeaders(),
	})
	if (!res.ok) {
		const err = await res.json()
		throw new Error(err.erro || 'Erro ao deletar item')
	}
	return res.json()
}
