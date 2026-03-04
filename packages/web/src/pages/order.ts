import '../styles/order.css'
import { TitleHeader } from '../components/TitleHeader/TitleHeader'
import { BottomMenu } from '../components/BottomMenu/BottomMenu'
import { mount } from '../utils/dom'

export function renderOrder(root: HTMLElement) {
	// valores mockados por enquanto (depois vem da API)
	const totalText = 'R$ 106,50'
	const statusTitle = 'Pedido enviado!'
	const statusSub = 'Aguardando a confirmação da loja'

	root.innerHTML = `
    
    <div id="app-title-header"></div>

    <main class="width-fix mt-5 order-wrap">
      <div class="order-top-card">
        <div class="order-top-row">
          <div class="order-total">
            <span class="label">Total</span>
            <span class="value">${totalText}</span>
          </div>

          <div class="order-actions">
            <a class="order-action" href="#/order" id="btn-msg">
              <i class="fab fa-whatsapp"></i>
              <span>Mensagem</span>
            </a>

            <div class="order-divider"></div>

            <a class="order-action" href="#/cart">
              <i class="far fa-file-alt"></i>
              <span>Ver Pedido</span>
            </a>
          </div>
        </div>
      </div>

      <section class="order-status-highlight">
        <div class="order-status-icon">
          <i class="far fa-clock"></i>
        </div>
        <div>
          <p class="order-status-title">${statusTitle}</p>
          <p class="order-status-sub">${statusSub}</p>
        </div>
      </section>

      <section class="order-step disabled">
        <div class="order-step-icon">
          <i class="fas fa-utensils"></i>
        </div>
        <div class="order-step-text">Preparando</div>
      </section>

      <section class="order-step disabled">
        <div class="order-step-icon">
          <i class="fas fa-motorcycle"></i>
        </div>
        <div class="order-step-text">Indo até você</div>
      </section>
    </main>

    <div id="app-bottom-menu"></div>
  `

	// Bottom menu ativo em Pedido
	mount(
		'#app-bottom-menu',
		BottomMenu({ isOpen: true, active: 'pedido', cartCount: 2 })
	)
	mount('#app-title-header', TitleHeader({ title: 'Acompanhar pedido' }))

	// Botão Mensagem (bem simples)
	const btnMsg = root.querySelector<HTMLAnchorElement>('#btn-msg')
	btnMsg?.addEventListener('click', (e) => {
		e.preventDefault()
		alert('Aqui depois vamos abrir o WhatsApp com a mensagem do pedido 🙂')
	})
}
