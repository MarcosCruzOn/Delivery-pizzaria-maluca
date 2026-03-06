import { AdminLayout } from '../../components/AdminLayout/AdminLayout'

type Tab = 'faturamento' | 'historico'

export function renderReports(root: HTMLElement) {
	root.innerHTML = AdminLayout({
		title: 'Relatório',
		iconClass: 'fas fa-chart-line',
		active: 'reports',
		content: `
      <div class="container">
        <div class="row">

          <div class="col-12">
            <div class="menus-config" id="tabs-reports">
              <a href="#" class="btn btn-white btn-sm" data-tab="faturamento">
                <i class="fas fa-dollar-sign"></i> Faturamento
              </a>
              <a href="#" class="btn btn-white btn-sm active" data-tab="historico">
                <i class="fas fa-receipt"></i> Histórico de Pedidos
              </a>
            </div>
          </div>

          <div class="col-12 mt-5 hidden" id="faturamento">
            <p class="title-categoria mb-4">
              <b>Acompanhe suas vendas e faturamento por período.</b>
            </p>

            <div class="row">
              <div class="col-3">
                <div class="form-group">
                  <p class="title-categoria mb-0"><b>Data início:</b></p>
                  <input type="date" class="form-control" />
                </div>
              </div>

              <div class="col-3">
                <div class="form-group">
                  <p class="title-categoria mb-0"><b>Data fim:</b></p>
                  <input type="date" class="form-control" />
                </div>
              </div>

              <div class="col-3">
                <div class="form-group">
                  <p class="title-categoria mb-0"><b>Categoria:</b></p>
                  <select class="form-control">
                    <option value="0">Todas</option>
                    <option value="1">Delivery</option>
                    <option value="2">Retirada</option>
                  </select>
                </div>
              </div>

              <div class="col-3">
                <a class="btn btn-yellow btn-sm mt-4">
                  <i class="fas fa-search"></i>&nbsp; Filtrar Dados
                </a>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-3">
                <div class="card card-address cursor-default mb-3">
                  <div class="img-icon-details">
                    <i class="fas fa-dollar-sign"></i>
                  </div>
                  <div class="infos">
                    <p class="text mb-0"><b>Total:</b></p>
                    <p class="value-card mb-0"><b>R$ 1.564,00</b></p>
                  </div>
                </div>

                <div class="card card-address cursor-default mb-3">
                  <div class="img-icon-details">
                    <i class="fas fa-utensils"></i>
                  </div>
                  <div class="infos">
                    <p class="text mb-0"><b>Nº Pedidos:</b></p>
                    <p class="value-card mb-0"><b>15</b></p>
                  </div>
                </div>

                <div class="card card-address cursor-default mb-3">
                  <div class="img-icon-details">
                    <i class="fas fa-dollar-sign"></i>
                  </div>
                  <div class="infos">
                    <p class="text mb-0"><b>Ticket Médio:</b></p>
                    <p class="value-card mb-0"><b>R$ 100,00</b></p>
                  </div>
                </div>
              </div>

              <div class="col-9">
                <div class="card">
                  <canvas id="graficoFaturamento"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 mt-5" id="historico">
            <p class="title-categoria mb-4">
              <b>Filtre todos os pedidos realizados.</b>
            </p>

            <div class="row">
              <div class="col-3">
                <div class="form-group">
                  <p class="title-categoria mb-0"><b>Data início:</b></p>
                  <input type="date" class="form-control" />
                </div>
              </div>

              <div class="col-3">
                <div class="form-group">
                  <p class="title-categoria mb-0"><b>Data fim:</b></p>
                  <input type="date" class="form-control" />
                </div>
              </div>

              <div class="col-3">
                <a class="btn btn-yellow btn-sm mt-4">
                  <i class="fas fa-search"></i>&nbsp; Filtrar Dados
                </a>
              </div>
            </div>

            <div class="card card-table mt-5">
              <div class="table-responsive">
                <table id="data-table" class="table data-table">
                  <thead>
                    <tr>
                      <th># Código</th>
                      <th>Cliente</th>
                      <th>Tipo</th>
                      <th>Pagamento</th>
                      <th>Criado em</th>
                      <th>Status</th>
                      <th>(R$) Total</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#1</td>
                      <td>Weverton Lima</td>
                      <td>Delivery</td>
                      <td>Cartão de Crédito</td>
                      <td>20/10/2023</td>
                      <td><i class="fas fa-motorcycle"></i> Em entrega</td>
                      <td><b class="color-green">R$ 89,90</b></td>
                      <td>
                        <a class="btn btn-white btn-sm">
                          <i class="fas fa-receipt"></i>&nbsp; Detalhes
                        </a>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="6"></th>
                      <th><b class="color-green">R$ 250,90</b></th>
                      <th></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    `,
	})

	setupTabs(root)
	showTab(root, 'historico')
}

function setupTabs(root: HTMLElement) {
	const tabs = root.querySelector('#tabs-reports')!

	tabs.addEventListener('click', (e) => {
		const a = (e.target as HTMLElement).closest('a')
		if (!a) return

		e.preventDefault()
		const tab = a.getAttribute('data-tab') as Tab
		showTab(root, tab)
	})
}

function showTab(root: HTMLElement, tab: Tab) {
	const tabs = root.querySelector('#tabs-reports')!
	const faturamento = root.querySelector<HTMLElement>('#faturamento')!
	const historico = root.querySelector<HTMLElement>('#historico')!

	faturamento.classList.add('hidden')
	historico.classList.add('hidden')

	if (tab === 'faturamento') faturamento.classList.remove('hidden')
	if (tab === 'historico') historico.classList.remove('hidden')

	tabs.querySelectorAll('a').forEach((a) => a.classList.remove('active'))
	tabs.querySelector(`a[data-tab="${tab}"]`)?.classList.add('active')
}
