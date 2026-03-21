import { menuState } from '../../state/menuState'
import { createProduct, updateProduct } from '../../../../api/products'

export function setupProductSubmit(root: HTMLElement) {
	const btn = root.querySelector<HTMLButtonElement>('#btnSalvarNovoProduto')

	const nomeInput = root.querySelector<HTMLInputElement>('#novoProdutoNome')
	const descricaoInput = root.querySelector<HTMLTextAreaElement>(
		'#novoProdutoDescricao'
	)
	const valorInput = root.querySelector<HTMLInputElement>('#novoProdutoValor')
	const categoriaSelect = root.querySelector<HTMLSelectElement>(
		'#novoProdutoCategoria'
	)
	const imagemInput =
		root.querySelector<HTMLInputElement>('#novoProdutoImagem')
	const preview = root.querySelector<HTMLImageElement>('#previewNovoProduto')

	btn?.addEventListener('click', async () => {
		const nome = nomeInput?.value || ''
		const descricao = descricaoInput?.value || ''
		const valor = Number(valorInput?.value || 0)
		const idcategoria = Number(categoriaSelect?.value || 0)

		const image = menuState.uploadedImageUrl || menuState.currentImageUrl

		// 👇 CAPTURA DINÂMICA (CORRETA)
		const opcionaisSelecionados = Array.from(
			document.querySelectorAll('.opcional-checkbox:checked')
		).map((el: any) => Number(el.dataset.id))

		console.log('OPCIONAIS SELECIONADOS:', opcionaisSelecionados)

		if (!nome || !valor || !idcategoria || !descricao || !image) {
			alert('Preencha todos os campos e selecione uma imagem')
			return
		}

		try {
			if (menuState.selectedProductId) {
				await updateProduct(menuState.selectedProductId, {
					idcategoria,
					nome,
					descricao,
					valor,
					imagem: image,
				})

				alert('Produto atualizado!')
			} else {
				await createProduct({
					idcategoria,
					nome,
					descricao,
					valor,
					imagem: menuState.uploadedImageUrl || null,
					opcionais: opcionaisSelecionados, // 👈 AGORA FUNCIONA
				})

				alert('Produto criado!')
			}

			location.reload()
		} catch (error) {
			console.error(error)
			alert('Erro ao salvar produto')
		}

		// reset
		menuState.uploadedImageUrl = ''
		menuState.selectedProductId = null
		menuState.currentImageUrl = null

		if (nomeInput) nomeInput.value = ''
		if (descricaoInput) descricaoInput.value = ''
		if (valorInput) valorInput.value = ''
		if (imagemInput) imagemInput.value = ''

		if (preview) {
			preview.src = ''
			preview.style.display = 'none'
		}

		const modalElement = document.getElementById('modalNovoProduto')

		if (modalElement) {
			const modal =
				(window as any).bootstrap.Modal.getInstance(modalElement) ||
				new (window as any).bootstrap.Modal(modalElement)

			modal.hide()
		}
	})

	// document.addEventListener('change', (e: any) => {
	// 	if (e.target.classList.contains('opcional-checkbox')) {
	// 		console.log(
	// 			'CHECKBOX CLICADO:',
	// 			e.target.dataset.id,
	// 			e.target.checked
	// 		)
	// 	}
	// })
}
