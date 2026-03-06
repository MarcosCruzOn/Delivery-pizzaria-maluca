import { AdminLayout } from '../../components/AdminLayout/AdminLayout'

type Tab = 'sobre' | 'endereco' | 'horario'

export function renderCompany(root: HTMLElement) {
	root.innerHTML = AdminLayout({
		title: 'Configurações da Empresa',
		iconClass: 'fas fa-building',
		active: 'company',
		content: `
      <div class="container">
        <div class="row">

          <div class="col-12">
            <div class="menus-config" id="tabs-company">
              <a href="#" class="btn btn-white btn-sm" data-tab="sobre">
                <i class="fas fa-info-circle"></i> Sobre a empresa
              </a>
              <a href="#" class="btn btn-white btn-sm" data-tab="endereco">
                <i class="fas fa-map-marked-alt"></i> Endereço físico
              </a>
              <a href="#" class="btn btn-white btn-sm active" data-tab="horario">
                <i class="fas fa-clock"></i> Horário de funcionamento
              </a>
            </div>
          </div>

          <!-- SOBRE -->
          <div class="col-12 mt-5 hidden" id="sobre">
            <div class="d-flex">
              <div class="logo-empresa">
                <div class="container-img-sobre" style="background-image: url('/logo.png'); background-size: 70%;">
                  <a href="#" class="icon-action me-1 mb-1" title="Editar">
                    <i class="fas fa-pencil-alt"></i>
                  </a>
                </div>
              </div>

              <div class="detalhes-empresa">
                <p class="title-categoria mb-0"><b>Nome da empresa:</b></p>
                <div class="form-group mt-2">
                  <input type="text" class="form-control" id="companyName" />
                </div>

                <p class="title-categoria mb-0 mt-4"><b>Sobre da empresa:</b></p>
                <div class="form-group mt-2">
                  <textarea class="form-control" id="companyAbout"></textarea>
                </div>

                <a class="btn btn-yellow btn-sm mt-5" id="btnSaveAbout">
                  <i class="fas fa-check"></i>&nbsp; Salvar Alterações
                </a>
              </div>
            </div>
          </div>

          <!-- ENDEREÇO -->
          <div class="col-12 mt-5 hidden" id="endereco">
            <p class="title-categoria mb-0"><b>Endereço físico da empresa</b></p>

            <div class="container-group mb-3 mt-3">
              <div class="row">

                <div class="col-12 col-md-4 container-cep">
                  <p class="title-categoria mb-0"><b>CEP:</b></p>
                  <div class="form-group mt-2">
                    <input type="text" class="form-control" id="cep" />
                    <a class="btn btn-yellow btn-sm" id="btnBuscarCep">
                      Buscar
                    </a>
                  </div>
                </div>

                <div class="col-12 col-md-8">
                  <p class="title-categoria mb-0"><b>Endereço:</b></p>
                  <div class="form-group mt-2">
                    <input type="text" class="form-control" id="rua" />
                  </div>
                </div>

                <div class="col-12 col-md-4 mt-3">
                  <p class="title-categoria mb-0"><b>Número:</b></p>
                  <div class="form-group mt-2">
                    <input type="text" class="form-control" id="numero" />
                  </div>
                </div>

                <div class="col-12 col-md-8 mt-3">
                  <p class="title-categoria mb-0"><b>Bairro:</b></p>
                  <div class="form-group mt-2">
                    <input type="text" class="form-control" id="bairro" />
                  </div>
                </div>

                <div class="col-12 col-md-6 mt-3">
                  <p class="title-categoria mb-0"><b>Cidade:</b></p>
                  <div class="form-group mt-2">
                    <input type="text" class="form-control" id="cidade" />
                  </div>
                </div>

                <div class="col-12 col-md-6 mt-3">
                  <p class="title-categoria mb-0"><b>UF:</b></p>
                  <div class="form-group mt-2">
                    <input type="text" class="form-control" id="uf" />
                  </div>
                </div>

              </div>

              <a class="btn btn-yellow btn-sm mt-4" id="btnSaveAddress">
                <i class="fas fa-check"></i>&nbsp; Salvar Endereço
              </a>
            </div>
          </div>

          <!-- HORÁRIO -->
          <div class="col-12 mt-5" id="horario">
            <p class="title-categoria mb-0"><b>Horário de funcionamento</b></p>

            <div class="container-group mb-3 mt-3 horario">
              <div class="row align-items-end">

                <div class="col-3">
                  <div class="form-group">
                    <p class="title-categoria mb-0"><b>de:</b></p>
                    <select class="form-control" id="diaDe">
                      ${renderDiasOptions()}
                    </select>
                  </div>
                </div>

                <div class="col-2">
                  <div class="form-group">
                    <p class="title-categoria mb-0"><b>até:</b></p>
                    <select class="form-control" id="diaAte">
                      ${renderDiasOptions()}
                    </select>
                  </div>
                </div>

                <div class="col-3">
                  <div class="form-group">
                    <p class="title-categoria mb-0"><b>abre:</b></p>
                    <input class="form-control" type="time" id="abre" />
                  </div>
                </div>

                <div class="col-3">
                  <div class="form-group">
                    <p class="title-categoria mb-0"><b>fecha:</b></p>
                    <input class="form-control" type="time" id="fecha" />
                  </div>
                </div>

                <div class="col-1">
                  <a class="btn btn-yellow btn-sm" id="btnAddHorario" title="Adicionar">
                    <i class="fas fa-plus"></i>
                  </a>
                </div>

              </div>
            </div>

            <div class="container-group mb-3">
              <table class="table">
                <thead>
                  <tr>
                    <th>Dia</th>
                    <th>Abre</th>
                    <th>Fecha</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="listaHorarios"></tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    `,
	})

	setupTabs(root)
	setupActions(root)
	setupHorario(root)

	// começa em "horário" (como no seu HTML original, botão active) :contentReference[oaicite:2]{index=2}
	showTab(root, 'horario')
}

