import { mount } from '@delivery/shared/dom'
;('../utils/dom')
import { TitleHeader } from '../components/TitleHeader/TitleHeader'
import { getProductDetails } from '../api/products' // Importando o garçom novo!

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
		// 1. Busca os dados reais do banco
		const item = await getProductDetails(id)

		// 2. Trata o valor e a imagem (igual fizemos na Home!)
		const valorFormatado = Number(item.valor).toFixed(2).replace('.', ',')
		const imagemUrl = item.imagem ? `http://localhost:3333${item.imagem}` : ''

		// 3. Monta a tela com os dados REAIS
		root.innerHTML = `
			<div class="bg-top pedido"></div>
			<div id="app-title-header"></div>
			
			<section class="width-fix opcionais mb-4 mt-4 pb-5">
				<img class="img-item" src="${imagemUrl}" alt="${item.nome}" style="object-fit: cover;">

				<div class="px-3 mb-4">
					<h3 class="fw-bold text-dark">${item.nome}</h3>
					<p class="text-muted" style="font-size: 14px;">${item.descricao}</p>
					<h4 class="fw-bold text-warning">R$ ${valorFormatado}</h4>
				</div>

				<div id="container-opcionais">
					<div class="text-center p-4" style="background: #f8f9fa; border-radius: 15px;">
						<p class="text-muted mb-0"><i class="fas fa-magic"></i> Área dos opcionais em construção...</p>
					</div>
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
					<span id="preco-total-btn">R$ ${valorFormatado}</span>
				</a>
			</section>
		`
		mount('#app-title-header', TitleHeader({ title: 'Detalhes do produto' }))

		// 4. Lógica Básica de Quantidade (Matemática Pura!)
		let quantidade = 1
		const precoBase = Number(item.valor)
		const labelQtd = root.querySelector('#qtd-item') as HTMLElement
		const labelPrecoTotal = root.querySelector('#preco-total-btn') as HTMLElement

		const atualizarTela = () => {
			labelQtd.textContent = quantidade.toString()
			const totalCalculado = (precoBase * quantidade).toFixed(2).replace('.', ',')
			labelPrecoTotal.textContent = `R$ ${totalCalculado}`
		}

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
