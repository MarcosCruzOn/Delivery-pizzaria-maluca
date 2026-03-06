import { AdminLayout } from '../../components/AdminLayout/AdminLayout'

type Tab = 'delivery' | 'taxa' | 'pagamento'
type FeeMode = 'sem' | 'unica' | 'distancia'

export function renderSettings(root: HTMLElement) {
	root.innerHTML = AdminLayout({
		title: 'Configurações',
		iconClass: 'fas fa-cog',
		active: 'settings',
		content: `
      <div class="container">
        <div class="row">

          <div class="col-12">
            <div class="menus-config" id="tabs-config">
              <a href="#" class="btn btn-white btn-sm" data-tab="delivery">
                <i class="fas fa-shopping-bag"></i> Delivery e retirada
              </a>
              <a href="#" class="btn btn-white btn-sm" data-tab="taxa">
                <i class="fas fa-motorcycle"></i> Taxa de entrega
              </a>
              <a href="#" class="btn btn-white btn-sm active" data-tab="pagamento">
                <i class="fas fa-coins"></i> Formas de pagamento
              </a>
            </div>
          </div>

          <!-- DELIVERY / RETIRADA -->
          <div class="col-12 mt-5 hidden" id="delivery-retirada">
            <p class="title-categoria mb-0">
              <b>Selecione as opções de entrega da sua loja</b>
            </p>

            <!-- Retirada -->
            <div class="container-group mb-3">
              <div class="card card-address cursor-default mt-3">
                <div class="img-icon-details">
                  <i class="fas fa-box"></i>
                </div>
                <div class="infos config">
                  <p class="name mb-1"><b>Retirada</b></p>
                  <label class="switch">
                    <input id="toggleRetirada" type="checkbox" />
                    <span class="slider round"></span>
                    <span class="text mb-0" id="txtRetirada">Desligado</span>
                  </label>
                </div>

                <div class="tempo disabled" id="tempoRetirada">
                  <div class="form-group">
                    <label><b>Tempo mínimo retirada (min)</b></label>
                    <input type="number" class="form-control" placeholder="20" disabled />
                  </div>
                  <div class="form-group">
                    <label><b>Tempo máximo retirada (min)</b></label>
                    <input type="number" class="form-control" placeholder="40" disabled />
                  </div>
                </div>

                <a class="btn btn-yellow btn-sm ms-4 disabled" id="btnSalvarRetirada">
                  <i class="fas fa-check"></i>&nbsp; Salvar
                </a>
              </div>
            </div>

            <!-- Delivery -->
            <div class="container-group mb-3">
              <div class="card card-address cursor-default mt-3">
                <div class="img-icon-details">
                  <i class="fas fa-motorcycle"></i>
                </div>
                <div class="infos config">
                  <p class="name mb-1"><b>Delivery</b></p>
                  <label class="switch">
                    <input id="toggleDelivery" type="checkbox" checked />
                    <span class="slider round"></span>
                    <span class="text mb-0" id="txtDelivery">Ligado</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- TAXA ENTREGA -->
          <div class="col-12 mt-5 hidden" id="taxa-entrega">
            <p class="title-categoria mb-0">
              <b>Selecione as opções de taxas de entrega</b>
            </p>

            <div class="container-group inline mb-3" id="feeModes">
              <div class="card mt-3">
                <div class="group-select">
                  <div class="checks">
                    <label class="container-check">
                      <input type="checkbox" data-fee="sem" />
                      <span class="checkmark"></span>
                      Sem taxa
                    </label>
                  </div>
                </div>
              </div>

              <div class="card mt-3">
                <div class="group-select">
                  <div class="checks">
                    <label class="container-check">
                      <input type="checkbox" data-fee="unica" />
                      <span class="checkmark"></span>
                      Taxa única
                    </label>
                  </div>
                </div>
              </div>

              <div class="card mt-3">
                <div class="group-select">
                  <div class="checks">
                    <label class="container-check">
                      <input type="checkbox" data-fee="distancia" />
                      <span class="checkmark"></span>
                      Taxa por distância
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="container-group mb-3 hidden" id="container-sem-taxa">
              <div class="card card-address cursor-default mt-4">
                <div class="infos">
                  <p class="name mb-0"><b>Sem taxa</b></p>
                  <span class="text mb-0">Nenhuma taxa será cobrada</span>
                </div>
                <a class="btn btn-yellow btn-sm ms-4">
                  <i class="fas fa-check"></i>&nbsp; Salvar
                </a>
              </div>
            </div>

            <div class="container-group mb-3 hidden" id="container-taxa-unica">
              <div class="card card-address cursor-default mt-4">
                <div class="infos">
                  <p class="name mb-1"><b>Taxa única</b></p>
                  <div class="form-group">
                    <label><b>Valor da taxa (R$)</b></label>
                    <input type="number" class="form-control" placeholder="10" />
                  </div>
                </div>
                <a class="btn btn-yellow btn-sm ms-4">
                  <i class="fas fa-check"></i>&nbsp; Salvar
                </a>
              </div>
            </div>

            <div class="container-group mb-3 hidden" id="container-taxa-distancia">
              <div class="card card-address cursor-default mt-4">
                <div class="infos">
                  <p class="name mb-1"><b>Taxa por distância</b></p>
                  <span class="text mb-0">Configurar por faixa de KM (vamos fazer depois)</span>
                </div>
                <a class="btn btn-yellow btn-sm ms-4">
                  <i class="fas fa-check"></i>&nbsp; Salvar
                </a>
              </div>
            </div>
          </div>

          <!-- FORMAS DE PAGAMENTO -->
          <div class="col-12 mt-5" id="forma-pagamento">
            <p class="title-categoria mb-0">
              <b>Selecione as formas de <b class="color-primary">pagamento na entrega</b></b>
            </p>

            <div class="container-group mb-3">
              <div class="card card-address cursor-default mt-3">
                <div class="img-icon-details">
                  <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="infos">
                  <p class="name mb-1"><b>Pix</b></p>
                </div>
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>

            <div class="container-group mb-3">
              <div class="card card-address cursor-default mt-3">
                <div class="img-icon-details">
                  <i class="fas fa-money-bill"></i>
                </div>
                <div class="infos">
                  <p class="name mb-1"><b>Dinheiro</b></p>
                </div>
                <label class="switch">
                  <input type="checkbox" checked />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>

            <div class="container-group mb-3">
              <div class="card card-address cursor-default mt-3">
                <div class="img-icon-details">
                  <i class="fas fa-credit-card"></i>
                </div>
                <div class="infos">
                  <p class="name mb-1"><b>Cartão</b></p>
                </div>
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>
    `,
	})

	// abas
	setupTabs(root)

	// toggles simples (só texto + “disabled” visual)
	setupDeliveryToggles(root)

	// taxa de entrega (sem/unica/distancia)
	setupFeeModes(root)
}

