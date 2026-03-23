import { AdminLayout } from '../../components/AdminLayout/AdminLayout'

import { getCategories } from '../../api/categories'
import { getProducts } from '../../api/products'

import { renderProductModal } from './renderProductModal'
import { renderCategories } from './renderCategories'

import { setupMenuEvents } from './events'

import { renderCategoryModal } from './renderCategoryModal'
import { setupCategorySubmit } from './events/category/categorySubimit'
import { getOpcionais, getOpcionalItens } from '../../api/opcionais'

import {
	setupOpcionaisModal,
	setupCreateItem,
} from '../menu/renderOpcionaisModal'

import { menuState } from './state/menuState'

/*
=====================================
RENDER PRINCIPAL
=====================================
*/

export async function renderMenuAdmin(root: HTMLElement) {
	await loadCategories()

	root.innerHTML = AdminLayout({
		title: 'Edição do Cardápio',
		iconClass: 'fas fa-book-open',
		active: 'menu',
		content: `
		<div class="container">
		 <div class="row">
		  <div class="col-12">

			<div class="container-group mb-5">

			 <p class="title-categoria mb-0"><b>Categorias do Cardápio</b></p>

			 <div class="accordion" id="categoriasMenu">
			  ${renderCategories(menuState.categories)}
			 </div>

			 <div class="card card-select mt-3" id="btnAddCategory">
			  <div class="infos-produto-opcional">
			   <p class="mb-0 color-primary">
			    <i class="fas fa-plus-circle"></i>
			    &nbsp; Adicionar nova categoria
			   </p>
			  </div>
			 </div>

			</div>

		  </div>
		 </div>
		</div>

		${renderProductModal(menuState.categories)}
		${renderCategoryModal()}
		`,
	})

	setupMenuEvents(root)
	setupCategorySubmit(root)

	setupOpcionaisModal()
	setupCreateItem()
}

/*
=====================================
CARREGAR DADOS
=====================================
*/

async function loadCategories() {
	try {
		const categoriesData = await getCategories()
		const productsData = await getProducts()
		const opcionaisData = await getOpcionais() // 👈 NOVO

		menuState.opcionais = opcionaisData.map((o: any) => ({
			id: o.idopcional,
			name: o.nome,
			required: o.tiposimples === 1,
			min: o.minimo,
			max: o.maximo,
			items: [], // ainda vamos carregar depois
		}))

		for (const opcional of menuState.opcionais) {
			const itens = await getOpcionalItens(opcional.id)

			opcional.items = itens.map((item: any) => ({
				id: item.idopcionalitem,
				name: item.nome,
				price: Number(item.valor),
			}))
		}

		menuState.categories = categoriesData.map((c: any) => ({
			id: c.idcategoria,
			iconClass: c.icone,
			title: c.nome,
			products: [],
		}))

		productsData.forEach((p: any) => {
			const category = menuState.categories.find(
				(cat) => Number(cat.id) === p.idcategoria
			)

			if (!category) return

			category.products.push({
				id: p.idproduto,
				name: p.nome,
				description: p.descricao || '',
				priceText: `R$ ${Number(p.valor).toFixed(2)}`,
				imageUrl: p.imagem
					? p.imagem.startsWith('/uploads')
						? p.imagem
						: `/uploads/${p.imagem}`
					: '',
			})
		})
	} catch (error) {
		console.error(error)
		alert('Erro ao carregar categorias')
	}
}
