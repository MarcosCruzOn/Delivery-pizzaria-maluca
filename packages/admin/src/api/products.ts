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
