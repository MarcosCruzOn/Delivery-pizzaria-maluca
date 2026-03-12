type CreateProductDTO = {
	idcategoria: number
	nome: string
	descricao: string
	valor: number
	imagem: string | null
}

export async function createProduct(data: CreateProductDTO) {
	const response = await fetch('/admin/products', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error('Erro ao salvar produto')
	}

	return response.json()
}

export async function getProducts() {
	const response = await fetch('/admin/products')

	if (!response.ok) {
		throw new Error('Erro ao buscar produtos')
	}

	return response.json()
}

export async function deleteProduct(id: number) {
	const response = await fetch(`/admin/products/${id}`, {
		method: 'DELETE',
	})

	if (!response.ok) {
		throw new Error('Erro ao remover produto')
	}

	return response.json()
}

export async function updateProduct(id: number, data: any) {
	const response = await fetch(`/admin/products/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error('Erro ao atualizar produto')
	}

	return response.json()
}
