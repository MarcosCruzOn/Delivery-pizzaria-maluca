import './style.css'
// IMPORTANTE: Importamos o gerenciador do carrinho para buscar os dados reais!
import { getCart } from '../../utils/cartManager'

export type BottomMenuActive = 'cardapio' | 'pedido' | 'carrinho'

// Deixamos o cartCount opcional (?) para não quebrar as outras páginas
// (como o index.ts e order.ts) que ainda estão enviando os números falsos MOCK.
type BottomMenuProps =
	| { isOpen: true; active: BottomMenuActive; cartCount?: number }
	| { isOpen: false }

export function BottomMenu(props: BottomMenuProps): HTMLElement {
	// 1. Menu “Loja Fechada” (comportamento mantido)
	if (!props.isOpen) {
		const closed = document.createElement('section')
		closed.className = 'menu-bottom disabled hidden'
		closed.id = 'menu-bottom-closed'
		closed.innerHTML = `<p class="mb-0"><b>Loja fechada no momento.</b></p>`
		return closed
	}

	// 2. A Inteligência Real do Carrinho 🧠
	const cart = getCart()

	// Somamos a quantidade total de itens (Ex: Se o cliente pediu 2 Calabresas, a bolinha vai mostrar 2)
	const quantidadeReal = cart.itens
		? cart.itens.reduce((soma: number, item: any) => soma + item.quantidade, 0)
		: 0

	const menu = document.createElement('section')
	menu.className = 'menu-bottom'
	menu.id = 'menu-bottom'

	// Função que acende o botão onde o cliente está no momento
	const active = (key: BottomMenuActive) => (props.active === key ? 'active' : '')

	// 3. Renderização Inteligente da Badge (Só aparece se tiver itens)
	const badgeHtml =
		quantidadeReal > 0 ? `<span class="badge-total-carrinho">${quantidadeReal}</span>` : ''

	// 4. Monta o HTML com os links
	menu.innerHTML = `
    <a href="#/" class="menu-bottom-item ${active('cardapio')}">
      <i class="fas fa-book-open"></i>&nbsp; Cardápio
    </a>

    <a href="#/order" class="menu-bottom-item ${active('pedido')}">
      <i class="fas fa-utensils"></i>&nbsp; Pedido
    </a>

    <a href="#/cart" class="menu-bottom-item ${active('carrinho')}">
      ${badgeHtml}
      Carrinho
    </a>
  `

	return menu
}
