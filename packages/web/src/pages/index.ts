import { mount } from '../utils/dom'
import { Header } from '../components/Header/Header'
import { Categories } from '../components/Categories/Categories'
import {
	MenuItemCard,
	type MenuItem,
} from '../components/MenuItemCard/MenuItemCard'

function renderMenuList() {
	const root = document.querySelector<HTMLDivElement>('#app-menu-list')
	if (!root) throw new Error('Slot #app-menu-list não encontrado')

	root.innerHTML = ''

	const group = document.createElement('div')
	group.className = 'container-group mb-5'

	const title = document.createElement('p')
	title.className = 'title-categoria'
	title.innerHTML = '<b>Pizzas Tradicionais</b>'

	group.appendChild(title)

	const items: MenuItem[] = [
		{
			id: 1,
			name: 'Calabresa',
			description:
				'Molho de tomate, mussarela, cebola, calabresa, catupiry, tomate, orégano e azeitonas',
			priceText: 'R$ 39,90',
			imageUrl: '/img/calabresa.jpg',
		},
		{
			id: 2,
			name: 'Lombo com Calabresa',
			description:
				'Molho de tomate, lombo, mussarela, cebola, calabresa, catupiry, tomate, orégano e azeitonas',
			priceText: 'R$ 39,90',
			imageUrl: '/img/lombo.jpg',
		},
	]

	items.forEach((item) => group.appendChild(MenuItemCard(item)))

	root.appendChild(group)
}

function Home() {
	mount('#app-header', Header())
	mount('#app-categories', Categories())
	renderMenuList()
}

Home()
