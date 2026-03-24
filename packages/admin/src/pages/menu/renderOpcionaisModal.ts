import { Modal } from '../../components/Modal/modal'
import { menuState } from '../../pages/menu/state/menuState'
import {
	createOpcional,
	getOpcionais,
	createOpcionalItem,
} from '../../api/opcionais'

export function renderOpcionaisModal() {
	return Modal({
		id: 'modalOpcionais',
		title: 'Gerenciar Opcionais',

		body: `
<div class="container-fluid">

	<!-- 🔹 CRIAR OPCIONAL -->
	<div class="card card-select p-3 mb-3">
		<h6 class="mb-2">Novo grupo de opcional</h6>

		<input 
			type="text" 
			class="form-control mb-2" 
			id="inputNomeOpcional"
			placeholder="Ex: Bordas, Bebidas..."
		/>

		<div class="d-flex gap-2 mb-2">
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

		<button class="btn btn-yellow btn-sm" id="btnSalvarOpcional">
			Salvar grupo
		</button>
	</div>

	<!-- 🔹 CRIAR ITEM -->
	<div class="card card-select p-3 mb-3">
		<h6 class="mb-2">Novo item</h6>

		<select id="selectOpcional" class="form-control mb-2">
			${menuState.opcionais
				.map((o) => `<option value="${o.id}">${o.name}</option>`)
				.join('')}
		</select>

		<input 
			type="text" 
			id="inputItemNome" 
			class="form-control mb-2"
			placeholder="Ex: Cheddar"
		/>

		<input 
			type="number" 
			id="inputItemValor" 
			class="form-control mb-2"
			placeholder="Preço (ex: 5.00)"
		/>

		<button class="btn btn-yellow btn-sm" id="btnCriarItem">
			Criar item
		</button>
	</div>

	<!-- 🔹 LISTA -->
	<div>
		<h6 class="mb-2">Grupos cadastrados</h6>

		${menuState.opcionais
			.map(
				(o) => `
				<div class="card card-select mb-2 p-2">
					<div class="d-flex justify-content-between">
						<div>
							<b>${o.name}</b><br/>
							<small>Min: ${o.min} | Max: ${o.max}</small>
						</div>
						<span class="badge bg-light text-dark">
							ID ${o.id}
						</span>
					</div>
				</div>
			`
			)
			.join('')}
	</div>

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

export function setupCreateItem() {
	const btn = document.getElementById('btnCriarItem')

	btn?.addEventListener('click', async () => {
		const idopcional = Number(
			(document.getElementById('selectOpcional') as HTMLSelectElement)
				.value
		)

		const nome = (
			document.getElementById('inputItemNome') as HTMLInputElement
		).value
		const valor = Number(
			(document.getElementById('inputItemValor') as HTMLInputElement)
				.value || 0
		)

		if (!nome) {
			alert('Digite um nome para o item')
			return
		}

		try {
			await createOpcionalItem({
				idopcional,
				nome,
				valor,
			})

			alert('Item criado!')

			// 🔥 reload leve
			location.reload()
		} catch (error) {
			console.error(error)
			alert('Erro ao criar item')
		}
	})
}
