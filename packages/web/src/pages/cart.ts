import { mount } from '@delivery/shared/dom'
;('../utils/dom')
import { TitleHeader } from '../components/TitleHeader/TitleHeader'
import { getCart, clearCart } from '../utils/cartManager'
import { createOrder } from '../api/orders'

export function renderCart(root: HTMLElement) {
	const cart = getCart()

	const clienteSalvo = JSON.parse(localStorage.getItem('maluca_cliente') || '{}')
	const temEnderecoSalvo = !!clienteSalvo.rua

	let cartItemsHtml = ''

	if (cart.itens.length > 0) {
		cartItemsHtml = cart.itens
			.map(
				(item: any) => `
			<div class="card mb-2 pr-0">
				<div class="container-detalhes">
					<div class="detalhes-produto">
						<div class="infos-produto">
							<p class="name"><b>${item.quantidade}x ${item.nome}</b></p>
							<p class="price"><b>R$ ${Number(item.precoTotal).toFixed(2).replace('.', ',')}</b></p>
						</div>

						${item.opcionais
							.map(
								(op: any) => `
							<div class="infos-produto">
								<p class="name-opcional mb-0">1x ${op.nome}</p>
								<p class="price-opcional mb-0">+ R$ ${Number(op.valor).toFixed(2).replace('.', ',')}</p>
							</div>
						`
							)
							.join('')}

						${
							item.observacao
								? `
							<div class="infos-produto mt-1">
								<p class="obs-opcional mb-0">- ${item.observacao}</p>
							</div>
						`
								: ''
						}
					</div>
					<div class="detalhes-produto-edit text-danger" title="Limpar carrinho" onclick="localStorage.clear(); location.reload();">
						<i class="fas fa-trash-alt"></i>
					</div>
				</div>
			</div>
		`
			)
			.join('')
	}

	root.innerHTML = `
    <div id="app-title-header"></div>

    <section class="carrinho width-fix mt-4 ${cart.itens.length > 0 ? 'hidden' : ''}" id="cart-empty">
      <div class="card card-address">
        <div class="img-icon-details"><i class="fas fa-cart-plus"></i></div>
        <div class="infos">
          <p class="name mb-0"><b>Seu carrinho está vazio</b></p>
          <span class="text mb-0">Volte ao cardápio, selecione os itens e adicione ao seu carrinho.</span>
        </div>
      </div>
    </section>

    <section class="carrinho width-fix mt-4 ${cart.itens.length === 0 ? 'hidden' : ''}" id="cart-items">
      
	  ${cartItemsHtml}

      <div class="card mb-2 mt-4 border-top pt-3">
        <div class="detalhes-produto">
          <div class="infos-produto">
            <p class="name-total mb-0"><b>Total do Pedido</b></p>
            <p class="price-total mb-0"><b>R$ ${Number(cart.total).toFixed(2).replace('.', ',')}</b></p>
          </div>
        </div>
      </div>
    </section>

	<section class="opcionais width-fix mt-5 pb-5 ${cart.itens.length === 0 ? 'hidden' : ''}">
      
	  <div class="container-group mb-5">
        <span class="badge" style="float: right; background-color: #fff2cc;">Obrigatório</span>
        <p class="title-categoria mb-0"><b>Escolha uma opção</b></p>
        <span class="sub-title-categoria">Como quer receber o pedido?</span>

        <div class="card card-opcionais mt-2">
          <div class="infos-produto-opcional"><p class="name mb-0"><b>Entrega na minha casa</b></p></div>
          <div class="checks">
            <label class="container-check">
              <input type="checkbox" name="deliveryMode" value="delivery" checked />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="card card-opcionais mt-2">
          <div class="infos-produto-opcional"><p class="name mb-0"><b>Retirar no estabelecimento</b></p></div>
          <div class="checks">
            <label class="container-check">
              <input type="checkbox" name="deliveryMode" value="pickup" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="container-group mb-5">
        <span class="badge" style="float: right; background-color: #fff2cc;">Obrigatório</span>
        <p class="title-categoria mb-0"><b>Nome e Sobrenome</b></p>
        <input type="text" id="inputNome" class="form-control mt-2" placeholder="* Como vamos te chamar?" value="${clienteSalvo.nome || ''}" />
      </div>

      <div class="container-group mb-5">
        <span class="badge" style="float: right; background-color: #fff2cc;">Obrigatório</span>
        <p class="title-categoria mb-0"><b>Número do celular</b></p>
        <input type="text" id="inputTelefone" class="form-control mt-2" placeholder="(00) 00000-0000" value="${clienteSalvo.telefone || ''}" />
      </div>

	  <div class="container-group mb-5" id="blocoEndereco">
        <span class="badge" style="float: right; background-color: #fff2cc;">Obrigatório</span>
        <p class="title-categoria mb-0"><b>Seu Endereço</b></p>
		
		<div id="address-card" class="${temEnderecoSalvo ? '' : 'hidden'}">
			<div class="card card-address mt-2">
				<div class="img-icon-details">
					<i class="fas fa-map-marked-alt"></i>
				</div>
				<div class="infos">
					<p class="name mb-0"><b id="display-rua">${clienteSalvo.rua || ''}, ${clienteSalvo.numero || ''}</b></p>
					<span class="text mb-0" id="display-bairro">${clienteSalvo.bairro || ''} ${clienteSalvo.cep ? ' / CEP: ' + clienteSalvo.cep : ''}</span>
				</div>
				<div class="icon-edit" id="btn-edit-address" style="cursor: pointer;">
					<i class="fas fa-pencil-alt"></i>
				</div>
			</div>
		</div>

		<div id="address-form" class="${temEnderecoSalvo ? 'hidden' : ''}">
			<input type="text" id="inputCEP" class="form-control mt-2" placeholder="CEP" value="${clienteSalvo.cep || ''}" maxlength="9" />
			<input type="text" id="inputRua" class="form-control mt-2" placeholder="Rua / Avenida" value="${clienteSalvo.rua || ''}" />
			<div class="d-flex mt-2" style="gap: 10px;">
				<input type="text" id="inputNumero" class="form-control w-50" placeholder="Número" value="${clienteSalvo.numero || ''}" />
				<input type="text" id="inputBairro" class="form-control w-50" placeholder="Bairro" value="${clienteSalvo.bairro || ''}" />
			</div>
			<input type="text" id="inputComplemento" class="form-control mt-2" placeholder="Complemento (Opcional)" value="${clienteSalvo.complemento || ''}" />
		</div>
      </div>

	  <div class="container-group mb-5">
        <span class="badge" style="float: right; background-color: #fff2cc;">Obrigatório</span>
        <p class="title-categoria mb-0"><b>Forma de Pagamento</b></p>
		<select id="selectPagamento" class="form-control mt-2 shadow-sm" style="background-color: #fff; cursor: pointer;">
			<option value="1">Pix</option>
			<option value="2">Dinheiro (Pagamento na entrega)</option>
			<option value="3">Cartão de Crédito</option>
			<option value="4">Cartão de Débito</option>
		</select>
      </div>

	  <div class="container-group mb-5 hidden" id="blocoTroco">
        <p class="title-categoria mb-0"><b>Precisa de troco?</b></p>
        <input type="text" id="inputTroco" class="form-control mt-2" placeholder="Troco para quanto? (Ex: 50,00)" />
      </div>

    </section>

    <a href="javascript:void(0)" id="btnFinalizar" class="btn btn-yellow btn-full ${cart.itens.length === 0 ? 'hidden' : ''}">
      Finalizar pedido <span>R$ ${Number(cart.total).toFixed(2).replace('.', ',')}</span>
    </a>
  `

	mount('#app-title-header', TitleHeader({ title: 'Meu carrinho' }))

	// --- LÓGICA DE MÁSCARA DO TELEFONE ---
	const inputTelefone = root.querySelector('#inputTelefone') as HTMLInputElement
	inputTelefone?.addEventListener('input', (e) => {
		let v = (e.target as HTMLInputElement).value.replace(/\D/g, '').substring(0, 11)
		let formatado = v
		if (v.length > 2) formatado = `(${v.substring(0, 2)}) ${v.substring(2)}`
		if (v.length > 7)
			formatado = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`
		;(e.target as HTMLInputElement).value = formatado
	})

	// --- LÓGICA DE MÁSCARA DO CEP ---
	const inputCEP = root.querySelector('#inputCEP') as HTMLInputElement
	inputCEP?.addEventListener('input', (e) => {
		let v = (e.target as HTMLInputElement).value.replace(/\D/g, '').substring(0, 8)
		if (v.length > 5) v = `${v.substring(0, 5)}-${v.substring(5)}`
		;(e.target as HTMLInputElement).value = v
	})

	// --- LÓGICA DE MOSTRAR CAMPO DE TROCO ---
	const selectPagamento = root.querySelector('#selectPagamento') as HTMLSelectElement
	const blocoTroco = root.querySelector('#blocoTroco') as HTMLElement
	selectPagamento?.addEventListener('change', () => {
		if (selectPagamento.value === '2') {
			// 2 = Dinheiro
			blocoTroco.classList.remove('hidden')
		} else {
			blocoTroco.classList.add('hidden')
		}
	})

	// --- LÓGICA DE EDITAR ENDEREÇO ---
	const btnEditAddress = root.querySelector('#btn-edit-address')
	const addressCard = root.querySelector('#address-card')
	const addressForm = root.querySelector('#address-form')

	btnEditAddress?.addEventListener('click', () => {
		addressCard?.classList.add('hidden')
		addressForm?.classList.remove('hidden')
	})

	// --- LÓGICA DO TIPO DE ENTREGA (ESCONDER ENDEREÇO E TROCO) ---
	const checks = Array.from(root.querySelectorAll<HTMLInputElement>('input[name="deliveryMode"]'))
	const blocoEndereco = root.querySelector('#blocoEndereco') as HTMLElement

	checks.forEach((ck) => {
		ck.addEventListener('change', () => {
			if (ck.checked) {
				checks.filter((x) => x !== ck).forEach((x) => (x.checked = false))
				if (ck.value === 'pickup') blocoEndereco.classList.add('hidden')
				else blocoEndereco.classList.remove('hidden')
			}
		})
	})

	// --- BOTÃO FINALIZAR ---
	const btnFinalizar = root.querySelector('#btnFinalizar') as HTMLElement
	btnFinalizar?.addEventListener('click', async () => {
		try {
			const nome = (root.querySelector('#inputNome') as HTMLInputElement)?.value
			const telefone = (root.querySelector('#inputTelefone') as HTMLInputElement)?.value
			const rua = (root.querySelector('#inputRua') as HTMLInputElement)?.value
			const complemento = (root.querySelector('#inputComplemento') as HTMLInputElement)?.value
			const cep = (root.querySelector('#inputCEP') as HTMLInputElement)?.value
			const numero = (root.querySelector('#inputNumero') as HTMLInputElement)?.value
			const bairro = (root.querySelector('#inputBairro') as HTMLInputElement)?.value
			const idPagamento = Number(selectPagamento.value)

			// Capturando e formatando o troco (se houver)
			const trocoString = (root.querySelector('#inputTroco') as HTMLInputElement)?.value
			let trocoFinal = null
			if (idPagamento === 2 && trocoString) {
				// Remove letras e converte vírgula para ponto
				trocoFinal = parseFloat(trocoString.replace(/[^\d,.-]/g, '').replace(',', '.'))
			}

			let idTipoEntrega = 1 // Delivery
			const checkRetirada = root.querySelector('input[value="pickup"]') as HTMLInputElement
			if (checkRetirada && checkRetirada.checked) idTipoEntrega = 2 // Pickup

			if (!nome || !telefone)
				return alert('Por favor, preencha o seu nome e número de celular!')
			if (idTipoEntrega === 1 && (!rua || !numero || !bairro)) {
				addressCard?.classList.add('hidden')
				addressForm?.classList.remove('hidden')
				return alert('Por favor, preencha a Rua, Número e Bairro para a entrega!')
			}

			btnFinalizar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando seu pedido...'
			btnFinalizar.style.pointerEvents = 'none'

			localStorage.setItem(
				'maluca_cliente',
				JSON.stringify({ nome, telefone, rua, complemento, cep, numero, bairro })
			)

			const itensFormatados = cart.itens.map((item: any) => ({
				idproduto: item.idproduto,
				quantidade: item.quantidade,
				observacao: item.observacao || '',
				opcionais: item.opcionais ? item.opcionais.map((op: any) => op.idopcionalitem) : [],
			}))

			const pacoteDoPedido = {
				idtipoentrega: idTipoEntrega,
				idpagamentos: idPagamento,
				troco: trocoFinal,
				total: cart.total,
				nomecliente: nome,
				telefonecliente: telefone,
				endereco: idTipoEntrega === 1 ? rua : '',
				complemento: idTipoEntrega === 1 ? complemento : '',
				numero: idTipoEntrega === 1 ? numero : '',
				cep: idTipoEntrega === 1 ? cep : '',
				bairro: idTipoEntrega === 1 ? bairro : '',
				itens: itensFormatados,
			}

			await createOrder(pacoteDoPedido)

			clearCart()
			window.location.hash = '#/order'
		} catch (error: any) {
			alert(error.message)
			btnFinalizar.innerHTML = `Tentar novamente <span>R$ ${Number(cart.total).toFixed(2).replace('.', ',')}</span>`
			btnFinalizar.style.pointerEvents = 'auto'
		}
	})
}
