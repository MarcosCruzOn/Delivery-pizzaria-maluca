import './style.css'

export type MenuItem = {
	id: number
	name: string
	description: string
	priceText: string // por enquanto como texto: "R$ 39,90"
	imageUrl: string // ex: "/img/calabresa.jpg"
}

export function MenuItemCard(item: MenuItem): HTMLDivElement {
	const card = document.createElement('div')
	card.className = 'card mb-2 item-cardapio'

	card.innerHTML = `
    <div class="d-flex">
      <div class="container-img-produto">
         <img class="img-produto" src="${item.imageUrl}" alt="${item.name}">
    </div>

      <div class="infos-produto">
        <p class="name"><b>${item.name}</b></p>
        <p class="description">${item.description}</p>
        <p class="price"><b>${item.priceText}</b></p>
      </div>
    </div>
  `

	// depois a gente liga isso na página de detalhes
	card.addEventListener('click', () => {
		console.log('clicou no produto:', item.id)
	})

	return card
}
