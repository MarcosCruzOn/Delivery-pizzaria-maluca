import { Header } from '../components/Header/Header'
import { Categories } from '../components/Categories/Categories'
import { BottomMenu } from '../components/BottomMenu/BottomMenu'

import { mount } from '@delivery/shared/dom'
;('../utils/dom')

export function renderHome(root: HTMLElement) {
	root.innerHTML = `
    
    <header id="app-header"></header>
    <div id="app-categories"></div>

    <section class="lista width-fix mt-0 pb-5">
      <div id="app-menu-list"></div>
    </section>

    <div id="app-bottom-menu"></div>
  `

	mount('#app-header', Header())
	mount('#app-categories', Categories([]))

	mount(
		'#app-bottom-menu',
		BottomMenu({ isOpen: true, active: 'cardapio', cartCount: 2 })
	)

	const list = document.querySelector('#app-menu-list')!

	list.innerHTML = `
	<div class="container-group mb-5 empty-state">
		<p class="title-categoria">
			<b>Seu cardápio ainda está vazio</b>
		</p>

		<p>
			Vá até o <b>painel administrativo</b> e crie categorias e produtos
			para que eles apareçam aqui.
		</p>
	</div>
	`
}
