import { uploadProductImage } from '../../../api/upload'

export function setupUploadEvents(root: HTMLElement, state: any) {
	root.addEventListener('change', async (event) => {
		const target = event.target as HTMLInputElement

		if (target.id !== 'novoProdutoImagem') return

		const file = target.files?.[0]
		if (!file) return

		const preview = root.querySelector<HTMLImageElement>(
			'#previewNovoProduto'
		)

		if (!preview) return

		preview.src = URL.createObjectURL(file)
		preview.style.display = 'block'

		try {
			const result = await uploadProductImage(file)

			state.uploadedImageUrl = result.imageUrl
		} catch {
			alert('Erro ao enviar imagem')
		}
	})
}
