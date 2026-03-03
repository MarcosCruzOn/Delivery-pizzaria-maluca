import { mount } from '../utils/dom'
import { TitleHeader } from '../components/TitleHeader/TitleHeader'
import { BottomMenu } from '../components/BottomMenu/BottomMenu'

export function renderCart(root: HTMLElement) {
	root.innerHTML = `
    
    <div id="app-title-header"></div>

    <!-- ESTADO: carrinho vazio (no seu HTML ele existe) -->
    <section class="carrinho width-fix mt-4" id="cart-empty">
      <div class="card card-address">
        <div class="img-icon-details">
          <i class="fas fa-cart-plus"></i>
        </div>
        <div class="infos">
          <p class="name mb-0"><b>Seu carrinho está vazio</b></p>
          <span class="text mb-0">
            Volte ao cardápio, selecione os itens e adicione ao seu carrinho.
          </span>
        </div>
      </div>
    </section>

    <!-- ESTADO: carrinho com itens (no seu HTML ele também existe) -->
    <section class="carrinho width-fix mt-4" id="cart-items">
      <div class="card mb-2 pr-0">
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

          <div class="detalhes-produto-edit" title="Editar item">
            <i class="fas fa-pencil-alt"></i>
          </div>
        </div>
      </div>

      <div class="card mb-2 pr-0">
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

          <div class="detalhes-produto-edit" title="Editar item">
            <i class="fas fa-pencil-alt"></i>
          </div>
        </div>
      </div>

      <div class="card mb-2">
        <div class="detalhes-produto">
          <div class="infos-produto">
            <p class="name mb-0"><i class="fas fa-motorcycle"></i>&nbsp; <b>Taxa de entrega</b></p>
            <p class="price mb-0"><b>+ R$ 15,00</b></p>
          </div>
        </div>
      </div>

      <div class="card mb-2">
        <div class="detalhes-produto">
          <div class="infos-produto">
            <p class="name-total mb-0"><b>Total</b></p>
            <p class="price-total mb-0"><b>R$ 105,50</b></p>
          </div>
        </div>
      </div>
    </section>

    <section class="opcionais width-fix mt-5 pb-5">
      <div class="container-group mb-5">
        <span class="badge">Obrigatório</span>

        <p class="title-categoria mb-0"><b>Escolha uma opção</b></p>
        <span class="sub-title-categoria">Como quer receber o pedido?</span>

        <div class="card card-opcionais mt-2">
          <div class="infos-produto-opcional">
            <p class="name mb-0"><b>Entrega (60-90min)</b></p>
          </div>
          <div class="checks">
            <label class="container-check">
              <input type="checkbox" name="deliveryMode" value="delivery" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="card card-opcionais mt-2">
          <div class="infos-produto-opcional">
            <p class="name mb-0"><b>Retirar no estabelecimento</b></p>
          </div>
          <div class="checks">
            <label class="container-check">
              <input type="checkbox" name="deliveryMode" value="pickup" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="container-group mb-5">
        <span class="badge">Obrigatório</span>

        <p class="title-categoria mb-0"><b>Qual o seu endereço?</b></p>
        <span class="sub-title-categoria">Informe o endereço da entrega</span>

        <div class="card card-select mt-2">
          <div class="infos-produto-opcional">
            <p class="mb-0 color-primary">
              <i class="fas fa-plus-circle"></i>&nbsp; Nenhum endereço selecionado
            </p>
          </div>
        </div>

        <div class="card card-address mt-2">
          <div class="img-icon-details">
            <i class="fas fa-map-marked-alt"></i>
          </div>
          <div class="infos">
            <p class="name mb-0"><b>Rua Olá Mundo, 123, Meu Mairro</b></p>
            <span class="text mb-0">Cidade-SP / 12345-678</span>
          </div>
          <div class="icon-edit">
            <i class="fas fa-pencil-alt"></i>
          </div>
        </div>
      </div>

      <div class="container-group mb-5">
        <span class="badge">Obrigatório</span>

        <p class="title-categoria mb-0"><b>Nome e Sobrenome</b></p>
        <span class="sub-title-categoria">Como vamos te chamar?</span>

        <input type="text" class="form-control mt-2" placeholder="* Informe o nome e sobrenome" />
      </div>

      <div class="container-group mb-5">
        <span class="badge">Obrigatório</span>

        <p class="title-categoria mb-0"><b>Número do seu celular</b></p>
        <span class="sub-title-categoria">Para mais informações do pedido</span>

        <input type="text" class="form-control mt-2" placeholder="(00) 0000-0000" />
      </div>

      <div class="container-group mb-5">
        <span class="badge">Obrigatório</span>

        <p class="title-categoria mb-0"><b>Como você prefere pagar?</b></p>
        <span class="sub-title-categoria">* Pagamento na entrega</span>

        <div class="card card-select mt-2">
          <div class="infos-produto-opcional">
            <p class="mb-0 color-primary">
              <i class="fas fa-plus-circle"></i>&nbsp; Nenhuma forma selecionada
            </p>
          </div>
        </div>

        <div class="card card-address mt-2">
          <div class="img-icon-details">
            <i class="fas fa-credit-card"></i>
          </div>
          <div class="infos">
            <p class="name mb-0"><b>Cartão de Crédito</b></p>
            <span class="text mb-0">Levar maquininha</span>
          </div>
          <div class="icon-edit">
            <i class="fas fa-pencil-alt"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- SPA: em vez de voltar pro index.html, vamos para #/order (ou pode ser #/confirm depois) -->
    <a href="#/order" class="btn btn-yellow btn-full">
      Fazer pedido <span>R$ 105,50</span>
    </a>

    <div id="app-bottom-menu"></div>
  `

	// O carrinho tem o botão grande "Fazer pedido", então o BottomMenu pode ficar oculto (opcional).
	// Se você quiser manter, deixamos ativo:
	mount(
		'#app-bottom-menu',
		BottomMenu({ isOpen: true, active: 'carrinho', cartCount: 2 })
	)

	mount('#app-title-header', TitleHeader({ title: 'Meu carrinho' }))

	// EXTRA simples: “comportamento de radio” para as duas opções (entrega/retirada)
	const checks = Array.from(
		root.querySelectorAll<HTMLInputElement>('input[name="deliveryMode"]')
	)
	checks.forEach((ck) => {
		ck.addEventListener('change', () => {
			if (ck.checked)
				checks
					.filter((x) => x !== ck)
					.forEach((x) => (x.checked = false))
		})
	})

	// Por enquanto, só pra não aparecer os dois estados ao mesmo tempo:
	// deixe apenas o carrinho com itens visível.
	const empty = root.querySelector<HTMLElement>('#cart-empty')
	if (empty) empty.style.display = 'none'
}
