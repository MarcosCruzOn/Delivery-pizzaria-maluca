import { AdminLayout } from '../../components/AdminLayout/AdminLayout'

import { getCategories } from '../../api/categories'
import { getProducts } from '../../api/products'

import { renderProductModal } from './renderProductModal'
import { renderCategories } from './renderCategories'

import { setupUploadEvents } from './events/product/uploadEvents'
import { setupProductSubmit } from './events/product/productSubmit'

import { handleAddProduct } from './events/product/addProduct'
import { handleDeleteProduct } from './events/product/deleteProduct'
import { handleEditProduct } from './events/product/editProduct'

import { handleAddCategory } from './events/category/addCategory'
import { handleDeleteCategory } from './events/category/deleteCategory'

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
		`,
	})

	setupUploadEvents(root)
	setupProductSubmit(root)
	setupMenuEvents(root)
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

export function setupMenuEvents(root: HTMLElement) {
	root.addEventListener('click', async (event) => {
		const target = event.target as HTMLElement

		const addProductBtn = target.closest("[data-action='add-product']")
		const deleteProductBtn = target.closest('.delete-product')
		const editProductBtn = target.closest('.edit-product')

		const addCategoryBtn = target.closest('#btnAddCategory')
		const deleteCategoryBtn = target.closest('.delete-category')

		if (addCategoryBtn) {
			event.preventDefault()
			handleAddCategory()
		}

		if (deleteCategoryBtn) {
			event.preventDefault()
			await handleDeleteCategory(deleteCategoryBtn as HTMLElement)
		}

		if (addProductBtn) {
			event.preventDefault()
			handleAddProduct(addProductBtn as HTMLElement)
		}

		if (deleteProductBtn) {
			event.preventDefault()
			await handleDeleteProduct(deleteProductBtn as HTMLElement)
		}

		if (editProductBtn) {
			event.preventDefault()
			handleEditProduct(editProductBtn as HTMLElement)
		}
	})
}
