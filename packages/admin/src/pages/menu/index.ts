import { AdminLayout } from '../../components/AdminLayout/AdminLayout'
import {
	renderCategories,
	renderCategoryModal,
	renderProductModal,
	renderOpcionaisNoModal,
	renderGerenciarOpcionaisModal,
} from './menuUI'
import { menuState } from './state/menuState'

// Importando nossos Garçons da API
import {
	getCategories,
	createCategory,
	deleteCategory,
} from '../../api/categories'
import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductOpcionais,
} from '../../api/products'
import {
	getOpcionais,
	getOpcionalItens,
	createOpcional,
	createOpcionalItem,
	updateOpcional,
	deleteOpcional,
	updateOpcionalItem,
	deleteOpcionalItem, // 👈 ADICIONE ESTES AQUI!
} from '../../api/opcionais'
import { uploadProductImage } from '../../api/upload' // Ajuste o caminho se necessário

// --- 1. RENDERIZAÇÃO PRINCIPAL ---
export async function renderMenuAdmin(root: HTMLElement) {
	await loadData() // Busca tudo do banco e salva no menuState

	root.innerHTML = AdminLayout({
		title: 'Edição do Cardápio',
		iconClass: 'fas fa-book-open',
		active: 'menu',
		content: `
		<div class="container">
			<div class="container-group mb-5">
				<p class="title-categoria mb-0"><b>Categorias do Cardápio</b></p>
				
				<div class="accordion" id="categoriasMenu">
					${renderCategories(menuState.categories)}
				</div>

				<div class="card card-select mt-3" id="btnAddCategory">
					<div class="infos-produto-opcional">
						<p class="mb-0 color-primary"><i class="fas fa-plus-circle"></i> &nbsp; Adicionar nova categoria</p>
					</div>
				</div>
			</div>
		</div>
		${renderProductModal(menuState.categories)}
		${renderCategoryModal()}
		${renderGerenciarOpcionaisModal()} 
		`,
	})

	setupEvents(root)
}

// --- 2. BUSCA DE DADOS ---
async function loadData() {
	try {
		const categoriesData = await getCategories()
		const productsData = await getProducts()
		const opcionaisData = await getOpcionais()

		// Prepara os opcionais
		menuState.opcionais = opcionaisData.map((o: any) => ({
			id: o.idopcional,
			name: o.nome,
			required: o.tiposimples === 1,
			min: o.minimo, // 🚨 ADICIONE ISTO
			max: o.maximo, // 🚨 E ISTO
			items: [],
		}))

		for (const opcional of menuState.opcionais) {
			const itens = await getOpcionalItens(opcional.id)
			opcional.items = itens.map((item: any) => ({
				id: item.idopcionalitem,
				name: item.nome,
				price: Number(item.valor),
			}))
		}

		// Prepara as categorias
		menuState.categories = categoriesData.map((c: any) => ({
			id: c.idcategoria,
			iconClass: c.icone,
			title: c.nome,
			products: [],
		}))

		// Prepara os produtos e joga dentro das categorias
		productsData.forEach((p: any) => {
			const category = menuState.categories.find(
				(cat) => Number(cat.id) === p.idcategoria
			)
			if (!category) return

			category.products.push({
				id: p.idproduto,
				name: p.nome,
				description: p.descricao || '',
				priceText: `R$ ${Number(p.valor).toFixed(2)}`,
				imageUrl: p.imagem
					? p.imagem.startsWith('/uploads')
						? p.imagem
						: `/uploads/${p.imagem}`
					: '',
			})
		})
	} catch (error) {
		console.error(error)
		alert('Erro ao carregar cardápio')
	}
}

