import { Modal } from '../../components/Modal/modal'
import type { Category, Product, Opcional } from './types' // Assumindo que você tem esse arquivo types.ts
import { menuState } from './state/menuState' // Ajuste o caminho se precisar

// --- 1. RENDERIZAÇÃO DA LISTA ---
export function renderCategories(categories: Category[]) {
	if (!categories.length) {
		return `<div class="card mt-3 p-4 text-center"><p><b>Nenhuma categoria criada ainda</b></p></div>`
	}
	return categories.map((cat, idx) => renderCategory(cat, idx === 0)).join('')
}

function renderCategory(cat: Category, expanded: boolean) {
	const collapseId = `collapse-${cat.id}`
	const headingId = `heading-${cat.id}`

	return `
	<div class="card mt-3">
	 <div class="card-drag" id="${headingId}">
	  <div class="drag-icon"><i class="fas fa-ellipsis-v"></i><i class="fas fa-ellipsis-v"></i></div>
	  <div class="infos">
	   <a href="#" class="name mb-0" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${expanded}">
	    <span class="me-2"><i class="${cat.iconClass}"></i></span><b>${cat.title}</b>
	   </a>
	  </div>
	  <div class="actions">
	   <a href="#" class="icon-action"><i class="fas fa-pencil-alt"></i></a>
	   <a href="#" class="icon-action delete-category" data-id="${cat.id}"><i class="fas fa-trash-alt"></i></a>
	  </div>
	 </div>

	 <div id="${collapseId}" class="collapse ${expanded ? 'show' : ''}" data-bs-parent="#categoriasMenu">
	  <div class="card-body">
	   <p class="title-produtos mb-0"><b>Produtos</b></p>
	   <div class="lista-produtos">
	    ${cat.products.length ? cat.products.map(renderProduct).join('') : `<p class="text-muted mt-3">Nenhum produto nessa categoria</p>`}
	   </div>
	   <div class="card card-select mt-3 add-product-btn" data-category-id="${cat.id}">
	    <div class="infos-produto-opcional">
	     <p class="mb-0 color-primary"><i class="fas fa-plus-circle"></i> &nbsp; Adicionar novo produto</p>
	    </div>
	   </div>
	  </div>
	 </div>
	</div>
	`
}

function renderProduct(p: Product) {
	return `
	<div class="card mt-3 pl-0">
		<div class="d-flex">
			<div class="drag-icon-produto"><i class="fas fa-ellipsis-v"></i><i class="fas fa-ellipsis-v"></i></div>
			<div class="container-img-produto" style="background-image:url('${p.imageUrl}');background-size:cover;">
			
			</div>
			<div class="infos-produto">
				<p class="name"><b>${p.name}</b></p>
				<p class="description">${p.description}</p>
				<p class="price"><b>${p.priceText}</b></p>
			</div>
			<div class="actions">
				<a class="icon-action btnGerenciarOpcionais"><i class="fas fa-layer-group"></i></a>
				<a href="#" class="icon-action edit-product" data-id="${p.id}" data-name="${p.name}" data-description="${p.description}" data-price="${p.priceText.replace('R$ ', '')}" data-image="${p.imageUrl}">
					<i class="fas fa-pencil-alt"></i>
				</a>
				<a class="icon-action delete-product" data-id="${p.id}"><i class="fas fa-trash-alt"></i></a>
			</div>
		</div>
	</div>
	`
}

