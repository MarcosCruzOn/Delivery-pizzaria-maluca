import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
import { getOrders, updateOrderStatus } from '../../api/orders'

export async function renderOrders(root: HTMLElement) {
	let todosPedidos: any[] = []
	try {
		todosPedidos = await getOrders()
	} catch (error) {
		console.error('Erro ao buscar pedidos', error)
	}

	const statusMap: Record<string, string> = {
		pending: 'Pendente',
		accepted: 'Aceito',
		preparing: 'Em preparo',
		delivering: 'Em entrega',
		done: 'Concluído',
	}

	const contar = (status: string) => todosPedidos.filter((p) => p.status === status).length

	root.innerHTML = AdminLayout({
		title: 'Painel de Pedidos',
		iconClass: 'fas fa-utensils',
		active: 'orders',
		content: `
      <div class="container">
        <div class="row">

          <div class="col-12">
            <div class="menus-pedido" id="orderStatusTabs">
              <a href="javascript:void(0)" class="btn btn-white btn-sm active" data-status="pending">
                <i class="far fa-dot-circle"></i> Pendentes
				${contar('Pendente') > 0 ? `<span class="badge-total-pedidos">${contar('Pendente')}</span>` : ''}
              </a>
              <a href="javascript:void(0)" class="btn btn-white btn-sm" data-status="accepted">
                <i class="far fa-thumbs-up"></i> Aceito
				${contar('Aceito') > 0 ? `<span class="badge-total-pedidos">${contar('Aceito')}</span>` : ''}
              </a>
              <a href="javascript:void(0)" class="btn btn-white btn-sm" data-status="preparing">
                <i class="far fa-clock"></i> Em preparo
				${contar('Em preparo') > 0 ? `<span class="badge-total-pedidos">${contar('Em preparo')}</span>` : ''}
              </a>
              <a href="javascript:void(0)" class="btn btn-white btn-sm" data-status="delivering">
                <i class="fas fa-motorcycle"></i> Em entrega
				${contar('Em entrega') > 0 ? `<span class="badge-total-pedidos">${contar('Em entrega')}</span>` : ''}
              </a>
              <a href="javascript:void(0)" class="btn btn-white btn-sm" data-status="done">
                <i class="far fa-check-circle"></i> Concluído
				${contar('Concluído') > 0 ? `<span class="badge-total-pedidos">${contar('Concluído')}</span>` : ''}
              </a>
            </div>
          </div>

          <div class="col-12">
            <div class="row lista-pedidos mt-5" id="ordersGrid">
              </div>
          </div>

        </div>
      </div>

      ${mockOrderModal()}
    `,
	})

	const grid = root.querySelector('#ordersGrid') as HTMLElement
	const tabs = root.querySelector('#orderStatusTabs')

	function filtrarE_DesenharPedidos(statusIngles: string) {
		const statusBanco = statusMap[statusIngles]
		const pedidosFiltrados = todosPedidos.filter((p) => p.status === statusBanco)

		if (grid) {
			grid.innerHTML =
				pedidosFiltrados.length > 0
					? pedidosFiltrados.map(renderOrderCard).join('')
					: '<p class="text-muted w-100 text-center mt-5">Nenhum pedido nesta etapa.</p>'
		}
	}

	filtrarE_DesenharPedidos('pending')

	tabs?.addEventListener('click', (e) => {
		const a = (e.target as HTMLElement).closest('a')
		if (!a) return
		e.preventDefault()

		tabs.querySelectorAll('a').forEach((x) => x.classList.remove('active'))
		a.classList.add('active')

		const statusClicado = a.getAttribute('data-status') || 'pending'
		filtrarE_DesenharPedidos(statusClicado)
	})
	// ... (código do tabs.addEventListener continua acima)

	// 7. O Evento de clique para MUDAR O STATUS DO PEDIDO
	grid?.addEventListener('click', async (e) => {
		const btnMudarStatus = (e.target as HTMLElement).closest(
			'.btn-change-status'
		) as HTMLElement
		if (!btnMudarStatus) return // Se não clicou em um botão de status, ignora!

		e.preventDefault()
		const idpedido = Number(btnMudarStatus.dataset.id)
		const idnovoStatus = Number(btnMudarStatus.dataset.status)
		const nomeNovoStatus = btnMudarStatus.dataset.nome

		if (confirm(`Deseja mover o pedido #${idpedido} para "${nomeNovoStatus}"?`)) {
			try {
				await updateOrderStatus(idpedido, idnovoStatus)
				// Recarrega a página para o pedido sumir da aba atual e aparecer na aba nova!
				location.reload()
			} catch (err) {
				alert('Erro ao atualizar o status do pedido!')
			}
		}
	})
} // 👈 Aqui é a chave que fecha a função renderOrders()

