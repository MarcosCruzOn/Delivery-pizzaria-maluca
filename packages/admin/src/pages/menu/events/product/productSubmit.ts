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

		// 🔥 PEGAR O MODAL CORRETO
		const modal = document.getElementById('modalNovoProduto')

		// 🔥 CAPTURA CORRETA (ESCOPADA NO MODAL)
		const opcionaisSelecionados = Array.from(
			modal!.querySelectorAll('.opcional-checkbox')
		)
			.filter((el: any) => el.checked)
			.map((el: any) => Number(el.dataset.id))

		console.log('OPCIONAIS SELECIONADOS:', opcionaisSelecionados)

		// 🔥 VALIDAÇÃO MIN/MAX
		for (const opcional of menuState.opcionais) {
			const selecionados = opcionaisSelecionados.filter(
				(id) => id === opcional.id
			)

			if (selecionados.length < opcional.min) {
				alert(
					`Escolha pelo menos ${opcional.min} opção em "${opcional.name}"`
				)
				return
			}

			if (opcional.max > 0 && selecionados.length > opcional.max) {
				alert(`Máximo de ${opcional.max} opções em "${opcional.name}"`)
				return
			}
		}

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
					opcionais: opcionaisSelecionados, // ✅ correto
				})

				alert('Produto atualizado!')
			} else {
				await createProduct({
					idcategoria,
					nome,
					descricao,
					valor,
					imagem: menuState.uploadedImageUrl || null,
					opcionais: opcionaisSelecionados, // ✅ correto
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

		if (modal) {
			const modalInstance =
				(window as any).bootstrap.Modal.getInstance(modal) ||
				new (window as any).bootstrap.Modal(modal)

			modalInstance.hide()
		}
	})
}
