import { AdminLayout } from '../../components/AdminLayout/AdminLayout'

import { getCategories } from '../../api/categories'
import { getProducts } from '../../api/products'

import { renderProductModal } from './renderProductModal'
import { renderCategories } from './renderCategories'

import { setupCategoryEvents } from './events/categoryEvents'
import { setupProductEvents } from './events/productEvents'
import { setupUploadEvents } from './events/uploadEvents'
import { setupProductSubmit } from './events/productSubmit'

import type { Category } from './types'

/*
=====================================
ESTADO LOCAL
=====================================
*/

let categories: Category[] = []

const state = {
	selectedCategoryId: null as number | null,
	selectedProductId: null as number | null,
	uploadedImageUrl: '',
	currentImageUrl: null as string | null,
}

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
			  ${renderCategories(categories)}
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

		${renderProductModal(categories)}
		`,
	})

	setupCategoryEvents(root, categories.length)
	setupProductEvents(root, state)
	setupUploadEvents(root, state)
	setupProductSubmit(root, state)
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

		categories = categoriesData.map((c: any) => ({
			id: c.idcategoria,
			iconClass: c.icone,
			title: c.nome,
			products: [],
		}))

		productsData.forEach((p: any) => {
			const category = categories.find((cat) => cat.id === p.idcategoria)

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