function setupTabs(root: HTMLElement) {
	const tabs = root.querySelector('#tabs-config')!
	const delivery = root.querySelector<HTMLElement>('#delivery-retirada')!
	const taxa = root.querySelector<HTMLElement>('#taxa-entrega')!
	const pagamento = root.querySelector<HTMLElement>('#forma-pagamento')!

	function show(tab: Tab) {
		delivery.classList.toggle('hidden', tab !== 'delivery')
		taxa.classList.toggle('hidden', tab !== 'taxa')
		pagamento.classList.toggle('hidden', tab !== 'pagamento')

		tabs.querySelectorAll('a').forEach((a) => a.classList.remove('active'))
		tabs.querySelector(`a[data-tab="${tab}"]`)?.classList.add('active')
	}

	tabs.addEventListener('click', (e) => {
		const a = (e.target as HTMLElement).closest('a')
		if (!a) return
		e.preventDefault()
		const tab = a.getAttribute('data-tab') as Tab
		show(tab)
	})

	// começa em pagamento (igual seu HTML)
	show('pagamento')
}

function setupDeliveryToggles(root: HTMLElement) {
	const retirada = root.querySelector<HTMLInputElement>('#toggleRetirada')!
	const txtRetirada = root.querySelector<HTMLElement>('#txtRetirada')!
	const tempoRetirada = root.querySelector<HTMLElement>('#tempoRetirada')!
	const btnSalvarRetirada =
		root.querySelector<HTMLElement>('#btnSalvarRetirada')!

	function applyRetiradaUI() {
		const on = retirada.checked
		txtRetirada.textContent = on ? 'Ligado' : 'Desligado'
		tempoRetirada.classList.toggle('disabled', !on)
		btnSalvarRetirada.classList.toggle('disabled', !on)
		tempoRetirada
			.querySelectorAll('input')
			.forEach((i) => ((i as HTMLInputElement).disabled = !on))
	}

	retirada.addEventListener('change', applyRetiradaUI)
	applyRetiradaUI()

	const delivery = root.querySelector<HTMLInputElement>('#toggleDelivery')!
	const txtDelivery = root.querySelector<HTMLElement>('#txtDelivery')!
	delivery.addEventListener('change', () => {
		txtDelivery.textContent = delivery.checked ? 'Ligado' : 'Desligado'
	})
}

function setupFeeModes(root: HTMLElement) {
	const feeBox = root.querySelector('#feeModes')!
	const inputs = Array.from(
		feeBox.querySelectorAll<HTMLInputElement>(
			'input[type="checkbox"][data-fee]'
		)
	)

	const sem = root.querySelector<HTMLElement>('#container-sem-taxa')!
	const unica = root.querySelector<HTMLElement>('#container-taxa-unica')!
	const distancia = root.querySelector<HTMLElement>(
		'#container-taxa-distancia'
	)!

	function showFee(mode: FeeMode | null) {
		sem.classList.toggle('hidden', mode !== 'sem')
		unica.classList.toggle('hidden', mode !== 'unica')
		distancia.classList.toggle('hidden', mode !== 'distancia')
	}

	feeBox.addEventListener('change', (e) => {
		const input = e.target as HTMLInputElement
		const mode = input.getAttribute('data-fee') as FeeMode | null
		if (!mode) return

		// comportamento de “radio”: marca só 1
		inputs.forEach((i) => (i.checked = i === input ? input.checked : false))

		showFee(input.checked ? mode : null)
	})

	showFee(null)
}
