import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
import { getOrders, updateOrderStatus, getOrderDetails } from '../../api/orders'

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

	// Evento para mudar status do pedido
	root.addEventListener('click', async (e) => {
		const btnMudarStatus = (e.target as HTMLElement).closest(
			'.btn-change-status'
		) as HTMLElement
		if (!btnMudarStatus) return

		e.preventDefault()
		const idpedido = Number(btnMudarStatus.dataset.id)
		const idnovoStatus = Number(btnMudarStatus.dataset.status)
		const nomeNovoStatus = btnMudarStatus.dataset.nome

		if (confirm(`Deseja mover o pedido #${idpedido} para "${nomeNovoStatus}"?`)) {
			try {
				await updateOrderStatus(idpedido, idnovoStatus)
				location.reload()
			} catch (err) {
				alert('Erro ao atualizar o status do pedido!')
			}
		}
	})

	// Evento para abrir o recibo
	grid?.addEventListener('click', async (e) => {
		const cardContent = (e.target as HTMLElement).closest('.card-content') as HTMLElement
		if (!cardContent) return

		const idpedido = Number(cardContent.dataset.id)
		await carregarEMontarModal(idpedido)
	})
}

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
            <button class="btn btn-white btn-sm dropdown-toggle active" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${pedido.status}
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item btn-change-status" href="javascript:void(0)" data-id="${pedido.idpedido}" data-status="2" data-nome="Aceito">Mover para <b>Aceito</b> <i class="far fa-thumbs-up"></i></a>
              <a class="dropdown-item btn-change-status" href="javascript:void(0)" data-id="${pedido.idpedido}" data-status="3" data-nome="Em preparo">Mover para <b>Em preparo</b> <i class="far fa-clock"></i></a>
              <a class="dropdown-item btn-change-status" href="javascript:void(0)" data-id="${pedido.idpedido}" data-status="4" data-nome="Em entrega">Mover para <b>Em entrega</b> <i class="fas fa-motorcycle"></i></a>
              <a class="dropdown-item btn-change-status" href="javascript:void(0)" data-id="${pedido.idpedido}" data-status="5" data-nome="Concluído">Mover para <b>Concluído</b> <i class="far fa-check-circle"></i></a>
              <a class="dropdown-item btn-change-status text-danger" href="javascript:void(0)" data-id="${pedido.idpedido}" data-status="6" data-nome="Recusado">Recusar Pedido <i class="far fa-times-circle"></i></a>
            </div>
          </div>
          <p class="numero-pedido mt-2">#${pedido.idpedido}</p>
        </div>

        <div class="card-content" data-bs-toggle="modal" data-bs-target="#modalDetalhes" data-id="${pedido.idpedido}">
          <div class="card-pedido-body mt-3">
            <p class="info-pedido"><i class="fas fa-user"></i> ${pedido.nomecliente}</p>
            <p class="info-pedido"><i class="fas fa-motorcycle"></i> ${pedido.tipo_entrega}</p>
            <p class="info-pedido">
              <i class="fas fa-coins"></i> ${pedido.pagamento}
              ${pedido.troco ? `<span>Troco para R$ ${Number(pedido.troco).toFixed(2).replace('.', ',')}</span>` : ''}
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

