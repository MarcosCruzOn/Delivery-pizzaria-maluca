import { Modal } from '../../components/Modal/modal'

export function renderCategoryModal() {
	return Modal({
		id: 'modalNovaCategoria',

		title: `<i class="fas fa-folder-plus"></i> Nova Categoria`,

		body: `
          <div class="mb-3">
            <label><b>Nome da categoria</b></label>
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
            <label><b>Ordem</b></label>

            <select id="novaCategoriaOrdem" class="form-select">
              <option value="0">0</option>
              <option value="1">1</option>
            </select>
          </div>
`,

		footer: `
              <button class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
              </button>

              <button class="btn btn-primary" id="btnSalvarCategoria">
              Salvar
              </button>
`,
	})
}
