export async function uploadProductImage(file: File) {
	const formData = new FormData()
	formData.append('image', file)

	const response = await fetch('/upload', {
		method: 'POST',
		body: formData,
	})

	if (!response.ok) {
		throw new Error('Erro ao enviar imagem')
	}

	return response.json() as Promise<{ message: string; imageUrl: string }>
}
