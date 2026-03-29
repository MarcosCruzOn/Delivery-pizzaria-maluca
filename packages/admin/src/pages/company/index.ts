import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
// Importamos os nossos garçons!
import {
	buscarDadosEmpresa,
	atualizarEmpresa,
	fazerUploadLogo,
	salvarLogoEmpresa,
	listarHorarios,
	criarHorario,
	buscarCepNaViaCep,
} from '../../api/company'

type Tab = 'sobre' | 'endereco' | 'horario'

export function renderCompany(root: HTMLElement) {
	// ... (MANTENHA TODO O SEU root.innerHTML EXATAMENTE COMO VOCÊ ME MANDOU, NÃO MUDEI NADA NO HTML!) ...
	// Vou pular o HTML aqui para economizar espaço, cole o seu root.innerHTML aqui novamente!
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
                <div class="container-img-sobre border-pri" id="logoPreview" style="background-size: cover;">
					<input type="file" id="logoInput" hidden />
					<a href="#" class="icon-action me-1 mb-1" id="btnUploadLogo">
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
					<p class="title-categoria mb-0"><b>Complemento:</b></p>
					<div class="form-group mt-2">
						<input type="text" class="form-control" id="complemento" placeholder="Apto, Bloco, Casa 2..." />
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
	loadCompanyData(root)
	setupHorario(root)
	loadHorarios(root)

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

// Função auxiliar para pegar todos os dados da tela (Sobre + Endereço) de uma vez
function lerTodosOsCamposDaTela(root: HTMLElement) {
	return {
		nome: (root.querySelector('#companyName') as HTMLInputElement).value,
		sobre: (root.querySelector('#companyAbout') as HTMLTextAreaElement)
			.value,
		cep: (root.querySelector('#cep') as HTMLInputElement).value,
		endereco: (root.querySelector('#rua') as HTMLInputElement).value,
		numero: (root.querySelector('#numero') as HTMLInputElement).value,
		bairro: (root.querySelector('#bairro') as HTMLInputElement).value,
		cidade: (root.querySelector('#cidade') as HTMLInputElement).value,
		estado: (root.querySelector('#uf') as HTMLInputElement).value,
		complemento: (root.querySelector('#complemento') as HTMLInputElement)
			.value,
	}
}

function setupActions(root: HTMLElement) {
	// Salvar Sobre
	root.querySelector('#btnSaveAbout')?.addEventListener('click', async () => {
		try {
			const dados = lerTodosOsCamposDaTela(root)
			await atualizarEmpresa(dados)
			alert('Dados sobre a empresa salvos com sucesso!')
		} catch (error) {
			alert('Erro ao salvar')
		}
	})

	// Buscar CEP via ViaCEP
	root.querySelector('#btnBuscarCep')?.addEventListener('click', async () => {
		const cepInput = (root.querySelector('#cep') as HTMLInputElement).value
		const btnBuscar = root.querySelector('#btnBuscarCep') as HTMLElement

		if (!cepInput) {
			alert('Por favor, digite um CEP antes de buscar.')
			return
		}

		try {
			// Efeito visual: Muda o texto do botão para mostrar que está carregando
			const textoOriginal = btnBuscar.innerHTML
			btnBuscar.innerHTML = 'Buscando...'
			btnBuscar.style.pointerEvents = 'none' // Impede de clicar 2 vezes rápido

			// Chama a API do ViaCEP
			const dadosEndereco = await buscarCepNaViaCep(cepInput)

			// Preenche as caixinhas de texto com os dados que voltaram!
			// O ViaCEP chama rua de "logradouro" e cidade de "localidade"
			;(root.querySelector('#rua') as HTMLInputElement).value =
				dadosEndereco.logradouro || ''
			;(root.querySelector('#bairro') as HTMLInputElement).value =
				dadosEndereco.bairro || ''
			;(root.querySelector('#cidade') as HTMLInputElement).value =
				dadosEndereco.localidade || ''
			;(root.querySelector('#uf') as HTMLInputElement).value =
				dadosEndereco.uf || ''

			// Foca no campo de Número para o usuário só digitar o número da casa e salvar
			;(root.querySelector('#numero') as HTMLInputElement).focus()

			// Restaura o botão
			btnBuscar.innerHTML = textoOriginal
			btnBuscar.style.pointerEvents = 'auto'
		} catch (error: any) {
			alert(error.message || 'Erro ao buscar CEP')

			// Restaura o botão em caso de erro também
			btnBuscar.innerHTML = 'Buscar'
			btnBuscar.style.pointerEvents = 'auto'
		}
	})

	// Salvar Endereço
	root.querySelector('#btnSaveAddress')?.addEventListener(
		'click',
		async () => {
			try {
				const dados = lerTodosOsCamposDaTela(root)
				await atualizarEmpresa(dados)
				alert('Endereço salvo com sucesso!')
			} catch (error) {
				alert('Erro ao salvar endereço')
			}
		}
	)

	// ===== LOGO UPLOAD (Agora chamando a API!) =====
	const input = root.querySelector('#logoInput') as HTMLInputElement
	const preview = root.querySelector('#logoPreview') as HTMLElement
	const btnLogo = root.querySelector('#btnUploadLogo')!

	btnLogo.addEventListener('click', (e) => {
		e.preventDefault()
		input.click()
	})

	input.addEventListener('change', async () => {
		const file = input.files?.[0]
		if (!file) return

		// 👁 preview visual
		const reader = new FileReader()
		reader.onload = () => {
			preview.style.backgroundImage = `url(${reader.result})`
		}
		reader.readAsDataURL(file)

		try {
			// 1. Faz upload e pega o nome maluco da imagem (ex: 1712...-logo.png)
			const uploadResult = await fazerUploadLogo(file)

			// 2. Salva esse nome no banco de dados da empresa
			await salvarLogoEmpresa(uploadResult.filename)
			alert('Logotipo atualizado!')
		} catch (error) {
			alert('Erro ao fazer upload da logotipo')
		}
	})
}

function setupHorario(root: HTMLElement) {
	const btn = root.querySelector<HTMLAnchorElement>('#btnAddHorario')!
	const diaDe = root.querySelector<HTMLSelectElement>('#diaDe')!
	const diaAte = root.querySelector<HTMLSelectElement>('#diaAte')!
	const abre = root.querySelector<HTMLInputElement>('#abre')!
	const fecha = root.querySelector<HTMLInputElement>('#fecha')!

	btn.addEventListener('click', async (e) => {
		e.preventDefault()

		if (!abre.value || !fecha.value) {
			alert('Preencha abre e fecha.')
			return
		}

		const data = {
			diainicio: Number(diaDe.value),
			diafim: Number(diaAte.value),
			iniciohorarioum: abre.value,
			fimhorarioum: fecha.value,
		}

		try {
			await criarHorario(data)
			alert('Horário salvo!')
			await loadHorarios(root) // Recarrega a tabela
		} catch {
			alert('Erro ao salvar horário')
		}
	})
}

async function loadHorarios(root: HTMLElement) {
	const tbody = root.querySelector<HTMLTableSectionElement>('#listaHorarios')!

	try {
		const horarios = await listarHorarios()
		tbody.innerHTML = ''

		horarios.forEach((h: any) => {
			const row = document.createElement('tr')
			row.innerHTML = `
				<td>${h.diainicio} - ${h.diafim}</td>
				<td>${h.iniciohorarioum}</td>
				<td>${h.fimhorarioum}</td>
				<td>
					<a href="#" data-id="${h.idhorario}" class="btn btn-sm btn-white" title="Em breve">X</a>
				</td>
			`
			// OBSERVAÇÃO: Nós não criamos a rota DELETE no backend ainda!
			row.querySelector('a')!.addEventListener('click', (e) => {
				e.preventDefault()
				alert(
					'Ops! A rota de excluir horário ainda não foi construída no servidor!'
				)
			})

			tbody.appendChild(row)
		})
	} catch (error) {
		console.log('Erro ao buscar horários da tabela')
	}
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

async function loadCompanyData(root: HTMLElement) {
	try {
		const company = await buscarDadosEmpresa()

		// Preenche os inputs com o que veio do banco!
		;(root.querySelector('#companyName') as HTMLInputElement).value =
			company.nome || ''
		;(root.querySelector('#companyAbout') as HTMLTextAreaElement).value =
			company.sobre || ''
		;(root.querySelector('#cep') as HTMLInputElement).value =
			company.cep || ''
		;(root.querySelector('#rua') as HTMLInputElement).value =
			company.endereco || ''
		;(root.querySelector('#numero') as HTMLInputElement).value =
			company.numero || ''
		;(root.querySelector('#complemento') as HTMLInputElement).value =
			company.complemento || ''
		;(root.querySelector('#bairro') as HTMLInputElement).value =
			company.bairro || ''
		;(root.querySelector('#cidade') as HTMLInputElement).value =
			company.cidade || ''
		;(root.querySelector('#uf') as HTMLInputElement).value =
			company.estado || ''

		// 🖼 logo preview
		const preview = root.querySelector('#logoPreview') as HTMLElement
		if (company.logotipo) {
			// Usando o proxy do vite de novo (/uploads/...)
			preview.style.backgroundImage = `url(/uploads/${company.logotipo})`
		}
	} catch {
		console.log('Erro ao carregar empresa')
	}
}
