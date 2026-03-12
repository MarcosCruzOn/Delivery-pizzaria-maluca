import { menuState } from '../../state/menuState'

export function handleAddProduct(button: HTMLElement) {
	const categoryId = Number(button.dataset.categoryId)

	menuState.selectedCategoryId = categoryId

	const select = document.querySelector<HTMLSelectElement>(
		'#novoProdutoCategoria'
	)

	if (select) select.value = String(categoryId)

	const modalElement = document.getElementById('modalNovoProduto')!

	const modal =
		window.bootstrap.Modal.getInstance(modalElement) ||
		new window.bootstrap.Modal(modalElement)

	modal.show()
}
