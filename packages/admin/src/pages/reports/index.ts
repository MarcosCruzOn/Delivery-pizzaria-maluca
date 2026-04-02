import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
import { getReports, getOrderHistory } from '../../api/reports'
import Chart from 'chart.js/auto'

type Tab = 'faturamento' | 'historico'
let chartFaturamento: Chart | null = null

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
              <a href="javascript:void(0)" class="btn btn-white btn-sm active" data-tab="faturamento">
                <i class="fas fa-dollar-sign"></i> Faturamento
              </a>
              <a href="javascript:void(0)" class="btn btn-white btn-sm" data-tab="historico">
                <i class="fas fa-receipt"></i> Histórico de Pedidos
              </a>
            </div>
          </div>

          <div class="col-12 mt-5" id="faturamento">
            <p class="title-categoria mb-4"><b>Acompanhe suas vendas e faturamento por período.</b></p>
            <div class="row">
              <div class="col-3">
                <div class="form-group">
                  <p class="title-categoria mb-0"><b>Data início:</b></p>
                  <input type="date" class="form-control" id="dataInicioFaturamento" />
                </div>
              </div>
              <div class="col-3">
                <div class="form-group">
                  <p class="title-categoria mb-0"><b>Data fim:</b></p>
                  <input type="date" class="form-control" id="dataFimFaturamento" />
                </div>
              </div>
              <div class="col-3">
                <a href="javascript:void(0)" class="btn btn-yellow btn-sm mt-4" id="btnFiltrarFaturamento">
                  <i class="fas fa-search"></i>&nbsp; Filtrar Dados
                </a>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-3">
                <div class="card card-address cursor-default mb-3">
                  <div class="img-icon-details"><i class="fas fa-dollar-sign"></i></div>
                  <div class="infos">
                    <p class="text mb-0"><b>Total:</b></p>
                    <p class="value-card mb-0" id="cardTotalFaturamento" style="font-size: 1.2rem;"><b>R$ 0,00</b></p>
                  </div>
                </div>
                <div class="card card-address cursor-default mb-3">
                  <div class="img-icon-details"><i class="fas fa-utensils"></i></div>
                  <div class="infos">
                    <p class="text mb-0"><b>Nº Pedidos:</b></p>
                    <p class="value-card mb-0" id="cardTotalPedidos"><b>0</b></p>
                  </div>
                </div>
                <div class="card card-address cursor-default mb-3">
                  <div class="img-icon-details"><i class="fas fa-dollar-sign"></i></div>
                  <div class="infos">
                    <p class="text mb-0"><b>Ticket Médio:</b></p>
                    <p class="value-card mb-0" id="cardTicketMedio"><b>R$ 0,00</b></p>
                  </div>
                </div>
              </div>
              <div class="col-9">
                <div class="card p-3">
                  <canvas id="graficoFaturamento" style="max-height: 300px;"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 mt-5 hidden" id="historico">
            <p class="title-categoria mb-4"><b>Filtre todos os pedidos realizados.</b></p>

            <div class="row">
              <div class="col-3">
                <div class="form-group">
                  <p class="title-categoria mb-0"><b>Data início:</b></p>
                  <input type="date" class="form-control" id="dataInicioHistorico" />
                </div>
              </div>
              <div class="col-3">
                <div class="form-group">
                  <p class="title-categoria mb-0"><b>Data fim:</b></p>
                  <input type="date" class="form-control" id="dataFimHistorico" />
                </div>
              </div>
              <div class="col-3">
                <a href="javascript:void(0)" class="btn btn-yellow btn-sm mt-4" id="btnFiltrarHistorico">
                  <i class="fas fa-search"></i>&nbsp; Buscar Pedidos
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
                    </tr>
                  </thead>
                  <tbody id="tabelaHistoricoBody">
                    </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="6" class="text-right align-middle">Total do Período:</th>
                      <th id="tabelaHistoricoTotal"><b class="text-success" style="font-size: 1.1rem;">R$ 0,00</b></th>
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
	setupFaturamento(root)
	setupHistorico(root)
	showTab(root, 'faturamento')
}

