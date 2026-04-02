import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
import { getHomeSummary } from '../../api/home'

// Transformamos a função em async para buscar do banco!
export async function renderDashboard(root: HTMLElement) {
	// 1. Busca os números reais de hoje!
	let resumo = { faturamentoHoje: 0, pedidosHoje: 0, pedidosPendentes: 0 }
	try {
		resumo = await getHomeSummary()
	} catch (error) {
		console.error('Erro ao carregar dados da home', error)
	}

	// 2. Desenha a tela com os Cards Operacionais
	root.innerHTML = AdminLayout({
		title: 'Seja bem-vindo(a)!',
		iconClass: 'fas fa-home',
		active: 'home',
		content: `
      <div class="container">
        <div class="row mt-4">
          
          <div class="col-4">
            <div class="card p-4 border-0 shadow-sm" style="border-radius: 15px; background: #fff;">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="text-muted mb-1" style="font-size: 0.9em; font-weight: 600;">Faturamento (Hoje)</p>
                  <h3 class="mb-0 text-success">R$ ${Number(resumo.faturamentoHoje || 0)
						.toFixed(2)
						.replace('.', ',')}</h3>
                </div>
                <div style="background: #e8f5e9; color: #4caf50; padding: 15px; border-radius: 10px;">
                  <i class="fas fa-dollar-sign fa-2x"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="card p-4 border-0 shadow-sm" style="border-radius: 15px; background: #fff;">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="text-muted mb-1" style="font-size: 0.9em; font-weight: 600;">Pedidos (Hoje)</p>
                  <h3 class="mb-0">${resumo.pedidosHoje || 0}</h3>
                </div>
                <div style="background: #e3f2fd; color: #2196f3; padding: 15px; border-radius: 10px;">
                  <i class="fas fa-shopping-bag fa-2x"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="card p-4 border-0 shadow-sm" style="border-radius: 15px; background: #fff;">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="text-muted mb-1" style="font-size: 0.9em; font-weight: 600;">Pendentes (Agora)</p>
                  <h3 class="mb-0 text-danger">${resumo.pedidosPendentes || 0}</h3>
                </div>
                <div style="background: #ffebee; color: #f44336; padding: 15px; border-radius: 10px;">
                  <i class="fas fa-exclamation-circle fa-2x"></i>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="row mt-5">
          <div class="col-12 text-center">
            <p class="text-muted">Acompanhe as métricas avançadas na aba <b>Relatório</b>.</p>
            <a href="#/orders" class="btn btn-yellow mt-3 px-4 py-2" style="border-radius: 8px;">
              <i class="fas fa-motorcycle"></i> Ir para o Painel de Pedidos
            </a>
          </div>
        </div>
      </div>
    `,
	})

	// Logout que você já tinha deixado pronto!
	root.querySelector<HTMLButtonElement>('#btnLogout')?.addEventListener('click', () => {
		localStorage.removeItem('admin_token')
		window.location.hash = '#/login'
	})
}
