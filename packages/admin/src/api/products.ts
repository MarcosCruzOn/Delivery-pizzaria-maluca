const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function getProducts() {
	const res = await fetch('/api/admin/products')
	if (!res.ok) throw new Error('Erro ao buscar produtos')
	return res.json()
}

export async function createProduct(data: any) {
	const res = await fetch('/api/admin/products', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify(data),
	})
	if (!res.ok) {
		const erroDoBackend = await res.json()
		throw new Error(erroDoBackend.erro || 'Erro ao criar produto')
	}
}

export async function updateProduct(id: number, data: any) {
	// Atenção: Ainda não criamos essa rota no backend!
	const res = await fetch(`/api/admin/products/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify(data),
	})
	if (!res.ok) {
		const erroDoBackend = await res.json()
		throw new Error(erroDoBackend.erro || 'Erro ao atualizar produto')
	}
}

export async function deleteProduct(id: number) {
	// Atenção: Ainda não criamos essa rota no backend!
	const res = await fetch(`/api/admin/products/${id}`, {
		method: 'DELETE',
		headers: getAuthHeaders(),
	})
	if (!res.ok) {
		const erroDoBackend = await res.json()
		throw new Error(erroDoBackend.erro || 'Erro ao deletar produto')
	}
}

export async function getProductOpcionais(id: number) {
	const res = await fetch(`/api/admin/products/${id}/opcionais`)
	if (!res.ok) throw new Error('Erro ao buscar opcionais do produto')
	return res.json()
}
