import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
import {
	createCategory,
	getCategories,
	deleteCategory,
} from '../../api/categories'
import { uploadProductImage } from '../../api/upload'
import { createProduct } from '../../api/products'

type Product = {
	id: number
	name: string
	description: string
	priceText: string
	imageUrl: string
	addonsCount?: number
}

type Category = {
	id: string
	iconClass: string
	title: string
	products: Product[]
}

/*
=====================================
ESTADO LOCAL (vem do banco depois)
=====================================
*/

let categories: Category[] = []
let selectedCategoryId: number | null = null
let uploadedImageUrl = ''

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
          <div class="col-12" id="categorias">

            <div class="container-group mb-5">

              <p class="title-categoria mb-0"><b>Categorias do Cardápio</b></p>

              <div class="accordion" id="categoriasMenu">
                ${renderCategories()}
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

      ${renderCreateProductModal()}
    `,
	})

	setupEvents(root)
	setupImagePreview(root)
	setupCreateProductSubmit(root)
}

/*
=====================================
RENDER CATEGORIAS
=====================================
*/

function renderCategories() {
	if (!categories.length) {
		return `
      <div class="card mt-3 p-4 text-center">
        <p class="mb-2"><b>Nenhuma categoria criada ainda</b></p>
        <p class="text-muted mb-0">
          Crie uma categoria para começar a montar seu cardápio.
        </p>
      </div>
    `
	}

	return categories.map((cat, idx) => renderCategory(cat, idx === 0)).join('')
}

/*
=====================================
RENDER CATEGORIA
=====================================
*/

function renderCategory(cat: Category, expanded: boolean) {
	const collapseId = `collapse-${cat.id}`
	const headingId = `heading-${cat.id}`

	return `
  <div class="card mt-3">

    <div class="card-drag" id="${headingId}">

      <div class="drag-icon">
        <i class="fas fa-ellipsis-v"></i>
        <i class="fas fa-ellipsis-v"></i>
      </div>

      <div class="infos">
        <a
          href="#"
          class="name mb-0"
          data-bs-toggle="collapse"
          data-bs-target="#${collapseId}"
          aria-expanded="${expanded}"
        >
          <span class="me-2"><i class="${cat.iconClass}"></i></span>
          <b>${cat.title}</b>
        </a>
      </div>

      <div class="actions">
        <a href="#" class="icon-action"><i class="fas fa-pencil-alt"></i></a>
        <a href="#" class="icon-action"><i class="far fa-copy"></i></a>
        <a href="#" class="icon-action delete-category" data-id="${cat.id}"><i class="fas fa-trash-alt"></i></a>
      </div>

    </div>

    <div id="${collapseId}" class="collapse ${expanded ? 'show' : ''}" data-bs-parent="#categoriasMenu">

      <div class="card-body">

        <p class="title-produtos mb-0"><b>Produtos</b></p>

        <div class="lista-produtos">
          ${
				cat.products.length
					? cat.products.map(renderProduct).join('')
					: `<p class="text-muted mt-3">Nenhum produto nessa categoria</p>`
			}
        </div>

        <div class="card card-select mt-3" data-action="add-product" data-category-id="${
			cat.id
		}">
          <div class="infos-produto-opcional">
            <p class="mb-0 color-primary">
              <i class="fas fa-plus-circle"></i>
              &nbsp; Adicionar novo produto
            </p>
          </div>
        </div>

      </div>

    </div>

  </div>
  `
}

/*
=====================================
RENDER PRODUTO
=====================================
*/

function renderProduct(p: Product) {
	return `
  <div class="card mt-3 pl-0">
    <div class="d-flex">

      <div class="drag-icon-produto">
        <i class="fas fa-ellipsis-v"></i>
        <i class="fas fa-ellipsis-v"></i>
      </div>

      <div class="container-img-produto"
        style="background-image: url('${p.imageUrl}'); background-size: cover;">

        <a href="#" class="icon-action me-1 mb-1">
          <i class="fas fa-pencil-alt"></i>
        </a>

      </div>

      <div class="infos-produto">
        <p class="name"><b>${p.name}</b></p>
        <p class="description">${p.description}</p>
        <p class="price"><b>${p.priceText}</b></p>
      </div>

      <div class="actions">

        <a href="#" class="icon-action">
          ${
				p.addonsCount
					? `<span class="badge-adicionais">${p.addonsCount}</span>`
					: ''
			}
          <i class="fas fa-layer-group"></i>
        </a>

        <a href="#" class="icon-action">
          <i class="fas fa-pencil-alt"></i>
        </a>

        <a href="#" class="icon-action">
          <i class="far fa-copy"></i>
        </a>

        <a href="#" class="icon-action">
          <i class="fas fa-trash-alt"></i>
        </a>

      </div>

    </div>
  </div>
  `
}

/*
=====================================
EVENTOS
=====================================
*/

function setupEvents(root: HTMLElement) {
	root.addEventListener('click', async (event) => {
		const target = event.target as HTMLElement

		const addProductBtn = target.closest("[data-action='add-product']")
		const deleteCategoryBtn = target.closest('.delete-category')
		const addCategoryBtn = target.closest('#btnAddCategory')

		/*
		========================
		CRIAR CATEGORIA
		========================
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

			return
		}

		/*
		========================
		DELETAR CATEGORIA
		========================
		*/

		if (deleteCategoryBtn) {
			event.preventDefault()

			const id = Number(deleteCategoryBtn.getAttribute('data-id'))

			const confirmDelete = confirm('Deseja remover essa categoria?')

			if (!confirmDelete) return

			try {
				await deleteCategory(id)

				alert('Categoria removida')
				location.reload()
			} catch {
				alert('Erro ao remover categoria')
			}

			return
		}

		/*
		========================
		ADICIONAR PRODUTO
		========================
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

			return
		}
	})
}

/*
=====================================
MODAL PRODUTO
=====================================
*/

function renderCreateProductModal() {
	return `
  <div class="modal fade" id="modalNovoProduto">
    <div class="modal-dialog">
      <div class="modal-content modal-dados-pedido">

        <div class="modal-top d-flex justify-content-between px-4 py-3">

          <h5 class="modal-title">Novo produto</h5>

          <button type="button" class="btn btn-white btn-sm" data-bs-dismiss="modal">
            <i class="fas fa-times"></i> Fechar
          </button>

        </div>

        <div class="modal-body">

          <div class="form-group mb-3">
            <label><b>Nome</b></label>
            <input type="text" class="form-control" id="novoProdutoNome"/>
          </div>

          <div class="form-group mb-3">
            <label><b>Descrição</b></label>
            <textarea class="form-control" id="novoProdutoDescricao"></textarea>
          </div>

          <div class="form-group mb-3">
            <label><b>Valor</b></label>
            <input type="number" step="0.01" class="form-control" id="novoProdutoValor"/>
          </div>

          <div class="form-group mb-3">
            <label><b>Categoria</b></label>

            <select class="form-control" id="novoProdutoCategoria">

              ${categories
					.map(
						(cat) =>
							`<option value="${cat.id}">${cat.title}</option>`
					)
					.join('')}

            </select>

          </div>

          <div class="form-group mb-3">
            <label><b>Imagem</b></label>
            <input type="file" class="form-control" id="novoProdutoImagem"/>
          </div>

          <img
            id="previewNovoProduto"
            style="display:none;width:200px;border-radius:10px"
          />

        </div>

        <div class="modal-footer">

          <button class="btn btn-yellow btn-sm" id="btnSalvarNovoProduto">
            Salvar produto
          </button>

        </div>

      </div>
    </div>
  </div>
  `
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
		} catch (error) {
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
			await createProduct({
				idcategoria,
				nome,
				descricao,
				valor,
				imagem: uploadedImageUrl || null,
			})

			alert('Produto criado!')
			location.reload()
		} catch (error) {
			alert('Erro ao criar produto')
		}
	})
}

async function loadCategories() {
	try {
		const data = await getCategories()

		categories = data.map((c: any) => ({
			id: c.idcategoria,
			iconClass: c.icone,
			title: c.nome,
			products: [],
		}))
	} catch (error) {
		alert('Erro ao carregar categorias')
	}
}
