import { mount } from '@delivery/shared/dom'
;('../utils/dom')
import { TitleHeader } from '../components/TitleHeader/TitleHeader'

import { getCompany, getHorarios } from '../api/company'
import { EmptyState } from '../components/EmptyState/EmptyState'

/* ================= HELPERS ================= */

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

	return {
		dias: h.diainicio === h.diafim ? inicio : `${inicio} a ${fim}`,
		horario: `${h.iniciohorarioum} às ${h.fimhorarioum}`,
	}
}

/* ================= RENDER FUNCTIONS ================= */

function renderSobre(container: HTMLElement, company: any) {
	if (!company?.sobre) {
		container.appendChild(EmptyState('Adicione uma descrição da sua loja'))
		return
	}

	container.innerHTML = `
		<div class="d-flex align-items-start gap-3 p-3">
			<img 
				src="http://localhost:3333${company.logotipo || ''}" 
				style="width:80px;height:80px;border-radius:10px;object-fit:cover;"
			/>
			<div>
				<h1 class="mb-2"><b>${company.nome || 'Nome não definido'}</b></h1>
				<p class="normal-text">
					${company.sobre}
				</p>
			</div>
		</div>
	`
}

function renderEndereco(container: HTMLElement, company: any) {
	const wrapper = document.createElement('div')
	wrapper.className = 'container-group mb-5'

	wrapper.innerHTML = `
		<p class="title-categoria mb-3">
			<i class="fas fa-map-marker-alt"></i>&nbsp; <b>Endereço</b>
		</p>
	`

	if (!company?.endereco) {
		wrapper.appendChild(EmptyState('Cadastre um endereço'))
		container.appendChild(wrapper)
		return
	}

	const row = document.createElement('div')
	row.className = 'row g-3 align-items-stretch'

	const endereco = `${company.endereco}, ${company.numero}, ${company.cidade}`

	row.innerHTML = `
		<div class="col-12 col-md-6">
			<div class="card h-100 p-3">
				<p class="normal-text mb-0">
					${company.endereco}, ${company.numero} <br>
					${company.bairro} <br>
					${company.cidade} - ${company.estado} <br>
					CEP: ${company.cep}
				</p>
			</div>
		</div>

		<div class="col-12 col-md-6">
			<div class="card h-100 p-2">
				<iframe
					width="100%"
					height="100%"
					style="border:0; border-radius:10px; min-height:200px;"
					loading="lazy"
					src="https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed">
				</iframe>
			</div>
		</div>
	`

	wrapper.appendChild(row)
	container.appendChild(wrapper)
}

function renderHorarios(container: HTMLElement, horarios: any[]) {
	const wrapper = document.createElement('div')
	wrapper.className = 'container-group mb-5'

	wrapper.innerHTML = `
		<p class="title-categoria mb-3">
			<i class="fas fa-clock"></i>&nbsp; <b>Horário de funcionamento</b>
		</p>
	`

	if (!horarios.length) {
		wrapper.appendChild(EmptyState('Defina horário de funcionamento'))
		container.appendChild(wrapper)
		return
	}

	horarios.forEach((h) => {
		const formatted = formatHorario(h)

		const card = document.createElement('div')
		card.className = 'card mt-2'

		card.innerHTML = `
			<p class="normal-text mb-0"><b>${formatted.dias}</b></p>
			<p class="normal-text mb-0">${formatted.horario}</p>
		`

		wrapper.appendChild(card)
	})

	container.appendChild(wrapper)
}

function renderPagamentos(container: HTMLElement, company: any) {
	const wrapper = document.createElement('div')
	wrapper.className = 'container-group mb-5'

	wrapper.innerHTML = `
		<p class="title-categoria mb-3">
			<i class="fas fa-coins"></i>&nbsp; <b>Formas de pagamento</b>
		</p>
	`

	if (!company?.pagamentos) {
		wrapper.appendChild(EmptyState('Adicione formas de pagamento'))
		container.appendChild(wrapper)
		return
	}

	const list = company.pagamentos.split(',')

	list.forEach((p: string) => {
		const card = document.createElement('div')
		card.className = 'card mt-2'
		card.innerHTML = `<p class="normal-text mb-0"><b>${p.trim()}</b></p>`

		wrapper.appendChild(card)
	})

	container.appendChild(wrapper)
}

/* ================= MAIN ================= */

export async function renderAbout(root: HTMLElement) {
	let horarios: any[] = []
	let company: any = null

	try {
		horarios = await getHorarios()
		company = await getCompany()
	} catch {
		console.log('Erro ao carregar dados')
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

	const content = document.querySelector('#about-content') as HTMLElement
	const extra = document.querySelector('#about-extra') as HTMLElement
	if (!content || !extra) return

	// 🔥 Agora tudo separado
	renderSobre(content, company)
	renderEndereco(extra, company)
	renderHorarios(extra, horarios)
	renderPagamentos(extra, company)
}
