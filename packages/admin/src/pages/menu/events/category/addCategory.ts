export function handleAddCategory() {
	const modalElement = document.getElementById('modalNovaCategoria')

	if (!modalElement) return

	const modal =
		(window as any).bootstrap.Modal.getInstance(modalElement) ||
		new (window as any).bootstrap.Modal(modalElement)

	modal.show()
}
