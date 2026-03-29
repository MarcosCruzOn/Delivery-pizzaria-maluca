// Função auxiliar para pegar o token do navegador
const getAuthHeaders = () => {
	const token = localStorage.getItem('admin_token')
	return {
		Authorization: `Bearer ${token}`,
	}
}

// O ID da sua empresa (vamos fixar como 2 por enquanto, baseado nos testes anteriores)
const EMPRESA_ID = 2

export async function buscarDadosEmpresa() {
	// Usamos o proxy do Vite (/api) em vez de http://localhost:3333
	const res = await fetch(`/api/admin/company/${EMPRESA_ID}`, {
		headers: getAuthHeaders(),
	})
	if (!res.ok) throw new Error('Erro ao buscar dados da empresa')
	return res.json()
}

export async function atualizarEmpresa(dados: any) {
	const res = await fetch(`/api/admin/company/${EMPRESA_ID}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify(dados),
	})
	if (!res.ok) throw new Error('Erro ao atualizar empresa')
	return res.json()
}

export async function fazerUploadLogo(file: File) {
	const formData = new FormData()
	formData.append('file', file)

	const res = await fetch('/api/admin/upload', {
		method: 'POST',
		headers: getAuthHeaders(), // O navegador coloca o Content-Type multipart automaticamente
		body: formData,
	})
	if (!res.ok) throw new Error('Erro no upload')
	return res.json()
}

export async function salvarLogoEmpresa(nomeImagem: string) {
	const res = await fetch(`/api/admin/company/${EMPRESA_ID}/logo`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify({ logotipo: nomeImagem }),
	})
	if (!res.ok) throw new Error('Erro ao salvar logo')
	return res.json()
}

// --- HORÁRIOS ---
export async function listarHorarios() {
	const res = await fetch('/api/horarios') // Essa rota nós deixamos pública, sem token!
	if (!res.ok) throw new Error('Erro ao buscar horários')
	return res.json()
}

export async function criarHorario(dados: any) {
	const res = await fetch('/api/admin/horarios', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify(dados),
	})
	if (!res.ok) throw new Error('Erro ao salvar horário')
	return res.json()
}

// --- INTEGRAÇÃO VIACEP ---
export async function buscarCepNaViaCep(cep: string) {
	// Primeiro, limpamos o CEP tirando o traço, deixando só os números (ex: 66000-000 vira 66000000)
	const cepLimpo = cep.replace(/\D/g, '')

	// Validamos se o CEP tem exatamente 8 números
	if (cepLimpo.length !== 8) {
		throw new Error('CEP inválido. Digite 8 números.')
	}

	// Fazemos a requisição direto para a API pública do ViaCEP
	const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)

	if (!res.ok) {
		throw new Error('Erro ao conectar com o ViaCEP')
	}

	const data = await res.json()

	// O ViaCEP retorna um { erro: true } se o CEP não existir (ex: 00000000)
	if (data.erro) {
		throw new Error('CEP não encontrado!')
	}

	// Devolvemos os dados prontinhos (logradouro, bairro, localidade, uf)
	return data
}
