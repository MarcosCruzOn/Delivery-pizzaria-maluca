import '../styles/order.css'
import { TitleHeader } from '../components/TitleHeader/TitleHeader'
import { BottomMenu } from '../components/BottomMenu/BottomMenu'
import { mount } from '@delivery/shared/dom'
import { trackOrder } from '../api/orders'
;('../utils/dom')

export async function renderOrder(root: HTMLElement) {
	// 1. Puxa a memória de elefante: Qual foi o último pedido?
	const idPedidoAcompanhar = localStorage.getItem('maluca_pedido_ativo')

	if (!idPedidoAcompanhar) {
		root.innerHTML = `
			<div id="app-title-header"></div>
			<div class="text-center mt-5 pt-5">
				<i class="fas fa-box-open fa-3x text-muted mb-3"></i>
				<h4 class="text-dark fw-bold">Nenhum pedido ativo</h4>
				<p class="text-muted">Você ainda não fez nenhum pedido recente.</p>
				<a href="#/" class="btn btn-yellow mt-3">Ver Cardápio</a>
			</div>
			<div id="app-bottom-menu"></div>
		`
		mount('#app-title-header', TitleHeader({ title: 'Acompanhar pedido' }))
		mount('#app-bottom-menu', BottomMenu({ isOpen: true, active: 'pedido', cartCount: 0 }))
		return
	}

	// 2. Monta o esqueleto base na tela
	root.innerHTML = `
    <div id="app-title-header"></div>
    <main class="width-fix mt-5 order-wrap">
      <div class="order-top-card">
        <div class="order-top-row">
          <div class="order-total">
            <span class="label">Pedido #${idPedidoAcompanhar}</span>
            <span class="value" id="order-total-value">Carregando...</span>
          </div>
          <div class="order-actions">
            <a class="order-action" href="#" id="btn-msg" target="_blank">
              <i class="fab fa-whatsapp"></i> <span>Mensagem</span>
            </a>
            <div class="order-divider"></div>
            <a class="order-action" href="#/">
              <i class="fas fa-pizza-slice"></i> <span>Cardápio</span>
            </a>
          </div>
        </div>
      </div>

      <section class="order-status-highlight">
        <div class="order-status-icon"><i class="far fa-clock" id="icon-destaque"></i></div>
        <div>
          <p class="order-status-title" id="status-title">Buscando radar...</p>
          <p class="order-status-sub" id="status-sub">Conectando com a pizzaria</p>
        </div>
      </section>

      <section class="order-step disabled" id="step-preparo">
        <div class="order-step-icon"><i class="fas fa-utensils"></i></div>
        <div class="order-step-text">Preparando</div>
      </section>

      <section class="order-step disabled" id="step-entrega">
        <div class="order-step-icon"><i class="fas fa-motorcycle"></i></div>
        <div class="order-step-text">Indo até você</div>
      </section>
    </main>
    <div id="app-bottom-menu"></div>
  `

	mount('#app-title-header', TitleHeader({ title: 'Acompanhar pedido' }))
	mount('#app-bottom-menu', BottomMenu({ isOpen: true, active: 'pedido', cartCount: 0 }))

	// 3. Configura o WhatsApp
	const telefoneDaPizzaria = '5511999999999' // 👈 COLOQUE O NÚMERO DO SEU RESTAURANTE AQUI!
	const msgZap = encodeURIComponent(
		`Olá, gostaria de saber sobre o meu pedido #${idPedidoAcompanhar}`
	)
	const btnMsg = root.querySelector<HTMLAnchorElement>('#btn-msg')
	if (btnMsg) btnMsg.href = `https://wa.me/${telefoneDaPizzaria}?text=${msgZap}`

	// 4. A Função Mágica que atualiza a tela
	async function atualizarRadar() {
		try {
			const pedido = await trackOrder(Number(idPedidoAcompanhar))
			const statusId = Number(pedido.idpedidostatus)

			// Atualiza o valor
			const labelTotal = document.getElementById('order-total-value')
			if (labelTotal)
				labelTotal.textContent = `R$ ${Number(pedido.total).toFixed(2).replace('.', ',')}`

			// Pega os elementos visuais
			const title = document.getElementById('status-title')
			const sub = document.getElementById('status-sub')
			const iconDestaque = document.getElementById('icon-destaque')
			const stepPreparo = document.getElementById('step-preparo')
			const stepEntrega = document.getElementById('step-entrega')

			if (!title || !sub) return // Se saiu da tela, para a execução

			// Limpa os steps
			stepPreparo?.classList.add('disabled')
			stepEntrega?.classList.add('disabled')

			// A Lógica do Kanban visual!
			if (statusId === 1) {
				// PENDENTE
				title.textContent = 'Aguardando Restaurante'
				sub.textContent = 'Seu pedido foi enviado e está na fila.'
				if (iconDestaque) iconDestaque.className = 'far fa-clock'
			} else if (statusId === 2) {
				// ACEITO
				title.textContent = 'Pedido Aceito!'
				sub.textContent = 'O restaurante já viu o seu pedido.'
				if (iconDestaque) iconDestaque.className = 'far fa-thumbs-up'
			} else if (statusId === 3) {
				// EM PREPARO
				title.textContent = 'Em Preparo'
				sub.textContent = 'O pizzaiolo já está com a mão na massa!'
				if (iconDestaque) iconDestaque.className = 'fas fa-fire'
				stepPreparo?.classList.remove('disabled')
			} else if (statusId === 4) {
				// EM ENTREGA
				title.textContent = 'Saiu para Entrega!'
				sub.textContent = 'O motoboy está a caminho.'
				if (iconDestaque) iconDestaque.className = 'fas fa-motorcycle text-success'
				stepPreparo?.classList.remove('disabled')
				stepEntrega?.classList.remove('disabled')
			} else if (statusId === 5) {
				// CONCLUÍDO
				title.textContent = 'Pedido Entregue'
				sub.textContent = 'Bom apetite! 🍕'
				if (iconDestaque) iconDestaque.className = 'far fa-check-circle text-success'
				stepPreparo?.classList.remove('disabled')
				stepEntrega?.classList.remove('disabled')

				// Se concluiu, podemos limpar a memória para a próxima compra!
				localStorage.removeItem('maluca_pedido_ativo')
				clearInterval((window as any).radarTimer) // Para de perguntar ao servidor
			} else if (statusId === 6) {
				// RECUSADO/CANCELADO
				title.textContent = 'Pedido Cancelado'
				sub.textContent = 'Infelizmente o pedido não pôde ser atendido.'
				if (iconDestaque) iconDestaque.className = 'far fa-times-circle text-danger'
				localStorage.removeItem('maluca_pedido_ativo')
				clearInterval((window as any).radarTimer)
			}
		} catch (error) {
			console.log('Buscando pedido...')
		}
	}

	// 5. Liga o motor de busca a cada 5 segundos
	atualizarRadar() // Busca a primeira vez imediatamente

	// Limpa o timer antigo se o cliente ficar saindo e entrando na tela
	if ((window as any).radarTimer) (window as any).radarTimer = setInterval(atualizarRadar, 5000)
}
