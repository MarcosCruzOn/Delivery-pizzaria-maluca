export function isLojaAberta(horarios: any[]): boolean {
	if (!horarios || horarios.length === 0) return false

	const agora = new Date()
	const diaAtual = agora.getDay() // 0 (Dom) a 6 (Sab)
	const horaAtual = agora.getHours()
	const minutoAtual = agora.getMinutes()
	const tempoAtualEmMinutos = horaAtual * 60 + minutoAtual

	const converterParaMinutos = (horaString: string) => {
		if (!horaString || horaString.trim() === '' || horaString === '0') return null
		const [h, m] = horaString.split(':').map(Number)
		return h * 60 + m
	}

	console.log(
		`🕒 Verificando Loja: Dia ${diaAtual}, Hora ${horaAtual}:${minutoAtual} (${tempoAtualEmMinutos}min)`
	)

	for (const h of horarios) {
		const diaInicio = Number(h.diainicio)
		const diaFim = Number(h.diafim)

		// Verifica se o dia de hoje está no intervalo
		let diaValido = false
		if (diaInicio <= diaFim) {
			diaValido = diaAtual >= diaInicio && diaAtual <= diaFim
		} else {
			diaValido = diaAtual >= diaInicio || diaAtual <= diaFim
		}

		if (diaValido) {
			const inicio1 = converterParaMinutos(h.iniciohorarioum)
			const fim1 = converterParaMinutos(h.fimhorarioum)

			console.log(
				`📅 Regra encontrada: Dia ${diaInicio}-${diaFim}. Turno 1: ${inicio1}min até ${fim1}min`
			)

			if (inicio1 !== null && fim1 !== null) {
				// Se o horário de fim for menor que o de início (ex: fecha 01:00 da manhã)
				if (fim1 < inicio1) {
					if (tempoAtualEmMinutos >= inicio1 || tempoAtualEmMinutos <= fim1) return true
				} else {
					if (tempoAtualEmMinutos >= inicio1 && tempoAtualEmMinutos <= fim1) return true
				}
			}

			// Repete para o turno 2 se existir
			const inicio2 = converterParaMinutos(h.iniciohorariodois)
			const fim2 = converterParaMinutos(h.fimhorariodois)
			if (inicio2 !== null && fim2 !== null) {
				if (tempoAtualEmMinutos >= inicio2 && tempoAtualEmMinutos <= fim2) return true
			}
		}
	}

	return false
}
