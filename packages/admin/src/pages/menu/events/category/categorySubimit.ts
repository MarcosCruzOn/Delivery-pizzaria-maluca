import { createCategory } from '../../../../api/categories'

export function setupCategorySubmit(root: HTMLElement) {
	const btn = root.querySelector<HTMLButtonElement>('#btnSalvarCategoria')

	btn?.addEventListener('click', async () => {
		const nome =
			root.querySelector<HTMLInputElement>('#novaCategoriaNome')?.value ||
			''

		const icone =
			root.querySelector<HTMLSelectElement>('#novaCategoriaIcone')
				?.value || ''

		const ordem = Number(
			root.querySelector<HTMLSelectElement>('#novaCategoriaOrdem')
				?.value || 0
		)

		if (!nome) {
			alert('Informe o nome da categoria')
			return
		}

		try {
			await createCategory({
				nome,
				icone,
				ordem,
			})

			alert('Categoria criada!')
			location.reload()
		} catch {
			alert('Erro ao criar categoria')
		}
	})
}
