import { mount } from '@delivery/shared/dom'
;('../utils/dom')
import { TitleHeader } from '../components/TitleHeader/TitleHeader'

import { getCompany, getHorarios } from '../api/company'
import { EmptyState } from '../components/EmptyState/EmptyState'

function getDiaNome(dia: number) {
	const dias = [
		'Domingo',
		'Segunda',
		'Terça',
		'Quarta',
		'Quinta',
		'Sexta',
		'Sábado',
	]

	return dias[dia] || ''
}

function formatHorario(h: any) {
	const inicio = getDiaNome(h.diainicio)
	const fim = getDiaNome(h.diafim)

	const dias = h.diainicio === h.diafim ? inicio : `${inicio} a ${fim}`

	return {
		dias,
		horario: `${h.iniciohorarioum} às ${h.fimhorarioum}`,
	}
}

export async function renderAbout(root: HTMLElement) {
	let horarios: any[] = []

	try {
		horarios = await getHorarios()
	} catch {
		console.log('Sem horários')
	}

	let company: any = null

	try {
		company = await getCompany()
	} catch {
		console.log('Sem dados da empresa')
	}

	root.innerHTML = `
    <div class="bg-top sobre"></div>  
    <div id="app-title-header"></div>

    <section class="width-fix mt-5 mb-4">
      <div class="card">
        <div id="about-content"></div>
      </div>
    </section>

    <section class="lista width-fix mt-5 pb-5">
      <div id="about-extra"></div>
    </section>
  `

	mount('#app-title-header', TitleHeader({ title: 'Sobre a loja' }))

	const content = document.querySelector('#about-content')!
	const extra = document.querySelector('#about-extra')!

	// 🧠 SOBRE
	if (!company?.sobre) {
		content.appendChild(EmptyState('Adicione uma descrição da sua loja'))
	} else {
		content.innerHTML = `
			<div class="d-flex">
				<img 
					class="container-img-sobre"
					src="http://localhost:3333${company.logotipo || ''}" 
					style="width:80px;height:80px;border-radius:10px;object-fit:cover;"
				/>
				<div class=">
					<h1 class="mb-2"><b>${company.nome || 'Nome não definido'}</b></h1>
					<p class="normal-text">
						${company.sobre || 'Adicione informações no painel administrativo'}
					</p>
				</div>
			</div>
		`
	}

	// 📍 ENDEREÇO + MAPA
	const enderecoContainer = document.createElement('div')
	enderecoContainer.className = 'container-group mb-5'

	enderecoContainer.innerHTML = `
		<p class="title-categoria mb-3">
			<i class="fas fa-map-marker-alt"></i>&nbsp; <b>Endereço</b>
		</p>
	`

	if (!company?.endereco) {
		enderecoContainer.appendChild(EmptyState('Cadastre um endereço'))
	} else {
		const wrapper = document.createElement('div')
		wrapper.className = 'row g-3 align-items-stretch'

		// 📍 CARD ENDEREÇO
		const colEndereco = document.createElement('div')
		colEndereco.className = 'col-12 col-md-6'

		colEndereco.innerHTML = `
			<div class="card h-100 p-3">
				<p class="normal-text mb-0">
					${company.endereco}, ${company.numero} <br>
					${company.bairro} <br>
					${company.cidade} - ${company.estado} <br>
					CEP: ${company.cep}
				</p>
			</div>
		`

		// 🗺️ MAPA
		const colMapa = document.createElement('div')
		colMapa.className = 'col-12 col-md-6'

		const endereco = `${company.endereco}, ${company.numero}, ${company.cidade}`

		colMapa.innerHTML = `
			<div class="card h-100 p-2">
				<iframe
					width="100%"
					height="100%"
					style="border:0; border-radius:10px; min-height:200px;"
					loading="lazy"
					src="https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed">
				</iframe>
			</div>
		`

		wrapper.appendChild(colEndereco)
		wrapper.appendChild(colMapa)

		enderecoContainer.appendChild(wrapper)
	}

	extra.appendChild(enderecoContainer)

	// ⏰ HORÁRIO
	const containerHorario = document.createElement('div')
	containerHorario.className = 'container-group mb-5'

	containerHorario.innerHTML = `
		<p class="title-categoria mb-3">
			<i class="fas fa-clock"></i>&nbsp; <b>Horário de funcionamento</b>
		</p>
	`

	if (!horarios.length) {
		containerHorario.appendChild(
			EmptyState('Defina horário de funcionamento')
		)
	} else {
		horarios.forEach((h) => {
			const formatted = formatHorario(h)

			const card = document.createElement('div')
			card.className = 'card mt-2'

			card.innerHTML = `
				<p class="normal-text mb-0"><b>${formatted.dias}</b></p>
				<p class="normal-text mb-0">${formatted.horario}</p>
			`

			containerHorario.appendChild(card)
		})
	}

	extra.appendChild(containerHorario)

	// 💳 PAGAMENTO
	const pagamentosContainer = document.createElement('div')
	pagamentosContainer.className = 'container-group mb-5'

	pagamentosContainer.innerHTML = `
		<p class="title-categoria mb-3">
			<i class="fas fa-coins"></i>&nbsp; <b>Formas de pagamento</b>
		</p>
	`

	if (!company?.pagamentos) {
		pagamentosContainer.appendChild(
			EmptyState('Adicione formas de pagamento')
		)
	} else {
		const list = company.pagamentos.split(',')

		list.forEach((p: string) => {
			const card = document.createElement('div')
			card.className = 'card mt-2'
			card.innerHTML = `<p class="normal-text mb-0"><b>${p.trim()}</b></p>`

			pagamentosContainer.appendChild(card)
		})
	}

	extra.appendChild(pagamentosContainer)
}