async function carregarEMontarModal(idpedido: number) {
	const modalContent = document.querySelector('#modalDetalhes .modal-content')
	if (!modalContent) return

	modalContent.innerHTML = `<div class="p-5 text-center"><i class="fas fa-spinner fa-spin fa-2x text-muted"></i><p class="mt-3">Carregando recibo...</p></div>`

	try {
		const pedido = await getOrderDetails(idpedido)
		const dataFormatada = new Date(pedido.datacadastro).toLocaleString('pt-BR', {
			dateStyle: 'short',
			timeStyle: 'short',
		})

		const enderecoHtml =
			pedido.idtipoentrega === 1
				? `
			<div class="col-12">
				<div class="card card-address mt-2">
					<div class="img-icon-details"><i class="fas fa-map-marked-alt"></i></div>
					<div class="infos pr-0">
						<p class="name mb-0"><b>${pedido.endereço || ''}, ${pedido.numero || ''} ${pedido.complemento ? '- ' + pedido.complemento : ''}</b></p>
						<span class="text mb-0">${pedido.bairro || ''} - ${pedido.cidade || ''}-${pedido.estado || ''} / CEP: ${pedido.cep || ''}</span>
					</div>
					<div class="icon-edit"><i class="fas fa-location-arrow"></i></div>
				</div>
			</div>
		`
				: `
			<div class="col-12">
				<div class="card card-address mt-2">
					<div class="img-icon-details"><i class="fas fa-box"></i></div>
					<div class="infos pr-0"><p class="name mb-0"><b>Retirada no Balcão</b></p></div>
				</div>
			</div>
		`

		const itensHtml = pedido.itens
			.map(
				(item: any) => `
			<div class="card-item mb-2 pr-0">
				<div class="container-detalhes">
					<div class="detalhes-produto">
						<div class="infos-produto">
							<p class="name"><b>${item.quantidade}x ${item.produto_nome}</b></p>
							<p class="price"><b>R$ ${Number(item.produto_valor).toFixed(2).replace('.', ',')}</b></p>
						</div>
						${
							item.opcionais
								? item.opcionais
										.map(
											(op: any) => `
						<div class="infos-produto">
							<p class="name-opcional mb-0">1x ${op.opcional_nome}</p>
							<p class="price-opcional mb-0">+ R$ ${Number(op.opcional_valor).toFixed(2).replace('.', ',')}</p>
						</div>
						`
										)
										.join('')
								: ''
						}
						${
							item.observacao
								? `
						<div class="infos-produto">
							<p class="obs-opcional mb-0">- ${item.observacao}</p>
						</div>
						`
								: ''
						}
					</div>
				</div>
			</div>
		`
			)
			.join('')

		let btnAcaoHtml = ''
		if (pedido.idpedidostatus === 1)
			btnAcaoHtml = `<button type="button" class="btn btn-yellow btn-sm btn-change-status" data-id="${pedido.idpedido}" data-status="2" data-nome="Aceito">Aceitar Pedido</button>`
		else if (pedido.idpedidostatus === 2)
			btnAcaoHtml = `<button type="button" class="btn btn-yellow btn-sm btn-change-status" data-id="${pedido.idpedido}" data-status="3" data-nome="Em preparo">Iniciar Preparo</button>`
		else if (pedido.idpedidostatus === 3)
			btnAcaoHtml = `<button type="button" class="btn btn-yellow btn-sm btn-change-status" data-id="${pedido.idpedido}" data-status="4" data-nome="Em entrega">Saiu para Entrega</button>`
		else if (pedido.idpedidostatus === 4)
			btnAcaoHtml = `<button type="button" class="btn btn-yellow btn-sm btn-change-status" data-id="${pedido.idpedido}" data-status="5" data-nome="Concluído">Concluir Pedido</button>`

		modalContent.innerHTML = `
			<div class="modal-header">
				<h5 class="modal-title">#${pedido.idpedido} 
					<span class="horario-pedido">Recebido em ${dataFormatada}</span>
				</h5>
				<button class="btn btn-white btn-sm" type="button" data-bs-dismiss="modal" aria-label="Close">
					<i class="fas fa-times"></i>&nbsp; Fechar 
				</button>
			</div>
			<div class="modal-body">
				<div class="container-dados-pedido pt-1">
					<div class="row">
						<div class="col-12">
							<div class="card card-address cursor-default">
								<div class="img-icon-details"><i class="fas fa-user"></i></div>
								<div class="infos pr-0">
									<div class="d-flex">
										<p class="name mb-0"><b>${pedido.nomecliente}</b></p>
										<span class="text mb-0">${pedido.telefonecliente}</span>
									</div>
									<div class="d-flex">
										<span class="info-pedido mb-0">Recebido em ${dataFormatada}</span>
										<span class="info-pedido mb-0 link"><i class="fas fa-motorcycle"></i> ${pedido.tipo_entrega}</span>
									</div>
								</div>
							</div>
						</div>

						<div class="col-12">
							<div class="card card-address cursor-default mt-2">
								<div class="img-icon-details"><i class="fas fa-coins"></i></div>
								<div class="infos pr-0">
									<p class="name mb-0"><b>${pedido.pagamento}</b></p>
									<span class="text mb-0">${pedido.troco ? `Troco para: R$ ${Number(pedido.troco).toFixed(2).replace('.', ',')}` : 'Sem troco'}</span>
								</div>
							</div>
						</div>

						${enderecoHtml}
					</div>
				</div>

				<div class="container-itens-pedido carrinho">
					<div id="itensPedido">
						${itensHtml}

						${
							pedido.taxa_nome
								? `
						<div class="card-item mb-2">
							<div class="detalhes-produto">
								<div class="infos-produto">
									<p class="name mb-0"><i class="fas fa-motorcycle"></i>&nbsp; <b>${pedido.taxa_nome}</b></p>
									<p class="price mb-0"><b>+ R$ ${Number(pedido.taxa_valor || 0)
										.toFixed(2)
										.replace('.', ',')}</b></p>
								</div>
							</div>
						</div>`
								: ''
						}
			
						<div class="card-item mb-2">
							<div class="detalhes-produto">
								<div class="infos-produto">
									<p class="name-total mb-0"><b>Total</b></p>
									<p class="price-total mb-0"><b>R$ ${Number(pedido.total).toFixed(2).replace('.', ',')}</b></p>
								</div>
							</div>
						</div>
					</div>

					<div class="footer-btn mt-3">
						${btnAcaoHtml}
					</div>
				</div>
			</div>
		`
	} catch (error) {
		modalContent.innerHTML = `<div class="p-5 text-center text-danger"><i class="fas fa-exclamation-triangle fa-2x"></i><p class="mt-3">Erro ao carregar recibo!</p></div>`
	}
}

function mockOrderModal() {
	return `
    <div id="modalDetalhes" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
        </div>
      </div>
    </div>
  `
}
