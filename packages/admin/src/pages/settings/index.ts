import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
import { getPagamentos, togglePagamento } from '../../api/pagamentos'
import { getTaxas, updateTaxa, addFaixaDistancia, removeFaixaDistancia } from '../../api/taxas'
import { getDeliveryTypes, updateDeliveryType } from '../../api/delivery'

type Tab = 'delivery' | 'taxa' | 'pagamento'
type FeeMode = 'sem' | 'unica' | 'distancia'

export async function renderSettings(root: HTMLElement) {
	root.innerHTML = AdminLayout({
		title: 'Configurações do Delivery',
		iconClass: 'fas fa-cog',
		active: 'settings',
		content: `
		<div class="container pb-5">
			<div class="row">

				<div class="col-12 mt-3">
					<div class="menus-config d-flex gap-3" id="tabs-config">
						<a href="javascript:void(0)" class="btn btn-white btn-sm px-4 py-2" data-tab="delivery" style="border-radius: 50px;">
							<i class="fas fa-shopping-bag"></i> Delivery e retirada
						</a>
						<a href="javascript:void(0)" class="btn btn-white btn-sm px-4 py-2" data-tab="taxa" style="border-radius: 50px;">
							<i class="fas fa-motorcycle"></i> Taxa de entrega
						</a>
						<a href="javascript:void(0)" class="btn btn-white btn-sm px-4 py-2 active" data-tab="pagamento" style="border-radius: 50px;">
							<i class="fas fa-coins"></i> Formas de pagamento
						</a>
					</div>
				</div>

				<div class="col-12 mt-5 hidden" id="delivery-retirada">
					<p class="title-categoria mb-4 text-dark">
						<b>Selecione as opções de entrega da sua loja</b>
					</p>

					<!-- Card Retirada -->
					<div class="card card-address mt-3">
						<div class="d-flex align-items-center flex-grow-1">
							<div class="img-icon-details me-4">
								<i class="fas fa-box text-dark fa-lg"></i>
							</div>
							<div class="infos config" style="min-width: 150px;">
								<p class="name mb-2 text-dark"><b>Retirada</b></p>
								<div class="d-flex align-items-center gap-2">
									<label class="switch mb-0">
										<input id="toggleRetirada" type="checkbox" />
										<span class="slider round"></span>
									</label>
									<span class="text-muted" style="font-size: 0.9em;" id="txtRetirada">Desligado</span>
								</div>
							</div>
						</div>
						
						<div class="d-flex align-items-center gap-4 disabled tempo" id="tempoRetirada">
							<div class="form-group mb-0">
								<label class="text-muted" >
									<b>Tempo mínimo retirada (min)</b>
								</label>
								<input type="number" min="0" id="minRetirada" class="form-control form-control-light" placeholder="00" disabled />
							</div>
							<div class="form-group mb-0">
								<label class="text-muted" >
									<b>Tempo máximo retirada (min)</b>
								</label>
								<input type="number" min="0" id="maxRetirada" class="form-control form-control-light" placeholder="00" disabled />
							</div>
							<a href="javascript:void(0)" class="btn btn-yellow px-4 disabled mt-3" id="btnSalvarRetirada">
								<i class="fas fa-check"></i> Salvar
							</a>
						</div>
					</div>

					<!-- Card Delivery -->
					<div class="card card-address mt-3">
						<div class="d-flex align-items-center flex-grow-1">
							<div class="img-icon-details me-4"><i class="fas fa-motorcycle text-dark fa-lg"></i></div>
							<div class="infos config" style="min-width: 150px;">
								<p class="name mb-2 text-dark"><b>Delivery</b></p>
								<div class="d-flex align-items-center gap-2">
									<label class="switch mb-0">
										<input id="toggleDelivery" type="checkbox" />
										<span class="slider round"></span>
									</label>
									<span class="text-muted" style="font-size: 0.9em;" id="txtDelivery">Desligado</span>
								</div>
							</div>
						</div>
						
						<div class="d-flex align-items-center gap-4 disabled tempo" id="tempoDelivery">
							<div class="form-group mb-0">
								<label class="text-muted"><b>Tempo mínimo entrega (min)</b></label>
								<input type="number" id="minDelivery" class="form-control form-control-light" placeholder="00" disabled />
							</div>
							<div class="form-group mb-0">
								<label class="text-muted"><b>Tempo máximo entrega (min)</b></label>
								<input type="number" id="maxDelivery" class="form-control form-control-light" placeholder="00" disabled />
							</div>
							<a href="javascript:void(0)" class="btn btn-yellow px-4 disabled mt-3" id="btnSalvarDelivery">
								<i class="fas fa-check"></i> Salvar
							</a>
						</div>
					</div>
				</div>

				<!-- Aba Taxas de Entrega -->
				<div class="col-12 mt-5 hidden" id="taxa-entrega">
					<p class="title-categoria mb-4 text-dark">
						<b>Selecione as opções de taxas de entrega</b>
					</p>

					<div class="d-flex gap-3 mb-4" id="feeModes">
						<label class="fee-option card px-4 py-3 d-flex flex-row align-items-center m-0">
							<input type="checkbox" data-fee="sem" class="d-none" />
							<div class="custom-radio me-2"></div>
							<span class="text-dark">Sem taxa</span>
						</label>
						
						<label class="fee-option card px-4 py-3 d-flex flex-row align-items-center m-0" style="cursor: pointer; border-radius: 50px;">
							<input type="checkbox" data-fee="unica" class="d-none" />
							<div class="custom-radio me-2"></div>
							<span class="text-dark">Taxa única</span>
						</label>
						
						<label class="fee-option card px-4 py-3 d-flex flex-row align-items-center m-0" style="cursor: pointer; border-radius: 50px;">
							<input type="checkbox" data-fee="distancia" class="d-none" />
							<div class="custom-radio me-2"></div>
							<span class="text-dark">Taxa por distância</span>
						</label>
					</div>

					<div id="container-sem-taxa" class="card card-horizontal mt-3 hidden">
						<div class="d-flex justify-content-between align-items-center w-100">
							<p class="text-dark mb-0"><b>Nenhuma taxa será cobrada na entrega.</b></p>
							<a href="javascript:void(0)" class="btn btn-yellow px-4" style="border-radius: 20px;">Ativar Modo</a>
						</div>
					</div>

					<div id="container-taxa-unica" class="card card-horizontal mt-3 hidden">
						<div class="d-flex align-items-end gap-4 w-100">
							<div class="form-group mb-0" style="width: 250px;">
								<label class="text-dark mb-2" style="font-size: 0.9em;"><b>Taxa (R$)</b></label>
								<input type="number" step="0.01" class="form-control form-control-light font-weight-bold" placeholder="R$ 20,00" />
							</div>
							<a href="javascript:void(0)" class="btn btn-yellow px-4 mb-1" style="border-radius: 20px;">
								<i class="fas fa-check"></i> Salvar Alterações
							</a>
						</div>
					</div>

					<div id="container-taxa-distancia" class="mt-3 hidden">
						<div class="card card-horizontal mb-4">
							<div class="d-flex align-items-end gap-4 w-100">
								<div class="form-group mb-0" style="flex: 1;">
									<label class="text-dark mb-2" style="font-size: 0.9em;"><b>Distância até (km)</b></label>
									<input type="number" id="inputDistanciaKm" class="form-control form-control-light" placeholder="Ex: 5" />
								</div>
								<div class="form-group mb-0" style="flex: 1;">
									<label class="text-dark mb-2" style="font-size: 0.9em;"><b>Taxa (R$)</b></label>
									<input type="number" step="0.01" id="inputDistanciaValor" class="form-control form-control-light" placeholder="Ex: 20.00" />
								</div>
								<a href="javascript:void(0)" class="btn btn-yellow px-4 mb-1" id="btnAddFaixaKm" style="border-radius: 20px;">
									<i class="fas fa-plus"></i> Adicionar
								</a>
							</div>
						</div>

						<p class="title-categoria mb-3 text-dark mt-5"><b>Lista das taxas cadastradas:</b></p>
						<div class="card p-0 overflow-hidden">
							<table class="table mb-0 taxa-table">
								<thead class="bg-light border-bottom">
									<tr>
										<th class="border-0 py-3 ps-4">Distância (km)</th>
										<th class="border-0 py-3">Taxa (R$)</th>
										<th class="border-0 py-3 text-end pe-4">Ações</th>
									</tr>
								</thead>
								<tbody id="lista-faixas-km">
									</tbody>
							</table>
						</div>
						
						<div class="text-end mt-4">
							<a href="javascript:void(0)" class="btn btn-yellow px-5" id="btnSalvarDistancia" style="border-radius: 20px;">
								<i class="fas fa-check"></i> Ativar Modo por Distância
							</a>
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

	setupFeeModes(root)

	await carregarE_RenderizarPagamentos(root)
	await carregarE_RenderizarTaxas(root)
	await carregarE_RenderizarDelivery(root)
}

// =====================================
// FUNÇÕES DE LÓGICA (100% Preservadas)
// =====================================

async function carregarE_RenderizarPagamentos(root: HTMLElement) {
	const container = root.querySelector('#forma-pagamento')
	if (!container) return

	try {
		const pagamentos = await getPagamentos()

		const htmlPagamentos = pagamentos
			.map(
				(p: any) => `
			<div class="card card-horizontal mb-3">
				<div class="d-flex align-items-center w-100">
					<div class="img-icon-details me-4">
						<i class="fas ${p.nome.toLowerCase().includes('dinheiro') ? 'fa-coins' : p.nome.toLowerCase().includes('pix') ? 'fa-qrcode' : 'fa-credit-card'} text-dark fa-lg"></i>
					</div>
					<div class="infos flex-grow-1">
						<p class="name mb-0 text-dark"><b>${p.nome}</b></p>
					</div>
					<label class="switch mb-0">
						<input type="checkbox" class="toggle-pagamento-checkbox" data-id="${p.idpagamentos}" ${p.ATIVO === 1 ? 'checked' : ''} />
						<span class="slider round"></span>
					</label>
				</div>
			</div>
		`
			)
			.join('')

		container.innerHTML = `
			<p class="title-categoria mb-4 text-dark">
				<b>Selecione as formas de <span class="text-warning">pagamento na entrega</span></b>
			</p>
			${htmlPagamentos}
			
			<p class="title-categoria mb-3 text-dark mt-5">
				<b>Formas de <span class="text-warning">pagamento via aplicativo</span></b>
			</p>
			<div class="card card-horizontal opacity-05" style="background-color: #fafafa;">
				<div class="d-flex align-items-center w-100">
					<div class="img-icon-details" style="background-color: #eee;"><i class="fas fa-mobile-alt text-muted fa-lg"></i></div>
					<div class="infos ms-4">
						<p class="name mb-1 text-muted"><b>Em construção...</b></p>
						<small class="text-muted">Esta função será liberada em breve.</small>
					</div>
				</div>
			</div>
		`

		container.querySelectorAll('.toggle-pagamento-checkbox').forEach((checkbox) => {
			checkbox.addEventListener('change', async (e) => {
				const target = e.target as HTMLInputElement
				const id = Number(target.dataset.id)
				const estaLigado = target.checked
				try {
					await togglePagamento(id, estaLigado)
				} catch (err) {
					alert('Erro ao salvar no banco!')
					target.checked = !estaLigado
				}
			})
		})
	} catch (error) {
		container.innerHTML = `<p class="text-danger mt-4">Erro ao carregar pagamentos do servidor.</p>`
	}
}

async function carregarE_RenderizarTaxas(root: HTMLElement) {
	try {
		const taxas = await getTaxas()
		const faixasDistancia = taxas.filter(
			(t: any) => t.idtaxaentregatipo === 3 && t.distancia !== null
		)
		const containerFaixas = root.querySelector('#lista-faixas-km')

		if (containerFaixas) {
			containerFaixas.innerHTML =
				faixasDistancia.length > 0
					? faixasDistancia
							.map(
								(f: any) => `
                <tr>
					<td class="py-3 ps-4 align-middle text-muted">Até ${f.distancia} km</td>
					<td class="py-3 align-middle text-dark"><b>R$ ${Number(f.valor).toFixed(2).replace('.', ',')}</b></td>
					<td class="py-3 pe-4 align-middle text-end">
						<button class="btn btn-white btn-sm text-danger btn-remover-faixa px-3" data-id="${f.idtaxaentrega}" style="box-shadow: none; border: 1px solid #eee;"><i class="fas fa-ellipsis-v"></i> Remover</button>
					</td>
				</tr>
            `
							)
							.join('')
					: `<tr><td colspan="3" class="text-center py-4 text-muted">Nenhuma faixa cadastrada.</td></tr>`

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

		// 1. Trava para Adicionar Faixa de KM
		root.querySelector('#btnAddFaixaKm')?.addEventListener('click', async (e) => {
			e.preventDefault()
			const km = Number((root.querySelector('#inputDistanciaKm') as HTMLInputElement).value)
			const valor = Number(
				(root.querySelector('#inputDistanciaValor') as HTMLInputElement).value
			)

			// Validação de segurança
			if (isNaN(km) || km <= 0)
				return alert('Informe uma distância válida em KM (maior que zero)!')
			if (isNaN(valor) || valor < 0)
				return alert('Informe um valor de taxa válido (ex: 8.50)!')

			try {
				await addFaixaDistancia(km, valor)
				location.reload()
			} catch (err) {
				alert('Erro ao adicionar faixa!')
			}
		})

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
				const input = root.querySelector('#container-taxa-unica input') as HTMLInputElement
				const valorDigitado = Number(input.value)

				// Validação de segurança
				if (isNaN(valorDigitado) || valorDigitado < 0) {
					return alert('Por favor, insira um valor de taxa válido (ex: 10.00)!')
				}

				try {
					await updateTaxa(2, valorDigitado)
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

async function carregarE_RenderizarDelivery(root: HTMLElement) {
	try {
		const entregas = await getDeliveryTypes()
		let idDelivery = 1,
			idRetirada = 2

		const chkRetirada = root.querySelector('#toggleRetirada') as HTMLInputElement
		const txtRetirada = root.querySelector('#txtRetirada') as HTMLElement
		const divTempoRetirada = root.querySelector('#tempoRetirada') as HTMLElement
		const btnSalvarRetirada = root.querySelector('#btnSalvarRetirada') as HTMLElement
		const minRetirada = root.querySelector('#minRetirada') as HTMLInputElement
		const maxRetirada = root.querySelector('#maxRetirada') as HTMLInputElement

		const chkDelivery = root.querySelector('#toggleDelivery') as HTMLInputElement
		const txtDelivery = root.querySelector('#txtDelivery') as HTMLElement
		const divTempoDelivery = root.querySelector('#tempoDelivery') as HTMLElement
		const btnSalvarDelivery = root.querySelector('#btnSalvarDelivery') as HTMLElement
		const minDelivery = root.querySelector('#minDelivery') as HTMLInputElement
		const maxDelivery = root.querySelector('#maxDelivery') as HTMLInputElement

		entregas.forEach((e: any) => {
			if (e.nome.toLowerCase() === 'retirada') {
				idRetirada = e.idtipoentrega
				chkRetirada.checked = e.ATIVO === 1
				minRetirada.value = e.tempominimo || ''
				maxRetirada.value = e.tempomaximo || ''
				applyUI(chkRetirada, txtRetirada, divTempoRetirada, btnSalvarRetirada)
			}
			if (e.nome.toLowerCase() === 'delivery') {
				idDelivery = e.idtipoentrega
				chkDelivery.checked = e.ATIVO === 1
				minDelivery.value = e.tempominimo || ''
				maxDelivery.value = e.tempomaximo || ''
				applyUI(chkDelivery, txtDelivery, divTempoDelivery, btnSalvarDelivery)
			}
		})

		function applyUI(
			chk: HTMLInputElement,
			txt: HTMLElement,
			divTempo: HTMLElement,
			btn: HTMLElement
		) {
			const on = chk.checked
			txt.textContent = on ? 'Ligado' : 'Desligado'
			divTempo.classList.toggle('disabled', !on)
			btn.classList.toggle('disabled', !on)
			divTempo
				.querySelectorAll('input')
				.forEach((i) => ((i as HTMLInputElement).disabled = !on))
		}

		chkRetirada?.addEventListener('change', () =>
			applyUI(chkRetirada, txtRetirada, divTempoRetirada, btnSalvarRetirada)
		)
		chkDelivery?.addEventListener('change', () =>
			applyUI(chkDelivery, txtDelivery, divTempoDelivery, btnSalvarDelivery)
		)

		// 3. Trava para Salvar Retirada
		btnSalvarRetirada?.addEventListener('click', async (e) => {
			e.preventDefault()
			if (btnSalvarRetirada.classList.contains('disabled')) return

			const min = Number(minRetirada.value)
			const max = Number(maxRetirada.value)

			// Validação de segurança
			if (min < 0 || max < 0) return alert('Os tempos de retirada não podem ser negativos!')
			if (min > max) return alert('O tempo mínimo não pode ser maior que o tempo máximo!')

			try {
				await updateDeliveryType(idRetirada, {
					ativo: chkRetirada.checked ? 1 : 0,
					tempominimo: min,
					tempomaximo: max,
				})
				alert('Configurações de Retirada atualizadas!')
			} catch (err) {
				alert('Erro ao salvar Retirada')
			}
		})

		// 4. Trava para Salvar Delivery
		btnSalvarDelivery?.addEventListener('click', async (e) => {
			e.preventDefault()
			if (btnSalvarDelivery.classList.contains('disabled')) return

			const min = Number(minDelivery.value)
			const max = Number(maxDelivery.value)

			// Validação de segurança
			if (min < 0 || max < 0) return alert('Os tempos de entrega não podem ser negativos!')
			if (min > max) return alert('O tempo mínimo não pode ser maior que o tempo máximo!')

			try {
				await updateDeliveryType(idDelivery, {
					ativo: chkDelivery.checked ? 1 : 0,
					tempominimo: min,
					tempomaximo: max,
				})
				alert('Configurações de Delivery atualizadas!')
			} catch (err) {
				alert('Erro ao salvar Delivery')
			}
		})
	} catch (error) {
		console.error('Erro ao carregar', error)
	}
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
		tabs.querySelectorAll('a').forEach((a) => a.classList.remove('active', 'btn-yellow'))
		tabs.querySelectorAll('a').forEach((a) => a.classList.add('btn-white'))

		const activeBtn = tabs.querySelector(`a[data-tab="${tab}"]`)
		if (activeBtn) {
			activeBtn.classList.add('active')
			activeBtn.classList.remove('btn-white')
			activeBtn.classList.add('btn-yellow') // A cor amarela da aba ativa!
		}
	}

	tabs.addEventListener('click', (e) => {
		const a = (e.target as HTMLElement).closest('a')
		if (!a) return
		e.preventDefault()
		show(a.getAttribute('data-tab') as Tab)
	})
	show('delivery')
}

function setupFeeModes(root: HTMLElement) {
	const feeBox = root.querySelector('#feeModes')!

	// Corrigido: Avisamos o TypeScript que essas opções são HTMLElements!
	const options = Array.from(feeBox.querySelectorAll<HTMLElement>('.fee-option'))
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

		// O JavaScript agora apenas adiciona/remove a classe "active-fee", e o CSS cuida das cores!
		options.forEach((opt) => {
			const input = opt.querySelector('input') as HTMLInputElement
			const radio = opt.querySelector('.custom-radio') as HTMLElement

			if (input.checked) {
				opt.classList.add('active-fee')
				radio.innerHTML =
					'<i class="fas fa-check text-white" style="font-size: 10px; margin-top: -2px;"></i>'
			} else {
				opt.classList.remove('active-fee')
				radio.innerHTML = ''
			}
		})
	}

	feeBox.addEventListener('change', (e) => {
		const input = e.target as HTMLInputElement
		const mode = input.getAttribute('data-fee') as FeeMode | null
		if (!mode) return

		inputs.forEach((i) => (i.checked = i === input ? input.checked : false))
		showFee(input.checked ? mode : null)
	})

	showFee(null)
}
