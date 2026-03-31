import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
// Importando o nosso Garçom!
import { getPagamentos, togglePagamento } from '../../api/pagamentos'
import { getTaxas, updateTaxa, addFaixaDistancia, removeFaixaDistancia } from '../../api/taxas'

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
            <p class="title-categoria mb-0">
              <b>Selecione as opções de taxas de entrega</b>
            </p>

            <div id="feeModes">
              <div class="container-group mb-3 mt-4">
                <div class="card card-address cursor-default">
                  <div class="infos config">
                    <p class="name mb-1"><b>Sem taxa de entrega</b></p>
                    <label class="switch">
                      <input type="checkbox" data-fee="sem" />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
                <div id="container-sem-taxa" class="mt-3 hidden pl-3">
                  <p class="text-muted mb-2">A entrega será gratuita para todos os clientes.</p>
                  <a href="#" class="btn btn-yellow btn-sm"><i class="fas fa-check"></i> Salvar</a>
                </div>
              </div>

              <div class="container-group mb-3">
                <div class="card card-address cursor-default mt-3">
                  <div class="infos config">
                    <p class="name mb-1"><b>Taxa única</b></p>
                    <label class="switch">
                      <input type="checkbox" data-fee="unica" />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
                <div id="container-taxa-unica" class="mt-3 hidden pl-3">
                  <div class="form-group mb-2" style="max-width: 200px;">
                    <label><b>Valor da taxa (R$)</b></label>
                    <input type="number" step="0.01" class="form-control" placeholder="10.00" />
                  </div>
                  <a href="#" class="btn btn-yellow btn-sm"><i class="fas fa-check"></i> Salvar</a>
                </div>
              </div>

              <div class="container-group mb-3">
                <div class="card card-address cursor-default mt-3">
                  <div class="infos config">
                    <p class="name mb-1"><b>Por distância</b></p>
                    <label class="switch">
                      <input type="checkbox" data-fee="distancia" />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
               <div id="container-taxa-distancia" class="mt-3 hidden pl-3">
                  <p class="text-muted mb-3">As taxas serão calculadas com base na distância (km).</p>
                  
                  <div class="card p-3 mb-3 border">
                    <h6 class="mb-2 text-primary" style="font-size: 0.9em;"><i class="fas fa-plus"></i> Adicionar Faixa de KM</h6>
                    <div class="d-flex gap-2">
                        <div style="flex:1">
                            <label class="mb-0" style="font-size: 0.8em"><b>Até KM</b></label>
                            <input type="number" id="inputDistanciaKm" class="form-control form-control-sm" placeholder="Ex: 5">
                        </div>
                        <div style="flex:1">
                            <label class="mb-0" style="font-size: 0.8em"><b>Valor (R$)</b></label>
                            <input type="number" step="0.01" id="inputDistanciaValor" class="form-control form-control-sm" placeholder="Ex: 8.50">
                        </div>
                        <div class="d-flex align-items-end">
                            <button class="btn btn-yellow btn-sm w-100" id="btnAddFaixaKm">Adicionar</button>
                        </div>
                    </div>
                  </div>

                  <div id="lista-faixas-km" class="mb-3"></div>

                  <a href="#" class="btn btn-primary btn-sm mt-2" id="btnSalvarDistancia"><i class="fas fa-check"></i> Ativar Modo por Distância</a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 mt-5" id="forma-pagamento">
             </div>

        </div>
      </div>
    `,
	})

	setupTabs(root)
	setupDeliveryToggles(root)
	setupFeeModes(root) // Descomente quando formos fazer as taxas

	// 🔥 A MAGIA ACONTECE AQUI
	await carregarE_RenderizarPagamentos(root)
	await carregarE_RenderizarTaxas(root)
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

async function carregarE_RenderizarTaxas(root: HTMLElement) {
	try {
		const taxas = await getTaxas()

		// Filtra só as faixas de distância para desenharmos na tela
		const faixasDistancia = taxas.filter(
			(t: any) => t.idtaxaentregatipo === 3 && t.distancia !== null
		)
		const containerFaixas = root.querySelector('#lista-faixas-km')

		if (containerFaixas) {
			containerFaixas.innerHTML = faixasDistancia
				.map(
					(f: any) => `
                <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                    <span>Até <b>${f.distancia} km</b> <i class="fas fa-arrow-right mx-2 text-muted"></i> R$ ${Number(f.valor).toFixed(2)}</span>
                    <button class="btn btn-link text-danger p-0 btn-remover-faixa" data-id="${f.idtaxaentrega}"><i class="fas fa-trash-alt"></i></button>
                </div>
            `
				)
				.join('')

			// Eventos de remover faixa
			containerFaixas.querySelectorAll('.btn-remover-faixa').forEach((btn) => {
				btn.addEventListener('click', async (e) => {
					e.preventDefault()
					if (confirm('Remover esta faixa de KM?')) {
						const idFaixa = Number((e.currentTarget as HTMLElement).dataset.id)
						await removeFaixaDistancia(idFaixa)
						location.reload()
					}
				})
			})
		}

		taxas.forEach((t: any) => {
			if (t.idtaxaentregatipo === 2) {
				const inputValor = root.querySelector(
					'#container-taxa-unica input'
				) as HTMLInputElement
				if (inputValor) inputValor.value = Number(t.valor).toFixed(2)
			}

			if (t.ATIVO === 1) {
				let modoAtivo: FeeMode = 'sem'
				if (t.idtaxaentregatipo === 2) modoAtivo = 'unica'
				if (t.idtaxaentregatipo === 3) modoAtivo = 'distancia'
				const checkboxTarget = root.querySelector(
					`input[data-fee="${modoAtivo}"]`
				) as HTMLInputElement
				if (checkboxTarget) checkboxTarget.click()
			}
		})

		// Evento de Adicionar Faixa
		root.querySelector('#btnAddFaixaKm')?.addEventListener('click', async (e) => {
			e.preventDefault()
			const km = Number((root.querySelector('#inputDistanciaKm') as HTMLInputElement).value)
			const valor = Number(
				(root.querySelector('#inputDistanciaValor') as HTMLInputElement).value
			)
			if (!km) return alert('Informe até qual KM esta taxa se aplica!')

			try {
				await addFaixaDistancia(km, valor)
				location.reload()
			} catch (err) {
				alert('Erro ao adicionar faixa!')
			}
		})

		// Os 3 botões mestre de Salvar/Ativar Modo!
		// Agora passamos o TIPO (1, 2 ou 3) direto!
		root.querySelector('#container-sem-taxa .btn-yellow')?.addEventListener(
			'click',
			async (e) => {
				e.preventDefault()
				try {
					await updateTaxa(1, 0)
					alert('Modo Sem Taxa ativado!')
				} catch (err) {
					alert('Erro ao salvar!')
				}
			}
		)

		root.querySelector('#container-taxa-unica .btn-yellow')?.addEventListener(
			'click',
			async (e) => {
				e.preventDefault()
				const valorDigitado = (
					root.querySelector('#container-taxa-unica input') as HTMLInputElement
				).value
				try {
					await updateTaxa(2, Number(valorDigitado))
					alert('Modo Taxa Única ativado!')
				} catch (err) {
					alert('Erro ao salvar!')
				}
			}
		)

		root.querySelector('#btnSalvarDistancia')?.addEventListener('click', async (e) => {
			e.preventDefault()
			try {
				await updateTaxa(3, 0)
				alert('Modo por Distância ativado!')
			} catch (err) {
				alert('Erro ao salvar!')
			}
		})
	} catch (error) {
		console.error('Erro ao carregar taxas', error)
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

function setupFeeModes(root: HTMLElement) {
	const feeBox = root.querySelector('#feeModes')!
	const inputs = Array.from(
		feeBox.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-fee]')
	)

	const sem = root.querySelector<HTMLElement>('#container-sem-taxa')!
	const unica = root.querySelector<HTMLElement>('#container-taxa-unica')!
	const distancia = root.querySelector<HTMLElement>('#container-taxa-distancia')!

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
