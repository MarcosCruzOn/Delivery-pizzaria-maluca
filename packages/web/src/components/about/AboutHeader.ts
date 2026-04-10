import { EmptyState } from '../EmptyState/EmptyState'

export function AboutHeader(company: any): HTMLElement {
	const container = document.createElement('div')

	if (!company?.sobre) {
		container.appendChild(EmptyState('Adicione uma descrição da sua loja'))
		return container
	}

	container.innerHTML = `
		<div class="d-flex align-items-start gap-3 p-3">
			<img 
				src="http://localhost:3333/${company.logotipo || ''}" 
				style="width:80px;height:80px;border-radius:10px;object-fit:cover;"
			/>
			<div>
				<h1 class="mb-2"><b>${company.nome || 'Nome não definido'}</b></h1>
				<p class="normal-text">${company.sobre}</p>
			</div>
		</div>
	`

	return container
}
