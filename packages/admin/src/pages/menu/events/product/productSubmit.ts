import { menuState } from '../../state/menuState'
import { renderMenu } from '../../renderMenu'
import { createProduct, updateProduct } from '../../../../api/products'

export function setupProductSubmit(root: HTMLElement) {
	const btn = root.querySelector<HTMLButtonElement>('#btnSalvarNovoProduto')

	btn?.addEventListener('click', async () => {
		const nome =
			root.querySelector<HTMLInputElement>('#novoProdutoNome')?.value ||
			''

		const descricao =
			root.querySelector<HTMLTextAreaElement>('#novoProdutoDescricao')
				?.value || ''

		const valor = Number(
			root.querySelector<HTMLInputElement>('#novoProdutoValor')?.value ||
				0
		)

		const idcategoria = Number(
			root.querySelector<HTMLSelectElement>('#novoProdutoCategoria')
				?.value || 0
		)

		const image = menuState.uploadedImageUrl || menuState.currentImageUrl

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
				})

				const newProduct = {
					id: Date.now(),
					name: nome,
					description: descricao,
					priceText: `R$ ${valor.toFixed(2)}`,
					imageUrl: menuState.uploadedImageUrl || '',
				}

				const category = menuState.categories.find(
					(c) => Number(c.id) === idcategoria
				)

				if (category) {
					category.products.push(newProduct)
				}

				renderMenu(root, menuState.categories)
			}

			menuState.uploadedImageUrl = ''
			menuState.selectedProductId = null
			menuState.currentImageUrl = null

			/* limpar campos do modal */

			const nomeInput =
				root.querySelector<HTMLInputElement>('#novoProdutoNome')
			const descricaoInput = root.querySelector<HTMLTextAreaElement>(
				'#novoProdutoDescricao'
			)
			const valorInput =
				root.querySelector<HTMLInputElement>('#novoProdutoValor')
			const imagemInput =
				root.querySelector<HTMLInputElement>('#novoProdutoImagem')
			const preview = root.querySelector<HTMLImageElement>(
				'#previewNovoProduto'
			)

			if (nomeInput) nomeInput.value = ''
			if (descricaoInput) descricaoInput.value = ''
			if (valorInput) valorInput.value = ''
			if (imagemInput) imagemInput.value = ''

			if (preview) {
				preview.src = ''
				preview.style.display = 'none'
			}

			/* fechar modal */

			const modalElement = document.getElementById('modalNovoProduto')

			if (modalElement) {
				const modal =
					(window as any).bootstrap.Modal.getInstance(modalElement) ||
					new (window as any).bootstrap.Modal(modalElement)

				modal.hide()
			}
		} catch {
			alert('Erro ao salvar produto')
		}
	})
}
