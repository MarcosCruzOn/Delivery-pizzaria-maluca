import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
import { getReports } from '../../api/reports'
import Chart from 'chart.js/auto'

type Tab = 'faturamento' | 'historico'

// Variável para guardar o gráfico e podermos apagá-lo antes de desenhar um novo
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
            <p class="title-categoria mb-4">
              <b>Acompanhe suas vendas e faturamento por período.</b>
            </p>

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
                <div class="form-group">
                  <p class="title-categoria mb-0"><b>Categoria:</b></p>
                  <select class="form-control">
                    <option value="0">Todas</option>
                  </select>
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
            <h5 class="text-center mt-5 text-muted">Aba de Histórico em construção...</h5>
          </div>

        </div>
      </div>
    `,
	})

	setupTabs(root)
	setupFaturamento(root)
	showTab(root, 'faturamento') // Vamos focar em iniciar na aba Faturamento!
}

// Lógica da Aba Faturamento
async function setupFaturamento(root: HTMLElement) {
	const inputInicio = root.querySelector('#dataInicioFaturamento') as HTMLInputElement
	const inputFim = root.querySelector('#dataFimFaturamento') as HTMLInputElement
	const btnFiltrar = root.querySelector('#btnFiltrarFaturamento') as HTMLElement

	// Configura as datas para "O dia 01 deste mês" até "Hoje"
	const hoje = new Date()
	const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)

	inputInicio.value = primeiroDiaMes.toISOString().split('T')[0]
	inputFim.value = hoje.toISOString().split('T')[0]

	// Função que busca os dados e atualiza a tela
	const carregarDados = async () => {
		try {
			const dados = await getReports(inputInicio.value, inputFim.value)

			// Atualiza os Cards
			root.querySelector('#cardTotalFaturamento')!.innerHTML =
				`<b>R$ ${Number(dados.totais.faturamento).toFixed(2).replace('.', ',')}</b>`
			root.querySelector('#cardTotalPedidos')!.innerHTML = `<b>${dados.totais.pedidos}</b>`
			root.querySelector('#cardTicketMedio')!.innerHTML =
				`<b>R$ ${Number(dados.totais.ticketMedio).toFixed(2).replace('.', ',')}</b>`

			// Atualiza o Gráfico
			desenharGrafico(root, dados.grafico)
		} catch (error) {
			console.error('Erro ao carregar relatórios', error)
		}
	}

	// Dispara a busca quando clica no botão
	btnFiltrar.addEventListener('click', carregarDados)

	// Dispara a busca pela primeira vez ao abrir a tela
	carregarDados()
}

function desenharGrafico(root: HTMLElement, dadosGrafico: any[]) {
	const ctx = root.querySelector('#graficoFaturamento') as HTMLCanvasElement
	if (!ctx) return

	// Se já existir um gráfico, destrua ele antes de desenhar o novo
	if (chartFaturamento) {
		chartFaturamento.destroy()
	}

	// Separa as datas (eixo X) e os valores (eixo Y)
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
					borderColor: '#f2a61f', // O Amarelo do seu tema!
					backgroundColor: 'rgba(242, 166, 31, 0.2)',
					borderWidth: 3,
					fill: true,
					tension: 0.3, // Deixa a linha curvada bonitona
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				legend: { position: 'top' },
			},
		},
	})
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
