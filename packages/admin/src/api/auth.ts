export async function login(email: string, password: string) {
	// depois você troca pra POST /api/admin/login
	if (!email || !password) throw new Error('Informe email e senha')
	return { token: 'fake-token' }
}
