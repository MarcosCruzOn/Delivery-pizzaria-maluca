import { menuState } from '../state/menuState'
import { createProduct, updateProduct } from '../../../api/products'
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

		if (!nome || !valor || !idcategoria) {
			alert('Preencha os campos obrigatórios')
			return
		}

		try {
			if (menuState.selectedProductId) {
				await updateProduct(menuState.selectedProductId, {
					idcategoria,
					nome,
					descricao,
					valor,
					imagem:
						menuState.uploadedImageUrl || menuState.currentImageUrl,
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

				alert('Produto criado!')
			}

			menuState.uploadedImageUrl = ''
			menuState.selectedProductId = null
			menuState.currentImageUrl = null

			location.reload()
		} catch {
			alert('Erro ao salvar produto')
		}
	})
}
