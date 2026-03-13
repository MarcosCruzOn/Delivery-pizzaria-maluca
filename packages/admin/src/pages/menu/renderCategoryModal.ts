export function renderCategoryModal() {
	return `
<div class="modal fade" id="modalNovaCategoria">
	 <div class="modal-dialog">
	  <div class="modal-content modal-dados-pedido">

	   <div class="modal-top d-flex justify-content-between px-4 py-3">

		<h5 class="modal-title">Nova Categoria</h5>

		<button type="button" class="btn btn-white btn-sm" data-bs-dismiss="modal">
		 <i class="fas fa-times"></i> Fechar
		</button>

	   </div>

   <div class="modal-body">

    <div class="mb-3">
     <label class="form-label"><b>Nome da categoria</b></label>
     <input id="novaCategoriaNome" class="form-control"/>
    </div>

    <div class="mb-3">
     <label class="form-label"><b>Ícone</b></label>

     <select id="novaCategoriaIcone" class="form-select">

      <option value="fas fa-pizza-slice">🍕 Pizza</option>
      <option value="fas fa-hamburger">🍔 Burger</option>
      <option value="fas fa-glass-martini-alt">🥤 Bebidas</option>
      <option value="fas fa-drumstick-bite">🍗 Frango</option>
      <option value="fas fa-ice-cream">🍨 Sobremesa</option>
      <option value="fas fa-coffee">☕ Café</option>

     </select>
    </div>

    <div class="mb-3">
     <label class="form-label"><b>Ordem</b></label>

     <select id="novaCategoriaOrdem" class="form-select">
        <option value="0">0</option>
        <option value="1">1</option>
     </select>

    </div>

   </div>

   <div class="modal-footer">
    <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
    <button class="btn btn-primary" id="btnSalvarCategoria">
      Salvar Categoria
    </button>
   </div>

  </div>
 </div>
</div>
`
}
