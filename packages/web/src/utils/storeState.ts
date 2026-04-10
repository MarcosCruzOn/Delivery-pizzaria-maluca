export function isLojaAberta(horarios: any[]): boolean {
	// Se não houver horários cadastrados no banco, por segurança a loja está fechada
	if (!horarios || horarios.length === 0) return false

	const dataAtual = new Date()
	const diaAtual = dataAtual.getDay() // Retorna de 0 (Domingo) a 6 (Sábado)
	const horaAtual = dataAtual.getHours()
	const minutoAtual = dataAtual.getMinutes()
	const tempoAtualEmMinutos = horaAtual * 60 + minutoAtual

	// Função que transforma "18:30" em "1110 minutos" para facilitar a conta de maior e menor
	const converterParaMinutos = (horaString: string) => {
		if (!horaString) return null
		const [h, m] = horaString.split(':').map(Number)
		return h * 60 + m
	}

	// Varre todas as regras de horário cadastradas
	for (const h of horarios) {
		let diaValido = false
		const diaInicio = Number(h.diainicio)
		const diaFim = Number(h.diafim)

		// Verifica se o dia de hoje cai dentro da regra (ex: Segunda a Sexta)
		if (diaInicio <= diaFim) {
			diaValido = diaAtual >= diaInicio && diaAtual <= diaFim
		} else {
			// Cobre o caso maluco de passar pela semana (ex: Sábado a Segunda)
			diaValido = diaAtual >= diaInicio || diaAtual <= diaFim
		}

		if (diaValido) {
			const inicio1 = converterParaMinutos(h.iniciohorarioum)
			const fim1 = converterParaMinutos(h.fimhorarioum)
			const inicio2 = converterParaMinutos(h.iniciohorariodois)
			const fim2 = converterParaMinutos(h.fimhorariodois)

			// Verifica se está dentro do 1º Turno
			if (inicio1 !== null && fim1 !== null) {
				if (tempoAtualEmMinutos >= inicio1 && tempoAtualEmMinutos <= fim1) return true
			}

			// Verifica se está dentro do 2º Turno (Almoço / Janta)
			if (inicio2 !== null && fim2 !== null) {
				if (tempoAtualEmMinutos >= inicio2 && tempoAtualEmMinutos <= fim2) return true
			}
		}
	}

	// Se varreu tudo e não caiu em nenhum horário válido, está fechada!
	return false
}
