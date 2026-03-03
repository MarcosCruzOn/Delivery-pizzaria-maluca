import { mount } from '../utils/dom'
import { TitleHeader } from '../components/TitleHeader/TitleHeader'
import { BottomMenu } from '../components/BottomMenu/BottomMenu'

type Item = {
	id: number
	name: string
	description: string
	priceText: string
	imageUrl: string
}

const MOCK: Record<number, Item> = {
	1: {
		id: 1,
		name: 'Calabresa',
		description:
			'Molho de tomate, mussarela, cebola, calabresa, catupiry, tomate, orégano e azeitonas',
		priceText: 'R$ 39,90',
		imageUrl: '/img/calabresa.jpg',
	},
	2: {
		id: 2,
		name: 'Lombo com Calabresa',
		description:
			'Molho de tomate, lombo, mussarela, cebola, calabresa, catupiry, tomate, orégano e azeitonas',
		priceText: 'R$ 39,90',
		imageUrl: '/img/lombo.jpg',
	},
}

export function renderItem(root: HTMLElement, id: number) {
	const item = MOCK[id]
	if (!item) {
		root.innerHTML = `<h1 style="padding:20px;">Produto não encontrado</h1>`
		return
	}
	root.className = 'width-fix pb-5'

	root.innerHTML = `

		<div id="app-title-header"></div>
		
		<img class="img-item" src="${item.imageUrl}" alt="${item.name}" 
		<section class="opcionais mt-5 pb-5">

			<div class="container-group mb-5">
				<span class="badge">Obrigatório</span>

				<p class="title-categoria mb-0">
					<b>Deseja borda?</b>
				</p>

				<span class="sub-title-categoria">Escolha 1 opção</span>

				<div class="card card-opcionais mt-2">
					<div class="infos-produto-opcional">
						<p class="name mb-0">
							<b>Catupiry</b>
						</p>
						<p class="price mb-0">
							<b>+ R$ 8,90</b>
						</p>
					</div>
					<div class="checks">
						<label class="container-check">
							<input type="checkbox" />
							<span class="checkmark"></span>
						</label>
					</div>
				</div>

				<div class="card card-opcionais mt-2">
					<div class="infos-produto-opcional">
						<p class="name mb-0">
							<b>Cheddar</b>
						</p>
						<p class="price mb-0">
							<b>+ R$ 8,90</b>
						</p>
					</div>
					<div class="checks">
						<label class="container-check">
							<input type="checkbox" />
							<span class="checkmark"></span>
						</label>
					</div>
				</div>

			</div>

			<div class="container-group mb-5">

				<p class="title-categoria mb-0">
					<b>Adicionais</b>
				</p>
				<span class="sub-title-categoria">Escolha até 2 opções</span>

				<div class="card card-opcionais mt-2">
					<div class="infos-produto-opcional">
						<p class="name mb-0">
							<b>Bacon</b>
						</p>
						<p class="price mb-0">
							<b>+ R$ 8,90</b>
						</p>
					</div>
					<div class="checks">
						<label class="container-check">
							<input type="checkbox" />
							<span class="checkmark"></span>
						</label>
					</div>
				</div>

				<div class="card card-opcionais mt-2">
					<div class="infos-produto-opcional">
						<p class="name mb-0">
							<b>Cebola</b>
						</p>
						<p class="price mb-0">
							<b>+ R$ 8,90</b>
						</p>
					</div>
					<div class="checks">
						<label class="container-check">
							<input type="checkbox" />
							<span class="checkmark"></span>
						</label>
					</div>
				</div>

			</div>

			<div class="container-group mb-5">

				<p class="title-categoria mb-0">
					<b>Observações</b>
				</p>
				<span class="sub-title-categoria">Informe alguma observação abaixo</span>

				<textarea class="form-control mt-2" rows="5"></textarea>

			</div>
	 	</section>


		<section class="menu-bottom details" id="menu-bottom">
			<div class="add-carrinho">
				<span class="btn-menos">
					<i class="fas fa-minus"></i>
				</span>
				<span class="add-numero-itens">
					2
				</span>
				<span class="btn-mais">
					<i class="fas fa-plus"></i>
				</span>
			</div>
			<a class="btn btn-yellow btn-sm">
				Adicionar <span>R$ 49,90</span>
			</a>
		</section>

  `

	mount('#app-title-header', TitleHeader({ title: 'Detalhes do produto' }))
}