// LÓGICA DO HISTÓRICO
async function setupHistorico(root: HTMLElement) {
	const inputInicio = root.querySelector('#dataInicioHistorico') as HTMLInputElement
	const inputFim = root.querySelector('#dataFimHistorico') as HTMLInputElement
	const btnFiltrar = root.querySelector('#btnFiltrarHistorico') as HTMLElement
	const tbody = root.querySelector('#tabelaHistoricoBody') as HTMLElement
	const tfootTotal = root.querySelector('#tabelaHistoricoTotal') as HTMLElement

	// Inicia as datas como o mês atual
	const hoje = new Date()
	const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
	inputInicio.value = primeiroDiaMes.toISOString().split('T')[0]
	inputFim.value = hoje.toISOString().split('T')[0]

	const carregarHistorico = async () => {
		try {
			tbody.innerHTML = `<tr><td colspan="7" class="text-center">Carregando pedidos... <i class="fas fa-spinner fa-spin"></i></td></tr>`

			const pedidos = await getOrderHistory(inputInicio.value, inputFim.value)

			if (pedidos.length === 0) {
				tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Nenhum pedido encontrado neste período.</td></tr>`
				tfootTotal.innerHTML = `<b class="text-success">R$ 0,00</b>`
				return
			}

			// Desenha as linhas da tabela
			tbody.innerHTML = pedidos
				.map((p: any) => {
					const dataFormatada = new Date(p.datacadastro).toLocaleDateString('pt-BR', {
						hour: '2-digit',
						minute: '2-digit',
					})
					return `
					<tr>
						<td><b>#${p.idpedido}</b></td>
						<td>${p.nomecliente}</td>
						<td>${p.tipo_entrega}</td>
						<td>${p.pagamento}</td>
						<td>${dataFormatada}</td>
						<td>${p.status}</td>
						<td><b class="text-success">R$ ${Number(p.total).toFixed(2).replace('.', ',')}</b></td>
					</tr>
				`
				})
				.join('')

			// Calcula a soma total do rodapé
			const somaTotal = pedidos.reduce((acc: number, p: any) => acc + Number(p.total), 0)
			tfootTotal.innerHTML = `<b class="text-success" style="font-size: 1.1rem;">R$ ${somaTotal.toFixed(2).replace('.', ',')}</b>`
		} catch (error) {
			console.error('Erro ao carregar histórico', error)
			tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Erro ao buscar dados.</td></tr>`
		}
	}

	btnFiltrar.addEventListener('click', carregarHistorico)
	carregarHistorico()
}

// ... AS FUNÇÕES ABAIXO CONTINUAM AS MESMAS DA ÚLTIMA MENSAGEM ...

async function setupFaturamento(root: HTMLElement) {
	const inputInicio = root.querySelector('#dataInicioFaturamento') as HTMLInputElement
	const inputFim = root.querySelector('#dataFimFaturamento') as HTMLInputElement
	const btnFiltrar = root.querySelector('#btnFiltrarFaturamento') as HTMLElement

	const hoje = new Date()
	const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
	inputInicio.value = primeiroDiaMes.toISOString().split('T')[0]
	inputFim.value = hoje.toISOString().split('T')[0]

	const carregarDados = async () => {
		try {
			const dados = await getReports(inputInicio.value, inputFim.value)
			root.querySelector('#cardTotalFaturamento')!.innerHTML =
				`<b>R$ ${Number(dados.totais.faturamento).toFixed(2).replace('.', ',')}</b>`
			root.querySelector('#cardTotalPedidos')!.innerHTML = `<b>${dados.totais.pedidos}</b>`
			root.querySelector('#cardTicketMedio')!.innerHTML =
				`<b>R$ ${Number(dados.totais.ticketMedio).toFixed(2).replace('.', ',')}</b>`
			desenharGrafico(root, dados.grafico)
		} catch (error) {
			console.error('Erro ao carregar relatórios', error)
		}
	}

	btnFiltrar.addEventListener('click', carregarDados)
	carregarDados()
}

function desenharGrafico(root: HTMLElement, dadosGrafico: any[]) {
	const ctx = root.querySelector('#graficoFaturamento') as HTMLCanvasElement
	if (!ctx) return
	if (chartFaturamento) chartFaturamento.destroy()

	const labels = dadosGrafico.map((d) => d.data_venda)
	const valores = dadosGrafico.map((d) => d.faturamento_dia)

	chartFaturamento = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Faturamento do Dia (R$)',
					data: valores,
					borderColor: '#f2a61f',
					backgroundColor: 'rgba(242, 166, 31, 0.2)',
					borderWidth: 3,
					fill: true,
					tension: 0.3,
				},
			],
		},
		options: { responsive: true, plugins: { legend: { position: 'top' } } },
	})
}

function setupTabs(root: HTMLElement) {
	const tabs = root.querySelector('#tabs-reports')!
	tabs.addEventListener('click', (e) => {
		const a = (e.target as HTMLElement).closest('a')
		if (!a) return
		e.preventDefault()
		showTab(root, a.getAttribute('data-tab') as Tab)
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
