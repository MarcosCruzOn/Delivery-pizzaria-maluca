import './style.css'

export type BottomMenuActive = 'cardapio' | 'pedido' | 'carrinho'

type BottomMenuProps =
	| { isOpen: true; active: BottomMenuActive; cartCount: number }
	| { isOpen: false }

export function BottomMenu(props: BottomMenuProps): HTMLElement {
	// menu “loja fechada” (igual seu HTML)
	if (!props.isOpen) {
		const closed = document.createElement('section')
		closed.className = 'menu-bottom disabled hidden'
		closed.id = 'menu-bottom-closed'
		closed.innerHTML = `<p class="mb-0"><b>Loja fechada no momento.</b></p>`
		return closed
	}

	const menu = document.createElement('section')
	menu.className = 'menu-bottom'
	menu.id = 'menu-bottom'

	const active = (key: BottomMenuActive) =>
		props.active === key ? 'active' : ''

	menu.innerHTML = `
    <a href="#/" class="menu-bottom-item ${active('cardapio')}">
      <i class="fas fa-book-open"></i>&nbsp; Cardápio
    </a>

    <a href="#/order" class="menu-bottom-item ${active('pedido')}">
      <i class="fas fa-utensils"></i>&nbsp; Pedido
    </a>

    <a href="#/cart" class="menu-bottom-item ${active('carrinho')}">
      <span class="badge-total-carrinho">${props.cartCount}</span>
      Carrinho
    </a>
  `

	return menu
}
