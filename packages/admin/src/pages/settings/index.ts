import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
// Importando o nosso Garçom!
import { getPagamentos, togglePagamento } from '../../api/pagamentos'

type Tab = 'delivery' | 'taxa' | 'pagamento'
type FeeMode = 'sem' | 'unica' | 'distancia'

// Transformamos em async para podermos buscar do banco
export async function renderSettings(root: HTMLElement) {
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

          <div class="col-12 mt-5 hidden" id="delivery-retirada">
            <p class="title-categoria mb-0">
              <b>Selecione as opções de entrega da sua loja</b>
            </p>
            <div class="container-group mb-3">
              <div class="card card-address cursor-default mt-3">
                <div class="img-icon-details"><i class="fas fa-box"></i></div>
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

            <div class="container-group mb-3">
              <div class="card card-address cursor-default mt-3">
                <div class="img-icon-details"><i class="fas fa-motorcycle"></i></div>
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

          <div class="col-12 mt-5 hidden" id="taxa-entrega">
             <p class="title-categoria mb-0"><b>Selecione as opções de taxas de entrega</b></p>
             <p class="text-muted mt-2">Em breve conectaremos ao banco de dados...</p>
          </div>

          <div class="col-12 mt-5" id="forma-pagamento">
             </div>

        </div>
      </div>
    `,
	})

	setupTabs(root)
	setupDeliveryToggles(root)
	// setupFeeModes(root) // Descomente quando formos fazer as taxas

	// 🔥 A MAGIA ACONTECE AQUI
	await carregarE_RenderizarPagamentos(root)
}

// =====================================
// FUNÇÕES DE LÓGICA
// =====================================

async function carregarE_RenderizarPagamentos(root: HTMLElement) {
	const container = root.querySelector('#forma-pagamento')
	if (!container) return

	try {
		// 1. Busca os dados reais do banco
		const pagamentos = await getPagamentos()

		// 2. Monta o HTML com os dados do banco
		const htmlPagamentos = pagamentos
			.map(
				(p: any) => `
			<div class="container-group mb-3">
              <div class="card card-address cursor-default mt-3">
                <div class="img-icon-details">
                  <i class="fas fa-coins"></i>
                </div>
                <div class="infos">
                  <p class="name mb-1"><b>${p.nome}</b></p>
                </div>
                <label class="switch">
                  <input type="checkbox" class="toggle-pagamento-checkbox" data-id="${p.idpagamentos}" ${p.ATIVO === 1 ? 'checked' : ''} />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
		`
			)
			.join('')

		container.innerHTML = `
			<p class="title-categoria mb-0">
              <b>Selecione as formas de <b class="color-primary">pagamento na entrega</b></b>
            </p>
			${htmlPagamentos}
		`

		// 3. Adiciona o ouvinte de cliques para salvar sozinho no banco
		container.querySelectorAll('.toggle-pagamento-checkbox').forEach((checkbox) => {
			checkbox.addEventListener('change', async (e) => {
				const target = e.target as HTMLInputElement
				const id = Number(target.dataset.id)
				const estaLigado = target.checked

				try {
					await togglePagamento(id, estaLigado)
				} catch (err) {
					alert('Erro ao salvar no banco!')
					target.checked = !estaLigado // Se der erro no banco, a chavinha volta ao normal!
				}
			})
		})
	} catch (error) {
		console.error(error)
		container.innerHTML = `<p class="text-danger mt-4">Erro ao carregar pagamentos do servidor.</p>`
	}
}

// ... (Mantenha as suas funções setupTabs e setupDeliveryToggles originais aqui embaixo!) ...
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

	show('pagamento')
}

function setupDeliveryToggles(root: HTMLElement) {
	const retirada = root.querySelector<HTMLInputElement>('#toggleRetirada')!
	const txtRetirada = root.querySelector<HTMLElement>('#txtRetirada')!
	const tempoRetirada = root.querySelector<HTMLElement>('#tempoRetirada')!
	const btnSalvarRetirada = root.querySelector<HTMLElement>('#btnSalvarRetirada')!

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
