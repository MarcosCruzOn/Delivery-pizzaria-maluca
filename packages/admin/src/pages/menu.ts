import { AdminLayout } from '../components/AdminLayout/AdminLayout'

type Product = {
	id: number
	name: string
	description: string
	priceText: string
	imageUrl: string // ex: "/img/calabresa.jpg"
	addonsCount?: number
}

type Category = {
	id: string // string pra usar no id do collapse
	iconClass: string
	title: string
	products: Product[]
}

const MOCK: Category[] = [
	{
		id: 'tradicionais',
		iconClass: 'fas fa-pizza-slice',
		title: 'Pizzas Tradicionais',
		products: [
			{
				id: 1,
				name: 'Calabresa',
				description:
					'Molho de tomate, mussarela, cebola, calabresa, catupiry, tomate, orégano e azeitonas',
				priceText: 'R$ 39,90',
				imageUrl: '/img/calabresa.jpg',
				addonsCount: 2,
			},
		],
	},
]

export function renderMenuAdmin(root: HTMLElement) {
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
                ${MOCK.map((cat, idx) => renderCategory(cat, idx === 0)).join('')}
              </div>

              <div class="card card-select mt-3" id="btnAddCategory">
                <div class="infos-produto-opcional">
                  <p class="mb-0 color-primary">
                    <i class="fas fa-plus-circle"></i>&nbsp; Adicionar nova categoria
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    `,
	})

	// ações (por enquanto só pra provar que está clicável)
	root.querySelector('#btnAddCategory')?.addEventListener('click', () => {
		alert('Depois vamos abrir um formulário para criar categoria 🙂')
	})

	root.querySelectorAll("[data-action='add-product']").forEach((el) => {
		el.addEventListener('click', (e) => {
			e.preventDefault()
			const catId = (e.currentTarget as HTMLElement).getAttribute(
				'data-category-id'
			)
			alert(`Adicionar produto na categoria: ${catId}`)
		})
	})
}

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
            aria-expanded="${expanded ? 'true' : 'false'}"
            aria-controls="${collapseId}"
          >
            <span class="me-2"><i class="${cat.iconClass}"></i></span>
            <b>${cat.title}</b>
          </a>
        </div>

        <div class="actions">
          <a href="#" class="icon-action" title="Editar"><i class="fas fa-pencil-alt"></i></a>
          <a href="#" class="icon-action" title="Duplicar"><i class="far fa-copy"></i></a>
          <a href="#" class="icon-action" title="Excluir"><i class="fas fa-trash-alt"></i></a>
        </div>
      </div>

      <div
        id="${collapseId}"
        class="collapse ${expanded ? 'show' : ''}"
        data-bs-parent="#categoriasMenu"
      >
        <div class="card-body">
          <p class="title-produtos mb-0"><b>Produtos</b></p>

          <div class="lista-produtos">
            ${cat.products.map(renderProduct).join('')}
          </div>

          <div class="card card-select mt-3" data-action="add-product" data-category-id="${cat.id}">
            <div class="infos-produto-opcional">
              <p class="mb-0 color-primary">
                <i class="fas fa-plus-circle"></i>&nbsp; Adicionar novo produto
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  `
}

function renderProduct(p: Product) {
	return `
    <div class="card mt-3 pl-0">
      <div class="d-flex">

        <div class="drag-icon-produto">
          <i class="fas fa-ellipsis-v"></i>
          <i class="fas fa-ellipsis-v"></i>
        </div>

        <div class="container-img-produto" style="background-image: url('${p.imageUrl}'); background-size: cover;">
          <a href="#" class="icon-action me-1 mb-1" title="Editar imagem">
            <i class="fas fa-pencil-alt"></i>
          </a>
        </div>

        <div class="infos-produto">
          <p class="name"><b>${p.name}</b></p>
          <p class="description">${p.description}</p>
          <p class="price"><b>${p.priceText}</b></p>
        </div>

        <div class="actions">
          <a href="#" class="icon-action" title="Adicionais">
            ${p.addonsCount ? `<span class="badge-adicionais">${p.addonsCount}</span>` : ''}
            <i class="fas fa-layer-group"></i>
          </a>
          <a href="#" class="icon-action" title="Editar"><i class="fas fa-pencil-alt"></i></a>
          <a href="#" class="icon-action" title="Duplicar"><i class="far fa-copy"></i></a>
          <a href="#" class="icon-action" title="Excluir"><i class="fas fa-trash-alt"></i></a>
        </div>

      </div>
    </div>
  `
}
