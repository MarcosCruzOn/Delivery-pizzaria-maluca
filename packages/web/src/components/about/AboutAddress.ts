import { EmptyState } from '../EmptyState/EmptyState'

export function AboutAddress(company: any): HTMLElement {
	const wrapper = document.createElement('div')
	wrapper.className = 'container-group mb-5'

	wrapper.innerHTML = `
		<p class="title-categoria mb-3">
			<i class="fas fa-map-marker-alt"></i>&nbsp; <b>Endereço</b>
		</p>
	`

	if (!company?.endereco) {
		wrapper.appendChild(EmptyState('Cadastre um endereço'))
		return wrapper
	}

	const row = document.createElement('div')
	row.className = 'row g-3 align-items-stretch'

	const endereco = `${company.endereco}, ${company.numero}, ${company.cidade}`

	row.innerHTML = `
		<div class="col-12 col-md-6">
			<div class="card h-100 p-3">
				<p class="normal-text mb-0">
					${company.endereco}, ${company.numero} <br>
					${company.bairro} <br>
					${company.cidade} - ${company.estado} <br>
					CEP: ${company.cep}
				</p>
			</div>
		</div>

		<div class="col-12 col-md-6">
			<div class="card h-100 p-2">
				<iframe
					width="100%"
					height="100%"
					style="border:0; border-radius:10px; min-height:200px;"
					loading="lazy"
					src="https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed">
				</iframe>
			</div>
		</div>
	`

	wrapper.appendChild(row)
	return wrapper
}
