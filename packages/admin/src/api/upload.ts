// Pega o token de segurança salvo no navegador
const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return { Authorization: `Bearer ${token}` }
}

export async function uploadProductImage(file: File) {
	const formData = new FormData()
	// 'file' é o nome exato do campo que o multer (no backend) está esperando ler
	formData.append('file', file)

	// 1. Corrigimos o endereço para /api/admin/upload
	const res = await fetch('/api/admin/upload', {
		method: 'POST',
		headers: getAuthHeaders(),
		// ⚠️ ATENÇÃO: Nunca coloque 'Content-Type': 'multipart/form-data' aqui!
		// O próprio navegador precisa calcular e colocar sozinho os "boundaries" (fronteiras) do arquivo.
		body: formData,
	})

	if (!res.ok) {
		throw new Error('Erro ao fazer upload da imagem')
	}

	return res.json()
}
