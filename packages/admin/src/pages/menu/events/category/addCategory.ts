import { createCategory } from '../../../../api/categories'

export async function handleAddCategory() {
	const nome = prompt('Nome da nova categoria')

	if (!nome) return

	try {
		await createCategory({ nome, icone: 'fas fa-pizza-slice', ordem: 1 })

		alert('Categoria criada!')
		location.reload()
	} catch {
		alert('Erro ao criar categoria')
	}
}
