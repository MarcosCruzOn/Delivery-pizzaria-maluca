import { createCategory, deleteCategory } from '../../../api/categories'

export function setupCategoryEvents(
	root: HTMLElement,
	categoriesLength: number
) {
	root.addEventListener('click', async (event) => {
		const target = event.target as HTMLElement

		const addCategoryBtn = target.closest('#btnAddCategory')
		const deleteCategoryBtn = target.closest('.delete-category')

		if (addCategoryBtn) {
			const nome = prompt('Nome da categoria')
			if (!nome) return

			const icone =
				prompt('Classe do ícone (ex: fas fa-pizza-slice)') ||
				'fas fa-utensils'

			try {
				await createCategory({
					nome,
					icone,
					ordem: categoriesLength + 1,
				})

				alert('Categoria criada!')
				location.reload()
			} catch {
				alert('Erro ao criar categoria')
			}
		}

		if (deleteCategoryBtn) {
			event.preventDefault()

			const id = Number(deleteCategoryBtn.getAttribute('data-id'))

			const confirmDelete = confirm('Deseja remover essa categoria?')

			if (!confirmDelete) return

			try {
				await deleteCategory(id)

				alert('Categoria removida!')
				location.reload()
			} catch {
				alert('Erro ao remover categoria')
			}
		}
	})
}
