import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
import { getOrders } from '../../api/orders'

export async function renderOrders(root: HTMLElement) {
	// 1. Busca os pedidos reias do banco!
	let pedidosReais = []
	try {
		pedidosReais = await getOrders()
	} catch (error) {
		console.error('Erro ao buscar pedidos', error)
	}

	root.innerHTML = AdminLayout({
		title: 'Painel de Pedidos',
		iconClass: 'fas fa-utensils',
		active: 'orders',
		content: `
      <div class="container">
        <div class="row">

          <div class="col-12">
            <div class="menus-pedido" id="orderStatusTabs">
              <a href="#" class="btn btn-white btn-sm active" data-status="pending">
                <i class="far fa-dot-circle"></i> Pendentes
              </a>
              <a href="#" class="btn btn-white btn-sm" data-status="accepted">
                <i class="far fa-thumbs-up"></i> Aceito
              </a>
              <a href="#" class="btn btn-white btn-sm" data-status="preparing">
                <i class="far fa-clock"></i> Em preparo
              </a>
              <a href="#" class="btn btn-white btn-sm" data-status="delivering">
                <i class="fas fa-motorcycle"></i> Em entrega
              </a>
              <a href="#" class="btn btn-white btn-sm" data-status="done">
                <i class="far fa-check-circle"></i> Concluído
              </a>
            </div>
          </div>

          <div class="col-12">
            <div class="row lista-pedidos mt-5" id="ordersGrid">
              ${
					pedidosReais.length > 0
						? pedidosReais.map(renderOrderCard).join('')
						: '<p class="text-muted w-100 text-center">Nenhum pedido encontrado.</p>'
				}
            </div>
          </div>

        </div>
      </div>

      ${mockOrderModal()}
    `,
	})

	// tabs (bem simples: só troca "active")
	const tabs = root.querySelector('#orderStatusTabs')
	tabs?.addEventListener('click', (e) => {
		const a = (e.target as HTMLElement).closest('a')
		if (!a) return
		e.preventDefault()

		tabs.querySelectorAll('a').forEach((x) => x.classList.remove('active'))
		a.classList.add('active')
	})
}

// Transformamos o Mock antigo em um Render real
function renderOrderCard(pedido: any) {
	// Formatar a data para algo bonito (ex: 18:30)
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
              <a class="dropdown-item" href="#">Mover para <b>Aceito</b> <i class="far fa-thumbs-up"></i></a>
              <a class="dropdown-item" href="#">Mover para <b>Em preparo</b> <i class="far fa-clock"></i></a>
              <a class="dropdown-item" href="#">Mover para <b>Em entrega</b> <i class="fas fa-motorcycle"></i></a>
              <a class="dropdown-item" href="#">Mover para <b>Concluído</b> <i class="far fa-check-circle"></i></a>
              <a class="dropdown-item" href="#">Recusar Pedido <i class="far fa-times-circle"></i></a>
            </div>
          </div>

          <p class="numero-pedido mt-2">#${pedido.idpedido}</p>
        </div>

        <div class="card-content" data-bs-toggle="modal" data-bs-target="#modalDetalhes">

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
	// ... Mantenha o seu código atual do mockOrderModal aqui ...
	// Modal do seu HTML :contentReference[oaicite:3]{index=3}
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

            <div class="container-dados-pedido pt-1">
              <div class="row">

                <div class="col-12">
                  <div class="card card-address cursor-default">
                    <div class="img-icon-details">
                      <i class="fas fa-user"></i>
                    </div>
                    <div class="infos pr-0">
                      <div class="d-flex">
                        <p class="name mb-0"><b>Weverton Lima</b></p>
                        <span class="text mb-0">(99) 99107-0707</span>
                      </div>
                      <div class="d-flex">
                        <span class="info-pedido mb-0">Recebido em 21/08 às 18:00</span>
                        <span class="info-pedido mb-0 link">
                          <i class="fas fa-motorcycle"></i> Entrega
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="card card-address cursor-default mt-2">
                    <div class="img-icon-details">
                      <i class="fas fa-coins"></i>
                    </div>
                    <div class="infos pr-0">
                      <p class="name mb-0"><b>Dinheiro</b></p>
                      <span class="text mb-0">Troco para: R$ 50,00</span>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="card card-address mt-2">
                    <div class="img-icon-details">
                      <i class="fas fa-map-marked-alt"></i>
                    </div>
                    <div class="infos pr-0">
                      <p class="name mb-0"><b>Rua Olá Mundo, 123, Meu Bairro</b></p>
                      <span class="text mb-0">Cidade-SP / CEP: 12345-678</span>
                    </div>
                    <div class="icon-edit">
                      <i class="fas fa-location-arrow"></i>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div class="container-itens-pedido carrinho">
              <div id="itensPedido">

                <div class="card-item mb-2 pr-0">
                  <div class="container-detalhes">
                    <div class="detalhes-produto">
                      <div class="infos-produto">
                        <p class="name"><b>1x Calabresa</b></p>
                        <p class="price"><b>R$ 39,90</b></p>
                      </div>

                      <div class="infos-produto">
                        <p class="name-opcional mb-0">1x Borda de Catupiry</p>
                        <p class="price-opcional mb-0">+ R$ 8,90</p>
                      </div>

                      <div class="infos-produto">
                        <p class="obs-opcional mb-0">- Observação para enviar talheres de plastico</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-item mb-2 pr-0">
                  <div class="container-detalhes">
                    <div class="detalhes-produto">
                      <div class="infos-produto">
                        <p class="name"><b>1x 4 Queijos</b></p>
                        <p class="price"><b>R$ 39,90</b></p>
                      </div>

                      <div class="infos-produto">
                        <p class="name-opcional mb-0">1x Borda de Catupiry</p>
                        <p class="price-opcional mb-0">+ R$ 8,90</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-item mb-2">
                  <div class="detalhes-produto">
                    <div class="infos-produto">
                      <p class="name mb-0"><i class="fas fa-motorcycle"></i>&nbsp; <b>Taxa de entrega</b></p>
                      <p class="price mb-0"><b>+ R$ 15,00</b></p>
                    </div>
                  </div>
                </div>

                <div class="card-item mb-2">
                  <div class="detalhes-produto">
                    <div class="infos-produto">
                      <p class="name-total mb-0"><b>Total</b></p>
                      <p class="price-total mb-0"><b>R$ 105,50</b></p>
                    </div>
                  </div>
                </div>

              </div>

              <div class="footer-btn mt-3">
                <button type="button" class="btn btn-yellow btn-sm">Aceitar Pedido</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
}
