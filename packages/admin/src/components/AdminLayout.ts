type LayoutProps = {
	title: string
	iconClass: string // ex: "fas fa-home"
	active: 'home' | 'orders' | 'menu' | 'settings' | 'company' | 'reports'
	content: string // HTML da página
}

function menuItem(
	label: string,
	icon: string,
	href: string,
	isActive: boolean
) {
	return `
    <a href="${href}" class="menu-item ${isActive ? 'active' : ''}">
      <i class="${icon}"></i> ${label}
    </a>
  `
}

export function AdminLayout(props: LayoutProps): string {
	const { title, iconClass, active, content } = props

	return `
    <section class="bg-menu">
      <div class="menu-left">
        <div class="logo">
          <!-- no Vite: coloque /logo.png em admin/public -->
          <img src="/logo.png" width="100" />
        </div>

        <div class="menus">
          ${menuItem('Início', 'fas fa-home', '#/home', active === 'home')}
          ${menuItem('Pedidos', 'fas fa-utensils', '#/orders', active === 'orders')}
          ${menuItem('Cardápio', 'fas fa-book-open', '#/menu', active === 'menu')}
          ${menuItem('Configurações', 'fas fa-cog', '#/settings', active === 'settings')}
          ${menuItem('Empresa', 'fas fa-building', '#/company', active === 'company')}
          ${menuItem('Relatório', 'fas fa-chart-line', '#/reports', active === 'reports')}
        </div>
      </div>

      <div class="conteudo">
        <div class="menu-top">
          <div class="container">
            <div class="row">
              <div class="col-12 d-flex align-items-center mt-4">

                <h1 class="title-page">
                  <b>
                    <i class="${iconClass}"></i>&nbsp; ${title}
                  </b>
                </h1>

                <div class="container-right">
                  <div class="container-dados">
                    <p>Pizzaria Maluca</p>
                    <span>pizzariamaluca@contato.com</span>
                  </div>

                  <button class="btn btn-white btn-sm" id="btnLogout" type="button">
                    <i class="fas fa-sign-out-alt"></i>&nbsp; Sair
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="conteudo-inner">
          ${content}
        </div>
      </div>
    </section>
  `
}
