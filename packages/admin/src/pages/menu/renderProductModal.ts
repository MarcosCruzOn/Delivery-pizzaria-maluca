import { Modal } from '../../components/Modal/modal'
import type { Category } from './types'
import { menuState } from './state/menuState'

export function renderProductModal(categories: Category[]) {
	function renderOpcionais() {
		return menuState.opcionais
			.map(
				(opcional) => `
			<div class="mt-3">
				<p class="mb-1"><b>${opcional.name}</b></p>
				<small>Min: ${opcional.min} | Max: ${opcional.max}</small>

				<div class="mt-2">
					${opcional.items
						.map(
							(item) => `
							<div class="form-check">
								<input 
									class="form-check-input opcional-checkbox" 
									type="checkbox" 
									data-id="${opcional.id}"
								>
								<label class="form-check-label">
									${item.name} (+R$ ${item.price.toFixed(2)})
								</label>
							</div>
						`
						)
						.join('')}
				</div>
			</div>
		`
			)
			.join('')
	}
	return Modal({
		id: 'modalNovoProduto',

		className: 'modal-dados-pedido',

		title: 'Novo produto',

		body: `
		<div class="form-group mb-3">
			<label><b>Nome</b></label>
			<input type="text" class="form-control" id="novoProdutoNome"/>
		</div>

		<div class="form-group mb-3">
			<label><b>Descrição</b></label>
			<textarea class="form-control" id="novoProdutoDescricao"></textarea>
		</div>

		<div class="form-group mb-3">
		<label><b>Valor</b></label>
		<input type="number" step="0.01" class="form-control" id="novoProdutoValor"/>
		</div>

		<div class="form-group mb-3">
			<label><b>Categoria</b></label>

			<select class="form-control" id="novoProdutoCategoria">
			${categories
				.map((cat) => `<option value="${cat.id}">${cat.title}</option>`)
				.join('')}
			</select>
		</div>

		<div class="form-group mb-3">
			<label><b>Imagem</b></label>
			<input type="file" class="form-control" id="novoProdutoImagem"/>
		</div>

		<img
			id="previewNovoProduto"
			style="display:none;width:200px;border-radius:10px"
		/>
		<div class="form-group mb-3">
			<label><b>Opcionais</b></label>
			${renderOpcionais()}
		</div>
`,

		footer: `
			<button 
				class="btn btn-yellow btn-sm" 
				id="btnSalvarNovoProduto">
				Salvar produto
			</button>
`,
	})
}
