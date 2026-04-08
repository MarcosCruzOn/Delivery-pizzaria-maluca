const API_URL = 'http://localhost:3333'

export async function createOrder(orderData: any) {
	const response = await fetch(`${API_URL}/api/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(orderData),
	})

	if (!response.ok) {
		const err = await response.json()
		throw new Error(err.erro || 'Erro ao criar o pedido')
	}

	return response.json()
}
