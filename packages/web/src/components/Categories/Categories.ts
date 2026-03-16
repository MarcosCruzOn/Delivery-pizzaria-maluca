import './style.css'

export type Category = {
	id: number
	title: string
	iconClass: string
}

export function Categories(categories: Category[]): HTMLElement {
	const section = document.createElement('section')
	section.className = 'categoria width-fix mt-4'

	if (!categories.length) {
		section.innerHTML = `
      <div class="container-menu empty-state">
        <p><b>Você ainda não tem categorias.</b></p>
        <p>
          Vá até o <b>painel administrativo</b> e crie sua primeira categoria.
        </p>
      </div>
    `
		return section
	}

	section.innerHTML = `
    <div class="container-menu" id="listaCategorias">
      ${categories
			.map(
				(cat) => `
        <a href="#" class="item-categoria btn btn-white btn-sm mb-3 me-3">
          <i class="${cat.iconClass}"></i>&nbsp; ${cat.title}
        </a>
      `
			)
			.join('')}
    </div>
  `

	return section
}
