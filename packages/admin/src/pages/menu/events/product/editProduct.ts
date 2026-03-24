import { menuState } from '../../state/menuState'
import { getProductOpcionais } from '../../../../api/products'
import { renderOpcionaisNoModal } from '../../renderProductModal'

export async function handleEditProduct(button: HTMLElement) {
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

	const productId = Number(button.dataset.id)

	if (nomeInput) nomeInput.value = button.dataset.name || ''
	if (descricaoInput) descricaoInput.value = button.dataset.description || ''
	if (valorInput) valorInput.value = button.dataset.price || ''

	menuState.selectedProductId = productId
	menuState.currentImageUrl = button.dataset.image || null

	if (preview && menuState.currentImageUrl) {
		preview.src = menuState.currentImageUrl
		preview.style.display = 'block'
	}

	// 🔥 BUSCAR OPCIONAIS
	const opcionais = await getProductOpcionais(productId)

	const ids = opcionais.map((o: any) => o.idopcional)

	// 🔥 MARCAR CHECKBOXES
	setTimeout(() => {
		document.querySelectorAll('.opcional-checkbox').forEach((el: any) => {
			const id = Number(el.dataset.id)
			el.checked = ids.includes(id)
		})
	}, 100)

	const modalElement = document.getElementById('modalNovoProduto')!

	const modal =
		(window as any).bootstrap.Modal.getInstance(modalElement) ||
		new (window as any).bootstrap.Modal(modalElement)

	modal.show()
	renderOpcionaisNoModal()
}
