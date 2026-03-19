import { EmptyState } from '../EmptyState/EmptyState'

function getDiaNome(dia: number) {
	const dias = [
		'Domingo',
		'Segunda',
		'Terça',
		'Quarta',
		'Quinta',
		'Sexta',
		'Sábado',
	]

	return dias[dia] || ''
}

function formatHorario(h: any) {
	const inicio = getDiaNome(h.diainicio)
	const fim = getDiaNome(h.diafim)

	return {
		dias: h.diainicio === h.diafim ? inicio : `${inicio} a ${fim}`,
		horario: `${h.iniciohorarioum} às ${h.fimhorarioum}`,
	}
}

export function AboutSchedule(horarios: any[]): HTMLElement {
	const wrapper = document.createElement('div')
	wrapper.className = 'container-group mb-5'

	wrapper.innerHTML = `
		<p class="title-categoria mb-3">
			<i class="fas fa-clock"></i>&nbsp; <b>Horário de funcionamento</b>
		</p>
	`

	if (!horarios.length) {
		wrapper.appendChild(EmptyState('Defina horário de funcionamento'))
		return wrapper
	}

	horarios.forEach((h) => {
		const formatted = formatHorario(h)

		const card = document.createElement('div')
		card.className = 'card mt-2'

		card.innerHTML = `
			<p class="normal-text mb-0"><b>${formatted.dias}</b></p>
			<p class="normal-text mb-0">${formatted.horario}</p>
		`

		wrapper.appendChild(card)
	})

	return wrapper
}
