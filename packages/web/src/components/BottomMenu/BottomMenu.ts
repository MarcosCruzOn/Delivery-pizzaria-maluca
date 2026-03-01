import './style.css'

type BottomMenuProps = {
	active: 'cardapio' | 'pedido' | 'carrinho'
	cartCount: number
}

export function BottomMenu({
	active,
	cartCount,
}: BottomMenuProps): HTMLElement {
	const section = document.createElement('section')
	section.className = 'menu-bottom'
	section.id = 'menu-bottom'

	section.innerHTML = `
    <a href="/index.html" class="menu-bottom-item ${active === 'cardapio' ? 'active' : ''}">
      <i class="fas fa-book-open"></i>&nbsp; Cardápio
    </a>

    <a href="/pedido.html" class="menu-bottom-item ${active === 'pedido' ? 'active' : ''}">
      <i class="fas fa-utensils"></i>&nbsp; Pedido
    </a>

    <a href="/carrinho.html" class="menu-bottom-item ${active === 'carrinho' ? 'active' : ''}">
      <span class="badge-total-carrinho">${cartCount}</span>
      Carrinho
    </a>
  `

	return section
}
