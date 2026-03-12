import { deleteCategory } from '../../../../api/categories'

export async function handleDeleteCategory(button: HTMLElement) {
	const id = Number(button.dataset.id)

	if (!confirm('Deseja remover essa categoria?')) return

	try {
		await deleteCategory(id)

		alert('Categoria removida!')
		location.reload()
	} catch {
		alert('Erro ao remover categoria')
	}
}
