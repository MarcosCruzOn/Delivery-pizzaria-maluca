import { mount } from '@delivery/shared/dom'
import { TitleHeader } from '../components/TitleHeader/TitleHeader'

import { getCompany, getHorarios } from '../api/company'

import { AboutHeader } from '../components/about/AboutHeader'
import { AboutAddress } from '../components/about/AboutAddress'
import { AboutSchedule } from '../components/about/AboutSchedule'
import { AboutPayments } from '../components/about/AboutPayments'

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
      <div class="card" id="about-content"></div>
    </section>

    <section class="lista width-fix mt-5 pb-5" id="about-extra"></section>
  `

	mount('#app-title-header', TitleHeader({ title: 'Sobre a loja' }))

	const content = document.querySelector('#about-content') as HTMLElement
	const extra = document.querySelector('#about-extra') as HTMLElement

	// 🔥 COMPONENTES
	content.appendChild(AboutHeader(company))

	extra.appendChild(AboutAddress(company))
	extra.appendChild(AboutSchedule(horarios))
	extra.appendChild(AboutPayments(company))
}
