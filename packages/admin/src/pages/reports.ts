import { AdminLayout } from '../components/AdminLayout/AdminLayout'

export function renderReports(root: HTMLElement) {
	root.innerHTML = AdminLayout({
		title: 'Relatório',
		iconClass: 'fas fa-chart-line',
		active: 'reports',
		content: `
      <div class="container">
        <div class="row">

          <!-- Cards resumo -->
          <div class="col-12">
            <div class="row">

              <div class="col-12 col-md-4 mt-3">
                <div class="card card-report">
                  <p class="mb-1"><b>Total de pedidos</b></p>
                  <h2 class="mb-0"><b id="repTotalPedidos">0</b></h2>
                  <span class="text">no período</span>
                </div>
              </div>

              <div class="col-12 col-md-4 mt-3">
                <div class="card card-report">
                  <p class="mb-1"><b>Faturamento</b></p>
                  <h2 class="mb-0"><b id="repFaturamento">R$ 0,00</b></h2>
                  <span class="text">no período</span>
                </div>
              </div>

              <div class="col-12 col-md-4 mt-3">
                <div class="card card-report">
                  <p class="mb-1"><b>Ticket médio</b></p>
                  <h2 class="mb-0"><b id="repTicket">R$ 0,00</b></h2>
                  <span class="text">no período</span>
                </div>
              </div>

            </div>
          </div>

          <!-- Filtros -->
          <div class="col-12 mt-4">
            <div class="card p-3">
              <div class="row align-items-end">

                <div class="col-12 col-md-4 mt-2">
                  <label class="form-label"><b>De</b></label>
                  <input id="dateFrom" type="date" class="form-control" />
                </div>

                <div class="col-12 col-md-4 mt-2">
                  <label class="form-label"><b>Até</b></label>
                  <input id="dateTo" type="date" class="form-control" />
                </div>

                <div class="col-12 col-md-4 mt-2">
                  <button id="btnApplyReport" class="btn btn-yellow btn-sm w-100" type="button">
                    <i class="fas fa-filter"></i>&nbsp; Aplicar
                  </button>
                </div>

              </div>
            </div>
          </div>

          <!-- Lista / tabela -->
          <div class="col-12 mt-4">
            <div class="card p-3">
              <div class="d-flex justify-content-between align-items-center">
                <p class="mb-0"><b>Pedidos no período</b></p>
                <span class="text" id="repPeriodText">—</span>
              </div>

              <div class="separate mt-3"></div>

              <div class="table-responsive mt-2">
                <table class="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Data</th>
                      <th>Cliente</th>
                      <th>Status</th>
                      <th class="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody id="repTableBody">
                    ${mockRow(1, '2026-03-04', 'Cliente Exemplo', 'Concluído', 'R$ 59,90')}
                    ${mockRow(2, '2026-03-04', 'Outro Cliente', 'Em preparo', 'R$ 89,90')}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>
      </div>
    `,
	})

	// eventos simples
	const btn = root.querySelector<HTMLButtonElement>('#btnApplyReport')!
	btn.addEventListener('click', () => {
		const from = root.querySelector<HTMLInputElement>('#dateFrom')!.value
		const to = root.querySelector<HTMLInputElement>('#dateTo')!.value

		const period = root.querySelector<HTMLElement>('#repPeriodText')!
		period.textContent =
			from && to ? `${from} → ${to}` : 'Selecione o período'

		// depois: buscar na API
		// fetch(`/api/admin/reports?from=${from}&to=${to}`)
	})

	// valores fake iniciais
	setReportNumbers(root, { totalPedidos: 2, faturamento: 149.8 })
}

function mockRow(
	id: number,
	date: string,
	customer: string,
	status: string,
	total: string
) {
	return `
    <tr>
      <td>#${id}</td>
      <td>${date}</td>
      <td>${customer}</td>
      <td>${status}</td>
      <td class="text-end"><b>${total}</b></td>
    </tr>
  `
}

function setReportNumbers(
	root: HTMLElement,
	data: { totalPedidos: number; faturamento: number }
) {
	const total = root.querySelector<HTMLElement>('#repTotalPedidos')!
	const fatur = root.querySelector<HTMLElement>('#repFaturamento')!
	const ticket = root.querySelector<HTMLElement>('#repTicket')!

	total.textContent = String(data.totalPedidos)
	fatur.textContent = formatBRL(data.faturamento)

	const avg = data.totalPedidos > 0 ? data.faturamento / data.totalPedidos : 0
	ticket.textContent = formatBRL(avg)
}

function formatBRL(value: number) {
	return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
