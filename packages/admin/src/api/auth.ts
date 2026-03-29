// Essa função recebe o email e a senha da tela e manda pro Servidor
export async function fazerLoginAPI(email: string, senha: string) {
	// 1. Fazemos a chamada (fetch) para a porta 3333 que criamos!
	const response = await fetch(`api/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		// O nome da variável tem que bater exatamente com o que o backend espera!
		body: JSON.stringify({ email, senha }),
	})

	// 2. Transformamos a resposta do servidor em JSON
	const data = await response.json()

	// 3. Se o status não for 200 OK (ex: 401 Senha Incorreta), nós disparamos um erro
	if (!response.ok) {
		// Lembra que no backend a gente devolvia res.json({ erro: '...' })? É aqui que lemos ele!
		throw new Error(
			data.erro || 'Erro desconhecido ao conectar com o servidor'
		)
	}

	// 4. Se deu tudo certo, devolvemos os dados (que incluem o Token!)
	return data
}
