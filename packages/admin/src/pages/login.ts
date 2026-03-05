export function renderLogin(root: HTMLElement) {
	root.innerHTML = `
    <section class="login">
      <div class="card card-login">

        <!-- em Vite: coloque a logo em packages/admin/public/logo.png e use /logo.png -->
        <img src="img/logo.png" width="100" />

        <div class="form-group mb-2">
          <span class="icon-form">
            <i class="fas fa-envelope"></i>
          </span>
          <input id="email" type="email" class="form-control" placeholder="E-mail" />
        </div>

        <div class="form-group mb-3">
          <span class="icon-form">
            <i class="fas fa-lock"></i>
          </span>
          <input id="password" type="password" class="form-control" placeholder="Senha" />
        </div>

        <a href="#/forgot" class="link">
          Esqueceu sua senha?
        </a>

        <button class="btn btn-yellow btn-login mt-4" id="btnLogin" type="button">
          Fazer Login
        </button>

      </div>
    </section>
  `

	root.querySelector<HTMLButtonElement>('#btnLogin')!.addEventListener(
		'click',
		async () => {
			const email = root
				.querySelector<HTMLInputElement>('#email')!
				.value.trim()
			const password = root
				.querySelector<HTMLInputElement>('#password')!
				.value.trim()

			// por enquanto: só validação simples (depois liga na API)
			if (!email || !password) {
				alert('Preencha email e senha')
				return
			}

			// depois: POST /api/admin/login
			localStorage.setItem('admin_token', 'fake-token')
			window.location.hash = '#/home'
		}
	)
}
