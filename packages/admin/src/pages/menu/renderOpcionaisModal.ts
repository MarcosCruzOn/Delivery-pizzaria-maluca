import { Modal } from '../../components/Modal/modal'
import { menuState } from '../../pages/menu/state/menuState'
import { createOpcional, getOpcionais } from '../../api/opcionais'

export function renderOpcionaisModal() {
	return Modal({
		id: 'modalOpcionais',
		title: 'Gerenciar Opcionais',

		body: `
            <div class="mb-3">
                <input 
                    type="text" 
                    class="form-control mb-2" 
                    id="inputNomeOpcional"
                    placeholder="Nome (ex: Bordas)"
                />

                <div class="d-flex gap-2">
                    <input 
                        type="number" 
                        class="form-control" 
                        id="inputMinimo"
                        placeholder="Min"
                    />

                    <input 
                        type="number" 
                        class="form-control" 
                        id="inputMaximo"
                        placeholder="Max"
                    />
                </div>

                <button class="btn btn-yellow btn-sm mt-2" id="btnSalvarOpcional">
                    Salvar opcional
                </button>
	        </div>

	        <hr/>

            <div id="listaOpcionais">
                ${menuState.opcionais
					.map(
						(o) => `
                        <div class="card card-select mb-2 p-2">
                            <b>${o.name}</b>
                            <small>Min: ${o.min} | Max: ${o.max}</small>
                        </div>
                    `
					)
					.join('')}
            </div>
        `,
	})
}

export function setupOpcionaisModal() {
	const btn = document.getElementById('btnSalvarOpcional')

	btn?.addEventListener('click', async () => {
		const nome = (
			document.getElementById('inputNomeOpcional') as HTMLInputElement
		)?.value
		const minimo = Number(
			(document.getElementById('inputMinimo') as HTMLInputElement)
				?.value || 0
		)
		const maximo = Number(
			(document.getElementById('inputMaximo') as HTMLInputElement)
				?.value || 0
		)

		if (!nome) {
			alert('Digite um nome')
			return
		}

		try {
			await createOpcional({
				nome,
				minimo,
				maximo,
				tiposimples: 0,
			})

			alert('Opcional criado!')

			// 🔥 Atualiza lista sem reload da página inteira
			const lista = document.getElementById('listaOpcionais')

			const opcionais = await getOpcionais()

			if (lista) {
				lista.innerHTML = opcionais
					.map(
						(o: any) => `
						<div class="card card-select mb-2 p-2">
							<b>${o.nome}</b>
							<small>Min: ${o.minimo} | Max: ${o.maximo}</small>
						</div>
					`
					)
					.join('')
			}

			// limpar inputs
			;(
				document.getElementById('inputNomeOpcional') as HTMLInputElement
			).value = ''
			;(
				document.getElementById('inputMinimo') as HTMLInputElement
			).value = ''
			;(
				document.getElementById('inputMaximo') as HTMLInputElement
			).value = ''
		} catch (error) {
			console.error(error)
			alert('Erro ao criar opcional')
		}
	})
}
