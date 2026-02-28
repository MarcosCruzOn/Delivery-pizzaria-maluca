import './style.css'

export function Categories(): HTMLElement {
	const section = document.createElement('section')
	section.className = 'categoria width-fix mt-4'

	section.innerHTML = `
    <div class="container-menu" id="listaCategorias">
      <a href="#" class="item-categoria btn btn-white btn-sm mb-3 me-3 active">
        <i class="fas fa-pizza-slice"></i>&nbsp; Pizzas Tradicionais
      </a>

      <a href="#" class="item-categoria btn btn-white btn-sm mb-3 me-3">
        <i class="fas fa-pizza-slice"></i>&nbsp; Pizzas Doces
      </a>

      <a href="#" class="item-categoria btn btn-white btn-sm mb-3 me-3">
        <i class="fas fa-cocktail"></i>&nbsp; Bebidas
      </a>
    </div>
  `

	return section
}
