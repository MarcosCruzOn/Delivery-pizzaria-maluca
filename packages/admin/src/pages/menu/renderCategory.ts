import { renderProduct } from './renderProduct'
import type { Category } from './types'

export function renderCategory(cat: Category, expanded: boolean) {
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
	   <a href="#" class="icon-action">
	    <i class="fas fa-pencil-alt"></i>
	   </a>

	   <a
	    href="#"
	    class="icon-action delete-category"
	    data-id="${cat.id}"
	   >
	    <i class="fas fa-trash-alt"></i>
	   </a>
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

	   <div
	    class="card card-select mt-3"
	    data-action="add-product"
	    data-category-id="${cat.id}"
	   >

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
