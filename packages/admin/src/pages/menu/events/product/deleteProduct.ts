import { deleteProduct } from '../../../../api/products'

export async function handleDeleteProduct(button: HTMLElement) {
	const id = Number(button.dataset.id)

	if (!confirm('Deseja remover esse produto?')) return

	try {
		await deleteProduct(id)

		alert('Produto removido!')
		location.reload()
	} catch {
		alert('Erro ao remover produto')
	}
}
