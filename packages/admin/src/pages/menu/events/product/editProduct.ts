import { menuState } from '../../state/menuState'

export function handleEditProduct(button: HTMLElement) {
	const nomeInput =
		document.querySelector<HTMLInputElement>('#novoProdutoNome')

	const descricaoInput = document.querySelector<HTMLTextAreaElement>(
		'#novoProdutoDescricao'
	)

	const valorInput =
		document.querySelector<HTMLInputElement>('#novoProdutoValor')

	const preview = document.querySelector<HTMLImageElement>(
		'#previewNovoProduto'
	)

	if (nomeInput) nomeInput.value = button.dataset.name || ''
	if (descricaoInput) descricaoInput.value = button.dataset.description || ''
	if (valorInput) valorInput.value = button.dataset.price || ''

	menuState.selectedProductId = Number(button.dataset.id)
	menuState.currentImageUrl = button.dataset.image || null

	if (preview && menuState.currentImageUrl) {
		preview.src = menuState.currentImageUrl
		preview.style.display = 'block'
	}

	const modalElement = document.getElementById('modalNovoProduto')!

	const modal =
		window.bootstrap.Modal.getInstance(modalElement) ||
		new window.bootstrap.Modal(modalElement)

	modal.show()
}
