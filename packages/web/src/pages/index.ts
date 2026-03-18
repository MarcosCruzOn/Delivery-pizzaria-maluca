import { Header } from '../components/Header/Header'
import { Categories } from '../components/Categories/Categories'
import { BottomMenu } from '../components/BottomMenu/BottomMenu'

import { getCategories } from '../api/categories'

import { mount } from '@delivery/shared/dom'
;('../utils/dom')

import { getProductsByCategory } from '../api/products'
import { MenuItemCard } from '../components/MenuItemsCards/MenuItemsCards'
import { MenuItemsList } from '../components/MenuItemsList/MenuItemsList'

export async function renderHome(root: HTMLElement) {
	let mappedCategories = []
	let selectedCategoryId: number | null = null

	try {
		const categories = await getCategories()

		mappedCategories = categories.map((c: any) => ({
			id: c.idcategoria,
			title: c.nome,
			iconClass: c.icone,
		}))

		// pega a primeira categoria automaticamente
		if (mappedCategories.length > 0) {
			selectedCategoryId = mappedCategories[0].id
		}
	} catch {
		console.error('Erro ao carregar categorias')
	}

	root.innerHTML = `
    <header id="app-header"></header>
    <div id="app-categories"></div>

    <section class="lista width-fix mt-0 pb-5">
      <div id="app-menu-list"></div>
    </section>

    <div id="app-bottom-menu"></div>
  `

	mount('#app-header', Header())

	// 👇 importante: passar callback de clique
	mount(
		'#app-categories',
		Categories(mappedCategories, async (categoryId: number) => {
			await loadProducts(categoryId)
		})
	)

	const list = document.querySelector('#app-menu-list')!

	async function loadProducts(categoryId: number) {
		list.innerHTML = '<p>Carregando...</p>'

		try {
			const products = await getProductsByCategory(categoryId)

			list.innerHTML = ''

			const mappedProducts = products.map((p: any) => ({
				id: p.idproduto,
				name: p.nome,
				description: p.descricao,
				priceText: `R$ ${Number(p.valor).toFixed(2)}`,
				imageUrl: `http://localhost:3333${p.imagem}`,
			}))

			list.appendChild(MenuItemsList(mappedProducts))
		} catch {
			list.innerHTML = '<p>Erro ao carregar produtos</p>'
		}
	}

	// carrega inicial
	if (selectedCategoryId) {
		await loadProducts(selectedCategoryId)
	}

	mount(
		'#app-bottom-menu',
		BottomMenu({ isOpen: true, active: 'cardapio', cartCount: 2 })
	)
}
