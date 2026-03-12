import type { Product } from './types'

export function renderProduct(p: Product) {
	return `
	<div class="card mt-3 pl-0">

	 <div class="d-flex">

	  <div class="drag-icon-produto">
	   <i class="fas fa-ellipsis-v"></i>
	   <i class="fas fa-ellipsis-v"></i>
	  </div>

	  <div class="container-img-produto"
	   style="background-image:url('${p.imageUrl}');background-size:cover;">

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
