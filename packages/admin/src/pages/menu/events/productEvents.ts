import {
	createProduct,
	deleteProduct,
	updateProduct,
} from '../../../api/products'

export function setupProductEvents(root: HTMLElement, state: any) {
	root.addEventListener('click', async (event) => {
		const target = event.target as HTMLElement

		const addProductBtn = target.closest("[data-action='add-product']")
		const deleteProductBtn = target.closest('.delete-product')
		const editProductBtn = target.closest(
			'.edit-product'
		) as HTMLElement | null

		if (addProductBtn) {
			event.preventDefault()

			const categoryId = Number(
				addProductBtn.getAttribute('data-category-id')
			)

			state.selectedCategoryId = categoryId

			const modal = new (window as any).bootstrap.Modal(
				document.getElementById('modalNovoProduto')
			)

			modal.show()

			const select = root.querySelector<HTMLSelectElement>(
				'#novoProdutoCategoria'
			)

			if (select) {
				select.value = String(categoryId)
			}
		}

		if (deleteProductBtn) {
			event.preventDefault()

			const id = Number(deleteProductBtn.getAttribute('data-id'))

			const confirmDelete = confirm('Deseja remover esse produto?')

			if (!confirmDelete) return

			try {
				await deleteProduct(id)

				alert('Produto removido!')
				location.reload()
			} catch {
				alert('Erro ao remover produto')
			}
		}

		if (editProductBtn) {
			event.preventDefault()

			const modal = new (window as any).bootstrap.Modal(
				document.getElementById('modalNovoProduto')
			)

			const nomeInput =
				root.querySelector<HTMLInputElement>('#novoProdutoNome')
			const descricaoInput = root.querySelector<HTMLTextAreaElement>(
				'#novoProdutoDescricao'
			)
			const valorInput =
				root.querySelector<HTMLInputElement>('#novoProdutoValor')

			if (nomeInput) nomeInput.value = editProductBtn.dataset.name || ''
			if (descricaoInput)
				descricaoInput.value = editProductBtn.dataset.description || ''
			if (valorInput)
				valorInput.value = editProductBtn.dataset.price || ''

			state.selectedProductId = Number(editProductBtn.dataset.id)
			state.currentImageUrl = editProductBtn.dataset.image || null

			modal.show()
		}
	})
}