// --- 2. RENDERIZAÇÃO DOS MODAIS ---
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
				<option value="fas fa-ice-cream">🍦 Sorvetes</option>
				<option value="fas fa-birthday-cake">🎂 Sobremesas</option>
				<option value="fas fa-coffee">☕ Cafés</option>
				<option value="fas fa-leaf">🥗 Saladas</option>
				<option value="fas fa-drumstick-bite">🍗 Aves</option>
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
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button class="btn btn-primary" id="btnSalvarCategoria">Salvar</button>
		`,
	})
}

export function renderProductModal(categories: Category[]) {
	return Modal({
		id: 'modalNovoProduto',
		className: 'modal-dados-pedido',
		title: 'Novo produto',
		body: `
			<div class="form-group mb-3 mx-3">
				<label><b>Nome</b></label>
				<input type="text" class="form-control" id="novoProdutoNome"/>
			</div>
			<div class="form-group mb-3 mx-3">
				<label><b>Descrição</b></label>
				<textarea class="form-control" id="novoProdutoDescricao"></textarea>
			</div>
			<div class="form-group mb-3 mx-3">
				<label><b>Valor</b></label>
				<input type="number" step="0.01" class="form-control" id="novoProdutoValor"/>
			</div>
			<div class="form-group mb-3 mx-3">
				<label><b>Categoria</b></label>
				<select class="form-control" id="novoProdutoCategoria">
					${categories.map((cat) => `<option value="${cat.id}">${cat.title}</option>`).join('')}
				</select>
			</div>
			<div class="form-group mb-3 mx-3">
				<label><b>Imagem</b></label>
				<input type="file" class="form-control" id="novoProdutoImagem"/>
			</div>
			<img id="previewNovoProduto" class="imgPreviewProduto mx-3"/>
			<div class="form-group mb-3 mt-3">
				<label><b>Opcionais vinculados</b></label>
			</div>
			<div id="containerOpcionais"></div>
		`,
		footer: `<button class="btn btn-yellow btn-sm" id="btnSalvarNovoProduto">Salvar produto</button>`,
	})
}

export function renderOpcionaisNoModal() {
	const container = document.getElementById('containerOpcionais')
	if (!container) return
	// Agora mostramos 1 checkbox por GRUPO (ex: Bordas), não por item!
	container.innerHTML = menuState.opcionais
		.map(
			(opcional) => `
		<div class="mt-3 p-2 border rounded">
			<div class="form-check mb-1">
                <input class="form-check-input opcional-grupo-checkbox" type="checkbox" id="chkGrp${opcional.id}" data-opcional="${opcional.id}">
				<label class="form-check-label" for="chkGrp${opcional.id}">
					<b>${opcional.name}</b> <small class="text-muted">(Mín: ${opcional.min} | Máx: ${opcional.max})</small>
				</label>
			</div>
            <div class="pl-4" style="font-size: 0.85em; color: #666;">
				Itens inclusos: ${opcional.items.length > 0 ? opcional.items.map((i) => i.name).join(', ') : 'Nenhum item cadastrado'}
			</div>
		</div>
	`
		)
		.join('')
}

export function renderGerenciarOpcionaisModal() {
	return Modal({
		id: 'modalGerenciarOpcionais',
		title: '<i class="fas fa-layer-group"></i> Gerenciar Opcionais',
		body: `
		<div class="container-fluid">
			<div class="card card-select p-3 mb-4">
				<h6 class="mb-2">Novo grupo de opcional</h6>
				<input type="text" class="form-control mb-2" id="inputNomeGrupo" placeholder="Ex: Bordas, Adicionais..." />
				
				<div class="d-flex gap-2 mb-2">
					<input type="number" class="form-control" id="inputMinimo" placeholder="Min (ex: 0)" />
					<input type="number" class="form-control" id="inputMaximo" placeholder="Max (ex: 1)" />
				</div>
				
				<button class="btn btn-yellow btn-sm" id="btnSalvarGrupoOpcional">Salvar grupo</button>
			</div>

			<div class="card card-select p-3 mb-4">
				<h6 class="mb-2">Novo item para o grupo</h6>
				<select id="selectGrupoOpcional" class="form-control mb-2">
					</select>
				
				<input type="text" id="inputItemNome" class="form-control mb-2" placeholder="Nome (ex: Cheddar)" />
				<input type="number" step="0.01" id="inputItemValor" class="form-control mb-2" placeholder="Preço (ex: 5.00)" />
				
				<button class="btn btn-yellow btn-sm" id="btnSalvarItemOpcional">Criar item</button>
			</div>

			<div>
				<h6 class="mb-2">Grupos cadastrados</h6>
				<div id="listaOpcionaisGerenciar"></div>
			</div>
		</div>
		`,
	})
}
