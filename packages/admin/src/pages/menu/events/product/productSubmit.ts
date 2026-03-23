import { menuState } from '../../state/menuState'
import { createProduct, updateProduct } from '../../../../api/products'
import { renderOpcionaisModal } from '../../renderOpcionaisModal'

export function setupProductSubmit(root: HTMLElement) {
	const btn = root.querySelector<HTMLButtonElement>('#btnSalvarNovoProduto')

	const nomeInput = root.querySelector<HTMLInputElement>('#novoProdutoNome')
	const descricaoInput = root.querySelector<HTMLTextAreaElement>(
		'#novoProdutoDescricao'
	)
	const valorInput = root.querySelector<HTMLInputElement>('#novoProdutoValor')
	const categoriaSelect = root.querySelector<HTMLSelectElement>(
		'#novoProdutoCategoria'
	)
	const imagemInput =
		root.querySelector<HTMLInputElement>('#novoProdutoImagem')
	const preview = root.querySelector<HTMLImageElement>('#previewNovoProduto')

	btn?.addEventListener('click', async () => {
		const nome = nomeInput?.value || ''
		const descricao = descricaoInput?.value || ''
		const valor = Number(valorInput?.value || 0)
		const idcategoria = Number(categoriaSelect?.value || 0)

		const image = menuState.uploadedImageUrl || menuState.currentImageUrl

		const modal = document.querySelector('#modalNovoProduto.show')

		// 🔥 pegar todos itens marcados
		const itensSelecionados = Array.from(
			modal!.querySelectorAll('.opcional-item-checkbox')
		).filter((el: any) => el.checked)

		// 🔥 extrair grupos únicos
		const opcionaisSelecionados = [
			...new Set(
				itensSelecionados.map((el: any) => Number(el.dataset.opcional))
			),
		]

		console.log('ITENS:', itensSelecionados)
		console.log('GRUPOS:', opcionaisSelecionados)

		if (!nome || !valor || !idcategoria || !descricao || !image) {
			alert('Preencha todos os campos e selecione uma imagem')
			return
		}

		try {
			if (menuState.selectedProductId) {
				await updateProduct(menuState.selectedProductId, {
					idcategoria,
					nome,
					descricao,
					valor,
					imagem: image,
					opcionais: opcionaisSelecionados,
				})

				alert('Produto atualizado!')
			} else {
				await createProduct({
					idcategoria,
					nome,
					descricao,
					valor,
					imagem: menuState.uploadedImageUrl || null,
					opcionais: opcionaisSelecionados,
				})

				alert('Produto criado!')
			}

			location.reload()
		} catch (error) {
			console.error(error)
			alert('Erro ao salvar produto')
		}

		// reset
		menuState.uploadedImageUrl = ''
		menuState.selectedProductId = null
		menuState.currentImageUrl = null

		if (nomeInput) nomeInput.value = ''
		if (descricaoInput) descricaoInput.value = ''
		if (valorInput) valorInput.value = ''
		if (imagemInput) imagemInput.value = ''

		if (preview) {
			preview.src = ''
			preview.style.display = 'none'
		}

		const modalElement = document.getElementById('modalNovoProduto')

		if (modalElement) {
			const modal =
				(window as any).bootstrap.Modal.getInstance(modalElement) ||
				new (window as any).bootstrap.Modal(modalElement)

			modal.hide()
		}
	})

	const btnopt = document.getElementById('btnGerenciarOpcionais')

	btnopt?.addEventListener('click', () => {
		document.body.insertAdjacentHTML('beforeend', renderOpcionaisModal())

		const modalElement = document.getElementById('modalOpcionais')

		const modal =
			(window as any).bootstrap.Modal.getInstance(modalElement) ||
			new (window as any).bootstrap.Modal(modalElement)

		modal.show()
	})
}