// --- 3. CONTROLE DA TELA (O FIM DOS BUGS) ---
function setupEvents(root: HTMLElement) {
	// UPLOAD DE IMAGEM IMEDIATO
	root.querySelector('#novoProdutoImagem')?.addEventListener(
		'change',
		async (e) => {
			const input = e.target as HTMLInputElement
			const file = input.files?.[0]
			if (!file) return

			const preview = root.querySelector(
				'#previewNovoProduto'
			) as HTMLImageElement
			preview.src = URL.createObjectURL(file)
			preview.style.display = 'block'

			try {
				const result = await uploadProductImage(file)
				menuState.uploadedImageUrl = result.filename || result.imageUrl
			} catch {
				alert('Erro ao enviar imagem ao servidor')
			}
		}
	)

	// EVENTOS DE CLIQUE GERAIS DA TELA
	root.addEventListener('click', async (e) => {
		const target = e.target as HTMLElement

		// ==========================================
		// MODAL DE PRODUTO: ADICIONAR (Limpando o Fantasma!)
		// ==========================================
		const btnAddProduct = target.closest('.add-product-btn') as HTMLElement
		if (btnAddProduct) {
			e.preventDefault()

			// 1. Limpa a memória
			menuState.selectedProductId = null
			menuState.currentImageUrl = null
			menuState.uploadedImageUrl = ''

			// 2. Limpa o formulário visualmente
			;(
				root.querySelector('#novoProdutoNome') as HTMLInputElement
			).value = ''
			;(
				root.querySelector(
					'#novoProdutoDescricao'
				) as HTMLTextAreaElement
			).value = ''
			;(
				root.querySelector('#novoProdutoValor') as HTMLInputElement
			).value = ''
			;(
				root.querySelector('#novoProdutoImagem') as HTMLInputElement
			).value = ''
			;(
				root.querySelector('#previewNovoProduto') as HTMLImageElement
			).style.display = 'none'

			// 3. Seleciona a categoria certa no dropdown
			const catId = btnAddProduct.dataset.categoryId
			if (catId)
				(
					root.querySelector(
						'#novoProdutoCategoria'
					) as HTMLSelectElement
				).value = catId

			// 4. Limpa e desenha os checkboxes de opcionais
			renderOpcionaisNoModal()

			abrirModal('modalNovoProduto')
		}

		// ==========================================
		// MODAL DE PRODUTO: EDITAR
		// ==========================================
		const btnEditProduct = target.closest('.edit-product') as HTMLElement
		if (btnEditProduct) {
			e.preventDefault()

			const productId = Number(btnEditProduct.dataset.id)
			menuState.selectedProductId = productId
			menuState.currentImageUrl = btnEditProduct.dataset.image || null
			menuState.uploadedImageUrl = '' // Limpa uploads pendentes

			// Preenche o formulário com os dados do botão
			;(
				root.querySelector('#novoProdutoNome') as HTMLInputElement
			).value = btnEditProduct.dataset.name || ''
			;(
				root.querySelector(
					'#novoProdutoDescricao'
				) as HTMLTextAreaElement
			).value = btnEditProduct.dataset.description || ''
			;(
				root.querySelector('#novoProdutoValor') as HTMLInputElement
			).value = btnEditProduct.dataset.price || ''
			;(
				root.querySelector('#novoProdutoImagem') as HTMLInputElement
			).value = '' // Input file sempre começa vazio

			const preview = root.querySelector(
				'#previewNovoProduto'
			) as HTMLImageElement
			if (menuState.currentImageUrl) {
				preview.src = menuState.currentImageUrl
				preview.style.display = 'block'
			}

			// Desenha os checkboxes e marca os que o produto já tem
			renderOpcionaisNoModal()
			try {
				const opcionaisVinculados = await getProductOpcionais(productId)
				const idsVinculados = opcionaisVinculados.map(
					(o: any) => o.idopcional
				)

				root.querySelectorAll('.opcional-grupo-checkbox').forEach(
					(checkbox: any) => {
						if (
							idsVinculados.includes(
								Number(checkbox.dataset.opcional)
							)
						) {
							checkbox.checked = true
						}
					}
				)
			} catch (err) {
				console.log('Erro ao buscar opcionais vinculados')
			}

			abrirModal('modalNovoProduto')
		}

		// ==========================================
		// SALVAR PRODUTO (Create ou Update)
		// ==========================================
		if (target.id === 'btnSalvarNovoProduto') {
			e.preventDefault()

			const nome = (
				root.querySelector('#novoProdutoNome') as HTMLInputElement
			).value.trim()
			const descricao = (
				root.querySelector(
					'#novoProdutoDescricao'
				) as HTMLTextAreaElement
			).value.trim()
			const valor = Number(
				(root.querySelector('#novoProdutoValor') as HTMLInputElement)
					.value
			)
			const idcategoria = Number(
				(
					root.querySelector(
						'#novoProdutoCategoria'
					) as HTMLSelectElement
				).value
			)

			// Pega os opcionais marcados
			const checkboxes = Array.from(
				root.querySelectorAll('.opcional-grupo-checkbox:checked')
			) as HTMLInputElement[]
			const opcionaisSelecionados = checkboxes.map((cb) =>
				Number(cb.dataset.opcional)
			)
			// const opcionaisSelecionados = [
			// 	...new Set(checkboxes.map((cb) => Number(cb.dataset.opcional))),
			// ]

			// Decide a imagem
			const imagemFinal =
				menuState.uploadedImageUrl || menuState.currentImageUrl

			// Validações Justas
			if (!nome || !descricao || !idcategoria)
				return alert('Preencha nome, descrição e categoria!')
			if (isNaN(valor) || valor <= 0)
				return alert('Informe um valor válido (ex: 45.90)')
			if (!menuState.selectedProductId && !imagemFinal)
				return alert('Selecione uma imagem para o novo produto!')

			try {
				const payload: any = {
					idcategoria,
					nome,
					descricao,
					valor,
					ordem: 1,
					opcionais: opcionaisSelecionados,
				}
				if (imagemFinal) payload.imagem = imagemFinal // Só manda imagem se tiver uma

				if (menuState.selectedProductId) {
					await updateProduct(menuState.selectedProductId, payload)
					alert('Produto atualizado com sucesso!')
				} else {
					await createProduct(payload)
					alert('Produto criado com sucesso!')
				}
				location.reload() // Recarrega para ver as mudanças
			} catch (err: any) {
				alert(err.message || 'Erro ao salvar o produto!')
			}
		}

		// ==========================================
		// MODAL DE GERENCIAR OPCIONAIS (Abrir, Criar Grupo, Criar Item)
		// ==========================================

		// 1. Abrir o Modal
		const btnAbrirOpcionais = target.closest(
			'.btnGerenciarOpcionais'
		) as HTMLElement
		if (btnAbrirOpcionais) {
			e.preventDefault()
			atualizarListasDeOpcionaisNoModal(root)
			abrirModal('modalGerenciarOpcionais')
		}

		// 2. Salvar NOVO GRUPO
		if (target.id === 'btnSalvarGrupoOpcional') {
			e.preventDefault()
			const nome = (
				root.querySelector('#inputNomeGrupo') as HTMLInputElement
			).value.trim()
			const minimo = Math.max(
				0,
				Number(
					(root.querySelector('#inputMinimo') as HTMLInputElement)
						.value
				) || 0
			)
			const maximo = Math.max(
				0,
				Number(
					(root.querySelector('#inputMaximo') as HTMLInputElement)
						.value
				) || 0
			)

			if (!nome) return alert('Digite o nome do grupo!')

			try {
				await createOpcional({ nome, minimo, maximo, tiposimples: 0 })
				alert('Grupo de opcionais criado com sucesso!')
				location.reload() // Recarrega para buscar do banco
			} catch (err: any) {
				alert(err.message || 'Erro ao criar grupo')
			}
		}

		// 3. Salvar NOVO ITEM DENTRO DO GRUPO
		if (target.id === 'btnSalvarItemOpcional') {
			e.preventDefault()
			const idopcional = Number(
				(
					root.querySelector(
						'#selectGrupoOpcional'
					) as HTMLSelectElement
				).value
			)
			const nome = (
				root.querySelector('#inputItemNome') as HTMLInputElement
			).value.trim()
			const valor = Math.max(
				0,
				Number(
					(root.querySelector('#inputItemValor') as HTMLInputElement)
						.value
				) || 0
			)

			if (!idopcional) return alert('Selecione um grupo primeiro!')
			if (!nome) return alert('Digite o nome do item!')

			try {
				await createOpcionalItem({ idopcional, nome, valor })
				alert('Item adicionado ao grupo!')
				location.reload()
			} catch (err: any) {
				alert(err.message || 'Erro ao criar item')
			}
		}

		// ==========================================
		// DELETAR PRODUTO
		// ==========================================
		const btnDeleteProduct = target.closest(
			'.delete-product'
		) as HTMLElement
		if (btnDeleteProduct) {
			e.preventDefault()
			// Mudando a frase aqui:
			if (
				confirm(
					'Você tem certeza que deseja excluir este produto do cardápio?'
				)
			) {
				await deleteProduct(Number(btnDeleteProduct.dataset.id))
				location.reload()
			}
		}

		// ==========================================
		// CATEGORIAS (Adicionar e Deletar)
		// ==========================================
		if (target.closest('#btnAddCategory')) {
			e.preventDefault()
			;(
				root.querySelector('#novaCategoriaNome') as HTMLInputElement
			).value = '' // Limpa o fantasma da categoria também!
			abrirModal('modalNovaCategoria')
		}

		if (target.id === 'btnSalvarCategoria') {
			e.preventDefault()
			const nome = (
				root.querySelector('#novaCategoriaNome') as HTMLInputElement
			).value.trim()
			const icone = (
				root.querySelector('#novaCategoriaIcone') as HTMLSelectElement
			).value
			const ordem = Number(
				(root.querySelector('#novaCategoriaOrdem') as HTMLSelectElement)
					.value
			)

			if (!nome) return alert('Informe o nome da categoria!')
			await createCategory({ nome, icone, ordem })
			location.reload()
		}

		const btnDeleteCategory = target.closest(
			'.delete-category'
		) as HTMLElement
		if (btnDeleteCategory) {
			e.preventDefault()
			// SUA FRASE CUSTOMIZADA AQUI:
			if (
				confirm(
					'Apagando a categoria voce estará excluindo todos os produtos dentro dela. Tem certeza?'
				)
			) {
				await deleteCategory(Number(btnDeleteCategory.dataset.id))
				location.reload()
			}
		}

		// ==========================================
		// APAGAR E EDITAR OPCIONAIS E ITENS
		// ==========================================

		// Excluir Grupo
		const btnDeleteGrupo = target.closest(
			'.btn-delete-grupo'
		) as HTMLElement
		if (btnDeleteGrupo) {
			e.preventDefault()
			if (
				confirm(
					'Tem certeza? Isso apagará o grupo e TODOS os itens dentro dele!'
				)
			) {
				try {
					await deleteOpcional(Number(btnDeleteGrupo.dataset.id))
					location.reload()
				} catch (err: any) {
					alert(err.message)
				}
			}
		}

		// Excluir Item
		const btnDeleteItem = target.closest('.btn-delete-item') as HTMLElement
		if (btnDeleteItem) {
			e.preventDefault()
			if (confirm('Deseja excluir este item?')) {
				try {
					await deleteOpcionalItem(Number(btnDeleteItem.dataset.id))
					location.reload()
				} catch (err: any) {
					alert(err.message)
				}
			}
		}

		// Editar Grupo (Usando Prompt para ser rápido e prático)
		const btnEditGrupo = target.closest('.btn-edit-grupo') as HTMLElement
		if (btnEditGrupo) {
			e.preventDefault()
			const id = Number(btnEditGrupo.dataset.id)

			const novoNome = prompt(
				'Novo nome do grupo:',
				btnEditGrupo.dataset.nome
			)
			if (novoNome === null || novoNome.trim() === '') return

			const novoMin = prompt(
				'Quantidade mínima (ex: 0):',
				btnEditGrupo.dataset.min
			)
			const novoMax = prompt(
				'Quantidade máxima (ex: 1):',
				btnEditGrupo.dataset.max
			)

			try {
				await updateOpcional(id, {
					nome: novoNome,
					minimo: Number(novoMin) || 0,
					maximo: Number(novoMax) || 0,
				})
				location.reload()
			} catch (err: any) {
				alert(err.message)
			}
		}

		// Editar Item
		const btnEditItem = target.closest('.btn-edit-item') as HTMLElement
		if (btnEditItem) {
			e.preventDefault()
			const id = Number(btnEditItem.dataset.id)

			const novoNome = prompt(
				'Novo nome do item:',
				btnEditItem.dataset.nome
			)
			if (novoNome === null || novoNome.trim() === '') return

			const novoValor = prompt(
				'Novo preço (ex: 5.50):',
				btnEditItem.dataset.valor
			)

			try {
				await updateOpcionalItem(id, {
					nome: novoNome,
					valor: Number(novoValor) || 0,
				})
				location.reload()
			} catch (err: any) {
				alert(err.message)
			}
		}
	})
}