function renderOrderCard(pedido: any) {
	const dataFormatada = new Date(pedido.datacadastro).toLocaleTimeString('pt-BR', {
		hour: '2-digit',
		minute: '2-digit',
	})

	return `
    <div class="col-3">
      <div class="card card-pedido">

        <div class="card-pedido-header">
          <div class="dropdown">
            <button
              class="btn btn-white btn-sm dropdown-toggle active"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ${pedido.status}
            </button>

          <div class="dropdown-menu">
              <a class="dropdown-item btn-change-status" href="javascript:void(0)" data-id="${pedido.idpedido}" data-status="2" data-nome="Aceito">
                Mover para <b>Aceito</b> <i class="far fa-thumbs-up"></i>
              </a>
              <a class="dropdown-item btn-change-status" href="javascript:void(0)" data-id="${pedido.idpedido}" data-status="3" data-nome="Em preparo">
                Mover para <b>Em preparo</b> <i class="far fa-clock"></i>
              </a>
              <a class="dropdown-item btn-change-status" href="javascript:void(0)" data-id="${pedido.idpedido}" data-status="4" data-nome="Em entrega">
                Mover para <b>Em entrega</b> <i class="fas fa-motorcycle"></i>
              </a>
              <a class="dropdown-item btn-change-status" href="javascript:void(0)" data-id="${pedido.idpedido}" data-status="5" data-nome="Concluído">
                Mover para <b>Concluído</b> <i class="far fa-check-circle"></i>
              </a>
              <a class="dropdown-item btn-change-status text-danger" href="javascript:void(0)" data-id="${pedido.idpedido}" data-status="6" data-nome="Recusado">
                Recusar Pedido <i class="far fa-times-circle"></i>
              </a>
            </div>

          <p class="numero-pedido mt-2">#${pedido.idpedido}</p>
        </div>

        <div class="card-content" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#modalDetalhes">

          <div class="card-pedido-body mt-3">
            <p class="info-pedido">
              <i class="fas fa-user"></i> ${pedido.nomecliente}
            </p>
            <p class="info-pedido">
              <i class="fas fa-motorcycle"></i> ${pedido.tipo_entrega}
            </p>
            <p class="info-pedido">
              <i class="fas fa-coins"></i> ${pedido.pagamento}
            </p>
          </div>

          <div class="separate"></div>

          <div class="card-pedido-footer">
            <p class="horario-pedido">Recebido às ${dataFormatada}</p>
            <p class="total-pedido"><b>R$ ${Number(pedido.total).toFixed(2).replace('.', ',')}</b></p>
          </div>

        </div>

      </div>
    </div>
  `
}

function mockOrderModal() {
	return `
    <div id="modalDetalhes" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">

          <div class="modal-top d-flex justify-content-between px-4 py-3 align-items-center">
            <h5 class="modal-title">#1 <span class="horario-pedido">Recebido há 33 minutos</span></h5>
            <button class="btn btn-white btn-sm " type="button" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>&nbsp; Fechar
            </button>
          </div>

          <div class="modal-body">
            <h6 class="text-center mt-3">Em breve buscaremos o recibo real do banco...</h6>
          </div>
        </div>
      </div>
    </div>
  `
}
