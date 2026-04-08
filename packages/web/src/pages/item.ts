import { mount } from '@delivery/shared/dom'
;('../utils/dom')
import { TitleHeader } from '../components/TitleHeader/TitleHeader'
import { getProductDetails } from '../api/products' // Importando o garçom novo!
import { addToCart } from '../utils/cartManager' // Importando a função de adicionar ao carrinho

export async function renderItem(root: HTMLElement, id: number) {
	// Mostra uma tela de carregamento enquanto busca do banco
	root.innerHTML = `
		<div class="bg-top pedido"></div>
		<div id="app-title-header"></div>
		<div class="text-center mt-5 pt-5">
			<i class="fas fa-spinner fa-spin fa-2x text-warning"></i>
			<p class="mt-3 text-muted">Buscando detalhes deliciosos...</p>
		</div>
	`
	mount('#app-title-header', TitleHeader({ title: 'Detalhes do produto' }))

	try {
		const item = await getProductDetails(id)
		const imagemUrl = item.imagem ? `http://localhost:3333${item.imagem}` : ''

		// 1. MONTANDO O HTML DOS OPCIONAIS
		let opcionaisHtml = ''

		if (item.opcionais && item.opcionais.length > 0) {
			opcionaisHtml = item.opcionais
				.map((grupo: any) => {
					const isObrigatorio = grupo.minimo > 0
					const badgeHtml = isObrigatorio
						? `<span class="badge" style="float: right; background-color: #fff2cc; padding: 7px 12px; border-radius: 50px; color: #212121; margin-top: 5px; font-size: 12px;">Obrigatório</span>`
						: ''

					const subtitulo =
						grupo.minimo === grupo.maximo
							? `Escolha ${grupo.maximo} opção(ões)`
							: `Escolha de ${grupo.minimo} até ${grupo.maximo} opções`

					const itensHtml = grupo.itens
						.map(
							(i: any) => `
					<div class="card card-opcionais mt-2">
						<div class="infos-produto-opcional">
							<p class="name mb-0"><b>${i.nome}</b></p>
							<p class="price mb-0"><b>+ R$ ${Number(i.valor).toFixed(2).replace('.', ',')}</b></p>
						</div>
						<div class="checks">
							<label class="container-check">
								<input type="${grupo.maximo === 1 ? 'radio' : 'checkbox'}" name="grupo-${grupo.idopcional}" data-id="${i.idopcionalitem}" data-valor="${i.valor}" data-nome="${i.nome}" class="input-opcional" />
								<span class="checkmark"></span>
							</label>
						</div>
					</div>
				`
						)
						.join('')

					return `
					<div class="container-group mb-5">
						${badgeHtml}
						<p class="title-categoria mb-0"><b>${grupo.nome}</b></p>
						<span class="sub-title-categoria">${subtitulo}</span>
						<div class="mt-2">
							${itensHtml}
						</div>
					</div>
				`
				})
				.join('')
		} else {
			opcionaisHtml = `<div class="text-center p-4 text-muted"><i class="fas fa-info-circle"></i> Este produto não possui opcionais.</div>`
		}

		// 2. DESENHANDO A TELA
		root.innerHTML = `
			<div class="pedido"></div>
			<div id="app-title-header"></div>
			
			<section class="width-fix opcionais mb-4 mt-4 pb-5">
				<div class="container">
					<div class="row ">
						<img class="img-item col-4" src="${imagemUrl}" alt="${item.nome}"/> 

						<div class="col-8 pl-1 my-4">
							<h3 class="fw-bold text-dark">${item.nome}</h3>
							<p class="text-muted" style="font-size: 14px;">${item.descricao}</p>
							<h4 class="fw-bold text-warning ">R$ ${Number(item.valor).toFixed(2).replace('.', ',')}</h4>
						</div>
					</div>

				<div id="container-opcionais" class="px-3">
					${opcionaisHtml}
				</div>

				<div class="container-group mt-4 mb-5 px-3">
					<p class="title-categoria mb-0"><b>Observações</b></p>
					<span class="sub-title-categoria">Informe alguma observação abaixo</span>
					<textarea class="form-control mt-2" id="obs-pedido" rows="4" placeholder="Ex: Tirar a cebola, enviar talheres..."></textarea>
				</div>
			</section>

			<section class="menu-bottom details" id="menu-bottom">
				<div class="add-carrinho">
					<span class="btn-menos" id="btn-diminuir"><i class="fas fa-minus"></i></span>
					<span class="add-numero-itens" id="qtd-item">1</span>
					<span class="btn-mais" id="btn-aumentar"><i class="fas fa-plus"></i></span>
				</div>
				<a href="javascript:void(0)" class="btn btn-yellow btn-sm d-flex justify-content-between align-items-center" style="width: 200px;">
					
					<span>Adicionar</span>
					<span id="preco-total-btn">R$ 0,00</span>
				</a>
			</section>
		`
		mount('#app-title-header', TitleHeader({ title: 'Detalhes do produto' }))

		// 3. A LÓGICA DA MATEMÁTICA (Soma Pizza + Opcionais x Quantidade)
		let quantidade = 1
		let valorBase = Number(item.valor)
		let valorOpcionais = 0

		const labelQtd = root.querySelector('#qtd-item') as HTMLElement
		const labelPrecoTotal = root.querySelector('#preco-total-btn') as HTMLElement
		const containerOpcionais = root.querySelector('#container-opcionais') as HTMLElement

		const atualizarTela = () => {
			labelQtd.textContent = quantidade.toString()
			const total = (valorBase + valorOpcionais) * quantidade
			labelPrecoTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`
		}

		// Escuta os cliques nas caixinhas de opcionais
		containerOpcionais.addEventListener('change', () => {
			let soma = 0
			// Pega todas as caixinhas que estão marcadas
			const selecionados = containerOpcionais.querySelectorAll('.input-opcional:checked')
			selecionados.forEach((input) => {
				soma += Number(input.getAttribute('data-valor'))
			})
			valorOpcionais = soma
			atualizarTela()
		})

		root.querySelector('#btn-aumentar')?.addEventListener('click', () => {
			quantidade++
			atualizarTela()
		})

		root.querySelector('#btn-diminuir')?.addEventListener('click', () => {
			if (quantidade > 1) {
				quantidade--
				atualizarTela()
			}
		})

		// 4. SALVANDO NO CARRINHO
		const btnAdicionar = root.querySelector('.btn-yellow.btn-sm') as HTMLElement
		btnAdicionar?.addEventListener('click', () => {
			const obs = (root.querySelector('#obs-pedido') as HTMLTextAreaElement).value

			// Captura todos os opcionais que o cliente marcou
			const opcionaisSelecionados: any[] = []
			const inputsMarcados = containerOpcionais.querySelectorAll('.input-opcional:checked')
			inputsMarcados.forEach((input) => {
				opcionaisSelecionados.push({
					idopcionalitem: Number(input.getAttribute('data-id')),
					nome: input.getAttribute('data-nome'),
					valor: Number(input.getAttribute('data-valor')),
				})
			})

			// Monta o "Pacote" do item
			const itemCarrinho = {
				idproduto: item.idproduto,
				nome: item.nome,
				quantidade: quantidade,
				precoUnitario: Number(item.valor),
				precoTotal: (valorBase + valorOpcionais) * quantidade,
				opcionais: opcionaisSelecionados,
				observacao: obs,
			}

			// Salva no LocalStorage
			addToCart(itemCarrinho)

			// Redireciona o cliente para a tela do carrinho!
			window.location.hash = '#/cart'
		})

		// Força a primeira renderização do preço!
		atualizarTela()
	} catch (error) {
		root.innerHTML = `
			<div class="bg-top pedido"></div>
			<div id="app-title-header"></div>
			<div class="text-center mt-5 pt-5">
				<h1 style="padding:20px; color: #e74c3c;"><i class="fas fa-exclamation-circle"></i> Produto não encontrado</h1>
				<a href="#/" class="btn btn-yellow mt-3">Voltar ao Cardápio</a>
			</div>
		`
		mount('#app-title-header', TitleHeader({ title: 'Ops!' }))
	}
}
