import { Header } from '../components/Header/Header'
import { Categories } from '../components/Categories/Categories'
import { BottomMenu } from '../components/BottomMenu/BottomMenu'
import {
	MenuItemCard,
	type MenuItem,
} from '../components/MenuItemsCards/MenuItemsCards'
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
	mount('#app-categories', Categories())
	mount(
		'#app-bottom-menu',
		BottomMenu({ isOpen: true, active: 'cardapio', cartCount: 2 })
	)

	// mock simples por enquanto
	const items: MenuItem[] = [
		{
			id: 1,
			name: 'Calabresa',
			description: 'Molho de tomate, mussarela, cebola, calabresa...',
			priceText: 'R$ 39,90',
			imageUrl: '/img/calabresa.jpg',
		},
		{
			id: 2,
			name: 'Lombo com Calabresa',
			description: 'Molho de tomate, lombo, mussarela, cebola...',
			priceText: 'R$ 39,90',
			imageUrl: '/img/lombo.jpg',
		},
	]

	const list = document.querySelector('#app-menu-list')!
	list.innerHTML = `
		<div class="container-group mb-5">
			<p class="title-categoria">
				<b>Pizzas Tradicionais</b>
			</p>
		</div>
	`
	const group = list.querySelector('.container-group')!
	items.forEach((i) => group.appendChild(MenuItemCard(i)))
}
