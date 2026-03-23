import { getOpcionais, createOpcional } from '../../api/opicionais'

export async function renderOpcionaisPage(root: HTMLElement) {
	const opcionais = await getOpcionais()

	root.innerHTML = `
	<div class="container mt-4">
		<h3>Opcionais</h3>

		<div class="mb-3">
			<button class="btn btn-yellow btn-sm" id="btnNovoOpcional">
				Novo opcional
			</button>
		</div>

		<div id="listaOpcionais">
			${opcionais
				.map(
					(o: any) => `
					<div class="card card-select mb-2 p-3">
						<b>${o.nome}</b>
						<small>Min: ${o.minimo} | Max: ${o.maximo}</small>
					</div>
				`
				)
				.join('')}
		</div>
	</div>
	`

	setupCreateOpcional(root)
}

function setupCreateOpcional(root: HTMLElement) {
	const btn = root.querySelector('#btnNovoOpcional')

	btn?.addEventListener('click', async () => {
		const nome = prompt('Nome do opcional (ex: Bordas)')
		if (!nome) return

		const minimo = Number(prompt('Mínimo (ex: 0)') || 0)
		const maximo = Number(prompt('Máximo (ex: 2)') || 0)

		try {
			await createOpcional({
				nome,
				minimo,
				maximo,
				tiposimples: 0,
			})

			alert('Opcional criado!')
			location.reload()
		} catch (error) {
			console.error(error)
			alert('Erro ao criar opcional')
		}
	})
}
