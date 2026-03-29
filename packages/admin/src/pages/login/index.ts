// export function renderLogin(root: HTMLElement) {
// 	root.innerHTML = `
//     <section class="login">
//       <div class="card card-login">

//         <!-- em Vite: coloque a logo em packages/admin/public/logo.png e use /logo.png -->
//         <img src="img/logo.png" width="100" />

//         <div class="form-group mb-2">
//           <span class="icon-form">
//             <i class="fas fa-envelope"></i>
//           </span>
//           <input id="email" type="email" class="form-control" placeholder="E-mail" />
//         </div>

//         <div class="form-group mb-3">
//           <span class="icon-form">
//             <i class="fas fa-lock"></i>
//           </span>
//           <input id="password" type="password" class="form-control" placeholder="Senha" />
//         </div>

//         <a href="#/forgot" class="link">
//           Esqueceu sua senha?
//         </a>

//         <button class="btn btn-yellow btn-login mt-4" id="btnLogin" type="button">
//           Fazer Login
//         </button>

//         <button class="btn btn-google mt-2" id="btnGoogle" type="button">
//           Entrar com Google
//         </button>

//       </div>
//     </section>
//   `

// 	root.querySelector<HTMLButtonElement>('#btnLogin')!.addEventListener(
// 		'click',
// 		async () => {
// 			const email = root
// 				.querySelector<HTMLInputElement>('#email')!
// 				.value.trim()
// 			const password = root
// 				.querySelector<HTMLInputElement>('#password')!
// 				.value.trim()

// 			// por enquanto: só validação simples (depois liga na API)
// 			if (!email || !password) {
// 				alert('Preencha email e senha')
// 				return
// 			}

// 			// depois: POST /api/admin/login
// 			// localStorage.setItem('admin_token', 'fake-token')
// 			// window.location.hash = '#/home'
// 			try {
// 				const response = await fetch(
// 					'http://localhost:3000/api/auth/login',
// 					{
// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/json',
// 						},
// 						body: JSON.stringify({
// 							email,
// 							password,
// 						}),
// 					}
// 				)

// 				const data = await response.json()

// 				if (!response.ok) {
// 					alert(data.error)
// 					return
// 				}

// 				// sucesso
// 				localStorage.setItem('admin_token', data.token)
// 				window.location.hash = '#/home'
// 			} catch (error) {
// 				console.error(error)
// 				alert('Erro ao conectar com servidor')
// 			}
// 		}
// 	)

// 	root.querySelector<HTMLButtonElement>('#btnGoogle')!.addEventListener(
// 		'click',
// 		() => {
// 			window.location.href = 'http://localhost:3000/api/auth/google'
// 		}
// 	)
// }
// Importamos a função que acabamos de criar!
import { fazerLoginAPI } from '../../api/auth'

export function renderLogin(root: HTMLElement) {
	root.innerHTML = `
    <section class="login">
      <div class="card card-login">
        <img src="img/logo.png" width="100" />

        <div class="form-group mb-2">
          <span class="icon-form"><i class="fas fa-envelope"></i></span>
          <input id="email" type="email" class="form-control" placeholder="E-mail" value="teste@email.com" />
        </div>

        <div class="form-group mb-3">
          <span class="icon-form"><i class="fas fa-lock"></i></span>
          <input id="password" type="password" class="form-control" placeholder="Senha" value="123" />
        </div>

        <a href="#/forgot" class="link">Esqueceu sua senha?</a>

        <button class="btn btn-yellow btn-login mt-4" id="btnLogin" type="button">
          Fazer Login
        </button>

        </div>
    </section>
  `

	// --- LÓGICA DO BOTÃO ---
	root.querySelector<HTMLButtonElement>('#btnLogin')!.addEventListener(
		'click',
		async () => {
			const email = root
				.querySelector<HTMLInputElement>('#email')!
				.value.trim()
			const password = root
				.querySelector<HTMLInputElement>('#password')!
				.value.trim()

			if (!email || !password) {
				alert('Preencha email e senha')
				return
			}

			try {
				// 1. Chamamos o "Garçom" passando os dados
				const dadosDoServidor = await fazerLoginAPI(email, password)

				// 2. Salvamos o "Crachá" (Token) no navegador do usuário para usarmos nas próximas telas!
				localStorage.setItem('admin_token', dadosDoServidor.token)

				// 3. Redirecionamos ele para o painel
				alert(dadosDoServidor.mensagem) // Vai mostrar "Login realizado com sucesso!"

				// Observação: Mudei para #/dashboard baseado na sua estrutura de pastas!
				window.location.hash = '#/home'
			} catch (error: any) {
				// Se a senha estiver errada, a mensagem de erro do backend aparece aqui!
				alert(error.message)
			}
		}
	)
}
