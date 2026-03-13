import { Modal } from '../../components/Modal/modal'
import type { Category } from './types'

export function renderProductModal(categories: Category[]) {
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
`,

		footer: `
<button class="btn btn-yellow btn-sm" id="btnSalvarNovoProduto">
 Salvar produto
</button>
`,
	})
}
