import { EmptyState } from '../EmptyState/EmptyState'

export function AboutPayments(company: any): HTMLElement {
	const wrapper = document.createElement('div')
	wrapper.className = 'container-group mb-5'

	wrapper.innerHTML = `
		<p class="title-categoria mb-3">
			<i class="fas fa-coins"></i>&nbsp; <b>Formas de pagamento</b>
		</p>
	`

	if (!company?.pagamentos) {
		wrapper.appendChild(EmptyState('Adicione formas de pagamento'))
		return wrapper
	}

	const list = company.pagamentos.split(',')

	list.forEach((p: string) => {
		const card = document.createElement('div')
		card.className = 'card mt-2'
		card.innerHTML = `<p class="normal-text mb-0"><b>${p.trim()}</b></p>`

		wrapper.appendChild(card)
	})

	return wrapper
}