function abrirModal(id: string) {
	const modalElement = document.getElementById(id)
	if (modalElement) {
		const modal =
			(window as any).bootstrap.Modal.getInstance(modalElement) ||
			new (window as any).bootstrap.Modal(modalElement)
		modal.show()
	}
}

// Essa função lê os dados do banco (salvos no menuState) e desenha a lista de opcionais bonita na tela
function atualizarListasDeOpcionaisNoModal(root: HTMLElement) {
	const select = root.querySelector(
		'#selectGrupoOpcional'
	) as HTMLSelectElement
	const lista = root.querySelector('#listaOpcionaisGerenciar') as HTMLElement

	// Preenche o campo de "Selecionar Grupo" para o usuário adicionar itens nele
	if (select) {
		select.innerHTML = menuState.opcionais
			.map((o) => `<option value="${o.id}">${o.name}</option>`)
			.join('')
	}

	// Preenche a listagem bonita mostrando o Grupo e os Itens embaixo
	// Substitua o if (lista) { ... } por este código atualizado:
	if (lista) {
		lista.innerHTML = menuState.opcionais
			.map(
				(o) => `
			<div class="card card-select mb-2 p-2">
				<div class="d-flex justify-content-between align-items-start">
					<div>
						<b>${o.name}</b><br/>
						<small>Mínimo: ${o.min} | Máximo: ${o.max}</small>
					</div>
					<div>
						<button class="btn btn-sm btn-white text-primary btn-edit-grupo" data-id="${o.id}" data-nome="${o.name}" data-min="${o.min}" data-max="${o.max}" title="Editar Grupo"><i class="fas fa-pencil-alt"></i></button>
						<button class="btn btn-sm btn-white text-danger btn-delete-grupo" data-id="${o.id}" title="Excluir Grupo"><i class="fas fa-trash-alt"></i></button>
					</div>
				</div>
				<div class="mt-2 pl-3" style="border-left: 2px solid #ffbf00;">
					${o.items
						.map(
							(i) => `
						<div class="d-flex justify-content-between align-items-center mb-1">
							<small class="text-muted">- ${i.name} (+ R$ ${i.price.toFixed(2)})</small>
							<div>
								<button class="btn btn-sm btn-link text-primary p-0 mx-1 btn-edit-item" data-id="${i.id}" data-nome="${i.name}" data-valor="${i.price}" title="Editar Item"><i class="fas fa-pencil-alt"></i></button>
								<button class="btn btn-sm btn-link text-danger p-0 mx-1 btn-delete-item" data-id="${i.id}" title="Excluir Item"><i class="fas fa-trash-alt"></i></button>
							</div>
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
}
