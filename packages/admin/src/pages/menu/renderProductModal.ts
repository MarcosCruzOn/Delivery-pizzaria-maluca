import type { Category } from './types'

export function renderProductModal(categories: Category[]) {
	return `
	<div class="modal fade" id="modalNovoProduto">
	 <div class="modal-dialog">
	  <div class="modal-content modal-dados-pedido">

	   <div class="modal-top d-flex justify-content-between px-4 py-3">

		<h5 class="modal-title">Novo produto</h5>

		<button type="button" class="btn btn-white btn-sm" data-bs-dismiss="modal">
		 <i class="fas fa-times"></i> Fechar
		</button>

	   </div>

	   <div class="modal-body">

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

	   </div>

	   <div class="modal-footer">

		<button class="btn btn-yellow btn-sm" id="btnSalvarNovoProduto">
		 Salvar produto
		</button>

	   </div>

	  </div>
	 </div>
	</div>
	`
}
