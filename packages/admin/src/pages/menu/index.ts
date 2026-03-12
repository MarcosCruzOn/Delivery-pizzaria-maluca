import { AdminLayout } from '../../components/AdminLayout/AdminLayout'

import {
	createCategory,
	getCategories,
	deleteCategory,
} from '../../api/categories'

import {
	getProducts,
	createProduct,
	deleteProduct,
	updateProduct,
} from '../../api/products'

import { uploadProductImage } from '../../api/upload'

import { renderProductModal } from './renderProductModal'
import { renderCategories } from './renderCategories'

import type { Category } from './types'

/*
=====================================
ESTADO LOCAL
=====================================
*/

let categories: Category[] = []
let selectedCategoryId: number | null = null
let selectedProductId: number | null = null
let uploadedImageUrl = ''
let currentImageUrl: string | null = null

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

		${renderProductModal(categories)})}
		`,
	})

	setupEvents(root)
	setupImagePreview(root)
	setupCreateProductSubmit(root)
}

/*
=====================================
EVENTOS
=====================================
*/

function setupEvents(root: HTMLElement) {
	root.addEventListener('click', async (event) => {
		const target = event.target as HTMLElement

		const addCategoryBtn = target.closest('#btnAddCategory')
		const deleteCategoryBtn = target.closest('.delete-category')
		const addProductBtn = target.closest("[data-action='add-product']")
		const deleteProductBtn = target.closest('.delete-product')
		const editProductBtn = target.closest(
			'.edit-product'
		) as HTMLElement | null

		/*
		CRIAR CATEGORIA
		*/

		if (addCategoryBtn) {
			const nome = prompt('Nome da categoria')
			if (!nome) return

			const icone =
				prompt('Classe do ícone (ex: fas fa-pizza-slice)') ||
				'fas fa-utensils'

			try {
				await createCategory({
					nome,
					icone,
					ordem: categories.length + 1,
				})

				alert('Categoria criada!')
				location.reload()
			} catch {
				alert('Erro ao criar categoria')
			}
		}

		/*
		DELETAR CATEGORIA
		*/

		if (deleteCategoryBtn) {
			event.preventDefault()

			const id = Number(deleteCategoryBtn.getAttribute('data-id'))

			const confirmDelete = confirm('Deseja remover essa categoria?')
			if (!confirmDelete) return

			try {
				await deleteCategory(id)

				alert('Categoria removida!')
				location.reload()
			} catch {
				alert('Erro ao remover categoria')
			}
		}

		/*
		ADICIONAR PRODUTO
		*/

		if (addProductBtn) {
			event.preventDefault()

			const categoryId = Number(
				addProductBtn.getAttribute('data-category-id')
			)

			selectedCategoryId = categoryId

			const modal = new (window as any).bootstrap.Modal(
				document.getElementById('modalNovoProduto')
			)

			modal.show()

			const select = root.querySelector<HTMLSelectElement>(
				'#novoProdutoCategoria'
			)

			if (select) {
				select.value = String(categoryId)
			}
		}

		/*
		DELETAR PRODUTO
		*/

		if (deleteProductBtn) {
			event.preventDefault()

			const id = Number(deleteProductBtn.getAttribute('data-id'))

			const confirmDelete = confirm('Deseja remover esse produto?')

			if (!confirmDelete) return

			try {
				await deleteProduct(id)

				alert('Produto removido!')
				location.reload()
			} catch {
				alert('Erro ao remover produto')
			}
		}

		/*
		EDITAR PRODUTO
		*/

		if (editProductBtn) {
			event.preventDefault()

			const modal = new (window as any).bootstrap.Modal(
				document.getElementById('modalNovoProduto')
			)

			const nomeInput =
				root.querySelector<HTMLInputElement>('#novoProdutoNome')
			const descricaoInput = root.querySelector<HTMLTextAreaElement>(
				'#novoProdutoDescricao'
			)
			const valorInput =
				root.querySelector<HTMLInputElement>('#novoProdutoValor')

			if (nomeInput) nomeInput.value = editProductBtn.dataset.name || ''
			if (descricaoInput)
				descricaoInput.value = editProductBtn.dataset.description || ''
			if (valorInput)
				valorInput.value = editProductBtn.dataset.price || ''

			selectedProductId = Number(editProductBtn.dataset.id)

			currentImageUrl = editProductBtn.dataset.image || null

			modal.show()
		}
	})
}

/*
=====================================
UPLOAD IMAGEM
=====================================
*/

function setupImagePreview(root: HTMLElement) {
	root.addEventListener('change', async (event) => {
		const target = event.target as HTMLInputElement

		if (target.id !== 'novoProdutoImagem') return

		const file = target.files?.[0]
		if (!file) return

		const preview = root.querySelector<HTMLImageElement>(
			'#previewNovoProduto'
		)

		if (!preview) return

		preview.src = URL.createObjectURL(file)
		preview.style.display = 'block'

		try {
			const result = await uploadProductImage(file)
			uploadedImageUrl = result.imageUrl
		} catch {
			alert('Erro ao enviar imagem')
		}
	})
}

/*
=====================================
CRIAR PRODUTO
=====================================
*/

function setupCreateProductSubmit(root: HTMLElement) {
	const btn = root.querySelector<HTMLButtonElement>('#btnSalvarNovoProduto')

	btn?.addEventListener('click', async () => {
		const nome =
			root.querySelector<HTMLInputElement>('#novoProdutoNome')?.value ||
			''

		const descricao =
			root.querySelector<HTMLTextAreaElement>('#novoProdutoDescricao')
				?.value || ''

		const valor = Number(
			root.querySelector<HTMLInputElement>('#novoProdutoValor')?.value ||
				0
		)

		const idcategoria = Number(
			root.querySelector<HTMLSelectElement>('#novoProdutoCategoria')
				?.value || 0
		)

		if (!nome || !valor || !idcategoria) {
			alert('Preencha os campos obrigatórios')
			return
		}

		try {
			if (selectedProductId) {
				await updateProduct(selectedProductId, {
					idcategoria,
					nome,
					descricao,
					valor,
					imagem: uploadedImageUrl || currentImageUrl,
				})

				alert('Produto atualizado!')
			} else {
				await createProduct({
					idcategoria,
					nome,
					descricao,
					valor,
					imagem: uploadedImageUrl || null,
				})

				alert('Produto criado!')
			}

			uploadedImageUrl = ''
			selectedProductId = null
			currentImageUrl = null

			location.reload()
		} catch {
			alert('Erro ao criar produto')
		}
	})
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

/*
=====================================
MODAL PRODUTO
=====================================
*/
