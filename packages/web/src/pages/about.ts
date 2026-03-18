import { mount } from '@delivery/shared/dom'
;('../utils/dom')
import { TitleHeader } from '../components/TitleHeader/TitleHeader'

import { getCompany } from '../api/company'
import { EmptyState } from '../components/EmptyState/EmptyState'

export async function renderAbout(root: HTMLElement) {
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
        <p>${company.endereco}</p>
      </div>
    `
	}

	// ⏰ HORÁRIO
	if (!company?.horario) {
		extra.appendChild(EmptyState('Defina horário de funcionamento'))
	}

	// 💳 PAGAMENTO
	if (!company?.pagamentos?.length) {
		extra.appendChild(EmptyState('Adicione formas de pagamento'))
	}
}
