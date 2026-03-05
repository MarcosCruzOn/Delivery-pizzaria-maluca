import { AdminLayout } from '../components/AdminLayout/AdminLayout'

export function renderDashboard(root: HTMLElement) {
	root.innerHTML = AdminLayout({
		title: 'Seja bem-vindo(a)!',
		iconClass: 'fas fa-home',
		active: 'home',
		content: `
      <!-- por enquanto vazio (igual seu home.html, que deixa conteudo-inner sem nada) -->
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p style="opacity:.6;">Dashboard em construção…</p>
          </div>
        </div>
      </div>
    `,
	})

	// logout simples (depois liga na autenticação de verdade)
	root.querySelector<HTMLButtonElement>('#btnLogout')?.addEventListener(
		'click',
		() => {
			localStorage.removeItem('admin_token')
			window.location.hash = '#/login'
		}
	)
}
