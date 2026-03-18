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
			<h1><b>${company.nome || 'Nome não definido'}</b></h1>
			<p>${company.sobre || 'Adicione informações no painel administrativo'}</p>
		`
	}

	// 📍 ENDEREÇO
	if (!company?.endereco) {
		extra.appendChild(EmptyState('Cadastre um endereço'))
	} else {
		extra.innerHTML += `
      <div class="card">
        <p>
			${company.endereco}, ${company.numero} <br>
			${company.bairro} <br>
			${company.cidade} - ${company.estado} <br>
			CEP: ${company.cep}
		</p>
      </div>
    `
	}

	// ⏰ HORÁRIO
	const containerHorario = document.createElement('div')
	containerHorario.className = 'container-group mb-5'

	containerHorario.innerHTML = `
	<p class="title-categoria mb-0">
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
	if (!company?.pagamentos?.length) {
		extra.appendChild(EmptyState('Adicione formas de pagamento'))
	}
}
