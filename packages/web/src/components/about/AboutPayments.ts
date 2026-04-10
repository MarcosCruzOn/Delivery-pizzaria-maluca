export function AboutPayments(company: any): HTMLElement {
	const container = document.createElement('div')
	container.className = 'container-group mb-5'

	// Monta o cabeçalho do bloco
	let html = `
        <p class="title-categoria mb-0"><b>Formas de Pagamento</b></p>
        <span class="sub-title-categoria">Aceitamos as seguintes formas no delivery:</span>
        <div class="mt-3">
    `

	// Verifica se a lista de pagamentos existe e se tem itens
	if (company?.pagamentos && Array.isArray(company.pagamentos) && company.pagamentos.length > 0) {
		// Percorre a lista real do banco de dados
		company.pagamentos.forEach((pagamento: any) => {
			// Lógica de UX: Escolhe um ícone legal dependendo do nome do pagamento
			let icone = 'fas fa-money-bill-wave' // Ícone padrão (Dinheiro)
			const nomeLowerCase = pagamento.nome.toLowerCase()

			if (nomeLowerCase.includes('cartão') || nomeLowerCase.includes('cartao')) {
				icone = 'fas fa-credit-card'
			} else if (nomeLowerCase.includes('pix')) {
				icone = 'fab fa-pix' // Ícone do Pix!
			}

			html += `
                <div class="card card-address mt-2" style="padding: 15px;">
                    <div class="img-icon-details">
                        <i class="${icone}"></i>
                    </div>
                    <div class="infos">
                        <p class="name mb-0"><b>${pagamento.nome}</b></p>
                    </div>
                </div>
            `
		})
	} else {
		// Caso a loja não tenha cadastrado nada ainda
		html += `
            <div class="text-muted p-3 text-center" style="background: #f8f9fa; border-radius: 10px;">
                <i class="fas fa-info-circle"></i> Nenhuma forma de pagamento configurada no momento.
            </div>
        `
	}

	html += `</div>`
	container.innerHTML = html

	return container
}