function setupTabs(root: HTMLElement) {
	const tabs = root.querySelector('#tabs-company')!
	tabs.addEventListener('click', (e) => {
		const a = (e.target as HTMLElement).closest('a')
		if (!a) return
		e.preventDefault()
		const tab = a.getAttribute('data-tab') as Tab
		showTab(root, tab)
	})
}

function showTab(root: HTMLElement, tab: Tab) {
	const tabs = root.querySelector('#tabs-company')!
	const sobre = root.querySelector<HTMLElement>('#sobre')!
	const endereco = root.querySelector<HTMLElement>('#endereco')!
	const horario = root.querySelector<HTMLElement>('#horario')!

	// esconde tudo
	sobre.classList.add('hidden')
	endereco.classList.add('hidden')
	horario.classList.add('hidden')

	// mostra só o selecionado
	if (tab === 'sobre') sobre.classList.remove('hidden')
	if (tab === 'endereco') endereco.classList.remove('hidden')
	if (tab === 'horario') horario.classList.remove('hidden')

	// botão ativo
	tabs.querySelectorAll('a').forEach((a) => a.classList.remove('active'))
	tabs.querySelector(`a[data-tab="${tab}"]`)?.classList.add('active')
}

function setupActions(root: HTMLElement) {
	root.querySelector('#btnSaveAbout')?.addEventListener('click', () => {
		alert('Salvar Sobre (depois vamos ligar na API)')
	})

	root.querySelector('#btnBuscarCep')?.addEventListener('click', () => {
		alert('Buscar CEP (depois vamos integrar)')
	})

	root.querySelector('#btnSaveAddress')?.addEventListener('click', () => {
		alert('Salvar Endereço (depois vamos ligar na API)')
	})
}

function setupHorario(root: HTMLElement) {
	const tbody = root.querySelector<HTMLTableSectionElement>('#listaHorarios')!
	const btn = root.querySelector<HTMLAnchorElement>('#btnAddHorario')!

	const diaDe = root.querySelector<HTMLSelectElement>('#diaDe')!
	const diaAte = root.querySelector<HTMLSelectElement>('#diaAte')!
	const abre = root.querySelector<HTMLInputElement>('#abre')!
	const fecha = root.querySelector<HTMLInputElement>('#fecha')!

	btn.addEventListener('click', (e) => {
		e.preventDefault()
		if (!abre.value || !fecha.value) {
			alert('Preencha abre e fecha.')
			return
		}

		const row = document.createElement('tr')
		row.innerHTML = `
      <td>${diaDe.options[diaDe.selectedIndex].text} - ${diaAte.options[diaAte.selectedIndex].text}</td>
      <td>${abre.value}</td>
      <td>${fecha.value}</td>
      <td>
        <a href="#" class="btn btn-sm btn-white">Remover</a>
      </td>
    `

		row.querySelector('a')!.addEventListener('click', (ev) => {
			ev.preventDefault()
			row.remove()
		})

		tbody.appendChild(row)
	})
}

function renderDiasOptions() {
	const dias = [
		{ v: '-1', t: '.' },
		{ v: '0', t: 'Domingo' },
		{ v: '1', t: 'Segunda' },
		{ v: '2', t: 'Terça' },
		{ v: '3', t: 'Quarta' },
		{ v: '4', t: 'Quinta' },
		{ v: '5', t: 'Sexta' },
		{ v: '6', t: 'Sábado' },
	]
	return dias.map((d) => `<option value="${d.v}">${d.t}</option>`).join('')
}
